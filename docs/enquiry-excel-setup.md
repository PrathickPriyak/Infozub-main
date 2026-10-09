# Save Digital Marketing enquiries to Excel

The site does **not** store enquiries in a database. Each valid submission is POSTed to `CONTACT_FORM_WEBHOOK_URL`. Point that URL at a **Google Sheet** Apps Script web app, then download the sheet as **Excel (.xlsx)** whenever you need it.

## One-time setup (about 5 minutes)

1. Create a Google Sheet (e.g. “Infozub Enquiries”).
2. Open **Extensions → Apps Script**.
3. Delete any stub code and paste the contents of [`enquiry-google-sheet.gs`](./enquiry-google-sheet.gs).
4. Click **Save**, then **Deploy → New deployment**.
5. Select type **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Deploy and **copy the Web app URL** (ends with `/exec`).
7. Set environment variables:

```bash
CONTACT_FORM_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
# optional
CONTACT_FORM_WEBHOOK_TOKEN=
```

On Vercel: Project → Settings → Environment Variables → add `CONTACT_FORM_WEBHOOK_URL` → **Redeploy**.

Locally: put the same value in `.env.local` (from `.env.example`).

## Columns written to the sheet

| Timestamp | Name | Email | Phone | Company | Enquiry Type | Message | Source Page | Channel | Consent |

`Channel` is `modal` (welcome popup) or `page` (Contact page / other CTAs).

## Download as Excel

In Google Sheets: **File → Download → Microsoft Excel (.xlsx)**.

## Test

1. Open the site → welcome enquiry modal should appear.
2. Submit a test enquiry with a valid Indian mobile number and consent checked.
3. Refresh the Google Sheet — a new row should appear.
4. If no row appears: confirm the web app URL, redeploy after env change, and check Vercel function logs for `[contact] webhook failed`.

## Security notes

- Never put the Apps Script URL in frontend code.
- Do not commit `.env.local`.
- Restrict Sheet sharing to your team; the web app URL is a secret write endpoint.
