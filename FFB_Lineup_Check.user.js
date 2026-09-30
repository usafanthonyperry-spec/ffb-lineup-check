// ==UserScript==
// @name         FFB Fantasy Lineup Check
// @namespace    local.ffb.lineupcheck
// @version      1.0.42
// @updateURL    https://usafanthonyperry-spec.github.io/ffb-lineup-check/FFB_Lineup_Check.meta.js
// @downloadURL  https://usafanthonyperry-spec.github.io/ffb-lineup-check/FFB_Lineup_Check.user.js
// @description  Checks every synced Fantasy Footballers Ultimate Dashboard league for lineup, FLEX/SFLEX, and Spot Starts changes and can share one full results image.
// @match        https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(async function () {
  'use strict';

  const RUN_MARKER_ID = 'ffb-lineup-check-running';
  if (document.getElementById(RUN_MARKER_ID) || window.__ffbLineupCheckRunning) return;

  const runMarker = document.createElement('meta');
  runMarker.id = RUN_MARKER_ID;
  document.documentElement.appendChild(runMarker);
  window.__ffbLineupCheckRunning = true;

  // =========================================================
  // OPTIONAL CUSTOM LEAGUE ORDER / DISPLAY NAMES
  // Move these lines when you reorder leagues.
  // For a generic/public copy, set this to: const LEAGUE_ORDER = [];
  // =========================================================
  const LEAGUE_ORDER = [];

  const APP_VERSION = '1.0.42';
  const HIDE_OPTIMIZED_STORAGE_KEY = 'ffb-public-hide-optimized';
  // User-selected Chiefs photos, packed into a lightweight self-contained animated WebP slideshow.
  const MAHOMES_LOADING_SLIDESHOW = 'data:image/webp;base64,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';
  const UPDATE_INSTALL_URL = 'https://usafanthonyperry-spec.github.io/ffb-lineup-check/';
  const PUBLIC_USE_COUNT_KEY = 'ffb-public-use-counted-v1';
  const PUBLIC_USE_COUNTER_URL = 'https://hits.sh/usafanthonyperry-spec.github.io/ffb-lineup-check/public-checker-use.svg?label=public%20uses&color=54d17a';


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

  function getShortcutLatestVersion() {
    try {
      const latest = new URLSearchParams(location.search).get('ffb_latest')?.trim() || '';
      return /^\d+\.\d+\.\d+$/.test(latest) ? latest : '';
    } catch (_) {
      return '';
    }
  }

  function renderUpdateStatus() {
    const latest = getShortcutLatestVersion();
    if (!latest) return '';

    if (compareVersions(latest, APP_VERSION) > 0) {
      return `
        <div id="ffb-update-status" style="margin-top:3px;color:${COLORS.yellow};font-size:12px;font-weight:800;">
          <span>⬆️ Update available — v${escapeHTML(latest)}</span>
          <a href="https://usafanthonyperry-spec.github.io/ffb-lineup-check/FFB_Lineup_Check.user.js?v=${encodeURIComponent(latest)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-left:8px;color:${COLORS.yellow};text-decoration:underline;font-weight:800;">Install Update</a>
        </div>`;
    }

    return `
      <div id="ffb-update-status" style="margin-top:3px;color:${COLORS.green};font-size:12px;font-weight:700;">
        ✓ v${APP_VERSION} current
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

  function countPublicUseOnce() {
    try {
      if (localStorage.getItem(PUBLIC_USE_COUNT_KEY) === '1') return;
    } catch (_) {
      return;
    }

    const counter = document.createElement('img');
    counter.alt = '';
    counter.setAttribute('aria-hidden', 'true');
    counter.referrerPolicy = 'no-referrer';
    Object.assign(counter.style, {
      position: 'fixed',
      width: '1px',
      height: '1px',
      opacity: '0',
      pointerEvents: 'none'
    });

    counter.onload = () => {
      try {
        localStorage.setItem(PUBLIC_USE_COUNT_KEY, '1');
      } catch (_) {}
      counter.remove();
    };

    counter.onerror = () => counter.remove();
    counter.src = PUBLIC_USE_COUNTER_URL;
    document.body.appendChild(counter);
  }

  function showBanner(message, showMahomes = false) {
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
        width: '96%',
        maxWidth: '720px',
        padding: '11px 15px',
        borderRadius: '12px',
        border: `1px solid ${COLORS.border}`,
        fontSize: '15px',
        fontWeight: '600',
        textAlign: 'center',
        boxShadow: '0 6px 20px rgba(0,0,0,.4)',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        overflow: 'hidden'
      });

      const status = document.createElement('div');
      status.id = 'ffb-check-banner-status';
      banner.appendChild(status);
      document.body.appendChild(banner);
    }

    const status = document.getElementById('ffb-check-banner-status');
    if (status) status.textContent = message;

    if (showMahomes && !document.getElementById('ffb-mahomes-slideshow')) {
      Object.assign(banner.style, {
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: '94dvh',
        maxHeight: '94dvh',
        padding: '0',
        borderRadius: '16px',
        background: '#050506'
      });

      if (status) {
        Object.assign(status.style, {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '2',
          padding: '14px 16px',
          fontSize: '16px',
          fontWeight: '800',
          textAlign: 'center',
          background: 'linear-gradient(rgba(0,0,0,.86), rgba(0,0,0,.46), transparent)',
          textShadow: '0 2px 5px rgba(0,0,0,.9)'
        });
      }

      const slideshow = document.createElement('img');
      slideshow.id = 'ffb-mahomes-slideshow';
      slideshow.alt = 'Chiefs championship loading slideshow';
      slideshow.src = MAHOMES_LOADING_SLIDESHOW;

      Object.assign(slideshow.style, {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        background: '#050506'
      });

      slideshow.onerror = () => {
        slideshow.remove();
        Object.assign(banner.style, {
          top: '14px',
          transform: 'translateX(-50%)',
          height: 'auto',
          maxHeight: 'none',
          padding: '11px 15px'
        });
        if (status) {
          Object.assign(status.style, {
            position: 'static',
            padding: '0',
            background: 'none',
            textShadow: 'none'
          });
        }
      };

      banner.insertBefore(slideshow, banner.firstChild);
    }
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

  function lineupFingerprint(lineup) {
    return (lineup || [])
      .map(item => `${item.slotKey || item.slot}:${item.player}`)
      .join('|');
  }

  async function syncTeamAndWait(syncButton, timeoutMs = 9000) {
    if (!syncButton) return;

    const beforeFingerprint = lineupFingerprint(getLineup('current'));
    const startedAt = Date.now();
    let lastFingerprint = beforeFingerprint;
    let lastFingerprintChangedAt = startedAt;

    syncButton.click();

    while (Date.now() - startedAt < timeoutMs) {
      await sleep(250);

      const current = getLineup('current');
      const suggested = getLineup('optimized');
      if (!current.length || !suggested.length) continue;

      const now = Date.now();
      const elapsed = now - startedAt;
      const currentFingerprint = lineupFingerprint(current);

      // Only real player/slot data changes count as a refresh. Cosmetic DOM
      // redraws, highlights, spinners, and attribute mutations are ignored.
      if (currentFingerprint !== lastFingerprint) {
        lastFingerprint = currentFingerprint;
        lastFingerprintChangedAt = now;
      }

      const changedFromBefore = currentFingerprint !== beforeFingerprint;
      const fingerprintStableFor = now - lastFingerprintChangedAt;

      const liveSyncButton = Array.from(document.querySelectorAll('button'))
        .find(b => b.innerText.trim() === 'Sync Team');

      const buttonBusy = Boolean(
        liveSyncButton?.disabled
        || liveSyncButton?.getAttribute('aria-busy') === 'true'
        || /syncing|loading|updating/i.test(liveSyncButton?.innerText || '')
      );

      // If the synced Current lineup actually changed, require that exact
      // player/slot fingerprint to remain stable before using it.
      if (changedFromBefore && fingerprintStableFor >= 750 && !buttonBusy && elapsed >= 1200) {
        return;
      }

      // If the lineup is already synced and therefore never changes, ignore
      // cosmetic redraws completely and wait the full fallback period.
      if (!changedFromBefore && !buttonBusy && elapsed >= 5000) {
        return;
      }
    }
  }

  function getLineupChanges(current, suggested) {
    const currentMap = new Map(current.map(x => [x.player, x]));
    const suggestedMap = new Map(suggested.map(x => [x.player, x]));

    const starts = suggested.filter(x => !currentMap.has(x.player));
    const sits = current.filter(x => !suggestedMap.has(x.player));

    // Repeated position labels (WR, RB, FLEX, etc.) are interchangeable.
    // Preserve every player who remains inside the same slot TYPE first, then
    // fill only the slots actually vacated by players leaving that group.
    // This avoids bogus instructions like replacing WR 2 when WR 2's player
    // simply slides to WR 3 and still belongs in the starting lineup.
    const slotTypes = [...new Set(suggested.map(x => x.slot))];
    let slotChanges = [];

    for (const slot of slotTypes) {
      const currentGroup = current.filter(x => x.slot === slot);
      const suggestedGroup = suggested.filter(x => x.slot === slot);

      const currentPlayers = new Set(currentGroup.map(x => x.player));
      const suggestedPlayers = new Set(suggestedGroup.map(x => x.player));

      const entrants = suggestedGroup.filter(x => !currentPlayers.has(x.player));
      const departures = currentGroup.filter(x => !suggestedPlayers.has(x.player));

      for (let i = 0; i < entrants.length; i++) {
        const entrant = entrants[i];
        const previous = departures[i] || null;

        slotChanges.push({
          // The actionable slot is the CURRENT slot being vacated, not the
          // optimized row number. Example: if Waddle leaves current WR 3 for
          // FLEX, Tee should be placed into WR 3 even if FFB displays Tee as WR 2.
          slot: previous?.slotLabel || entrant.slotLabel || entrant.slot,
          player: entrant.player,
          kickoff: entrant.kickoff,
          previousPlayer: previous?.player || '',
          previousSlot: previous?.slotLabel || previous?.slot || ''
        });
      }
    }

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
      width: '96%',
      maxWidth: '720px',
      maxHeight: '96dvh',
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
    const attentionCount = lineupCount + spotCount + errorCount;

    drawWrapped('🏈 Fantasy Lineup Check v1.0.42', PAD, INNER_W, COLORS.text, 700, 30, 39);
    y += 6;
    drawWrapped(`${model.checkedCount} of ${model.teamCount} leagues checked`, PAD, INNER_W, COLORS.muted, 400, 21, 29);
    if (model.checkedAt) {
      drawWrapped(`Checked ${model.checkedAt}`, PAD, INNER_W, COLORS.muted, 400, 18, 26);
    }
    if (attentionCount) {
      drawWrapped(`⚠️ ${attentionCount} league${attentionCount === 1 ? '' : 's'} need attention`, PAD, INNER_W, COLORS.yellow, 700, 19, 27);
    }

    const summarySegments = [];
    const addSummaryPart = (text, color, weight = 700) => {
      if (summarySegments.length) {
        summarySegments.push({ text: ' • ', color: COLORS.muted, weight: 400 });
      }
      summarySegments.push({ text, color, weight });
    };

    const allClear = !lineupCount && !spotCount && !errorCount && optimizedCount > 0;

    if (allClear) {
      addSummaryPart('✅ All leagues optimized', COLORS.green);
    } else {
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

  function formatCheckedAt(value = new Date()) {
    const date = value instanceof Date ? value : new Date(value);

    try {
      return date.toLocaleString([], {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (_) {
      return date.toLocaleString();
    }
  }

  function buildTextSummary(model) {
    const lineupCount = model.leagues.filter(x => x.status === 'lineup').length;
    const spotCount = model.leagues.filter(x => x.status === 'spot').length;
    const optimizedCount = model.leagues.filter(x => x.status === 'optimized').length;
    const errorCount = model.leagues.filter(x => x.status === 'error').length;
    const attentionCount = lineupCount + spotCount + errorCount;

    const allClear = !lineupCount && !spotCount && !errorCount && optimizedCount > 0;
    const counts = allClear
      ? '✅ All leagues optimized'
      : [
          lineupCount ? `🔴 ${lineupCount} lineup ${lineupCount === 1 ? 'change' : 'changes'}` : '',
          spotCount ? `🟡 ${spotCount} Spot Start${spotCount === 1 ? '' : 's'}` : '',
          optimizedCount ? `🟢 ${optimizedCount} optimized` : '',
          errorCount ? `⚠️ ${errorCount} couldn't verify` : ''
        ].filter(Boolean).join(' • ');

    const lines = [
      `🏈 Fantasy Lineup Check v1.0.42`,
      `${model.checkedCount} of ${model.teamCount} leagues checked`,
      model.checkedAt ? `Checked ${model.checkedAt}` : '',
      attentionCount ? `⚠️ ${attentionCount} league${attentionCount === 1 ? '' : 's'} need attention` : '',
      counts,
      ''
    ];

    for (const league of model.leagues) {
      if (league.status === 'optimized') {
        lines.push(`🟢 ${league.league} — Optimized`, '');
        continue;
      }

      if (league.status === 'error') {
        lines.push(`⚠️ ${league.league} — Couldn't verify`);
        if (league.error) lines.push(league.error);
        lines.push('');
        continue;
      }

      lines.push(
        `${league.status === 'lineup' ? '🔴' : '🟡'} ${league.league} — ${league.status === 'lineup' ? 'Lineup changes' : 'Spot Starts'}`
      );

      for (const change of (league.slotChanges || [])) {
        lines.push(`SET ${change.slot} → ${change.player}${change.previousPlayer ? ` (was ${change.previousPlayer})` : ''}`);
      }

      for (const sit of (league.sits || [])) {
        lines.push(`BENCH ${sit.player}`);
      }

      for (const rec of (league.spotStarts || [])) {
        const delta = rec.delta != null ? ` +${rec.delta.toFixed(1)} pts` : '';
        const verb = ['D', 'K'].includes(rec.current.position) ? 'REPLACE' : 'START OVER';
        lines.push(`ADD ${rec.add.player} (${rec.add.position}) — ${verb} ${rec.current.player}${delta}`);
      }

      lines.push('');
    }

    if (model.globalErrors?.length) {
      lines.push('OTHER ERRORS');
      for (const error of model.globalErrors) lines.push(error);
    }

    return lines.filter((line, index, arr) =>
      line !== '' || (index > 0 && arr[index - 1] !== '')
    ).join('\n').trim();
  }

  async function copySummary(model, button) {
    const oldText = button.textContent;
    const summary = buildTextSummary(model);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        textarea.setAttribute('readonly', '');
        Object.assign(textarea.style, {
          position: 'fixed',
          opacity: '0',
          pointerEvents: 'none'
        });
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      button.textContent = '✅ Summary Copied';
      setTimeout(() => { button.textContent = oldText; }, 1800);
    } catch (error) {
      console.error('Copy summary failed:', error);
      button.textContent = 'Copy Failed — Try Again';
      setTimeout(() => { button.textContent = oldText; }, 2200);
    }
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

    if (shareModel) {
      const copy = makeButton('📋 Copy Summary', COLORS.card2);
      copy.onclick = () => copySummary(shareModel, copy);
      results.appendChild(copy);

      const share = makeButton('📤 Share Results', COLORS.card2);
      share.onclick = () => shareResults(shareModel, share);
      results.appendChild(share);

      const feedback = document.createElement('div');
      Object.assign(feedback.style, {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginTop: '10px'
      });

      const makeFeedbackLink = (text, href) => {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        Object.assign(link.style, {
          display: 'block',
          boxSizing: 'border-box',
          padding: '11px 8px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: '600',
          borderRadius: '10px',
          border: `1px solid ${COLORS.border}`,
          background: COLORS.card,
          color: COLORS.text,
          textDecoration: 'none'
        });
        return link;
      };

      feedback.appendChild(makeFeedbackLink(
        '💡 Suggest',
        'https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=feature_request.yml'
      ));
      feedback.appendChild(makeFeedbackLink(
        '🐛 Report Bug',
        'https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=bug_report.yml'
      ));
      results.appendChild(feedback);
    }

    const done = makeButton('Done', COLORS.card);
    done.onclick = () => results.remove();
    results.appendChild(done);
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
      showBanner(`🏈 Checking ${i + 1} of ${teamCount}: ${rawLeagueName}`, true);

      if (!sleeperURL) sleeperURL = getCurrentSleeperURL();

      const syncButton = Array.from(document.querySelectorAll('button'))
        .find(b => b.innerText.trim() === 'Sync Team');

      if (syncButton) {
        await syncTeamAndWait(syncButton);
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
    const attentionCount = lineupCount + spotCount + errorCount;
    const checkedAt = formatCheckedAt();

    removeBanner();
    const results = createResultsBox();

    const headerParts = [];
    const allClear = !lineupCount && !spotCount && !errorCount && optimizedCount > 0;

    if (allClear) {
      headerParts.push(`<span style="color:${COLORS.green};font-weight:800;">✅ All leagues optimized</span>`);
    } else {
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
    }

    const headerStatus = `
      <div style="margin-top:6px;line-height:1.55;">
        ${headerParts.join(`<span style="color:${COLORS.muted};font-weight:400;"> • </span>`)}
      </div>`;

    const showOptimizedToggle = optimizedCount > 0 && optimizedCount < sortedLeagueResults.length;
    let optimizedHiddenPreference = false;
    try {
      optimizedHiddenPreference = localStorage.getItem(HIDE_OPTIMIZED_STORAGE_KEY) === '1';
    } catch (_) {}

    const optimizedToggleHTML = showOptimizedToggle
      ? `
        <button id="ffb-toggle-optimized" type="button" style="width:100%;margin-top:8px;padding:9px 11px;font-size:13px;font-weight:700;border-radius:9px;border:1px solid ${COLORS.border};background:${COLORS.card2};color:${COLORS.text};">
          ${optimizedHiddenPreference ? '👀 Show' : '🙈 Hide'} ${optimizedCount} Optimized
        </button>`
      : '';

    let html = `
      <div id="ffb-sticky-summary" style="position:sticky;top:-18px;z-index:5;margin:-18px -18px 0;padding:13px 18px 11px;background:${COLORS.bg};border-bottom:1px solid ${COLORS.border};box-shadow:0 5px 12px rgba(0,0,0,.24);">
        <div style="font-size:16px;font-weight:800;">🏈 Fantasy Lineup Check</div>
        ${renderUpdateStatus()}
        ${attentionCount ? `<div style="margin-top:5px;color:${COLORS.yellow};font-size:14px;font-weight:800;">⚠️ ${attentionCount} league${attentionCount === 1 ? '' : 's'} need attention</div>` : ''}
        ${headerStatus}
        ${optimizedToggleHTML}
      </div>
      <div style="margin-top:12px;color:${COLORS.muted};">${checkedCount} of ${teamCount} leagues checked</div>
      <div style="margin-top:2px;color:${COLORS.muted};font-size:13px;">Checked ${escapeHTML(checkedAt)}</div>`;

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

    const toggleOptimized = results.querySelector('#ffb-toggle-optimized');
    if (toggleOptimized) {
      const optimizedCards = Array.from(results.querySelectorAll('[data-ffb-status="optimized"]'));
      let optimizedHidden = optimizedHiddenPreference;

      const applyOptimizedVisibility = () => {
        for (const card of optimizedCards) {
          card.style.display = optimizedHidden ? 'none' : 'flex';
        }

        toggleOptimized.textContent = optimizedHidden
          ? `👀 Show ${optimizedCards.length} Optimized`
          : `🙈 Hide ${optimizedCards.length} Optimized`;
      };

      applyOptimizedVisibility();

      toggleOptimized.onclick = () => {
        optimizedHidden = !optimizedHidden;

        try {
          localStorage.setItem(HIDE_OPTIMIZED_STORAGE_KEY, optimizedHidden ? '1' : '0');
        } catch (_) {}

        applyOptimizedVisibility();
      };
    }

    const shareModel = {
      checkedCount,
      teamCount,
      checkedAt,
      leagues: sortedLeagueResults,
      globalErrors
    };

    addButtons(results, sleeperURL, shareModel);
    document.body.appendChild(results);

    if (checkedCount > 0) countPublicUseOnce();

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
    runMarker.remove();
  }
})();