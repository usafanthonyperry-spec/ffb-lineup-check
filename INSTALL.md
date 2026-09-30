# FFB Fantasy Lineup Check — iPhone Setup

This is the full setup guide for a new iPhone install.

**Current release: v1.0.32 — Sep 30, 2026**

Public installer:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

## Before you start

You need:

- An iPhone using Safari
- The Apple Shortcuts app
- Access to The Fantasy Footballers Ultimate Dashboard
- Your fantasy leagues synced in Ultimate Dashboard

The checker does **not** automatically change Sleeper lineups or make waiver claims. It shows you the recommended changes so you can decide what to do.

# 1. Install Userscripts

1. Open the public installer in **Safari**.
2. Tap **Install Userscripts**.
3. Install the app.
4. Open Userscripts once.

Then go to:

**Settings → Apps → Safari → Extensions → Userscripts**

Turn it on and allow it on **thefantasyfootballers.com**.

# 2. Install the lineup checker

Go back to the public installer and tap:

**Install FFB Lineup Checker**

Safari will open the userscript. Open Safari's **Extensions** menu, choose **Userscripts**, and confirm the install.

Only keep **one** FFB lineup checker enabled. Multiple active copies can cause duplicate runs.

# 3. Add the Shortcut

On the public installer, tap:

**Add Fantasy Lineup Check Shortcut**

Shared Shortcut:

https://www.icloud.com/shortcuts/5bc97e0ba2c0430788bae3c006ec9632

The Shortcut:

1. Checks the latest published checker version.
2. Shows that version in a notification.
3. Opens the Fantasy Footballers Ultimate Dashboard.
4. Passes that same version into the Dashboard URL as `ffb_latest` so the checker can show update status on screen.
5. Lets Userscripts run the checker automatically.

For existing Shortcut installs, the Dashboard URL action needs one one-time edit:

`https://www.thefantasyfootballers.com/footclan/ultimate-dashboard/?ffb_latest=[Contents of URL]`

The bracketed part is the **Contents of URL** magic variable from the earlier `latest.txt` request, not typed text.

# 4. Prepare Fantasy Footballers

In Safari:

1. Sign into The Fantasy Footballers.
2. Open **Ultimate Dashboard**.
3. Open **Manage Teams**.
4. Make sure every league you want checked is synced.

You do not need to enter your Sleeper username, password, or league IDs into the script.

# 5. Run it

Run:

**🏈 Fantasy Lineup Check**

You should briefly see progress such as:

- `🏈 Loading Fantasy Dashboard…`
- `🏈 Checking 1 of 11: League Name`

When the scan finishes, the results window opens.

# Reading the results

- **Red** — lineup changes are still needed.
- **Yellow** — the lineup is already set, but Spot Starts are available.
- **Green** — the lineup is set and there are no Spot Starts to consider.
- **Couldn't Verify** — that league could not be read reliably.

Green leagues are compact so the leagues that need attention stand out.

If there are no lineup changes, no Spot Starts, and no verification errors, the summary shows **✅ All leagues optimized**.

If anything does need attention, the top of the report also shows a single **⚠️ X leagues need attention** count. This includes red lineup-change leagues, yellow Spot Starts leagues, and leagues that couldn't be verified.

Starting in v1.0.27, the compact version/status/Hide Optimized area stays visible while you scroll. The checked-league count and timestamp stay below it so the sticky area remains small.

Starting in v1.0.29, the Shortcut passes the latest published version into the Dashboard URL. The sticky area reads that value locally. When current, it shows **✓ vX.X.X current**. If a newer version exists, it shows **⬆️ Update available — vX.X.X** with an **Install Update** link. No cross-site version request is made from the Fantasy Footballers page.

### Numbered lineup spots

Numbered spots inside the same position are interchangeable.

For example, these do **not** need to be changed:

- WR 2 → WR 1
- RB 2 → RB 1
- FLEX 2 → FLEX 1

A real move between different position types, such as **WR → FLEX**, can still be shown when it matters.

### Spot Starts

A Spot Start may look like:

**ADD Player A (WR)**  
**START OVER Player B • +2.4 pts**

For defenses or kickers it may say **REPLACE** instead.

Spot Starts show a higher-projected available option. They do not decide which unrelated bench player you should drop for a waiver claim.

# Buttons in the results

**Open Sleeper** — opens the Sleeper link provided by the Dashboard.

**🔄 Run Again** — reloads the Dashboard and performs a fresh scan.

**🙈 Hide Optimized / 👀 Show Optimized** — appears in the compact sticky summary on mixed reports when there is at least one green optimized league and at least one non-green league. The button includes the optimized count, such as **🙈 Hide 12 Optimized**. The checker remembers your last Hide/Show choice and applies it on your next mixed report. It only changes what is visible on screen; it does not change the scan, recommendations, copied summary, or shared image.

**📋 Copy Summary** — copies a text version of the report, including the checked time and Needs Attention count when applicable.

**📤 Share Results** — creates one full-length PNG of the report, including the Needs Attention count when applicable.

**💡 Suggest / 🐛 Report Bug** — opens the GitHub feedback forms.

**Done** — closes the results window.

# Optional rankings alert

The public installer also includes the optional **Check FFB Rankings** Shortcut:

https://www.icloud.com/shortcuts/c3d40660dff545209949c77315b08b91

It is separate from the lineup checker. It can be used to check whether the week's Fantasy Footballers rankings appear to be live.

# Updating

Every time the main Shortcut runs, it shows the **latest available FFB version**.

Compare that notification with the version at the top of your checker results.

If the latest available version is newer, return to:

https://usafanthonyperry-spec.github.io/ffb-lineup-check/

and reinstall the checker.

# Quick troubleshooting

**Nothing happens:**  
Check **Settings → Apps → Safari → Extensions → Userscripts** and make sure Userscripts is enabled for **thefantasyfootballers.com**.

**Footballers Login Required:**  
Sign into The Fantasy Footballers in Safari, then run the Shortcut again.

**Lineup Optimizer Not Ready:**  
The week's optimizer data may still be processing. Try again after rankings are live.

**Couldn't Verify:**  
Run the checker again. If the same league keeps failing, confirm that league loads correctly in Ultimate Dashboard.

**Update status does not appear:**  
The checker did not receive the `ffb_latest` value from the Shortcut. The lineup checker still works normally. Confirm the Dashboard URL action ends with `?ffb_latest=` followed by the **Contents of URL** magic variable from the `latest.txt` request.

**Duplicate scans/results:**  
Disable older FFB userscripts and leave only one checker enabled.

**Open Sleeper opens the website:**  
That handoff depends on iOS/Sleeper link handling. The lineup report is unaffected.

# Privacy

The checker reads information already visible on the Fantasy Footballers Dashboard you are signed into.

It does not require you to place your Fantasy Footballers password, Sleeper password, Sleeper username, or league IDs in the script.

Starting with v1.0.23, the **public build only** records one anonymous usage count after a browser completes its first successful lineup scan. A local browser flag prevents later runs from counting again. The counter does not send league names, players, Sleeper IDs, passwords, or lineup data. The Perry/private build is excluded.

Starting with v1.0.29, the checker no longer makes its own remote version request. The Shortcut reads public `latest.txt` first, then passes only that version number into the Dashboard URL as `ffb_latest`. No league, player, lineup, or account data is included.

Public counter statistics:

https://hits.sh/usafanthonyperry-spec.github.io/ffb-lineup-check/public-checker-use/

Never paste account passwords into a userscript or shared Shortcut.

# Feedback

Use the buttons inside the completed checker results, or submit directly:

- Suggest an improvement: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=feature_request.yml
- Report a bug: https://github.com/usafanthonyperry-spec/ffb-lineup-check/issues/new?template=bug_report.yml

---

Unofficial community tool. Not affiliated with or endorsed by The Fantasy Footballers or Sleeper.
