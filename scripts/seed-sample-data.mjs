/**
 * Seeds 5 demo rows into each Google Sheet tab.
 * Usage: node scripts/seed-sample-data.mjs
 */
const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SECRET = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || '';

if (!WEBHOOK_URL) {
  console.error('GOOGLE_SHEETS_WEBHOOK_URL is missing. Load .env first.');
  process.exit(1);
}

const contacts = [
  {
    'Full Name': 'Riya Sharma',
    'Job Title': 'Operations Director',
    'Company Name': 'Nexa Retail',
    Email: 'riya.sharma@example.com',
    Phone: '+91 98100 11111',
    Website: 'https://nexaretail.example',
    'Service Required': 'E-Commerce Solutions',
    'Project Budget': '$20,000 - $50,000',
    Timeline: '1 - 3 months',
    'How Heard': 'Google Search',
    'Project Details': 'Need a multi-category storefront, inventory sync, and a customer portal for repeat wholesale orders.',
  },
  {
    'Full Name': 'Arjun Mehta',
    'Job Title': 'IT Manager',
    'Company Name': 'BuildCore Infra',
    Email: 'arjun.mehta@example.com',
    Phone: '+91 98200 22222',
    Website: 'https://buildcore.example',
    'Service Required': 'Custom Software Development',
    'Project Budget': '$50,000+',
    Timeline: '3 - 6 months',
    'How Heard': 'Referral',
    'Project Details': 'Looking for a site-progress and material tracking system for 12 active construction projects.',
  },
  {
    'Full Name': 'Sofia Alvarez',
    'Job Title': 'Founder',
    'Company Name': 'WellPath Care',
    Email: 'sofia.alvarez@example.com',
    Phone: '+91 98300 33333',
    Website: 'https://wellpath.example',
    'Service Required': 'Web Application Development',
    'Project Budget': '$10,000 - $20,000',
    Timeline: 'As soon as possible',
    'How Heard': 'LinkedIn',
    'Project Details': 'Want a secure patient intake portal with appointment reminders and role-based staff access.',
  },
  {
    'Full Name': 'Kabir Nair',
    'Job Title': 'Digital Lead',
    'Company Name': 'Harbor Logistics',
    Email: 'kabir.nair@example.com',
    Phone: '+91 98400 44444',
    Website: 'https://harborlogistics.example',
    'Service Required': 'Mobile Application Development',
    'Project Budget': '$10,000 - $20,000',
    Timeline: '3 - 6 months',
    'How Heard': 'Existing Client',
    'Project Details': 'Need an Android/iOS app for drivers to update POD, delays, and hub check-ins in real time.',
  },
  {
    'Full Name': 'Meera Iyer',
    'Job Title': 'Marketing Head',
    'Company Name': 'Lumen Education',
    Email: 'meera.iyer@example.com',
    Phone: '+91 98500 55555',
    Website: 'https://lumenedu.example',
    'Service Required': 'Website Development',
    'Project Budget': '$5,000 - $10,000',
    Timeline: '1 - 3 months',
    'How Heard': 'Social Media',
    'Project Details': 'Rebuild the admissions website with faster pages, SEO structure, and a course enquiry form.',
  },
];

const quotes = [
  {
    'Full Name': 'Daniel Okonkwo',
    'Job Title': 'CFO',
    'Company Name': 'Northline Finance',
    Email: 'daniel.okonkwo@example.com',
    Phone: '+91 98600 66666',
    Website: 'https://northline.example',
    'Service Required': 'IT Consulting',
    'Project Budget': '$20,000 - $50,000',
    Timeline: 'Not sure yet',
    'How Heard': 'LinkedIn',
    'Project Details': 'Need an architecture review and a 12-month roadmap to replace spreadsheet-based reporting.',
  },
  {
    'Full Name': 'Priya Kapoor',
    'Job Title': 'Product Owner',
    'Company Name': 'SwiftCart',
    Email: 'priya.kapoor@example.com',
    Phone: '+91 98700 77777',
    Website: 'https://swiftcart.example',
    'Service Required': 'API & Third-Party Integration',
    'Project Budget': '$10,000 - $20,000',
    Timeline: '1 - 3 months',
    'How Heard': 'Google Search',
    'Project Details': 'Quote for payment, shipping, and ERP integrations on an existing Next.js commerce stack.',
  },
  {
    'Full Name': 'Hassan Qureshi',
    'Job Title': 'Plant Manager',
    'Company Name': 'Orbit Manufacturing',
    Email: 'hassan.qureshi@example.com',
    Phone: '+91 98800 88888',
    Website: 'https://orbitmfg.example',
    'Service Required': 'Cloud Solutions',
    'Project Budget': '$20,000 - $50,000',
    Timeline: '3 - 6 months',
    'How Heard': 'Referral',
    'Project Details': 'Want a staged AWS migration for ERP, backups, and a production monitoring setup.',
  },
  {
    'Full Name': 'Elena Petrova',
    'Job Title': 'CX Lead',
    'Company Name': 'StayBright Hotels',
    Email: 'elena.petrova@example.com',
    Phone: '+91 98900 99999',
    Website: 'https://staybright.example',
    'Service Required': 'UI/UX Design',
    'Project Budget': 'Under $5,000',
    Timeline: 'As soon as possible',
    'How Heard': 'Social Media',
    'Project Details': 'Need booking-flow wireframes and a design system before the engineering sprint starts.',
  },
  {
    'Full Name': 'Vikram Joshi',
    'Job Title': 'Founder',
    'Company Name': 'ParcelNest',
    Email: 'vikram.joshi@example.com',
    Phone: '+91 99000 10101',
    Website: 'https://parcelnest.example',
    'Service Required': 'Maintenance & Support',
    'Project Budget': 'Custom',
    Timeline: '6 - 12 months',
    'How Heard': 'Other',
    'Project Details': 'Looking for a monthly SLA covering bug fixes, performance, and small feature releases after launch.',
  },
];

const careers = [
  {
    'Full Name': 'Ananya Rao',
    Email: 'ananya.rao@example.com',
    Phone: '+91 99100 12121',
    City: 'Bengaluru',
    LinkedIn: 'https://linkedin.com/in/ananyarao',
    Position: 'Senior Full Stack Developer',
    Experience: '5-8 years',
    'Current Company': 'Nimbus Labs',
    'Notice Period': '30 days',
    'Expected CTC': '28 LPA',
    Resume: 'sample-ananya-rao.pdf',
    Message: 'Built multi-tenant SaaS products on Next.js and Node. Interested in ERP and portal work.',
  },
  {
    'Full Name': 'Rohit Sen',
    Email: 'rohit.sen@example.com',
    Phone: '+91 99200 13131',
    City: 'Pune',
    LinkedIn: 'https://linkedin.com/in/rohitsen',
    Position: 'UI/UX Designer',
    Experience: '3-5 years',
    'Current Company': 'Craftly',
    'Notice Period': '15 days',
    'Expected CTC': '18 LPA',
    Resume: 'sample-rohit-sen.pdf',
    Message: 'Portfolio covers dashboards, commerce checkout, and design systems in Figma.',
  },
  {
    'Full Name': 'Fatima Khan',
    Email: 'fatima.khan@example.com',
    Phone: '+91 99300 14141',
    City: 'Hyderabad',
    LinkedIn: 'https://linkedin.com/in/fatimakhan',
    Position: 'Cloud Engineer',
    Experience: '3-5 years',
    'Current Company': 'Skyline Ops',
    'Notice Period': '60 days',
    'Expected CTC': '22 LPA',
    Resume: 'sample-fatima-khan.pdf',
    Message: 'Hands-on AWS, Docker, and CI/CD. Happy to own staging/production parity.',
  },
  {
    'Full Name': 'Leo Martins',
    Email: 'leo.martins@example.com',
    Phone: '+91 99400 15151',
    City: 'Remote',
    LinkedIn: 'https://linkedin.com/in/leomartins',
    Position: 'Senior Full Stack Developer',
    Experience: '8+ years',
    'Current Company': 'Independent',
    'Notice Period': 'Immediate',
    'Expected CTC': '35 LPA',
    Resume: 'sample-leo-martins.pdf',
    Message: 'Led delivery for logistics and healthcare portals. Prefer TypeScript-heavy stacks.',
  },
  {
    'Full Name': 'Sneha Kulkarni',
    Email: 'sneha.kulkarni@example.com',
    Phone: '+91 99500 16161',
    City: 'Mumbai',
    LinkedIn: 'https://linkedin.com/in/snehakulkarni',
    Position: 'UI/UX Designer',
    Experience: '1-3 years',
    'Current Company': 'Studio North',
    'Notice Period': '30 days',
    'Expected CTC': '12 LPA',
    Resume: 'sample-sneha-kulkarni.pdf',
    Message: 'Strong in mobile app flows and accessibility. Looking to join a product-minded team.',
  },
];

const blogs = [
  {
    Title: 'How to Brief an IT Partner Without Losing Weeks in Discovery',
    Slug: 'how-to-brief-an-it-partner',
    Excerpt: 'A short brief template that helps software, web, and cloud projects start with the right scope.',
    Content: 'Share the business outcome, current tools, users, constraints, and a first-release definition of done. A&M FutureTech uses that brief to propose a sequenced plan instead of a vague estimate.',
    'Image URL': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    Category: 'Delivery',
    Author: 'A&M FutureTech Editorial',
    'Published At': '2026-09-01',
    'SEO Title': 'How to Brief an IT Partner | A&M FutureTech',
    'SEO Description': 'Use this project brief template to start software and cloud work with clearer scope and fewer discovery delays.',
    Tags: 'discovery, scoping, delivery',
    Status: 'Published',
  },
  {
    Title: 'Inventory Accuracy: Why Excel Breaks After the Second Warehouse',
    Slug: 'inventory-accuracy-after-second-warehouse',
    Excerpt: 'Stock errors compound quickly across locations. Here is what a practical inventory system needs to track.',
    Content: 'Once you have more than one store or warehouse, spreadsheet stock counts drift. You need SKU masters, inward/outward logs, alerts, and a floor-friendly update path. That is the core of A&M FutureTech inventory work.',
    'Image URL': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    Category: 'Operations',
    Author: 'A&M FutureTech Operations',
    'Published At': '2026-08-21',
    'SEO Title': 'Inventory Accuracy Across Warehouses | A&M FutureTech',
    'SEO Description': 'Learn why multi-location stock tracking fails in Excel and what to put in an inventory system first.',
    Tags: 'inventory, warehouse, ERP',
    Status: 'Published',
  },
  {
    Title: 'Checkout Friction: Five Fixes That Lift E-Commerce Conversion',
    Slug: 'checkout-friction-ecommerce-conversion',
    Excerpt: 'Most abandoned carts are process issues, not design opinions. These five fixes are where we start.',
    Content: 'Guest checkout, fewer form fields, visible shipping, honest stock, and a status email after pay. A&M FutureTech builds commerce flows around those operational truths, then layers merchandising.',
    'Image URL': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
    Category: 'E-Commerce',
    Author: 'A&M FutureTech Commerce',
    'Published At': '2026-08-02',
    'SEO Title': 'E-Commerce Checkout Fixes | A&M FutureTech',
    'SEO Description': 'Five practical checkout changes that reduce cart drop-off for growing retail and D2C brands.',
    Tags: 'ecommerce, conversion, checkout',
    Status: 'Published',
  },
  {
    Title: 'Role-Based Portals Beat Shared Inboxes for Vendors and Clients',
    Slug: 'role-based-portals-vs-shared-inboxes',
    Excerpt: 'If documents and tickets live in email, nobody owns the latest version. Portals fix the access model.',
    Content: 'A portal is a permissioned workspace: customers see orders, vendors see POs, staff see exceptions. A&M FutureTech designs those roles first, then the screens.',
    'Image URL': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80',
    Category: 'Software Development',
    Author: 'A&M FutureTech Product',
    'Published At': '2026-07-18',
    'SEO Title': 'Why Businesses Need Client Portals | A&M FutureTech',
    'SEO Description': 'Replace shared inboxes with role-based portals for customers, vendors, and internal teams.',
    Tags: 'portals, UX, operations',
    Status: 'Published',
  },
  {
    Title: 'A 30-Day Hypercare Plan After You Launch a Business App',
    Slug: '30-day-hypercare-after-app-launch',
    Excerpt: 'Launch week is when real users find the gaps. This is the support cadence we recommend.',
    Content: 'Watch errors daily, batch UX fixes twice a week, keep a named owner, and freeze big features for 14 days. A&M FutureTech hypercare is built to keep production calm after go-live.',
    'Image URL': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    Category: 'Support',
    Author: 'A&M FutureTech Support',
    'Published At': '2026-06-30',
    'SEO Title': 'App Launch Hypercare Plan | A&M FutureTech',
    'SEO Description': 'A 30-day support plan for business apps covering bugs, UX fixes, and ownership after go-live.',
    Tags: 'support, launch, maintenance',
    Status: 'Published',
  },
];

async function callWebhook(payload) {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, secret: SECRET }),
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Webhook returned non-JSON (${response.status}): ${text.slice(0, 180)}`);
  }
  if (!response.ok || json.success === false) {
    throw new Error(json.message || text.slice(0, 180));
  }
  return json;
}

function stamp(values) {
  return { 'Submitted At': new Date().toISOString(), Consent: 'Yes', ...values };
}

async function main() {
  console.log('Seeding Contact Enquiries...');
  for (const row of contacts) {
    await callWebhook({ action: 'append', sheet: 'Contact Enquiries', values: stamp(row) });
  }
  console.log('Seeding Quote Requests...');
  for (const row of quotes) {
    await callWebhook({ action: 'append', sheet: 'Quote Requests', values: stamp(row) });
  }
  console.log('Seeding Career Applications...');
  for (const row of careers) {
    await callWebhook({ action: 'append', sheet: 'Career Applications', values: stamp(row) });
  }
  console.log('Seeding Blogs...');
  await callWebhook({ action: 'seed-blogs', sheet: 'Blogs', rows: blogs });

  const [c, q, a, b] = await Promise.all([
    callWebhook({ action: 'list', sheet: 'Contact Enquiries' }),
    callWebhook({ action: 'list', sheet: 'Quote Requests' }),
    callWebhook({ action: 'list', sheet: 'Career Applications' }),
    callWebhook({ action: 'list', sheet: 'Blogs' }),
  ]);
  console.log('Done.');
  console.log('Contact Enquiries', (c.rows || []).length);
  console.log('Quote Requests', (q.rows || []).length);
  console.log('Career Applications', (a.rows || []).length);
  console.log('Blogs', (b.rows || []).length);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
