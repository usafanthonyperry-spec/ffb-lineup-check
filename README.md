# FFB Fantasy Lineup Check — v1.0 Public Release

## Current release — v1.0.20

- Red, yellow, and green summary counts now match each league's status.
- Fully optimized green leagues use compact cards so action items are easier to scan.
- Shared result images use the same colored summary and compact optimized layout.

## Full user setup guide

[Open the complete step-by-step installation and usage guide](./INSTALL.md)

## Public install links

- Public installer: https://usafanthonyperry-spec.github.io/ffb-lineup-check/
- Fantasy Lineup Check shortcut: https://www.icloud.com/shortcuts/f0960e18c6384788899421a848e70e29
- Rankings Alert shortcut: https://www.icloud.com/shortcuts/dd78ca052ecd4d98979dd2f810dced70

The main lineup Shortcut does not contain the checker JavaScript. It checks `latest.txt`, shows the latest available version in a notification, then opens the Fantasy Footballers Ultimate Dashboard. Userscripts runs the checker automatically.

## Creator-only shortcut

- Write FFB Test Script: https://www.icloud.com/shortcuts/ab546ef8217c4af0b3c37d2f57218ecc

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
3. Add the **Fantasy Lineup Check** shared Shortcut: https://www.icloud.com/shortcuts/f0960e18c6384788899421a848e70e29

The Shortcut:
- Reads `https://usafanthonyperry-spec.github.io/ffb-lineup-check/latest.txt`
- Shows the latest available FFB version in a notification
- Opens `https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/`

The Shortcut contains no checker JavaScript. Apple still requires the one-time Safari extension permission. That cannot be silently granted.

## Updating later

For every release:

1. Increment `@version` in BOTH:
   - `FFB_Lineup_Check.user.js`
   - `FFB_Lineup_Check.meta.js`
2. Update `latest.txt` to the same version number.
3. Update the visible version number on the installer page.
4. Publish the files to the same URLs.

The Shortcut reads `latest.txt`, so updating that file is what makes the newest release number appear in users' notifications.

## Update notifications

The main **Fantasy Lineup Check** Shortcut reads `latest.txt` every time it runs and shows the latest published version in an iPhone notification before opening the Ultimate Dashboard.

Users compare that number with the version shown in the checker header. If the installed checker is older, they reinstall from the public setup page.


## Feedback and bug reports

Public users can submit reviewed suggestions and bug reports through GitHub Issues:

- Suggest an improvement: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=feature_request.yml
- Report a bug: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=bug_report.yml

Submitted ideas should be reviewed before implementation. Approved changes can then be tested, versioned, and released through the normal update process.
