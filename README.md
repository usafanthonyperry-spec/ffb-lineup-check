# FFB Fantasy Lineup Check

An iPhone/Safari helper for The Fantasy Footballers Ultimate Dashboard. It checks every synced league for lineup changes, FLEX/SFLEX placement, Spot Starts, and already-optimized leagues.

**Current release: v1.0.32 — Sep 30, 2026**

## Install

Use the public installer:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

The normal setup is:

1. Install and enable **Userscripts** for Safari.
2. Install **FFB Fantasy Lineup Check** from the public installer.
3. Add the shared **Fantasy Lineup Check** Shortcut.
4. Sign into The Fantasy Footballers in Safari and make sure your leagues are synced in Ultimate Dashboard.
5. Run the Shortcut.

For screenshots, troubleshooting, and first-run details, see [INSTALL.md](./INSTALL.md).

## What the results mean

- **Red** — lineup changes are still needed.
- **Yellow** — the lineup is set, but Spot Starts are available.
- **Green** — the lineup is set and there are no Spot Starts to consider.
- **Couldn't Verify** — the checker could not reliably read that league.

Fully optimized green leagues use compact cards so action items stand out.

Numbered slots inside the same position are treated as equivalent. A player already in **WR 2** does not need to move to **WR 1**, for example. Real position changes such as **WR → FLEX** can still be shown when they matter.

## Current features

- Checks every synced Ultimate Dashboard league.
- Detects lineup changes and useful FLEX/SFLEX placement changes.
- Reads Spot Starts and hides projected gains that round to +0.0.
- Shows a top **Needs Attention** count plus red/yellow/green status counts.
- Shows the time the scan finished.
- **📋 Copy Summary** creates a paste-ready text report.
- **📤 Share Results** creates one full-length PNG.
- **Open Sleeper**, **Run Again**, and **Done** controls.
- A compact sticky top summary stays visible while you scroll mixed/long reports.
- That sticky summary can show whether the installed checker is current or has an update available when the Shortcut passes the latest version into the Dashboard URL.
- **🙈 Hide Optimized / 👀 Show Optimized** stays in that top summary and remembers your last choice for future runs.
- **✅ All leagues optimized** summary when every verified league is clean.
- **💡 Suggest** and **🐛 Report Bug** links inside completed results.
- Counts the first successful public checker run from each browser so public adoption can be estimated.

## v1.0.32 changes

- Simplifies the sticky title to **🏈 Fantasy Lineup Check**; the current version remains directly underneath in the **✓ current / ⬆️ Update available** status line.
- Updates the shared **Fantasy Lineup Check** and **Check FFB Rankings** Shortcut links.
- Sticky behavior, remembered **Hide Optimized / Show Optimized** preference, lineup comparison, and Spot Starts logic are unchanged.

## v1.0.31 changes

- Removes the old one-time **✅ Updated to vX.X.X** banner from the body of the results.
- The sticky header remains the single version-status location, showing **✓ current** or **⬆️ Update available** from the Shortcut-provided `ffb_latest` value.
- Sticky header behavior, remembered **Hide Optimized / Show Optimized** preference, lineup comparison, and Spot Starts logic are unchanged.

## v1.0.30 changes

- Publishes the next real release after the v1.0.29 Shortcut version-handoff work.
- Keeps the sticky header and remembered **Hide Optimized / Show Optimized** behavior unchanged.
- No lineup-comparison or Spot Starts logic changes.

## v1.0.29 changes

- Replaces the failed direct web request from v1.0.28 with a Shortcut-to-checker version handoff.
- The Shortcut still reads `latest.txt`, then opens Ultimate Dashboard with the latest version attached as `ffb_latest`.
- The sticky header reads that value locally and shows **✓ v1.0.29 current** or **⬆️ Update available — vX.X.X** with an **Install Update** link.
- If the Shortcut does not pass `ffb_latest`, the update line stays hidden and the lineup checker works normally.
- Core lineup comparison and Spot Starts logic are unchanged.

## Public usage counter

v1.0.23 adds a lightweight counter for the public build only. After a browser completes its first successful public lineup scan, the checker sends one counter hit and stores a local flag so future runs from that browser are not counted again.

No league names, players, Sleeper IDs, passwords, lineup data, IP addresses, cookies, or user-agent strings are used by the counter service. The Perry/private build does not send this counter.

Usage statistics:

https://hits.sh/usafanthonyperry-spec.github.io/ffb-lineup-check/public-checker-use/

## Shared Shortcuts

- Fantasy Lineup Check: https://www.icloud.com/shortcuts/5bc97e0ba2c0430788bae3c006ec9632
- Check FFB Rankings: https://www.icloud.com/shortcuts/c3d40660dff545209949c77315b08b91

The main Shortcut checks `latest.txt`, shows the latest available checker version, then opens the Ultimate Dashboard. For the in-checker update status, the Dashboard URL should include `?ffb_latest=[Contents of URL]`, using the same version value returned by `latest.txt`. The userscript does the actual lineup scan.

## Updates

When the Shortcut shows a newer version than the version in the checker header, open the public installer and reinstall the checker.

The public installer URL does not change between releases.

## Feedback

- Suggest an improvement: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=feature_request.yml
- Report a bug: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=bug_report.yml

Suggestions and bug reports are reviewed before changes are released.

## Source visibility

The public userscript source is intentionally visible because users install it from this public repository. Personal configurations and developer-only files are kept outside the public release.
