# FFB Fantasy Lineup Check — v1.0 Public Release

## Full user setup guide

[Open the complete step-by-step installation and usage guide](./INSTALL.md)

## Public install links

- Public installer: https://usafanthonyperry-spec.github.io/ffb-lineup-check/
- Lightweight Lineup Checker shortcut: https://www.icloud.com/shortcuts/bb0562b4d9c64aa1b50921dc7ed48b32
- Rankings Alert shortcut: https://www.icloud.com/shortcuts/8ea889e931c843f382dc3dc63a59c70e

The main lineup launcher is intentionally a simple two-action Apple Shortcut: **URL → Open URLs**. It contains no checker JavaScript.

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
3. Add the lightweight **Fantasy Lineup Check** shared Shortcut: https://www.icloud.com/shortcuts/bb0562b4d9c64aa1b50921dc7ed48b32

The launcher contains only:
- **URL** → `https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/`
- **Open URLs**

The launcher should contain no JavaScript. Apple still requires the one-time Safari extension permission. That cannot be silently granted.

## Updating later

Increment `@version` in BOTH:

- `FFB_Lineup_Check.user.js`
- `FFB_Lineup_Check.meta.js`

Then publish both files to the same URLs.

## Update notifications

The launcher page always displays the latest published release number briefly before redirecting to the Ultimate Dashboard. Users can compare that number with the version in their checker header and reinstall from the public installer when their installed version is lower.
