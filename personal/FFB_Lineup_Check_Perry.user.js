// ==UserScript==
// @name         FFB Fantasy Lineup Check — Perry
// @namespace    local.ffb.lineupcheck.perry
// @version      1.0.20
// @updateURL    https://usafanthonyperry-spec.github.io/ffb-lineup-check/personal/FFB_Lineup_Check_Perry.meta.js
// @downloadURL  https://usafanthonyperry-spec.github.io/ffb-lineup-check/personal/FFB_Lineup_Check_Perry.user.js
// @description  Perry personal FFB lineup checker with custom league order, lineup/FLEX/SFLEX fixes, Spot Starts, and shareable results.
// @match        https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/*
// @match        https://usafanthonyperry-spec.github.io/ffb-lineup-check/launch.html*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(async function () {
  'use strict';

  if (window.__ffbLineupCheckRunning) {
    alert('Another FFB Lineup Check script is already running. Disable the older/public FFB checker in Userscripts, then run the Perry checker again.');
    return;
  }
  window.__ffbLineupCheckRunning = true;

  // =========================================================
  // OPTIONAL CUSTOM LEAGUE ORDER / DISPLAY NAMES
  // Move these lines when you reorder leagues.
  // For a generic/public copy, set this to: const LEAGUE_ORDER = [];
  // =========================================================
  const LEAGUE_ORDER = [
    'Eglin fAMMOly',
    'Family League',
    'Tried and TRUE',
    'QA',
    'League of Record Dino',
    'Dynasty Degenerates',
    'Dino Jr',
    'The Swim Shady',
    'The Megalabowl',
    'Astro Bot',
    'Off With Their Heads'
  ];

  const APP_VERSION = '1.0.20';
  const VERSION_STORAGE_KEY = 'ffb-perry-last-version';

  const IS_LAUNCHER = location.hostname === 'usafanthonyperry-spec.github.io'
    && location.pathname.endsWith('/ffb-lineup-check/launch.html');

  if (IS_LAUNCHER) {
    const latest = document.querySelector('meta[name="ffb-latest"]')?.content?.trim() || '';

    if (latest && compareVersions(latest, APP_VERSION) > 0) {
      alert(`⬆️ Update available — v${latest}\nYou’re using v${APP_VERSION}.`);
    }

    window.dispatchEvent(new CustomEvent('ffb-version-checked'));
    window.__ffbLineupCheckRunning = false;
    return;
  }

  const COLORS = {
    bg: '#111315',
    card: '#1b1e21',
    card2: '#23272b',
    border: '#343a40',
    text: '#f4f4f4',
    muted: '#a7adb4',
    green: '#54d17a',
    red: '#ff6b6b',
    yellow: '#f2c94c',
    purple: '#7c5cff',
    blue: '#66aaff'
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function escapeHTML(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function compareVersions(a, b) {
    const pa = String(a || '').split('.').map(n => Number.parseInt(n, 10) || 0);
    const pb = String(b || '').split('.').map(n => Number.parseInt(n, 10) || 0);
    const len = Math.max(pa.length, pb.length);

    for (let i = 0; i < len; i++) {
      const diff = (pa[i] || 0) - (pb[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  }

  async function getVersionNotice() {
    let previousVersion = '';
    try {
      previousVersion = localStorage.getItem(VERSION_STORAGE_KEY) || '';
    } catch (_) {}

    let notice = null;

    if (
      previousVersion
      && previousVersion !== APP_VERSION
      && compareVersions(APP_VERSION, previousVersion) > 0
    ) {
      notice = {
        type: 'updated',
        currentVersion: APP_VERSION
      };
    }

    try {
      localStorage.setItem(VERSION_STORAGE_KEY, APP_VERSION);
    } catch (_) {}

    return notice;
  }

  function renderVersionNotice(notice) {
    if (!notice) return '';

    return `
      <div style="margin-top:12px;padding:10px 12px;background:${COLORS.card2};border:1px solid ${COLORS.green};border-radius:10px;color:${COLORS.green};font-weight:700;">
        ✅ Updated to v${escapeHTML(notice.currentVersion)}
      </div>`;
  }

  function normalizeLeagueName(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  function configuredLeagueMatch(name) {
    const actual = normalizeLeagueName(name);
    if (!actual) return null;

    for (let i = 0; i < LEAGUE_ORDER.length; i++) {
      const label = LEAGUE_ORDER[i];
      const wanted = normalizeLeagueName(label);
      if (!wanted) continue;
      if (actual === wanted || actual.includes(wanted) || wanted.includes(actual)) {
        return { index: i, label };
      }
    }
    return null;
  }

  function applyConfiguredOrder(results) {
    if (!LEAGUE_ORDER.length) return results;

    // Only activate this user's custom order if at least two league names match.
    // That keeps the same script safe to hand to friends whose leagues are different.
    const matchCount = results.filter(r => configuredLeagueMatch(r.rawLeague || r.league)).length;
    if (matchCount < 2) return results;

    return results
      .map((league, originalIndex) => {
        const match = configuredLeagueMatch(league.rawLeague || league.league);
        return {
          league: {
            ...league,
            league: match?.label || league.league
          },
          originalIndex,
          orderIndex: match?.index ?? 10000
        };
      })
      .sort((a, b) => (a.orderIndex - b.orderIndex) || (a.originalIndex - b.originalIndex))
      .map(x => x.league);
  }

  function showBanner(message) {
    let banner = document.getElementById('ffb-check-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'ffb-check-banner';
      Object.assign(banner.style, {
        position: 'fixed',
        top: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '999999',
        background: COLORS.bg,
        color: COLORS.text,
        padding: '11px 15px',
        borderRadius: '12px',
        border: `1px solid ${COLORS.border}`,
        fontSize: '15px',
        fontWeight: '600',
        maxWidth: '90%',
        textAlign: 'center',
        boxShadow: '0 6px 20px rgba(0,0,0,.4)',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      });
      document.body.appendChild(banner);
    }
    banner.textContent = message;
  }

  function removeBanner() {
    document.getElementById('ffb-check-banner')?.remove();
  }

  function getTeamSelect() {
    return document.querySelector('.ffb-ultimate-dashboard--team select') || document.querySelector('select');
  }

  function extractJSONObjectAfter(text, marker) {
    const markerIndex = text.indexOf(marker);
    if (markerIndex === -1) return null;

    const start = text.indexOf('{', markerIndex + marker.length);
    if (start === -1) return null;

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < text.length; i++) {
      const ch = text[i];

      if (inString) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }

      if (ch === '"') {
        inString = true;
        continue;
      }

      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) return text.slice(start, i + 1);
      }
    }
    return null;
  }

  let scoringSystemsCache;

  function getScoringSystems() {
    if (scoringSystemsCache !== undefined) return scoringSystemsCache;

    try {
      if (window.udk?.userScoringSystems) {
        scoringSystemsCache = window.udk.userScoringSystems;
        return scoringSystemsCache;
      }
    } catch (_) {}

    for (const script of document.scripts) {
      const text = script.textContent || '';
      if (!text.includes('window.udk.userScoringSystems')) continue;

      const raw = extractJSONObjectAfter(text, 'window.udk.userScoringSystems');
      if (!raw) continue;

      try {
        scoringSystemsCache = JSON.parse(raw);
        return scoringSystemsCache;
      } catch (_) {}
    }

    scoringSystemsCache = {};
    return scoringSystemsCache;
  }

  function getTeamMeta(select) {
    const systems = getScoringSystems();
    const value = select?.value || '';
    const visibleName = select?.selectedOptions?.[0]?.text?.trim() || '';

    if (systems[value]) return systems[value];

    return Object.values(systems).find(item =>
      item?.id === value || item?.name === visibleName
    ) || null;
  }

  function getRawLeagueName(select) {
    const meta = getTeamMeta(select);
    return meta?.leagueName?.trim()
      || meta?.name?.trim()
      || select?.selectedOptions?.[0]?.text?.trim()
      || 'Unknown League';
  }

  function getCurrentSleeperURL() {
    const link = Array.from(document.querySelectorAll('a')).find(a =>
      /View in Sleeper/i.test(a.innerText || '')
    );
    return link?.href || '';
  }

  function getLineup(type) {
    const roster = document.querySelector(`.ffb-lineup-optimizer--roster#${type}`);
    if (!roster) return [];

    const lineup = Array.from(roster.querySelectorAll(
      '.ffb-lineup-optimizer--starters .ffb-lineup-optimizer--row:not(.header):not(.total)'
    ))
      .map(row => ({
        slot: row.querySelector('.position')?.innerText.trim() || '',
        player: row.querySelector('.player-name')?.innerText.trim() || '',
        kickoff: row.querySelector('.player-right-line-two span')?.innerText.trim() || ''
      }))
      .filter(x => x.slot && x.player);

    // Number repeated lineup slots in the exact order they appear on the
    // optimizer: RB 1, RB 2, WR 1, WR 2, WR 3, FLEX 1, FLEX 2, etc.
    const totals = new Map();
    for (const item of lineup) {
      totals.set(item.slot, (totals.get(item.slot) || 0) + 1);
    }

    const seen = new Map();
    return lineup.map(item => {
      const number = (seen.get(item.slot) || 0) + 1;
      seen.set(item.slot, number);

      const repeated = (totals.get(item.slot) || 0) > 1;
      return {
        ...item,
        slotNumber: number,
        slotKey: `${item.slot}#${number}`,
        slotLabel: repeated ? `${item.slot} ${number}` : item.slot
      };
    });
  }

  function getLineupChanges(current, suggested) {
    const currentMap = new Map(current.map(x => [x.player, x]));
    const suggestedMap = new Map(suggested.map(x => [x.player, x]));
    const currentBySlot = new Map(current.map(x => [x.slotKey || x.slot, x]));

    const starts = suggested.filter(x => !currentMap.has(x.player));
    const sits = current.filter(x => !suggestedMap.has(x.player));

    const samePlayersInSlotGroup = slot => {
      const currentPlayers = current
        .filter(x => x.slot === slot)
        .map(x => x.player)
        .sort();
      const suggestedPlayers = suggested
        .filter(x => x.slot === slot)
        .map(x => x.player)
        .sort();

      return currentPlayers.length === suggestedPlayers.length
        && currentPlayers.every((player, index) => player === suggestedPlayers[index]);
    };

    // Build instructions from the optimized slot, but ignore meaningless
    // re-ordering inside identical slot types. WR 1 <-> WR 2, RB 1 <-> RB 2,
    // FLEX 1 <-> FLEX 2, etc. do not change the actual starting lineup.
    let slotChanges = suggested
      .map(target => {
        const key = target.slotKey || target.slot;
        const previous = currentBySlot.get(key) || null;
        if (previous?.player === target.player) return null;
        if (samePlayersInSlotGroup(target.slot)) return null;

        return {
          slot: target.slotLabel || target.slot,
          player: target.player,
          kickoff: target.kickoff,
          previousPlayer: previous?.player || '',
          previousSlot: previous?.slotLabel || previous?.slot || ''
        };
      })
      .filter(Boolean);

    const kickoffKey = value => {
      const text = String(value || '').trim();
      if (!text) return '';

      const day = text.match(/\b(mon|tue|wed|thu|fri|sat|sun)\b/i)?.[1]?.toLowerCase() || '';
      const time = text.match(/\b(\d{1,2}:\d{2}\s*(?:am|pm))\b/i)?.[1]?.toLowerCase().replace(/\s+/g, ' ') || '';

      return day && time ? `${day} ${time}` : text.toLowerCase().replace(/\s+/g, ' ');
    };

    // If the exact same players remain starters and the only remaining
    // difference is a WR/RB/TE <-> FLEX reshuffle among players who all lock
    // at the same time, there is no practical lineup-flexibility benefit.
    // Suppress that noise. Keep the move when kickoff times differ.
    if (!starts.length && !sits.length && slotChanges.length > 1) {
      const kickoffKeys = slotChanges.map(change => kickoffKey(change.kickoff));
      const allKnown = kickoffKeys.every(Boolean);
      const sameKickoff = allKnown && new Set(kickoffKeys).size === 1;

      if (sameKickoff) slotChanges = [];
    }

    return { starts, sits, slotChanges };
  }

  function parseSpotPlayer(el) {
    if (!el) return null;

    const score = Number.parseFloat(el.querySelector('.score')?.innerText.trim() || '');

    return {
      position: el.querySelector('.position')?.innerText.trim() || '',
      player: el.querySelector('.player-name')?.innerText.trim() || '',
      score: Number.isFinite(score) ? score : null,
      kickoff: el.querySelector('.player-right-line-two span')?.innerText.trim() || ''
    };
  }

  function getSpotStarts() {
    const grid = document.querySelector('#spot-starts .ffb-spot-starts--grid');
    if (!grid) return [];

    const rows = Array.from(grid.children)
      .filter(el => el.classList.contains('ffb-spot-starts--row'))
      .slice(1);

    const recommendations = [];

    for (const row of rows) {
      const cols = Array.from(row.children)
        .filter(el => el.classList.contains('ffb-spot-starts--col'));

      const rosterCol = cols.find(el => el.classList.contains('roster'));
      const suggestedCol = cols.find(el => el.classList.contains('suggested'));

      const current = parseSpotPlayer(rosterCol?.querySelector('.ffb-spot-starts--player'));
      const options = Array.from(suggestedCol?.querySelectorAll('.ffb-spot-starts--player') || [])
        .map(parseSpotPlayer)
        .filter(Boolean);

      if (!current?.player || !options.length) continue;

      const best = options.reduce((a, b) => {
        if (a?.score == null) return b;
        if (b?.score == null) return a;
        return b.score > a.score ? b : a;
      }, options[0]);

      const delta = current.score != null && best.score != null
        ? best.score - current.score
        : null;

      // Only surface Spot Starts that produce a visible projected gain.
      // Anything that rounds to +0.0 is noise, and missing projections are
      // skipped rather than shown as an unverified recommendation.
      if (delta == null || Math.round(delta * 10) <= 0) continue;

      recommendations.push({ current, add: best, delta });
    }

    return recommendations;
  }

  function optimizerUnavailable() {
    const text = document.body.innerText || '';
    return /collecting data/i.test(text)
      || /rankings are currently in progress/i.test(text)
      || /lineup optimizer.*not.*available/i.test(text);
  }

  function getOptimizerStatusText() {
    const candidates = Array.from(document.querySelectorAll('section, article, div'))
      .map(el => ({
        text: (el.innerText || '').replace(/\n{3,}/g, '\n\n').trim()
      }))
      .filter(item =>
        item.text
        && /collecting data/i.test(item.text)
        && /rankings/i.test(item.text)
        && item.text.length <= 700
      )
      .sort((a, b) => a.text.length - b.text.length);

    if (candidates.length) {
      const text = candidates[0].text.replace(/^collecting data\s*/i, '').trim();
      if (text) return text;
    }

    return 'Fantasy Footballers has not posted the current Lineup Optimizer rankings yet.';
  }

  function createResultsBox() {
    document.getElementById('ffb-final-results')?.remove();

    const results = document.createElement('div');
    results.id = 'ffb-final-results';

    Object.assign(results.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '999999',
      background: COLORS.bg,
      color: COLORS.text,
      width: '88%',
      maxWidth: '520px',
      maxHeight: '78vh',
      overflowY: 'auto',
      padding: '18px',
      borderRadius: '16px',
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0 12px 40px rgba(0,0,0,.55)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '15px',
      lineHeight: '1.4'
    });

    return results;
  }

  function makeButton(text, background) {
    const button = document.createElement('button');
    button.textContent = text;
    Object.assign(button.style, {
      width: '100%',
      marginTop: '10px',
      padding: '12px',
      fontSize: '15px',
      fontWeight: '600',
      borderRadius: '10px',
      border: `1px solid ${COLORS.border}`,
      background,
      color: COLORS.text
    });
    return button;
  }

  function renderLeagueCard(league) {
    if (league.status === 'optimized') {
      return `
        <div data-ffb-status="optimized" style="margin-top:10px;padding:10px 12px;background:${COLORS.card};border:2px solid ${COLORS.green};border-radius:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="font-weight:700;min-width:0;">${escapeHTML(league.league)}</div>
          <div style="color:${COLORS.green};font-weight:700;white-space:nowrap;">✓ OPTIMIZED</div>
        </div>`;
    }

    if (league.status === 'error') {
      return `
        <div style="margin-top:14px;padding:14px;background:${COLORS.card};border:2px solid ${COLORS.yellow};border-radius:12px;">
          <div style="font-weight:700;margin-bottom:8px;">${escapeHTML(league.league)}</div>
          <div style="color:${COLORS.yellow};font-weight:700;">COULDN'T VERIFY</div>
          <div style="margin-top:3px;color:${COLORS.muted};">${escapeHTML(league.error || 'Could not read lineup.')}</div>
        </div>`;
    }

    const cardColor = league.status === 'lineup' ? COLORS.red : COLORS.yellow;
    const statusLabel = league.status === 'lineup'
      ? 'LINEUP CHANGES'
      : 'LINEUP SET • SPOT STARTS AVAILABLE';

    let html = `
      <div style="margin-top:14px;padding:14px;background:${COLORS.card};border:2px solid ${cardColor};border-radius:12px;">
        <div style="font-weight:700;margin-bottom:6px;">${escapeHTML(league.league)}</div>
        <div style="color:${cardColor};font-weight:700;margin-bottom:8px;">${statusLabel}</div>`;

    if ((league.slotChanges || []).length || (league.sits || []).length) {
      html += `<div style="color:${COLORS.muted};font-weight:600;margin-bottom:4px;">LINEUP</div>`;

      for (const change of (league.slotChanges || [])) {
        html += `
          <div style="margin-top:7px;font-size:15px;line-height:1.45;">
            <span style="color:${COLORS.green};font-weight:700;">SET</span>&nbsp;
            <span style="font-weight:700;">${escapeHTML(change.slot)}</span>
            <span style="color:${COLORS.muted};">&nbsp;→&nbsp;</span>
            ${escapeHTML(change.player)}
          </div>`;

        if (change.previousPlayer) {
          html += `<div style="margin-top:1px;color:${COLORS.muted};font-size:13px;">was ${escapeHTML(change.previousPlayer)}</div>`;
        }
      }

      for (const sit of (league.sits || [])) {
        html += `
          <div style="margin-top:7px;font-size:15px;line-height:1.45;">
            <span style="color:${COLORS.red};font-weight:700;">BENCH</span>&nbsp;${escapeHTML(sit.player)}
          </div>`;
      }
    }

    if (league.spotStarts.length) {
      html += `<div style="color:${COLORS.muted};font-weight:600;margin-top:${((league.slotChanges || []).length || (league.sits || []).length) ? '12px' : '0'};margin-bottom:4px;">SPOT STARTS</div>`;

      for (const rec of league.spotStarts) {
        const deltaText = rec.delta != null ? `+${rec.delta.toFixed(1)} pts` : '';
        const verb = ['D', 'K'].includes(rec.current.position) ? 'REPLACE' : 'START OVER';

        html += `
          <div style="margin-top:6px;"><span style="color:${COLORS.green};font-weight:700;">ADD</span>&nbsp;${escapeHTML(rec.add.player)} <span style="color:${COLORS.muted};">(${escapeHTML(rec.add.position)})</span></div>
          <div style="margin-top:2px;color:${COLORS.muted};">${verb} ${escapeHTML(rec.current.player)}${deltaText ? ` • ${escapeHTML(deltaText)}` : ''}</div>`;
      }
    }

    html += `</div>`;
    return html;
  }

  // =========================================================
  // SHARE IMAGE
  // =========================================================

  function roundedRect(ctx, x, y, w, h, r, fill, stroke) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();

    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function wrapCanvasText(ctx, text, maxWidth) {
    const words = String(text).split(/\s+/).filter(Boolean);
    if (!words.length) return [''];

    const lines = [];
    let line = words[0];

    for (let i = 1; i < words.length; i++) {
      const test = `${line} ${words[i]}`;
      if (ctx.measureText(test).width <= maxWidth) line = test;
      else {
        lines.push(line);
        line = words[i];
      }
    }
    lines.push(line);
    return lines;
  }

  function dataURLToFile(dataURL, filename) {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/data:([^;]+)/)?.[1] || 'image/png';
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new File([bytes], filename, { type: mime });
  }

  function buildShareImage(model) {
    const W = 720;
    const SCALE = 2;
    const PAD = 34;
    const CARD_PAD = 22;
    const INNER_W = W - PAD * 2;

    const estimated = 650 + model.leagues.reduce((sum, league) => {
      if (league.status === 'optimized') return sum + 120;
      if (league.status === 'error') return sum + 190;
      const items = (league.slotChanges || []).length + (league.sits || []).length + league.spotStarts.length;
      return sum + 220 + items * 95;
    }, 0) + model.globalErrors.length * 60;

    const scratch = document.createElement('canvas');
    scratch.width = W * SCALE;
    scratch.height = Math.max(1200, estimated) * SCALE;

    const ctx = scratch.getContext('2d');
    ctx.scale(SCALE, SCALE);
    ctx.textBaseline = 'top';
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, scratch.height / SCALE);

    let y = PAD;

    const setFont = (weight, size) => {
      ctx.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`;
    };

    const drawWrapped = (text, x, maxWidth, color, weight = 400, size = 22, lineHeight = 30) => {
      setFont(weight, size);
      ctx.fillStyle = color;
      const lines = wrapCanvasText(ctx, text, maxWidth);
      for (const line of lines) {
        ctx.fillText(line, x, y);
        y += lineHeight;
      }
    };

    const drawInlineSegments = (segments, x, maxWidth, size = 21, lineHeight = 30) => {
      let cursorX = x;
      let lineY = y;

      for (const seg of segments) {
        const words = String(seg.text).split(/(\s+)/).filter(Boolean);
        for (const word of words) {
          setFont(seg.weight || 400, size);
          const width = ctx.measureText(word).width;

          if (cursorX + width > x + maxWidth && word.trim()) {
            cursorX = x;
            lineY += lineHeight;
          }

          ctx.fillStyle = seg.color || COLORS.text;
          ctx.fillText(word, cursorX, lineY);
          cursorX += width;
        }
      }

      y = lineY + lineHeight;
    };

    const lineupCount = model.leagues.filter(x => x.status === 'lineup').length;
    const spotCount = model.leagues.filter(x => x.status === 'spot').length;
    const optimizedCount = model.leagues.filter(x => x.status === 'optimized').length;
    const errorCount = model.leagues.filter(x => x.status === 'error').length;

    drawWrapped('🏈 Perry Lineup Check v1.0.20', PAD, INNER_W, COLORS.text, 700, 30, 39);
    y += 6;
    drawWrapped(`${model.checkedCount} of ${model.teamCount} leagues checked`, PAD, INNER_W, COLORS.muted, 400, 21, 29);

    const summarySegments = [];
    const addSummaryPart = (text, color, weight = 700) => {
      if (summarySegments.length) {
        summarySegments.push({ text: ' • ', color: COLORS.muted, weight: 400 });
      }
      summarySegments.push({ text, color, weight });
    };

    if (lineupCount) {
      addSummaryPart(`${lineupCount} lineup ${lineupCount === 1 ? 'change' : 'changes'}`, COLORS.red);
    }
    if (spotCount) {
      addSummaryPart(`${spotCount} Spot Start${spotCount === 1 ? '' : 's'}`, COLORS.yellow);
    }
    if (optimizedCount) {
      addSummaryPart(`${optimizedCount} optimized`, COLORS.green);
    }
    if (errorCount) {
      addSummaryPart(`${errorCount} couldn't verify`, COLORS.yellow, 600);
    }

    if (summarySegments.length) {
      drawInlineSegments(summarySegments, PAD, INNER_W, 20, 29);
    }

    y += 18;

    for (const league of model.leagues) {
      const cardStart = y;
      const contentX = PAD + CARD_PAD;
      const contentW = INNER_W - CARD_PAD * 2;

      if (league.status === 'optimized') {
        const cardH = 92;
        roundedRect(ctx, PAD, y, INNER_W, cardH, 18, COLORS.card, COLORS.green);
        y += 18;
        drawWrapped(league.league, contentX, contentW, COLORS.text, 700, 22, 29);
        drawWrapped('✓ OPTIMIZED', contentX, contentW, COLORS.green, 700, 18, 25);
        y = Math.max(y + 10, cardStart + cardH) + 12;
        continue;
      }

      if (league.status === 'error') {
        const cardH = 145;
        roundedRect(ctx, PAD, y, INNER_W, cardH, 18, COLORS.card, COLORS.yellow);
        y += CARD_PAD;
        drawWrapped(league.league, contentX, contentW, COLORS.text, 700, 24, 32);
        y += 5;
        drawWrapped("COULDN'T VERIFY", contentX, contentW, COLORS.yellow, 700, 20, 29);
        drawWrapped(league.error || 'Could not read lineup.', contentX, contentW, COLORS.muted, 400, 18, 26);
        y = Math.max(y + CARD_PAD, cardStart + cardH) + 18;
        continue;
      }

      const statusColor = league.status === 'lineup' ? COLORS.red : COLORS.yellow;
      const statusText = league.status === 'lineup'
        ? 'LINEUP CHANGES'
        : 'LINEUP SET • SPOT STARTS AVAILABLE';
      const itemCount = (league.slotChanges || []).length + (league.sits || []).length + league.spotStarts.length;
      const roughCardH = 165 + itemCount * 85;

      roundedRect(ctx, PAD, y, INNER_W, roughCardH, 18, COLORS.card, statusColor);
      y += CARD_PAD;
      drawWrapped(league.league, contentX, contentW, COLORS.text, 700, 24, 32);
      y += 5;
      drawWrapped(statusText, contentX, contentW, statusColor, 700, 20, 29);
      y += 5;

      if ((league.slotChanges || []).length || (league.sits || []).length) {
        drawWrapped('LINEUP', contentX, contentW, COLORS.muted, 700, 18, 26);
        y += 2;

        for (const change of (league.slotChanges || [])) {
          drawInlineSegments([
            { text: 'SET ', color: COLORS.green, weight: 700 },
            { text: `${change.slot} → ${change.player}`, color: COLORS.text, weight: 400 }
          ], contentX, contentW, 20, 29);

          if (change.previousPlayer) {
            drawWrapped(
              `was ${change.previousPlayer}`,
              contentX,
              contentW,
              COLORS.muted,
              400,
              17,
              24
            );
          }
          y += 4;
        }

        for (const sit of (league.sits || [])) {
          drawInlineSegments([
            { text: 'BENCH ', color: COLORS.red, weight: 700 },
            { text: sit.player, color: COLORS.text, weight: 400 }
          ], contentX, contentW, 20, 29);
          y += 4;
        }
      }

      if (league.spotStarts.length) {
        if ((league.slotChanges || []).length || (league.sits || []).length) y += 5;
        drawWrapped('SPOT STARTS', contentX, contentW, COLORS.muted, 700, 18, 26);
        y += 2;

        for (const rec of league.spotStarts) {
          const delta = rec.delta != null ? `+${rec.delta.toFixed(1)} pts` : '';
          const verb = ['D', 'K'].includes(rec.current.position) ? 'REPLACE' : 'START OVER';

          drawInlineSegments([
            { text: 'ADD ', color: COLORS.green, weight: 700 },
            { text: `${rec.add.player} (${rec.add.position})`, color: COLORS.text, weight: 400 }
          ], contentX, contentW, 20, 29);

          drawWrapped(
            `${verb} ${rec.current.player}${delta ? ` • ${delta}` : ''}`,
            contentX,
            contentW,
            COLORS.muted,
            400,
            19,
            27
          );
          y += 5;
        }
      }

      const neededBottom = y + CARD_PAD;
      const roughBottom = cardStart + roughCardH;

      if (neededBottom > roughBottom) {
        ctx.fillStyle = COLORS.card;
        ctx.fillRect(PAD + 1, roughBottom - 18, INNER_W - 2, neededBottom - roughBottom + 18);
      }

      y = Math.max(neededBottom, roughBottom) + 18;
    }

    if (model.globalErrors.length) {
      const errorH = 75 + model.globalErrors.length * 32;
      roundedRect(ctx, PAD, y, INNER_W, errorH, 18, COLORS.card, COLORS.border);
      y += CARD_PAD;
      drawWrapped('OTHER ERRORS', PAD + CARD_PAD, INNER_W - CARD_PAD * 2, COLORS.yellow, 700, 20, 29);

      for (const error of model.globalErrors) {
        drawWrapped(error, PAD + CARD_PAD, INNER_W - CARD_PAD * 2, COLORS.muted, 400, 18, 26);
      }
      y += CARD_PAD;
    }

    y += PAD;

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = W * SCALE;
    finalCanvas.height = Math.ceil(y * SCALE);

    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(
      scratch,
      0, 0, finalCanvas.width, finalCanvas.height,
      0, 0, finalCanvas.width, finalCanvas.height
    );

    return finalCanvas.toDataURL('image/png');
  }

  async function shareResults(model, button) {
    const oldText = button.textContent;

    try {
      button.textContent = 'Preparing…';
      button.disabled = true;

      const dataURL = buildShareImage(model);
      const file = dataURLToFile(dataURL, 'Fantasy-Lineup-Check.png');

      button.textContent = oldText;
      button.disabled = false;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
        } catch (error) {
          if (error?.name !== 'AbortError') console.error('Share failed:', error);
        }
        return;
      }

      const opened = window.open(dataURL, '_blank');
      if (!opened) location.href = dataURL;
    } catch (error) {
      console.error('Share capture failed:', error);
      button.textContent = 'Share Failed — Try Again';
      button.disabled = false;
      setTimeout(() => { button.textContent = oldText; }, 2500);
    }
  }

  function addButtons(results, sleeperURL = '', shareModel = null) {
    if (sleeperURL) {
      const sleeper = document.createElement('a');
      sleeper.textContent = 'Open Sleeper';
      sleeper.href = sleeperURL;
      Object.assign(sleeper.style, {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        marginTop: '18px',
        padding: '12px',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: '600',
        borderRadius: '10px',
        background: COLORS.purple,
        color: '#fff',
        textDecoration: 'none'
      });
      results.appendChild(sleeper);
    }

    const rerun = makeButton('🔄 Run Again', COLORS.card2);
    rerun.onclick = () => location.reload();
    results.appendChild(rerun);

    const done = makeButton('Done', COLORS.card);
    done.onclick = () => results.remove();
    results.appendChild(done);

    if (shareModel) {
      const share = makeButton('📤 Share Results', COLORS.card2);
      share.onclick = () => shareResults(shareModel, share);
      results.appendChild(share);
    }
  }

  function showOptimizerUnavailable() {
    removeBanner();
    const results = createResultsBox();
    const siteStatus = getOptimizerStatusText();

    results.innerHTML = `
      <div style="font-size:18px;font-weight:700;">🕒 Lineup Optimizer Not Ready</div>
      <div style="margin-top:10px;">Fantasy Footballers is still processing this week's rankings.</div>
      <div style="margin-top:12px;padding:12px;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:10px;color:${COLORS.muted};">${escapeHTML(siteStatus)}</div>`;

    addButtons(results);
    document.body.appendChild(results);
    window.__ffbLineupCheckRunning = false;
  }

  function showLoginError() {
    removeBanner();
    const results = createResultsBox();

    results.innerHTML = `
      <div style="font-size:18px;font-weight:700;">🔐 Footballers Login Required</div>
      <div style="margin-top:10px;">The Ultimate Dashboard could not be loaded.</div>
      <div style="margin-top:8px;color:${COLORS.muted};">Sign in, then run Fantasy Lineup Check again.</div>`;

    addButtons(results);
    document.body.appendChild(results);
    window.__ffbLineupCheckRunning = false;
  }

  const versionNotice = await getVersionNotice();

  try {
    showBanner('🏈 Loading Fantasy Dashboard…');
    await sleep(750);

    if (optimizerUnavailable()) {
      showOptimizerUnavailable();
      return;
    }

    let select = null;

    for (let i = 0; i < 40; i++) {
      select = getTeamSelect();
      if (select && select.options.length > 0) break;
      await sleep(250);
    }

    if (!select || select.options.length === 0) {
      if (optimizerUnavailable()) showOptimizerUnavailable();
      else showLoginError();
      return;
    }

    const teamValues = Array.from(select.options)
      .filter(option => {
        const text = option.text.trim();
        return option.value && !option.disabled && !/select a team/i.test(text);
      })
      .map(option => option.value);

    const teamCount = teamValues.length;

    if (!teamCount) {
      showLoginError();
      return;
    }

    const startingTeam = teamValues.includes(select.value) ? select.value : teamValues[0];

    if (select.value !== startingTeam) {
      select.value = startingTeam;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      await sleep(1000);
    }

    let sleeperURL = getCurrentSleeperURL();
    const leagueResults = [];
    const globalErrors = [];
    let checkedCount = 0;

    for (let i = 0; i < teamCount; i++) {
      if (optimizerUnavailable()) {
        showOptimizerUnavailable();
        return;
      }

      select = getTeamSelect();
      if (!select) {
        globalErrors.push('Team dropdown disappeared.');
        break;
      }

      if (select.value !== teamValues[i]) {
        select.value = teamValues[i];
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        await sleep(1000);
      }

      select = getTeamSelect();
      if (!select) {
        globalErrors.push('Team dropdown disappeared.');
        break;
      }

      const rawLeagueName = getRawLeagueName(select);
      showBanner(`🏈 Checking ${i + 1} of ${teamCount}: ${rawLeagueName}`);

      if (!sleeperURL) sleeperURL = getCurrentSleeperURL();

      const syncButton = Array.from(document.querySelectorAll('button'))
        .find(b => b.innerText.trim() === 'Sync Team');

      if (syncButton) {
        syncButton.click();
        await sleep(2000);
      }

      if (optimizerUnavailable()) {
        showOptimizerUnavailable();
        return;
      }

      const current = getLineup('current');
      const suggested = getLineup('optimized');

      if (!current.length || !suggested.length) {
        leagueResults.push({
          rawLeague: rawLeagueName,
          league: rawLeagueName,
          status: 'error',
          error: 'Could not read lineup.'
        });
        continue;
      }

      checkedCount++;

      const lineup = getLineupChanges(current, suggested);
      const spotStarts = getSpotStarts();

      const hasLineupChanges = Boolean(
        lineup.slotChanges.length || lineup.sits.length
      );
      const status = hasLineupChanges
        ? 'lineup'
        : spotStarts.length
          ? 'spot'
          : 'optimized';

      leagueResults.push({
        rawLeague: rawLeagueName,
        league: rawLeagueName,
        status,
        starts: lineup.starts,
        sits: lineup.sits,
        slotChanges: lineup.slotChanges,
        spotStarts
      });
    }

    const sortedLeagueResults = applyConfiguredOrder(leagueResults);
    const lineupCount = sortedLeagueResults.filter(x => x.status === 'lineup').length;
    const spotCount = sortedLeagueResults.filter(x => x.status === 'spot').length;
    const optimizedCount = sortedLeagueResults.filter(x => x.status === 'optimized').length;
    const errorCount = sortedLeagueResults.filter(x => x.status === 'error').length;

    removeBanner();
    const results = createResultsBox();

    const headerParts = [];

    if (lineupCount) {
      headerParts.push(`<span style="color:${COLORS.red};font-weight:700;">🔴 ${lineupCount} lineup ${lineupCount === 1 ? 'change' : 'changes'}</span>`);
    }
    if (spotCount) {
      headerParts.push(`<span style="color:${COLORS.yellow};font-weight:700;">🟡 ${spotCount} Spot Start${spotCount === 1 ? '' : 's'}</span>`);
    }
    if (optimizedCount) {
      headerParts.push(`<span style="color:${COLORS.green};font-weight:700;">🟢 ${optimizedCount} optimized</span>`);
    }
    if (errorCount) {
      headerParts.push(`<span style="color:${COLORS.yellow};font-weight:600;">⚠️ ${errorCount} couldn't verify</span>`);
    }

    const headerStatus = `
      <div style="margin-top:6px;line-height:1.55;">
        ${headerParts.join(`<span style="color:${COLORS.muted};font-weight:400;"> • </span>`)}
      </div>`;

    let html = `
      <div style="font-size:18px;font-weight:700;">🏈 Perry Lineup Check v1.0.20</div>
      <div style="margin-top:6px;color:${COLORS.muted};">${checkedCount} of ${teamCount} leagues checked</div>
      ${headerStatus}
      ${renderVersionNotice(versionNotice)}`;

    for (const league of sortedLeagueResults) html += renderLeagueCard(league);

    if (globalErrors.length) {
      html += `
        <div style="margin-top:14px;padding:14px;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:12px;">
          <div style="font-weight:700;color:${COLORS.yellow};">OTHER ERRORS</div>`;
      for (const error of globalErrors) {
        html += `<div style="margin-top:6px;color:${COLORS.muted};">${escapeHTML(error)}</div>`;
      }
      html += `</div>`;
    }

    results.innerHTML = html;

    const shareModel = {
      checkedCount,
      teamCount,
      leagues: sortedLeagueResults,
      globalErrors
    };

    addButtons(results, sleeperURL, shareModel);
    document.body.appendChild(results);

    const finalSelect = getTeamSelect();
    if (finalSelect && startingTeam) {
      finalSelect.value = startingTeam;
      finalSelect.dispatchEvent(new Event('input', { bubbles: true }));
      finalSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } catch (error) {
    console.error('FFB Lineup Check failed:', error);
    removeBanner();

    const results = createResultsBox();
    results.innerHTML = `
      <div style="font-size:18px;font-weight:700;">⚠️ Fantasy Lineup Check Error</div>
      <div style="margin-top:8px;color:${COLORS.muted};">The checker hit an unexpected page error. Reload the Ultimate Dashboard and run it again.</div>`;
    addButtons(results);
    document.body.appendChild(results);
  } finally {
    window.__ffbLineupCheckRunning = false;
  }
})();