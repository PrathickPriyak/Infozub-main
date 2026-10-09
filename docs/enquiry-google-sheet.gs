/**
 * INFOZUB enquiry → Google Sheet (download as Excel anytime)
 *
 * Setup:
 * 1. Create a Google Sheet (or open an existing one).
 * 2. Extensions → Apps Script → paste this entire file → Save.
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL.
 * 5. Set it as CONTACT_FORM_WEBHOOK_URL in Vercel / .env.local
 * 6. Redeploy the site.
 *
 * Download Excel: File → Download → Microsoft Excel (.xlsx)
 */

var SHEET_NAME = "Enquiries";
var HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Company",
  "Enquiry Type",
  "Message",
  "Source Page",
  "Channel",
  "Consent",
];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var row = payload.sheetRow || {};
    var sheet = getOrCreateSheet_();

    sheet.appendRow([
      row.timestamp || (payload.meta && payload.meta.receivedAt) || new Date().toISOString(),
      row.name || payload.name || "",
      row.email || payload.email || "",
      row.phone || payload.phone || "",
      row.company || payload.company || "",
      row.enquiryType || payload.interest || "",
      row.message || payload.message || "",
      row.sourcePage || payload.sourcePage || "",
      row.channel || payload.channel || "",
      row.consent || (payload.consent ? "Yes" : "No"),
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({
    ok: true,
    service: "infozub-enquiry-sheet",
    message: "POST enquiries as JSON to append rows.",
  });
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
