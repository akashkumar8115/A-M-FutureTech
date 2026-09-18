# A&M FutureTech Solution Pvt Ltd

A premium IT company website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive multi-page marketing site
- Working CTA navigation and forms
- Structured content architecture for services, portfolio and careers
- Resend-powered contact, quote, and career emails
- Database-ready Prisma setup

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production deployment

Set environment variables in a `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=https://amfuturetech.com
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM="A&M FutureTech <info@amfuturetech.com>"
EMAIL_TO=info@amfuturetech.com
CONTACT_RECEIVER=info@amfuturetech.com
DATABASE_URL="mysql://user:pass@localhost:3306/amfuturetech"
```

### Resend setup

1. Create an API key at [Resend](https://resend.com/api-keys) and add it as `RESEND_API_KEY`.
2. Verify `amfuturetech.com` at [Resend Domains](https://resend.com/domains).
3. Use a verified sender in `EMAIL_FROM`, for example `A&M FutureTech <info@amfuturetech.com>`.
4. Incoming form emails are delivered to `EMAIL_TO` / `CONTACT_RECEIVER`.
