# FFB Fantasy Lineup Check — v1.0 Public Release

## Full user setup guide

[Open the complete step-by-step installation and usage guide](./INSTALL.md)

## Public install links

- Public installer: https://usafanthonyperry-spec.github.io/ffb-lineup-check/
- Rankings Alert shortcut: https://www.icloud.com/shortcuts/8ea889e931c843f382dc3dc63a59c70e

The main lineup launcher is now intentionally built as a simple two-action Apple Shortcut: **URL → Open URLs**. Do not use the old giant shared lineup shortcut.

## Creator-only shortcut

- Write FFB Test Script: https://www.icloud.com/shortcuts/8e97c997f26a4ffcaf60ab44d51b8c3e

Do **not** put the Write FFB Test Script shortcut on the public 3-tap page. It is for development/testing.

## Planned GitHub repository

Owner: `usafanthonyperry-spec`
Repository: `ffb-lineup-check`

Expected GitHub Pages site:

`https://usafanthonyperry-spec.github.io/ffb-lineup-check/`

Expected userscript URL:

`https://usafanthonyperry-spec.github.io/ffb-lineup-check/FFB_Lineup_Check.user.js`

The public userscript is already configured with those update/download URLs.

## Files to publish at repository root

- `index.html`
- `FFB_Lineup_Check.user.js`
- `FFB_Lineup_Check.meta.js`
- `README.md`

## GitHub Pages

Create a PUBLIC repository named `ffb-lineup-check`, put these files on the default branch, then enable GitHub Pages for the repository root/default branch.

## User setup flow

1. Install Userscripts.
2. Install `FFB_Lineup_Check.user.js`.
3. Create a new Apple Shortcut named **Fantasy Lineup Check** with:
   - **URL** → `https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/`
   - **Open URLs**

The launcher should contain no JavaScript. Apple still requires the one-time Safari extension permission. That cannot be silently granted.

## Updating later

Increment `@version` in BOTH:

- `FFB_Lineup_Check.user.js`
- `FFB_Lineup_Check.meta.js`

Then publish both files to the same URLs.