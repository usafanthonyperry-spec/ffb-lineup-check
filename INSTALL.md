# FFB Fantasy Lineup Check — Full iPhone Setup Guide

This guide walks through the complete setup from a fresh iPhone.

## What this does

FFB Fantasy Lineup Check opens The Fantasy Footballers Ultimate Dashboard and checks every synced league for:

- Current lineup vs. suggested lineup changes
- START → BENCH swaps
- FLEX / SFLEX placement changes
- Spot Starts recommendations
- Leagues that are already optimized

It also creates one full-length shareable results image.

> This tool does **not** automatically change your Sleeper lineup or add/drop players. You review the recommendations and make the changes yourself.

---

## What you need

Before starting, make sure you have:

- An iPhone using Safari
- Access to The Fantasy Footballers Ultimate Dashboard
- Your fantasy teams imported into the Ultimate Dashboard
- The Apple Shortcuts app

Public setup page:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

---

# Step 1 — Install Userscripts

1. Open the public setup page in **Safari**.
2. Tap **Install Userscripts**.
3. Install the Userscripts app from the App Store.
4. Open Userscripts once after installation.

Userscripts is the Safari extension that allows the lineup checker to run on the Fantasy Footballers website.

---

# Step 2 — Enable the Safari extension

After Userscripts is installed:

1. Open **Settings** on your iPhone.
2. Go to **Apps → Safari → Extensions**.
3. Tap **Userscripts**.
4. Turn the extension **On**.
5. Allow it to run on **thefantasyfootballers.com**.

Apple requires this permission. The installer cannot grant it automatically.

If the checker does nothing later, this is the first setting to verify.

---

# Step 3 — Install FFB Lineup Checker

Return to:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

Then:

1. Tap **Install FFB Lineup Checker**.
2. Safari will open the userscript file.
3. Open Safari's **Extensions** menu.
4. Tap **Userscripts**.
5. Choose the option to install **FFB Fantasy Lineup Check**.
6. Confirm the installation.

The installed script is:

`FFB_Lineup_Check.user.js`

Do not install multiple copies of the checker. Two active copies can cause duplicate scans or duplicate result windows.

---

# Step 4 — Add the Fantasy Lineup Check Shortcut

Return to the public setup page and tap **Add Fantasy Lineup Check Shortcut**.

Apple will open the shared Shortcut. Tap **Add Shortcut**.

Shared Shortcut:

https://www.icloud.com/shortcuts/f0960e18c6384788899421a848e70e29

The Shortcut does four things:

1. Checks the current published version from:
   `https://usafanthonyperry-spec.github.io/ffb-lineup-check/latest.txt`
2. Shows a notification with the **latest available FFB version**.
3. Opens:
   `https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/`
4. Userscripts automatically runs the installed checker on the Dashboard.

The version notification is informational. Compare it with the version shown at the top of the checker results. If the Shortcut says a newer version is available than the one installed on your phone, return to the public setup page and reinstall the checker.

# Step 5 — Prepare your Fantasy Footballers account

Before your first scan:

1. Sign into The Fantasy Footballers in Safari.
2. Open the **Ultimate Dashboard**.
3. Open **Manage Teams**.
4. Make sure all leagues you want checked are imported/synced.

The checker discovers your leagues dynamically.

You do **not** need to enter:

- Sleeper username
- Sleeper password
- League IDs
- Number of leagues

If you add or remove leagues later, the checker automatically uses whatever real teams are currently available in the Dashboard.

---

# Step 6 — Run your first lineup check

Open the Shortcuts app and tap:

**🏈 Fantasy Lineup Check**

Or add that Shortcut to your Home Screen / Action Button if you want faster access.

Safari will open the Ultimate Dashboard.

You should see messages such as:

- `🏈 Loading Fantasy Dashboard…`
- `🏈 Checking 1 of 11: League Name`
- `🏈 Checking 2 of 11: League Name`

The checker ignores the Dashboard's **- Select a Team -** placeholder and only scans actual teams.

For each league it:

1. Loads the league.
2. Syncs the team when possible.
3. Reads the current starting lineup.
4. Reads the Fantasy Footballers suggested lineup.
5. Compares the two.
6. Detects lineup changes.
7. Detects FLEX / SFLEX placement changes.
8. Reads Spot Starts.
9. Builds the league's result card.

---

# Step 7 — Read the results

Every successfully checked league receives a card.

The card color tells you what still needs attention:

- **Red** — lineup changes are still needed.
- **Yellow** — the lineup itself matches the optimizer, but one or more Spot Starts are available.
- **Green** — the lineup matches the optimizer and there are no Spot Starts changes to consider.

The summary at the top uses the same red/yellow/green colors. Fully optimized green leagues are intentionally compact so leagues that still need action are easier to scan. The shareable results image uses the same color system and compact optimized cards.

## Optimized league

An optimized league looks like:

**✓ OPTIMIZED**

**No lineup or Spot Starts changes needed.**

That means the checker did not find a Fantasy Footballers lineup change, FLEX/SFLEX move, or higher-projected Spot Start recommendation.

## Lineup change

Example:

**START Player A (WR) → BENCH Player B (FLEX)**

This means Fantasy Footballers' suggested starting lineup contains Player A instead of Player B.

## FLEX / SFLEX move

Example:

**FLEX Move Player A → FLEX**  
**Player B → RB • Sun 7:20 PM**

This means the suggested lineup uses the same players but places them in different eligible lineup slots.

Numbered spots inside the same position are treated as equivalent. For example, **WR 2 → WR 1**, **RB 2 → RB 1**, or **FLEX 2 → FLEX 1** is not shown as a required change because those numbered slots are functionally the same.

## Spot Starts

Example:

**ADD Green Bay Packers (D)**  
**REPLACE Kansas City Chiefs • +1.2 pts**

For normal skill-position players, you may see:

**ADD Player A (WR)**  
**START OVER Player B • +2.4 pts**

Spot Starts identifies a higher-projected available option. It does not independently decide which bench player you should drop to complete a waiver claim.

---

# Step 8 — Use the buttons at the bottom

The results window includes:

## Open Sleeper

Uses the Sleeper link exposed by the Fantasy Footballers Dashboard.

## 🔄 Run Again

Reloads the Dashboard and starts a fresh scan.

Use this after making lineup or roster changes if you want to check everything again.

## Done

Closes the results window.

## 📋 Copy Summary

Copies a text version of the report to your clipboard. It includes the checked time, color-coded status summary, and each league's lineup / Spot Starts details so it can be pasted into Messages, Discord, Slack, or notes.

## 📤 Share Results

Creates one full-length PNG containing the entire report, including the checked time.

This is not just a screenshot of the visible portion of your phone. The checker builds an image containing all league cards from top to bottom and opens the normal iPhone Share Sheet.

## 💡 Suggest / 🐛 Report Bug

The bottom of a completed report includes direct links to the project's GitHub suggestion and bug-report forms. These are optional and do not affect the lineup scan.

---

# Optional — Add the Tuesday rankings alert

The public setup page also contains:

**Add Rankings Alert Shortcut**

Shared Shortcut:

https://www.icloud.com/shortcuts/dd78ca052ecd4d98979dd2f810dced70

This installs the **Check FFB Rankings** shortcut. It is intended to check whether the week's Fantasy Footballers rankings appear to be live and remind you to run the lineup checker.

After installing it, verify its automation settings on your iPhone and allow it to run while locked if you want the notification without opening Shortcuts manually.

The rankings alert is optional. It is not required for the main lineup checker.

---

# Troubleshooting

## Nothing happens when the Dashboard opens

Check:

**Settings → Apps → Safari → Extensions → Userscripts**

Make sure Userscripts is enabled and allowed on:

`thefantasyfootballers.com`

Then open the Dashboard in Safari, open the Userscripts extension menu, and make sure **FFB Fantasy Lineup Check** is enabled.

Reload the Dashboard and try again.

---

## It says Footballers Login Required

Open the Ultimate Dashboard manually and sign into The Fantasy Footballers.

Then run the Shortcut again.

---

## It says Lineup Optimizer Not Ready

The Fantasy Footballers may still be processing or publishing that week's rankings.

The checker intentionally stops instead of falsely marking every league optimized.

Try again after the rankings are live.

---

## A league says Couldn't Verify

Run the checker again.

Sometimes a team sync or page render may take longer than expected.

If the same league repeatedly fails, confirm that the team still loads correctly in Ultimate Dashboard.

---

## I see duplicate scans or duplicate result windows

You probably have more than one FFB userscript enabled.

Open Userscripts and leave only one active copy of:

**FFB Fantasy Lineup Check**

---

## I added a new league

Import/sync it in the Fantasy Footballers Ultimate Dashboard.

No script editing is required.

The next scan will automatically discover the new league.

---

## Open Sleeper opens a webpage instead of the app

That final handoff depends on iOS and Sleeper's link handling.

The lineup report itself is unaffected.

---

# Privacy / security

The public userscript does not require you to put your Fantasy Footballers password, Sleeper password, Sleeper username, or league IDs into the code.

It operates on the Fantasy Footballers Dashboard page you are already signed into and reads the information displayed there.

Never paste account passwords into a userscript or shared Shortcut.

---

# Updating the checker

The userscript includes version and update metadata.

When a new release is published, the public project files can be updated without changing the public setup page URL.

Current project:

https://github.com/usafanthonyperry-spec/ffb-lineup-check

Current public installer:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

---

# Important note

This is an unofficial community tool.

It is not affiliated with, sponsored by, or endorsed by The Fantasy Footballers or Sleeper.

The checker uses information already available to the signed-in user through The Fantasy Footballers Ultimate Dashboard.


## Update notifications

The **Fantasy Lineup Check** Shortcut checks `latest.txt` each time it runs and shows the latest published checker version in an iPhone notification.

Compare that number with the version shown at the top of your lineup-checker results. If your installed version is lower, return to the public installer and reinstall the checker.

Current main Shortcut:

https://www.icloud.com/shortcuts/f0960e18c6384788899421a848e70e29

Current rankings Shortcut:

https://www.icloud.com/shortcuts/dd78ca052ecd4d98979dd2f810dced70

## Developer / testing shortcut

The **Write FFB Test Script** shortcut is only for development/testing and is not required for normal use.

https://www.icloud.com/shortcuts/ab546ef8217c4af0b3c37d2f57218ecc
