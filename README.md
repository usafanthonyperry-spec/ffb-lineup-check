# FFB Fantasy Lineup Check — v1.0 Public Release

## Public install links

- Main Lineup Checker shortcut: https://www.icloud.com/shortcuts/adca0aeb39b343f0917c4203f39c1cec
- Rankings Alert shortcut: https://www.icloud.com/shortcuts/8ea889e931c843f382dc3dc63a59c70e

## Creator-only shortcut

- Write FFB Test Script: https://www.icloud.com/shortcuts/8e97c997f26a4ffcaf60ab44d51b8c3e

Do **not** put the Write FFB Test Script shortcut on the public 3-tap page. It is for development/testing.

## Planned GitHub repository

Owner: `usafanthonyperry-spec`
Repository: `-ffb-lineup-check`

Expected GitHub Pages site:

`https://usafanthonyperry-spec.github.io/-ffb-lineup-check/`

Expected userscript URL:

`https://usafanthonyperry-spec.github.io/-ffb-lineup-check/FFB_Lineup_Check.user.js`

The public userscript is already configured with those update/download URLs.

## Files to publish at repository root

- `index.html`
- `FFB_Lineup_Check.user.js`
- `FFB_Lineup_Check.meta.js`
- `README.md`

## GitHub Pages

Create a PUBLIC repository named `-ffb-lineup-check`, put these files on the default branch, then enable GitHub Pages for the repository root/default branch.

## Three-button user flow

1. Install Userscripts.
2. Install `FFB_Lineup_Check.user.js`.
3. Add the Fantasy Lineup Check iCloud Shortcut.

Apple still requires the one-time Safari extension permission. That cannot be silently granted.

## Updating later

Increment `@version` in BOTH:

- `FFB_Lineup_Check.user.js`
- `FFB_Lineup_Check.meta.js`

Then publish both files to the same URLs.