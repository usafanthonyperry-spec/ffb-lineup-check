# FFB Fantasy Lineup Check

An iPhone/Safari helper for The Fantasy Footballers Ultimate Dashboard. It checks every synced league for lineup changes, FLEX/SFLEX placement, Spot Starts, and already-optimized leagues.

**Current release: v1.0.22 — Sep 29, 2026**

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
- **💡 Suggest** and **🐛 Report Bug** links inside completed results.

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

## Maintainer release checklist

For each new release:

1. Update `@version` in the public and Perry userscripts and metadata files.
2. Update `version.json`, `personal/version.json`, and `latest.txt`.
3. Update the visible version/date and **What's New** text on the installer pages.
4. Update these release notes if behavior changed.
5. Let GitHub Pages finish deploying before sharing fresh installer links.

Creator-only test Shortcut:

https://www.icloud.com/shortcuts/ab546ef8217c4af0b3c37d2f57218ecc

This test Shortcut is not required by public users.
