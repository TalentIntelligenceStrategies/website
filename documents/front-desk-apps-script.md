# Front Desk — Google Apps Script backend

> Moved out of `assets/site.js` on 2026-08-28. It lived there as a 129-line comment
> block, which meant ~6 KB of setup runbook was downloaded by every visitor on every
> page. Nothing references it at runtime — it is documentation and the deployable
> source for the Apps Script project.

The endpoint URL the site posts to is `FRONT_DESK_ENDPOINT` near the top of
[../assets/site.js](../assets/site.js).

---

FRONT DESK — Google Apps Script backend

   Captures the contact form, the footer newsletter and the IP-drop popup into
   a Google Sheet named "TIS Front Desk", owned by contact@tisglobalinc.com.

   ── ONE-TIME SETUP (~10 min) ─────────────────────────────────────────────
   0. Sign in as contact@tisglobalinc.com in a SEPARATE Chrome profile or an
      incognito window. Google's account switcher will otherwise happily let
      you create the Sheet as contact@ but deploy as someone else, and
      "Execute as: Me" binds the endpoint to whoever clicks Deploy — forever.
   1. Open the "TIS Front Desk" Sheet. Confirm Share lists contact@ as Owner
      and nobody else. Leave the default tab alone — the tabs below are
      created automatically on first submission.
   2. Extensions -> Apps Script. Delete the stub, paste everything between the
      SCRIPT markers below. Rename the project "TIS Front Desk — Capture". Save.
   3. Deploy -> New deployment -> gear -> Web app
         Description:     v1
         Execute as:      Me (contact@tisglobalinc.com)
         Who has access:  Anyone
      "Anyone" must be literally Anyone — not "Anyone with a Google account",
      not "Anyone at Talent Intelligence Strategies". Both require the visitor
      to be signed in, so every real submission would fail.
      If "Anyone" is missing, it is Workspace policy. As an admin, check
      Admin console -> Apps -> Google Workspace -> Drive and Docs -> Sharing
      settings (external sharing must be allowed), and the Google Apps Script
      entry in the same list. Allow a few minutes to propagate.
   4. Authorize -> "Google hasn't verified this app" is expected for your own
      script: Advanced -> Go to TIS Front Desk — Capture (unsafe) -> Allow.
   5. Copy the Web app URL ending in /exec. Open it in a browser tab; it must
      return {"ok":true,"service":"tis-front-desk"}. Paste it into
      FRONT_DESK_ENDPOINT near the top of this file.

   ── EDITING THE SCRIPT LATER ─────────────────────────────────────────────
   Saving does NOT update the live endpoint. Deploy -> Manage deployments ->
   pencil -> Version: New version -> Deploy. That keeps the same /exec URL.
   Picking "New deployment" instead mints a DIFFERENT URL while the site keeps
   posting to the old one — the usual reason a fix appears to be ignored.

   ── ADDING A FORM LATER ──────────────────────────────────────────────────
   Add one entry to ROUTES and post { form: '<key>', ... } from the page. The
   tab and its header row are created on the first submission. No redeploy of
   the site, no schema migration. To send a form to a DIFFERENT spreadsheet
   (e.g. Signal), give its route a spreadsheetId and open it by ID.

   ── SECURITY ─────────────────────────────────────────────────────────────
   The /exec URL sits in this public file, so anyone can find it and POST.
   Same accepted trade-off as documents/platform-copy-review.html. The
   honeypot and validation blunt casual abuse; they don't eliminate it.
   doGet only ever returns a health check — rows are never readable.

   ─────────────────────── SCRIPT — paste from here ────────────────────────

const ROUTES = {
  contact: {
    tab: 'contact',
    headers: ['ts','name','title','email','phone','org','topic','message','source','page','lang','ua'],
  },
  newsletter: {
    tab: 'newsletter',
    headers: ['ts','email','role','industry','source','page','lang','ua'],
  },
};

const ERROR_HEADERS = ['ts','raw','error'];

// Returns the tab, creating it and seeding its header row on first use.
function tab_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Health check — paste the /exec URL into a browser to confirm the deployment.
function doGet() {
  return json_({ ok: true, service: 'tis-front-desk' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);                       // serialise concurrent appends
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    let b;
    try {
      b = JSON.parse(raw);                    // text/plain body, JSON inside
    } catch (err) {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), raw.slice(0, 4000), 'unparseable JSON']);
      return json_({ ok: false, error: 'bad payload' });
    }

    // Honeypot tripped. Accept silently — never tell a bot it was caught.
    if (b._hp) return json_({ ok: true });

    const route = ROUTES[b.form];
    if (!route) {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), raw.slice(0, 4000), 'unknown form: ' + b.form]);
      return json_({ ok: false, error: 'unknown form' });
    }

    b.ts = new Date();                        // server-stamped; client clocks lie
    // Map by header name, never by key order, so a missing field (e.g. an
    // unselected topic radio) leaves a blank cell instead of shifting the row.
    tab_(route.tab, route.headers)
      .appendRow(route.headers.map(function (h) { return b[h] !== undefined ? b[h] : ''; }));

    return json_({ ok: true });
  } catch (err) {
    try {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), '', String(err)]);
    } catch (ignored) {}
    return json_({ ok: false, error: 'server error' });
  } finally {
    lock.releaseLock();
  }
}

   ──────────────────────── SCRIPT — paste to here ─────────────────────────
