# A&M FutureTech Solution Pvt Ltd

A premium IT company website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- SEO-ready pages, sitemap, robots, Open Graph and article schema
- Blog listing, search/filter, and SEO detail pages
- Dark / light mode and global website search
- Zod-validated contact, quote and career forms
- Resend email plus Google Sheets logging
- Admin dashboard with notifications
- Privacy, terms, cookies, refund and disclaimer pages

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Admin dashboard: http://localhost:3000/admin  
Default local password: `AMfuture@2026`

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://amfuturetech.com
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM="A&M FutureTech <info@amfuturetech.com>"
EMAIL_TO=info@amfuturetech.com
CONTACT_RECEIVER=info@amfuturetech.com
ADMIN_PASSWORD=change-me
GOOGLE_SHEET_ID=1cjQg7HITYsfmYXPO0Wdc2C8hRLozo8lCRpSHbL3Db0A
GOOGLE_DRIVE_FOLDER_ID=1XMOEBMg9rxKK7UTnqG9tndqNlkU9GTcB
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
```

## Google Sheets

The spreadsheet should contain these exact tab names:

- `Blogs`
- `Contact Enquiries`
- `Quote Requests`
- `Career Applications`

Blogs columns: `Title, Slug, Excerpt, Content, Image URL, Category, Author, Published At, SEO Title, SEO Description, Tags, Status`

`Image URL` can be a public image link or a Google Drive file URL from the shared folder.

To enable live write/read:

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/1cjQg7HITYsfmYXPO0Wdc2C8hRLozo8lCRpSHbL3Db0A/edit).
2. Extensions → Apps Script.
3. Paste `scripts/google-sheets-webhook.js`.
4. Set script property `WEBHOOK_SECRET`.
5. Deploy as Web app (Anyone).
6. Put the URL in `GOOGLE_SHEETS_WEBHOOK_URL`.

Until that webhook is live, forms still send email and store local submissions for the dashboard.

## Resend

1. Create an API key at [Resend](https://resend.com/api-keys).
2. Verify `amfuturetech.com` at [Resend Domains](https://resend.com/domains).
