# FFB Fantasy Lineup Check

An iPhone/Safari helper for The Fantasy Footballers Ultimate Dashboard. It checks every synced league for lineup changes, FLEX/SFLEX placement, Spot Starts, and already-optimized leagues.

**Current release: v1.0.25 — Sep 29, 2026**

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
- Shows red/yellow/green status counts.
- Shows the time the scan finished.
- **📋 Copy Summary** creates a paste-ready text report.
- **📤 Share Results** creates one full-length PNG.
- **Open Sleeper**, **Run Again**, and **Done** controls.
- **🙈 Hide Optimized / 👀 Show Optimized** directly under the top status summary on mixed reports.
- **✅ All leagues optimized** summary when every verified league is clean.
- **💡 Suggest** and **🐛 Report Bug** links inside completed results.
- Counts the first successful public checker run from each browser so public adoption can be estimated.

## v1.0.25 changes

- Moves **Hide Optimized** from the bottom controls to directly under the top status summary.
- The button now includes the optimized count, for example **🙈 Hide 12 Optimized** and **👀 Show 12 Optimized**.
- It still appears only on mixed reports, and remains display-only.
- Core lineup comparison, Spot Starts, copied summaries, and shared images are unchanged.

## Public usage counter

v1.0.23 adds a lightweight counter for the public build only. After a browser completes its first successful public lineup scan, the checker sends one counter hit and stores a local flag so future runs from that browser are not counted again.

No league names, players, Sleeper IDs, passwords, lineup data, IP addresses, cookies, or user-agent strings are used by the counter service. The Perry/private build does not send this counter.

Usage statistics:

https://hits.sh/usafanthonyperry-spec.github.io/ffb-lineup-check/public-checker-use/

## Shared Shortcuts

- Fantasy Lineup Check: https://www.icloud.com/shortcuts/f0960e18c6384788899421a848e70e29
- Check FFB Rankings: https://www.icloud.com/shortcuts/dd78ca052ecd4d98979dd2f810dced70

The main Shortcut checks `latest.txt`, shows the latest available checker version, then opens the Ultimate Dashboard. The userscript does the actual lineup scan.

## Updates

When the Shortcut shows a newer version than the version in the checker header, open the public installer and reinstall the checker.

The public installer URL does not change between releases.

## Feedback

- Suggest an improvement: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=feature_request.yml
- Report a bug: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=bug_report.yml

Suggestions and bug reports are reviewed before changes are released.

## Source visibility

The public userscript source is intentionally visible because users install it from this public repository. Personal configurations and developer-only files are kept outside the public release.
