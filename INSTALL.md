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

# Step 4 — Add the lightweight launcher Shortcut

Return to the public setup page and tap **Add Fantasy Lineup Check Shortcut**.

Apple will open the shared Shortcut. Tap **Add Shortcut**.

This launcher intentionally contains only two actions:

1. **URL**  
   `https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/`
2. **Open URLs**

That is the entire launcher. It contains **no checker JavaScript**.

When you run it, Safari opens the Fantasy Footballers Ultimate Dashboard and the installed Userscripts checker runs automatically.

If the shared Shortcut link ever fails, you can recreate it manually in Apple Shortcuts using those same two actions.

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

## 📤 Share Results

Creates one full-length PNG containing the entire report.

This is not just a screenshot of the visible portion of your phone. The checker builds an image containing all league cards from top to bottom and opens the normal iPhone Share Sheet.

---

# Optional — Add the Tuesday rankings alert

The public setup page also contains:

**Add Rankings Alert Shortcut**

This installs:

**🏈 Check FFB Rankings**

It is intended to check the Fantasy Footballers rankings page on Tuesday and notify you when the week's rankings appear to be available.

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

The lightweight launcher checks the current published release before opening the Fantasy Footballers Dashboard.

When a new release is published, it briefly shows a text notice such as:

**⬆️ New version available — v1.0.17**

Compare that number with the version shown at the top of your lineup-checker results. If your installed version is older, return to the installer page and reinstall the checker.

The launcher notice is text-only and does not require an additional Safari extension permission.
