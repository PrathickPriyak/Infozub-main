# Infozub website audit

Audit date: 6 October 2026.

Source site: https://infozub.com/

This document records the live WordPress site as published. It is a migration inventory, not a redesign. Nothing here was inferred to fill a gap. Where a fact could not be read from the public site, it is marked **TODO - NEEDS VERIFICATION**.

## How this was verified

- `robots.txt` points to the Yoast sitemap `https://infozub.com/sitemap_index.xml`.
- That index contains one child sitemap, `https://infozub.com/page-sitemap.xml`, with 20 URLs.
- The WordPress REST API (`/wp-json/wp/v2/pages`) returned the same 20 published pages (`X-WP-Total: 20`).
- `/wp-json/wp/v2/posts` returned 0 posts. `/wp-json/wp/v2/project` returned 0 items. The `project` type is registered and public in the REST index, with no published entries.
- Rendered HTML was fetched for every sitemap URL.
- Embedded form schemas were read from the public OpnForm API on `forms.infozub.com`.
- Navigation menu items could not be read from the REST API. `GET /wp-json/wp/v2/menu-items` returned HTTP 401. Menu structure below is taken from the rendered header.

Platform observed on the homepage HTML:

- Theme: Divi (`/wp-content/themes/Divi/`).
- Plugins referenced in public HTML: Yoast SEO, Cool Timeline Pro (About page), Supreme Modules for Divi, DG Carousel.
- The string `wpcf7` appears in page HTML. No Contact Form 7 form markup is rendered on any of the 20 pages. **TODO - NEEDS VERIFICATION** whether Contact Form 7 is active.
- Hosting headers: PHP 8.2.33, Hostinger, LiteSpeed, Cloudflare.
- Language declared in Yoast JSON-LD: `en-US`.

## Site-wide identity

Published names, kept as written. They do not all match.

| Where it appears | Text |
| --- | --- |
| Schema.org Organization name | INFOZUB |
| Footer | INFOZUB® |
| Bank account name on `/payments/` | INFOZUB Private Limited |
| Job application work-location options | INFOZUB Private Limited, Palladam; INFOZUB Private Limited, Tirupur (Avinashi Road) |
| Terms page, “WHO ARE WE?” | INFOZUB Ltd. is a registered Business in the India |

Founder name published on `/about/`: Logesh. The About copy says INFOZUB took shape in May 2013, starting from a technology blog while he was an engineering student.

GST Identification Number published on `/payments/`: `33AAGCI5436F1ZR`.

## Global header

Present on the main marketing pages. The campaign pages `/infozub-landing-page/` and `/infozub-digital-marketing/`, and `/careers/apply/`, do not use this full header.

Top bar:

- Phone text: `+91 99 44 64 00 33` and `99 44 64 00 33`.
- `tel:` targets seen: `tel:9944640033`, `tel:+919944640033`, and `tel:+919944640033%20` (trailing space). 
- Email: `info@infozub.com` (Cloudflare email obfuscation in HTML; decoded from `data-cfemail`).
- “Contact” button: `https://infozub.com/contact/`.

Logo image: `https://infozub.com/wp-content/uploads/2021/08/INFOZUB-Logo-White.png`. Alt text is empty.

Primary navigation, no dropdown children in the rendered menu:

| Label | URL |
| --- | --- |
| Home | https://infozub.com/ |
| About | https://infozub.com/about/ |
| Digital Suite | https://infozub.com/digital-suite/ |
| Academy | https://infozub.com/courses/ |
| Ventures | https://infozub.com/ventures/ |
| Clients | https://infozub.com/clients/ |
| Careers | https://infozub.com/careers/ |
| Contact | https://infozub.com/contact/ |

A separate mobile-only menu was not found. Divi’s responsive collapse of this same list was not clicked in a browser. **TODO - NEEDS VERIFICATION** for the exact mobile open/close behavior.

## Global footer and office block

Repeated “Don’t Feel Shy!” block:

- Tiruppur office: 2nd Floor, Alagendira Towers, Bungalow Stop, Tiruppur – 641602.
- Palladam office: 271 A3, Chinnaiyah Garden, Kosavampalayam Road, Palladam – 641664.
- Phone: `+91 99 44 64 00 33`.
- Email: `info@infozub.com`.
- CTA: “GET IN TOUCH” → `https://infozub.com/contact/`.

Legal strip:

| Label | URL |
| --- | --- |
| Copyrights | https://infozub.com/copyrights/ |
| Terms & Privacy | https://infozub.com/terms/ |
| Payments | https://infozub.com/payments/ |

“Terms & Privacy” does not link to `https://infozub.com/privacy-policy/`.

Bottom bar, rendered text: `All Rights Reserved. © 2026 – INFOZUB®.`

Social icons, all labeled “Follow” in the accessible text:

| Network | URL |
| --- | --- |
| Facebook | https://www.facebook.com/Infozub |
| X / Twitter | https://twitter.com/infozubltd and https://x.com/infozubltd |
| LinkedIn | https://www.linkedin.com/company/infozub-ltd/ |
| Instagram | https://www.instagram.com/infozub/ |
| YouTube | https://www.youtube.com/@infozub and https://www.youtube.com/user/InfozubLtd |

Schema `sameAs` lists Facebook, `https://x.com/infozubltd`, Instagram, LinkedIn, and `https://www.youtube.com/user/InfozubLtd`. It does not list `https://www.youtube.com/@infozub`.

Floating phone control uses `tel:+919944640033%20`.

## Site-wide embeds and tracking

| Item | Evidence |
| --- | --- |
| Google Tag Manager | `GTM-M9BLJ4R`, noscript iframe `https://www.googletagmanager.com/ns.html?id=GTM-M9BLJ4R` |
| Facebook pixel | ID `680432490409184` |
| Typebot chat bubble | `Typebot.initBubble`, typebot id `infozub`, `apiHost` `https://chat.infozub.com`, preview message “We are Online! Chat now”, avatar `http://infozub.com/wp-content/uploads/2023/12/infozub-support.png`, button color `#003068`, auto-show delay 10000 |
| Twitter card site | `@infozubltd` |

The Typebot conversation script itself was not opened. **TODO - NEEDS VERIFICATION** for chat questions and answers.

Tawk.to is named in the Terms page and in the website-package feature lists. A live Tawk embed was not found on the 20 pages. The live chat widget that is present is Typebot.

## Pages found

20 published pages. No public blog posts. No public `project` entries. One unused category exists: `https://infozub.com/category/uncategorized/`.

| Page | URL | In primary nav | Last modified (REST / sitemap) |
| --- | --- | --- | --- |
| Home | https://infozub.com/ | Yes | 2022-10-31 |
| About | https://infozub.com/about/ | Yes | 2025-02-03 |
| Digital Suite | https://infozub.com/digital-suite/ | Yes | 2024-06-29 |
| Digital Marketing Agency in Coimbatore | https://infozub.com/digital-suite/coimbatore/ | No (linked from Digital Suite) | 2024-06-29 |
| Digital Marketing Agency in Tiruppur | https://infozub.com/digital-suite/tirupur/ | No (linked from Digital Suite) | 2024-06-29 |
| Courses | https://infozub.com/courses/ | Yes, labeled Academy | 2026-06-15 |
| Ventures | https://infozub.com/ventures/ | Yes | 2022-10-31 |
| Clients | https://infozub.com/clients/ | Yes | 2024-02-20 |
| Careers | https://infozub.com/careers/ | Yes | 2023-04-01 |
| Apply | https://infozub.com/careers/apply/ | No | 2024-02-19 |
| Contact Us | https://infozub.com/contact/ | Yes | 2024-02-19 |
| Website Development | https://infozub.com/web/ | No | 2022-01-29 |
| Reviews | https://infozub.com/reviews/ | No | 2025-02-05 |
| Payments | https://infozub.com/payments/ | Footer only | 2022-08-31 |
| Terms & Conditions | https://infozub.com/terms/ | Footer only | 2021-09-07 |
| Privacy Policy | https://infozub.com/privacy-policy/ | No | 2021-09-07 |
| Copyrights | https://infozub.com/copyrights/ | Footer only | 2022-10-30 |
| Thank You | https://infozub.com/thanks/ | No | 2024-01-13 |
| Infozub Landing Page | https://infozub.com/infozub-landing-page/ | No | 2023-05-02 |
| INFOZUB Digital Marketing | https://infozub.com/infozub-digital-marketing/ | No | 2023-08-19 |

`/web/`, `/reviews/`, `/careers/apply/`, `/privacy-policy/`, `/thanks/`, and both campaign landing pages are published and indexable, and they are not in the primary navigation. No other audited page links to `/web/`, `/reviews/`, `/careers/apply/`, or `/privacy-policy/`.

---

## Page records

### Home

- Existing page: Home
- Existing URL: https://infozub.com/
- WordPress ID: 13
- Purpose: Marketing homepage for the digital marketing agency.
- Important sections:
  1. Hero: “Premier Digital Marketing Agency” / “We engage your business with the right audience, Online!”
  2. Intro: “Your Targeted Marketing Partner” / “You Dream, We Make It Happen…”
  3. “What we Offer?” / “Premier Digital Suite” service icon grid
  4. “Learn With Us” / Digital Academy
  5. Statistic counters under “A Little History...”
  6. Two named client result cards
  7. Seven written testimonials
  8. “Our Strength” icon row
  9. Ventures teaser
  10. Office and contact block
- Content that must be preserved: hero and intro copy; the “30+ Young Experts” sentence; service names; academy teaser; counter values; Suzuki Motorcycle (Tamilnadu) and Bharath Electronics and Appliances result figures; all seven testimonials; strength labels; ventures sentence; both office addresses; phone and email.
- Images/assets required: `digital-marketing-company.png`, `web-dev-14.png`, `learn-digital-marketing.png`, `Suzuki-Motorcycle.png`, `BEA-Logo.png`, `tracking.png`, `ads.png`, `cloud-phone.png`, `creatives.png`, `work-process.png`, `reporting.png`, `INFOZUB-Ventures.png`, header/footer logos, `callus.png`, `email.png`. CSS background also references `web-dev-24.png`.
- Forms: none on the page.
- Links: Digital Suite, Contact, Courses, Clients, About, Ventures, phone, email, social, footer legal links.
- CTAs: “EXPLORE DIGITAL SUITE”, “GET IN TOUCH”, “Explore Digital Suite”, “Get In Touch”, “View Courses”, “View All Clients”, “About INFOZUB”, “View all Ventures”.
- SEO considerations:
  - Title: `INFOZUB - Premier Digital Marketing Agency`
  - Description: `Modern Ad-Personalization and Advanced Digital Marketing Solution(s) Provider. Get Maximum ROAS with Tailored Digital Marketing Automation.`
  - Canonical: `https://infozub.com/`
  - Robots: index, follow
  - Open Graph image: `http://infozub.com/wp-content/uploads/2021/08/INFOZUB-Ventures-300x41.png` (HTTP, and a wide logo rather than a social image)
  - H1: `Premier Digital Marketing Agency`
- Migration notes: Homepage `dateModified` in JSON-LD is 2022-10-31, while counters are still labeled “in Last 12 Months”. Those numbers are hardcoded Divi counter attributes, not a live query. Service tiles on the homepage have titles and no descriptive paragraphs.

### About

- Existing page: About
- Existing URL: https://infozub.com/about/
- WordPress ID: 103
- Purpose: Company story, founder profile, timeline, process, certifications, and repeated proof points.
- Important sections:
  1. “About Us / INFOZUB” and the 2013 / 10+ years introduction
  2. Cool Timeline “Our Path To Success” from 2013 through 2021, ending “We’ll Keep Rocking!”
  3. Founder profile for Logesh
  4. “As Seen On” press logos
  5. Eight-step “The Digital Marketing Process”
  6. Strengths, the same five counters, certifications
  7. Ventures teaser and office block
- Content that must be preserved: founding paragraph (May 2013); full timeline labels and years; founder biography; press captions; process steps; certification names; counters.
- Images/assets required: `Infozub_team.png`, `infozubologesh.jpg`, `startupcitysilicon.png`, `CEOMagazine.png`, `BV-magazine.png`, process icons (`discussion.png`, `understand.png`, `Strategy.png`, `brainstorming.png`, `digital-asset.png`, `campaign.png`, `manage.png`, `review.png`), nine certification images (`FBdigital.png`, `FBprofessional.png`, `FBcreative.png`, `searchads.png`, `displayads.png`, `videoadsg.png`, `GTM.png`, `analytics.png`, `searchconsoleg.png`), ventures image, shared chrome images. Timeline uses Cool Timeline Pro’s `clt-compact-preloader.gif`.
- Forms: none.
- Links: in-page `#certifications`, `#founderprofile`; About, Ventures, Contact.
- CTAs: “Our Certifications”, “Founder's Profile”, “About INFOZUB”, “View all Ventures”, “GET IN TOUCH”.
- SEO considerations:
  - Title: `About - INFOZUB`
  - Description: `We are a complete digital marketing agency. We grow businesses and brands online with complete, integrated marketing strategies`
  - Canonical: `https://infozub.com/about/`
  - Robots: index, follow
  - Open Graph image: `http://infozub.com/wp-content/uploads/2021/08/infozubologesh-300x300.jpg`
  - H1: `Lets Begin` (this is the first timeline heading, not “About Us”)
- Migration notes: Timeline has no 2020 entry and no entries after 2021. Press features are named; article URLs were not present in the HTML. **TODO - NEEDS VERIFICATION** for the original publication URLs.

### Digital Suite

- Existing page: Digital Suite
- Existing URL: https://infozub.com/digital-suite/
- WordPress ID: 167
- Purpose: Main services page, city-page entry, certifications, case-study cards, process, testimonials, and the only published digital-marketing pricing FAQ.
- Important sections:
  1. “Premier Digital Suite” intro
  2. Embedded quote form
  3. 15 service tiles plus “And Much More!”
  4. “We Expanded Our Digital Marketing Service” with Coimbatore and Tirupur links
  5. Certifications, counters, two client result cards, eight-step process, strengths
  6. Seven testimonials
  7. 13 FAQ items, including prices, hours, contracts, and meeting cadence
  8. “Ready to Start a Project?” and office block
- Content that must be preserved: every service name and the one-line description under it; FAQ questions and answers, including ₹35,000 / month and ₹15,000 SMB package; package meeting rules for Silver, Gold, Platinum, Platinum+, and Ultimate; hours 09:00–17:00 Monday–Friday; no-refund answer; phone `93 22 33 88 22` for consultancy.
- Images/assets required: service icons `facebook-promotions.png`, `instagram-promotions.png`, `google-ads.png`, `youtube-promotions.png`, `twitter-ads.png`, `linkedin-ads.png`, `google-promotions.png`, `cloud-solutions.png`, `creativedesining.png`, `salessupport.png`, `social-media-management.png`, `cloudtelephony.png`, `webhosting.png`, `website-development.png`, `influencer-marketing.png`, `more-services.png`, plus certification, process, strength, and client images shared with other pages.
- Forms: OpnForm iframe `https://forms.infozub.com/forms/infozub-digital-marketing-suite-hfhzbg`. Field schema is in the forms section below. Anchor `#form` is the “Get Quote” target.
- Links: `tel:+919944640033` (“Call Now”), `https://connect.infozub.com/WhatsApp` (“Click to connect”), `tel:9322338822`, city pages, About, Clients, Contact, Payments (from the FAQ answer, via the footer payments link).
- CTAs: “Call Now”, “Get Quote”, “Digital Marketing Agency in Coimbatore”, “Digital Marketing Agency in Tirupur”, “About INFOZUB”, “View All Clients”, “Get in Touch”.
- SEO considerations:
  - Title: `Digital Marketing Agency in Tamil Nadu, India - INFOZUB`
  - Description: `Premier Digital Marketing Service Provider in Tamil Nadu, India. Customized Marketing Strategies for your Company's Best Digital ROAS.`
  - Canonical: `https://infozub.com/digital-suite/`
  - Robots: index, follow
  - H1: `Premier Digital Suite`
- Migration notes: Silver / Gold / Platinum / Platinum+ / Ultimate are named only inside the meeting FAQ. Their prices and deliverables are not on the page. The FAQ says a rate card is shared after contact. `https://connect.infozub.com/WhatsApp` returned HTTP 404 on 6 October 2026. The “Website Development” tile does not link to `/web/`.

### Digital Marketing Agency in Coimbatore

- Existing page: Digital Marketing Agency in Coimbatore
- Existing URL: https://infozub.com/digital-suite/coimbatore/
- WordPress ID: 1749
- Parent: Digital Suite (167)
- Purpose: City landing page. After a unique introduction, the rest follows the Digital Suite page.
- Important sections: H1 and Coimbatore-specific “Why Digital Marketing is Important?” quote; then services, certifications, counters, client cards, process, strengths, testimonials, FAQ, project CTA, offices.
- Content that must be preserved: the Coimbatore introduction and the sentence “We are Top Digital Marketing Company in Coimbatore with young specialized team to engage your business with the right audience, online.”
- Images/assets required: same service and proof images as Digital Suite. Open Graph image is `http://infozub.com/wp-content/uploads/2021/08/testimonial-backgrnd.jpg`. A CSS background references `web-dev-03.png`.
- Forms: same OpnForm quote iframe as Digital Suite.
- Links: Call Now, Get Quote (`#form`), WhatsApp connect URL, consultancy phone, About, Clients, Contact.
- CTAs: “Call Now”, “Get Quote”, “About INFOZUB”, “View All Clients”, “Get in Touch”.
- SEO considerations:
  - Title: `Digital Marketing Agency in Coimbatore - INFOZUB`
  - Description: `Premier Digital Marketing Service Provider in Coimbatore, India. Customized Marketing Strategies for your Company's Best Digital ROAS.`
  - Canonical: `https://infozub.com/digital-suite/coimbatore/`
  - Robots: index, follow
  - H1: `Digital Marketing Agency in Coimbatore`
- Migration notes: No map iframe on this page. It does not link onward to `/digital-suite/tirupur/`.

### Digital Marketing Agency in Tiruppur

- Existing page: Digital Marketing Agency in Tiruppur
- Existing URL: https://infozub.com/digital-suite/tirupur/
- WordPress ID: 1772
- Parent: Digital Suite (167)
- Purpose: City landing page with its own introduction, then the shared Digital Suite body, plus a map.
- Important sections: H1; Tirupur-specific explanation of digital marketing; quote “We are Top Digital Marketing Company in Tirupur…”; second quote “Meet your Goal with INFOZUB / The Best Digital Marketing Company in Tirupur”; services through FAQ; map; offices.
- Content that must be preserved: the Tirupur introduction paragraphs and both quoted lines. Spelling on this page is “Tirupur”, while the office block uses “Tiruppur”.
- Images/assets required: same shared set as Digital Suite. Open Graph image is `http://infozub.com/wp-content/uploads/2021/08/jobs-and-careers.jpg`. CSS background references `web-dev-03.png`.
- Forms: same OpnForm quote iframe.
- Links: same call, quote, WhatsApp, and consultancy links.
- Embedded content: Google Maps iframe  
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.9753641203733!2d77.3330034146935!3d11.115212655888467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9078d9bc0d15f%3A0x71a017267c0dfee5!2sINFOZUB!5e0!3m2!1sen!2sin!4v1637909218669!5m2!1sen!2sin`  
  The pin label in the embed URL is “INFOZUB”. The coordinates are approximately 11.1152, 77.3330. **TODO - NEEDS VERIFICATION** which office this pin represents. The contact page uses a different pin near 10.9877, 77.2729 and another near 11.1152, 77.3308.
- SEO considerations:
  - Title: `Digital Marketing Agency in Tiruppur - INFOZUB`
  - Description: `Premier Digital Marketing Service Provider in Tiruppur, India. Customized Marketing Strategies for your Company's Best Digital ROAS.`
  - Canonical: `https://infozub.com/digital-suite/tirupur/`
  - H1: `Digital Marketing Agency in Tirupur`
- Migration notes: Title uses “Tiruppur”; H1 uses “Tirupur”.

### Courses

- Existing page: Courses
- Existing URL: https://infozub.com/courses/
- Navigation label: Academy
- WordPress ID: 129
- Purpose: Catalog page for INFOZUB Digital Academy. Lesson content is not on this domain.
- Important sections:
  1. Academy introduction
  2. Nine course cards, each marked “Online Self Placed”
  3. “Join This Course and Get Access!” benefits and audience list
  4. “You Are Just One Step Away!” enroll banner
- Content that must be preserved: introduction, including the spelling “startch”; nine course titles; benefit list; audience list (Students, Professionals, Freelancers, Home Makers, Business Owners).
- Images/assets required: `Infozub-Digital-Academy.png`, `SMM_IDA_Infozub.jpeg`, `APS_IDA_infozub.webp`, `Web_IDA_Infozub.jpeg`, `Canva_IDA_Infozub.jpeg`, `Mave_IDA_Infozub.webp`, `ISF_IDA_Infozub.webp`, `AI-Web-Builder_IDA_Infozub.png`, `BSF_IDA_Infozub-1.png`, `Google-ads_IDA_Infozub.webp`, `language-school-illustration-07.png`.
- Forms: none on this page. Enrollment leaves the site.
- Links:

| Course card | Image link | “Start Course” link |
| --- | --- | --- |
| Social Media Marketing Master Course | `/course/tamil/social-media-marketing/` | same |
| Adobe Photoshop Master Course | `/course/tamil/adobe-photoshop/` | same |
| Web Design Master Course | `/course/tamil/web-design/` | same |
| Canva Master Course | `/course/tamil/canva-master-course/` | same |
| Mobile App Video Editing Master Course | `/course/tamil/mobile-app-video-editing/` | same |
| Interview Success Formula | `/course/tamil/interview-success-formula/` | same |
| AI Website Builder Mastery | `/course/tamil/ai-website-builder-mastery/` | same |
| Business Success Formula | `/course/tamil/business-success-formula/` | same |
| Google Ads Master Course | `/course/tamil/business-success-formula/` | `/course/tamil/google-ads/` |

All of those paths are under `https://academy.infozub.com`. “Registration is Open!” and “Enroll Now” go to `https://academy.infozub.com/`.

- CTAs: “Registration is Open!”, “Start Course”, “Enroll Now”.
- SEO considerations:
  - Title: `Courses - INFOZUB`
  - Description: `Arm yourself with the digital marketing fundamentals! Learn from experts with an agency styled training approach only at INFOZUB.`
  - Canonical: `https://infozub.com/courses/`
  - H1: `You Are Just One Step Away!`
- Migration notes: The Google Ads card image points at the Business Success Formula URL. The button beside it points at the Google Ads URL. Prices, duration, syllabus, and language of instruction are not written on this page. The URL path contains `/tamil/`. Academy homepage title, verified separately, is `INFOZUB Digital Academy - Quality Education for Everyone ❤️`. Two course titles were checked: `Social Media Marketing Master Course - INFOZUB Digital Academy` and `Google Ads Course`. Full academy lesson content was not inventoried. **TODO - NEEDS VERIFICATION** for curriculum, price, and language on `academy.infozub.com`.

### Ventures

- Existing page: Ventures
- Existing URL: https://infozub.com/ventures/
- WordPress ID: 475
- Purpose: Product/venture index. Only Digital Academy is described. The next block says more is coming.
- Important sections: ventures introduction; Digital Academy blurb; “More Exciting Stuffs / Coming Soon!”; office block.
- Content that must be preserved: “Whole new bunch of products and services, crafted in-house at INFOZUB with our 9+ years of experience.” and “Digital Academy / Empower the young generation with skills and real-time knowledge about Digital Marketing.”
- Images/assets required: `INFOZUB-Ventures.png`, `Infozub-Digital-Academy.png`, shared chrome.
- Forms: none.
- Links: Contact and footer only. The Digital Academy blurb had no outbound link in the extracted anchors.
- SEO considerations:
  - Title: `Ventures - INFOZUB`
  - Description: `INFOZUB Ventures - Whole new bunch of products and services, crafted in-house at INFOZUB with our 7+ years of experience.`
  - Canonical: `https://infozub.com/ventures/`
  - No H1 in the rendered HTML.
- Migration notes: Body says 9+ years. Meta description says 7+ years. Homepage and About counters say 10+ years. No other venture is named.

### Clients

- Existing page: Clients
- Existing URL: https://infozub.com/clients/
- WordPress ID: 196
- Purpose: Logo wall.
- Important sections: “We love to serve our clients” / “Working Together for Effective Digital Solutions”; logo grid; “And Much More...”; office block.
- Content that must be preserved: the two headings and every logo file. Alt text on every client logo is empty, so the visible name is the image itself. Filenames are listed in `docs/content-inventory.md`. Do not treat a filename as a confirmed legal name unless the same name is also written on the site.
- Images/assets required: 68 client logo files under `/wp-content/uploads/2024/02/` and `/wp-content/uploads/2021/08/`, plus `Capture.png`. Names that are also written in page copy elsewhere: Suzuki appears as `arun-suzuki.png` here and as “Suzuki Motorcycle (Tamilnadu)” on the homepage; Bharath Electronics is written on the homepage and a `BEA_logo.png` file is on this page. **TODO - NEEDS VERIFICATION** before equating each filename with a legal client name.
- Forms: none.
- Links: “Get in Touch” → Contact.
- SEO considerations:
  - Title: `Clients - INFOZUB`
  - Description: `INFOZUB - strives the best in the industry. We provide high-quality solutions that are tailored to our client's unique business needs.`
  - Canonical: `https://infozub.com/clients/`
  - No H1.
- Migration notes: Two detailed result stories exist only on Home and Digital Suite, not as captions on this logo wall.

### Careers

- Existing page: Careers
- Existing URL: https://infozub.com/careers/
- WordPress ID: 282
- Purpose: General hiring invitation. No job list is published on the page.
- Important sections: “Job Vacancies & Career Opportunities”; “We are looking forward to join hands with Game Changers!”; resume instruction; office block.
- Content that must be preserved: both paragraphs and the resume instruction. The resume address decodes to `info@infozub.com`.
- Images/assets required: shared chrome only. Open Graph image is `http://infozub.com/wp-content/uploads/2021/08/placeholder.png`.
- Forms: none on this page.
- Links: Contact, About (“About INFOZUB”, “Reach Us”). This page does not link to `/careers/apply/`.
- CTAs: “Send your resume to info@infozub.com”, “About INFOZUB”, “Reach Us”, “GET IN TOUCH”.
- SEO considerations:
  - Title: `Careers - INFOZUB`
  - Description: `Looking for the Best Job that Suits you in the world of Digital Services? You may win a chance to Enter into the INFOZUB World of Awesomeness!`
  - Canonical: `https://infozub.com/careers/`
  - H1: `Job Vacancies & Career Opportunities`
- Migration notes: Open roles exist only as options inside the separate application form.

### Apply

- Existing page: Apply
- Existing URL: https://infozub.com/careers/apply/
- WordPress ID: 3246
- Parent: Careers (282)
- Purpose: Full-page job application embed.
- Important sections: one content area containing the form iframe. No heading text was rendered outside the iframe.
- Content that must be preserved: the form field list and the success message from the OpnForm record.
- Images/assets required: none in the page HTML.
- Forms: iframe `https://forms.infozub.com/forms/job-application-pb91hk`.
- Links: none in the page body beyond the iframe and global scripts.
- SEO considerations:
  - Title: `Apply - INFOZUB`
  - Meta description: empty
  - Canonical: `https://infozub.com/careers/apply/`
  - Robots: index, follow
  - No H1 in the WordPress page HTML
- Migration notes: Indexed, but not linked from `/careers/` or the main menu.

### Contact Us

- Existing page: Contact Us
- Existing URL: https://infozub.com/contact/
- WordPress ID: 118
- Purpose: Contact details, message form, and two office maps.
- Important sections:
  1. “Get in Touch With INFOZUB” with email, phone, Palladam address, a “Tirupur Office” heading, and social links
  2. Contact form iframe
  3. “INFOZUB BRANCHES / Our Locations” with two Google Map embeds
  4. Shared office block, which does include the Tiruppur street address
- Content that must be preserved: email, phone, Palladam address, social links, both map embeds, and the shared office addresses.
- Images/assets required: shared chrome only.
- Forms: iframe `https://forms.infozub.com/forms/contact-infozub-tgwsra`.
- Links: `tel:+919944640033`, `mailto` equivalent of `info@infozub.com`, social profiles.
- Embedded content:
  - Tiruppur-area map (coordinates about 10.987692, 77.272907), place label INFOZUB:  
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6775637713704!2d77.2729073147453!3d10.987692258263214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9abf9fd325349%3A0x3cef86d1fa8b6166!2sINFOZUB!5e0!3m2!1sen!2sin!4v1638365501461!5m2!1sen!2sin`
  - Second map (coordinates about 11.115207, 77.330814), place label INFOZUB:  
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7829.950869356058!2d77.33081473488771!3d11.115207400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9078d9bc0d15f%3A0x71a017267c0dfee5!2sINFOZUB!5e0!3m2!1sen!2sin!4v1638365647198!5m2!1sen!2sin`
- SEO considerations:
  - Title: `Contact Us - INFOZUB`
  - Description: `We offer digital marketing solutions to help you boost your brand online. Contact us today to know more about our services.`
  - Canonical: `https://infozub.com/contact/`
  - No H1. Visible headings are H2/H3.
- Migration notes: Under the contact hero heading “Tirupur Office”, no street address text was extracted. The address is present later in the shared office block. **TODO - NEEDS VERIFICATION** if a Tirupur address is intended to sit in that hero slot.

### Website Development

- Existing page: Website Development
- Existing URL: https://infozub.com/web/
- WordPress ID: 1821
- Purpose: Website design offer and three fixed packages. Not linked from the menu or from the Digital Suite “Website Development” tile.
- Important sections: intro; five-step process; “Why INFOZUB for Website Development”; Silver, Gold, and Gold+ packages; a “Frequently Asked Questions” heading with no questions in the HTML; project CTA; offices.
- Content that must be preserved: process labels; reason list, including the spelling “Upgdated Technologies”; the line “STANDARD WEBSITE DESIGN AND DEVELOPMENT PACKAGE ON WORDPRESS AND DIVI. PACKAGE PRICE IS PER 10 MONTHS”; all three prices and feature lists.
- Images/assets required: `req-analysis.png`, `defening-project.png`, `layout.png`, `review-website.png`, `web-design-testing.png`.
- Forms: none. “Get Quote” and “Get Started” go to `/contact/`.
- Links: `#faq`, About, Clients, Contact.
- CTAs: “Get Quote”, “Get Started”, “Frequently Asked Questions”, “About INFOZUB”, “Our Clients”, “Get in Touch”.
- SEO considerations:
  - Title: `Website Development - INFOZUB`
  - Meta description: empty
  - Canonical: `https://infozub.com/web/`
  - Robots: index, follow
  - No H1. The main heading is an H2, “Professional Website Design & Development”.
- Migration notes: Package prices published on the page are ₹4,999 (Silver, 1 landing page, 5 days), ₹9,999 (Gold, 4 pages, 7 days), and ₹19,999 (Gold+, 8 pages, 10 days). Additional support is ₹600 / hour. Backup ZIP is ₹1,000 / 1GB. `.in` GoDaddy domain transfer is ₹1,000 one time. The page says the package price “IS PER 10 MONTHS”. What that phrase means operationally is not explained. **TODO - NEEDS VERIFICATION**. The FAQ heading has zero toggle items.

### Reviews

- Existing page: Reviews
- Existing URL: https://infozub.com/reviews/
- WordPress ID: 3325
- Purpose: Video testimonials. Not linked from the menu or from the written-testimonial sections.
- Important sections: heading “See What Our Client Say’s About INFOZUB”; eight self-hosted MP4 players; office block.
- Content that must be preserved: the heading and the video files. Spoken review text was not transcribed. **TODO - NEEDS VERIFICATION** for transcripts.
- Images/assets required: poster images where present, listed with the videos below.
- Forms: none.
- Links: Contact only, plus chrome.
- Embedded content: HTML5 `<video>` files, not YouTube.

| Video file | Poster found |
| --- | --- |
| `/wp-content/uploads/2025/02/Ak-Sir-Review-BEA-1-1.mp4` | none in the overlay markup |
| `/wp-content/uploads/2025/02/Brownie-Talks-1-1.mp4` | `Bubble-brownie_infozub-review.jpeg` |
| `/wp-content/uploads/2025/02/Infozub-Reviews-Roots-1-1.mp4` | `Roots_infozub-review.jpeg` |
| `/wp-content/uploads/2025/02/Senbagam-Paints-Square.mp4` | none |
| `/wp-content/uploads/2025/02/PHOENIX-INFOWAYS-1-1.mp4` | none |
| `/wp-content/uploads/2025/02/Infozub-Review-Aarthi-Motor-1-1-2.mp4` | `Aarthi-motors_infozub-review.jpeg` |
| `/wp-content/uploads/2025/02/valam-1-1-HD.mp4` | `Valamorganic_infozub-review.jpeg` |
| `/wp-content/uploads/2025/02/Arima-Review-Story.mp4` | `Arima_infozub-review-1.jpeg` |

- SEO considerations:
  - Title: `Reviews - INFOZUB`
  - Meta description: empty
  - Canonical: `https://infozub.com/reviews/`
  - Robots: index, follow
  - No H1
- Migration notes: Written testimonials on the homepage are a different set from these videos. Both need to be kept if the goal is to preserve existing content.

### Payments

- Existing page: Payments
- Existing URL: https://infozub.com/payments/
- WordPress ID: 268
- Purpose: Published payment instructions.
- Important sections: “Payments Options”; “Credit Card Payments” with Pay Now; GST and INR bank block; notes on NEFT/RTGS/IMPS, cheque/DD, PayPal, and wire transfer.
- Content that must be preserved: GSTIN `33AAGCI5436F1ZR`; bank block as printed (State Bank of India, account name INFOZUB Private Limited, account number 40822677559, current account, branch Palladam, IFSC SBIN0022022); the five payment notes.
- Images/assets required: `india-flag.png`, shared chrome.
- Forms: none.
- Links: `https://rzp.io/l/infozub` (“Pay Now”). A HEAD request returned HTTP 200 with an empty body from an AWS load balancer. The checkout amount, description, and currency were not visible. **TODO - NEEDS VERIFICATION**.
- SEO considerations:
  - Title: `Payments - INFOZUB`
  - Description: `Read our refund policy & terms and conditions before making the payment. Once you make the payment, it is accepted that you have agreed on the same`
  - Canonical: `https://infozub.com/payments/`
  - H1s: `Payments Options` and `Credit Card Payments`
- Migration notes: PayPal and wire transfer are mentioned as accepted. No PayPal URL, PayPal email, SWIFT code, or correspondent-bank details are on the page. **TODO - NEEDS VERIFICATION**.

### Terms & Conditions

- Existing page: Terms & Conditions
- Existing URL: https://infozub.com/terms/
- WordPress ID: 291
- Purpose: Refund, cancellation, web-design, SEO, privacy, and website terms. This is the page the footer “Terms & Privacy” link opens.
- Important sections: No Refund Policy; Cancellation Policy; Web Design and Development; Search Engine Optimisation; a second “Privacy Policy” block; disclaimer; re-marketing opt-out; terms of use through choice/opt-out.
- Content that must be preserved: the full text in `docs/content-inventory.md`. It is the binding copy currently published.
- Images/assets required: shared chrome only.
- Forms: none. The opt-out section says visitors can use “the above Request form”. No form is rendered above that sentence.
- Links: `logesh@infozub.com` for re-marketing opt-out help. The words “visit this page” are not a hyperlink. **TODO - NEEDS VERIFICATION** for the opt-out URL. Gravatar is not linked here. External stock sites are on the Copyrights page, not here.
- SEO considerations:
  - Title: `Terms & Conditions - INFOZUB`
  - Description: `Find the general terms and conditions, the cancellation & refund policies of INFOZUB. For more queries contact us info@infozub.com`
  - Canonical: `https://infozub.com/terms/`
  - H1: `Terms & Conditions`
- Migration notes: This page says “INFOZUB Ltd.” and “Unless otherwise stated, the services featured on this website are only available within the United Kingdom.” The rest of the site markets and addresses offices in Tamil Nadu. The Data Protection Act 1998 is cited. Customer data use for Facebook re-marketing and email campaigns is stated explicitly. These conflicts are published facts, not corrections.

### Privacy Policy

- Existing page: Privacy Policy
- Existing URL: https://infozub.com/privacy-policy/
- WordPress ID: 3
- Purpose: A separate WordPress sample privacy policy. It is not linked from the footer.
- Important sections: the standard WordPress headings listed in the content inventory. Several headings have no paragraph under them.
- Content that must be preserved: the non-empty paragraphs, including “Our website address is: http://infozub.com.” and the Gravatar link `https://automattic.com/privacy/`.
- Images/assets required: shared chrome only.
- Forms: a Divi sidebar search widget, `form.searchform`, method not uniquely important, action `https://infozub.com/`, text field name `s`, submit button. It appears because this page uses the theme sidebar. It was not found on the Divi full-width pages.
- Links: Automattic privacy policy.
- SEO considerations:
  - Title: `Privacy Policy - INFOZUB`
  - Description: `Understand how we handle your data at INFOZUB. We ensure to take maximum care when it comes to privacy and data.`
  - Canonical: `https://infozub.com/privacy-policy/`
  - H1: `Privacy Policy`
- Migration notes: Empty headings, verified with no following paragraph: Contact forms, Analytics, Who we share your data with, Your contact information, How we protect your data, What data breach procedures we have in place, What third parties we receive data from, What automated decision making and/or profiling we do with user data, Industry regulatory disclosure requirements. The page still says comments and user accounts are collected. The public site has 0 posts and no comment form was rendered. This policy disagrees with the privacy text inside `/terms/`.

### Copyrights

- Existing page: Copyrights
- Existing URL: https://infozub.com/copyrights/
- WordPress ID: 329
- Purpose: Image-source credits and a DMCA contact statement.
- Important sections: image credits; text-content ownership; copyright-claims contact line; DMCA statement.
- Content that must be preserved: the full short page, including the three stock-site URLs.
- Images/assets required: shared chrome only.
- Forms: none.
- Links: `https://pixabay.com/`, `https://www.pexels.com/`, `http://www.freepik.com/`.
- SEO considerations:
  - Title: `Copyrights - INFOZUB`
  - Description: `All the text content and Images in website is owned by INFOZUB Team. For any concerns mail us at info@infozub.com.`
  - Canonical: `https://infozub.com/copyrights/`
  - H1: `Copyrights & DMCA`
- Migration notes: The page says site images are royalty-free stock and that infographics were made from those sources. It also says text was written by the INFOZUB team or external writers. Individual asset licenses were not attached to each file. **TODO - NEEDS VERIFICATION** before reusing third-party images in a new design.

### Thank You

- Existing page: Thank You
- Existing URL: https://infozub.com/thanks/
- WordPress ID: 1610
- Purpose: Confirmation page.
- Important sections: “Thank You”; “We have received your contact information. We will get in touch with you soon!”; phone `+91 99 44 64 00 33`.
- Content that must be preserved: those three lines.
- Images/assets required: shared chrome.
- Forms: none.
- Links: `tel:+919944640033`.
- SEO considerations:
  - Title: `Thank You - INFOZUB`
  - Description: `Thank you for getting in touch with us. We have received your contact information we will reach you at the earliest.`
  - Canonical: `https://infozub.com/thanks/`
  - Robots: index, follow
  - H1: `Thank You`
- Migration notes: No audited Divi form contains a redirect to this URL. OpnForm success text is shown inside the form instead. **TODO - NEEDS VERIFICATION** whether any live form still redirects here.

### Infozub Landing Page

- Existing page: Infozub Landing Page
- Existing URL: https://infozub.com/infozub-landing-page/
- WordPress ID: 2202
- Purpose: Standalone lead-generation page with its own Divi form and a second phone number.
- Important sections: phone and email bar; H1 and Divi form; “Why Your Business Need Digital Marketing”; “People We Work With” logo row; six service descriptions; “Why INFOZUB” with eight points; the same seven testimonials.
- Content that must be preserved: H1, service paragraphs (Social Media Marketing, SEO, Google Ads, Influencer Marketing, Email Marketing, Website Designing and Development), and the eight “Why INFOZUB” points. Phone on this page is `+91 93 22 33 88 22` (`tel:919322338822` and `tel:9322338822`). Email is `info@infozub.com`.
- Images/assets required: `Infozub.png` (alt `INFOZUB`), and unlabeled logos `mant.png`, `renacon.png`, `pfrc.png`, `rkg-ghee.jpg`, `kumaran-hospital.jpg`, `sr-jungle-resort.jpg`, `sccd.jpg`, `KIEC.jpg`, `Food-buddies.jpg`, `lokhaa.jpg`, `bea.jpg`.
- Forms: Divi contact form posting to `https://infozub.com/infozub-landing-page/`. Fields: Name, Phone Number, Email Address, Company Name, Marketing Budget, How did you Know about us?, Submit. Budget options: `50,000 to 1 Lakh`, `1 Lakh to 3 Lakh`, `3 Lakh to 5 Lakh`, `Above 5 Lakh`. Source options: `Facebook / Instagram`, `Google`, `LinkedIn`, `Email / Whatsapp`, `Referral`. Hidden WordPress nonce fields are also present.
- Links: phone and email only, plus the form post.
- SEO considerations:
  - Title: `Infozub Landing Page - INFOZUB`
  - Meta description: empty
  - Canonical: `https://infozub.com/infozub-landing-page/`
  - Robots: index, follow
  - H1: `Grow Your Business Faster and Smarter Partner with Digital Marketing Experts Today`
- Migration notes: Indexed campaign URL with an empty description. Not in the menu.

### INFOZUB Digital Marketing

- Existing page: INFOZUB Digital Marketing
- Existing URL: https://infozub.com/infozub-digital-marketing/
- WordPress ID: 2571
- Purpose: Second campaign landing page, with a video and a Divi form.
- Important sections: H1 and subhead; “About Digital Marketing Services!!” plus form; six “Why You Need To Choose Us!” lines; the same counters; “People We Work With”; question prompt; testimonials; the same six service descriptions used on the other landing page.
- Content that must be preserved: H1 “Providing The Best Services & Branding Identity”; the six belief/result lines; counters; service paragraphs.
- Images/assets required: `Infozub_fav-01.png` and the same unlabeled client row as the other landing page.
- Embedded content: `https://infozub.com/wp-content/uploads/2023/08/Digital-Marketing-Services-by-INFOZUB-1080p60.mp4`.
- Forms: Divi contact form posting to this page. Fields: Name, Phone Number, Email Address, Company Name, Marketing Budget, How did you know about us?, Submit. Budget options: `50K to 1 Lakh`, `1 Lakh to 3 Lakhs`, `3 Lakhs to 5 Lakhs`, `Above 5 Lakhs`. Source options: `Facebook / Instagram`, `Google`, `LinkedIn`, `Email / WhatsApp`, `Referral`.
- Links: `tel:+919944640033` labeled “Call: 99 44 64 00 33”.
- SEO considerations:
  - Title: `INFOZUB Digital Marketing - INFOZUB`
  - Meta description: empty
  - Canonical: `https://infozub.com/infozub-digital-marketing/`
  - Robots: index, follow
  - H1s: `Providing The Best Services & Branding Identity` and `Need Assistance? Please Fill The Form`
- Migration notes: Also indexed, with no description, and not in the menu. Counter values match the homepage exactly.

---

## Services named on the site

From Digital Suite tiles, with the published one-line description:

| Service | Published line |
| --- | --- |
| Facebook Ads | Reach your customers on Facebook, most popular social media platform. |
| Instagram Ads | Elevate your brand presence on with Instagram, where images speak. |
| Google Ads | When people search for your product or service, be visible to them. |
| Youtube Ads | Non-skippable ads where your audience consume video content. |
| Twitter Ads | Tweet, Tweet., we run ads on Twitter too! Give it a try. |
| LinkedIn Ads | Reach your audience on the world’s largest professional network. |
| GMB Ads | Hyper local marketing with GMB helps you to get more Business Deals. |
| Cloud Solutions | Your business operations on the Cloud, managed by us. |
| Creative Designing | Irresistible creatives that grab digital attention from your audience. |
| Sales Support | We support your sales by offering SOP and Lead verification support. |
| Social Management | We Manage your Social Media Channels Professionally. |
| Cloud Telephony | Receive and Make Calls from the Cloud, with complete statistics. |
| Lead Management | Customized Lead Management web app. |
| Website Development | We create Awesome Website for your business. |
| Influencer Marketing | Build brand affinity and reach out to new audiences. |

Homepage tiles use a shorter set and add “Technology Support” and “Voice Calling”, without descriptions. Landing pages add longer paragraphs for Social Media Marketing, Search Engine Optimization, Google Ads, Influencer Marketing, Email Marketing, and Website Designing and Development.

Strength labels, repeated without descriptions: Advanced Ad Targeting, Personalized Ads, Cloud Telephony, Irresistible Creatives, Management SOP, MIS Reporting. Closing line: “State-of-the-art Technology Infrastructure!”

Certifications, repeated on About and Digital Suite:

- Facebook Certified Digital Marketing Associate
- Facebook Certified Marketing Science Professional
- Facebook Certified Creative Strategy Professional
- Google Search Ads Certified
- Google Display Ads Certified
- Google Video Ads Certified
- Google Tag Manager Certified
- Google Analytics Certified
- Google Search Console Certified

Certificate ID numbers are not printed. **TODO - NEEDS VERIFICATION**.

## Products

The only named in-house product/venture is Digital Academy. “More Exciting Stuffs / Coming Soon!” is the rest of `/ventures/`.

“Premier Digital Suite” is described as a service package, not as a separate software product page. “Lead Management / Customized Lead Management web app” and “Cloud Telephony” are service names. No product URL, login, or download is published. **TODO - NEEDS VERIFICATION** if those apps exist outside this website.

## Counters (hardcoded)

Same `data-number-value` on Home, About, Digital Suite, both city pages, and the digital-marketing landing page:

| Label | Value |
| --- | --- |
| Years of Digital Experience | 10+ |
| Years of Digital Marketing Experience | 10+ |
| Digital Marketing Projects Handled | 130+ |
| Leads Generated in Last 12 Months | 170000+ |
| Ad Impressions in Last 12 Months | 47000000+ |

Named case studies:

| Client text | Figures |
| --- | --- |
| Suzuki Motorcycle (Tamilnadu) | 84,000+ leads generated; 52,000+ leads verified (tele calling); 3200+ vehicles booked |
| Bharath Electronics and Appliances | 40,000+ leads generated; 1M+ digital impressions / month; state-of-the-art technology support |

## Testimonials

Seven written testimonials, same text on Home, Digital Suite, both city pages, and both campaign landings:

1. Saravanan C
2. Yagappa Photography
3. Mounika Kattamuri
4. Lakshmi Prabha
5. Vignesh M
6. Dharmaraj Arumugam
7. Azfar S

Full sentences are in the content inventory. No star ratings, dates, or profile links are in the HTML.

Eight video reviews are only on `/reviews/`.

## Forms

### OpnForm: Contact - INFOZUB

- Embed: `https://forms.infozub.com/forms/contact-infozub-tgwsra`
- Used on: `/contact/`
- API record updated: 2025-09-30
- Description HTML: `<h2>GET IN TOUCH</h2>`
- Submit button: Submit
- Captcha: off
- Success text: “We have received your contact information. We will get in touch with you soon!” plus a call link to `+91 99 44 64 00 33`.

| Field | Type | Required | Options |
| --- | --- | --- | --- |
| Name | text | yes | |
| Email | email | yes | |
| Phone Number | phone_number | yes | |
| Select | select | yes | Digital Marketing Suite; Website Development; Join Course; Career; Others |
| Message | text | yes | |

### OpnForm: INFOZUB - Digital Marketing Suite

- Embed: `https://forms.infozub.com/forms/infozub-digital-marketing-suite-hfhzbg`
- Used on: `/digital-suite/`, `/digital-suite/coimbatore/`, `/digital-suite/tirupur/`
- Description HTML: `<h1>Get Digital Marketing Quote from INFOZUB!</h1>`
- API record updated: 2024-06-28
- Success text: “Thank You / We have received your contact information. We will get in touch with you soon!” plus the same phone.

| Field | Type | Required | Options |
| --- | --- | --- | --- |
| Business Name | text | yes | |
| Business Type | text | yes | |
| Business URL | text | yes | |
| Business Email | email | yes | |
| Have You Done Digital Marketing Before? | select | yes | Yes; No |
| Do You Have Sales / Marketing Team? | select | yes | Yes; No |
| Name | text | yes | |
| Your Desgination | text | yes | spelling as published |
| Mobile Number | phone_number | no | |
| Business Registration Type | select | yes | Private Limited Company; Public Limited Company; Partnership; Proprietorship; Other / Not Registered |

### OpnForm: Job Application

- Embed: `https://forms.infozub.com/forms/job-application-pb91hk`
- Used on: `/careers/apply/`
- API record updated: 2024-02-19
- Success text: “Amazing, we saved your answers. Thank you for your time and have a great day!”

| Field | Type | Required | Options |
| --- | --- | --- | --- |
| Designation you wish to Apply | select | yes | Digital Marketing Executive; Digital Marketing Team Leader; Digital Marketing Manager; Senior Tele Sales Executive; Business Development Executive; Senior Business Development Executive; Business Development Team Leader; Internship |
| Name | text | yes | |
| Phone Number | phone_number | yes | |
| Email | email | yes | |
| City | text | yes | |
| Work Location Preference | select | yes | INFOZUB Private Limited, Palladam; INFOZUB Private Limited, Tirupur (Avinashi Road) |
| Educational Qualification | select | yes | High School; Bachelor's Degree; Master's Degree; Doctorate Degree |
| Are You Currently Employed | select | yes | Yes; No |
| Have You Been Self-Employed | select | yes | Yes; No |
| Enter your previous experiences | text | yes | |
| Achievements / Recognitions | text | yes | |
| The project(s) that you worked so far | text | yes | |
| Your Social Profile URL (Optional) - LinkedIn / Instagram | text | no | |
| Upload your resume | files | yes | |

The “Avinashi Road” Tirupur location is not the same street address as Alagendira Towers, Bungalow Stop. **TODO - NEEDS VERIFICATION** whether it is a second Tirupur office.

### Divi forms

Documented on the two landing-page records above. They post back to their own URLs. No success redirect to `/thanks/` was present in the HTML.

### Search

Sidebar search on `/privacy-policy/` only. Field name `s`. Action `https://infozub.com/`.

## Blog and news

No posts are published. Yoast does not emit a post sitemap. There is no news or blog section on the homepage. The Uncategorized category URL exists and has no posts.

## Downloadable files

No PDF, DOC, XLS, PPT, ZIP, or CSV links were found in the 20 pages. The media endpoint’s public files are images and MP4 videos only. Course copy mentions “Resources like PDFs, Templates, Checklists and more” as an academy benefit. Those files were not on infozub.com. **TODO - NEEDS VERIFICATION** on `academy.infozub.com`.

## Media library

`X-WP-Total` for `/wp-json/wp/v2/media` was 358 on 6 October 2026. A four-page public fetch returned 338 records: 240 PNG, 82 JPEG, 7 WebP, 9 MP4. The 20-item difference was not explained by the API. **TODO - NEEDS VERIFICATION**.

Page-by-page image filenames are in `docs/content-inventory.md`. Favicon files:

- `https://infozub.com/wp-content/uploads/2021/07/cropped-Infozub-favicon-32x32.png`
- `https://infozub.com/wp-content/uploads/2021/07/cropped-Infozub-favicon-192x192.png`
- `https://infozub.com/wp-content/uploads/2021/07/cropped-Infozub-favicon-180x180.png`

Schema logo: `http://infozub.com/wp-content/uploads/2021/08/infozub-logo-hd-square.jpg` (2000×2000, caption INFOZUB).

Many content images in the Yoast sitemap use `http://` rather than `https://`.

## External and subdomain links

| URL | Where | Checked |
| --- | --- | --- |
| https://academy.infozub.com/ and nine `/course/tamil/...` paths | Courses | Homepage and two course titles returned HTTP 200 |
| https://forms.infozub.com/forms/... | Contact, Digital Suite, city pages, Apply | HTTP 200, OpnForm |
| https://chat.infozub.com | Typebot `apiHost` | Conversation content not fetched |
| https://connect.infozub.com/WhatsApp | Digital Suite and city pages | HTTP 404 |
| https://rzp.io/l/infozub | Payments | HEAD HTTP 200, empty body |
| https://pixabay.com/ | Copyrights | linked only |
| https://www.pexels.com/ | Copyrights | linked only |
| http://www.freepik.com/ | Copyrights | linked only |
| https://automattic.com/privacy/ | Privacy Policy | linked only |
| Social profiles | Header/footer and schema | listed above |

## SEO metadata gaps

Pages with an empty meta description, all still `index, follow`:

- https://infozub.com/web/
- https://infozub.com/infozub-landing-page/
- https://infozub.com/infozub-digital-marketing/
- https://infozub.com/careers/apply/
- https://infozub.com/reviews/

Homepage Open Graph image is a 300×41 logo. Several Open Graph URLs are HTTP. Twitter card type on the homepage is `summary_large_image`.

There is no blog sitemap, no video sitemap on the main domain, and `robots.txt` disallows nothing (`Disallow:` empty).

## Business facts that must stay attached to the content

- Offices printed on the marketing pages: Tiruppur (Alagendira Towers, Bungalow Stop, 641602) and Palladam (271 A3, Chinnaiyah Garden, Kosavampalayam Road, 641664).
- Phones: `+91 99 44 64 00 33` site-wide; `+91 93 22 33 88 22` on the consultancy FAQ and on `/infozub-landing-page/`.
- Emails: `info@infozub.com` generally; `logesh@infozub.com` for re-marketing opt-out help.
- Hours, from the Digital Suite FAQ: 09AM to 05PM, Monday to Friday. Not 24×7. Public holidays off, with social posts scheduled ahead.
- Digital Suite FAQ: monthly retainer; no contract on Digital Suite; 6-month minimum on SMB and Consultancy; no refunds; upgrades or downgrades at the end of a billing cycle.
- Custom plan “starting at ₹ 35,000 / Month (Incl. GST)”. SMB package “at just ₹15,000”.
- Payments page bank and GST details as printed.
- Working model phrase: “Build, Operate and Manage”.

## Migration issues

1. Three published legal names disagree: INFOZUB Ltd., INFOZUB Private Limited, and INFOZUB®.
2. Terms say the website’s services are available within the United Kingdom. Offices, maps, phone numbers, and city pages are in Tamil Nadu.
3. Two different privacy texts exist (`/terms/` and `/privacy-policy/`). The footer opens only `/terms/`.
4. The re-marketing opt-out sentence has no destination URL, and it refers to a request form that is not on the page.
5. `https://connect.infozub.com/WhatsApp` is linked and returns 404.
6. Indexed pages are missing from navigation: `/web/`, `/reviews/`, `/careers/apply/`, `/privacy-policy/`, both campaign landings, and `/thanks/`.
7. `/careers/` tells people to email a resume and does not link to the application form. The form’s location list adds “Tirupur (Avinashi Road)”, which is not on the office block.
8. The Google Ads course image links to the Business Success Formula course.
9. Five indexable pages have an empty meta description. Homepage social image is a thin logo over HTTP.
10. Client logos and most icons have empty alt text. Client legal names are not written on `/clients/`.
11. “Last 12 months” counters are static. Homepage content was last modified in 2022. Experience claims also appear as 7+, 9+, and 10+.
12. Team size is “30+” on the homepage and “25+” in the 2021 timeline entry.
13. Digital Suite names Silver through Ultimate meeting tiers without publishing those packages. Website prices on `/web/` are a separate offer, and “PER 10 MONTHS” is unexplained on the page.
14. PayPal and wire transfer are claimed without published account coordinates. The Razorpay link’s checkout contents were not visible.
15. Academy lessons, prices, and downloadable course files live on `academy.infozub.com`, which was not fully audited.
16. No documents are in the main media library. Nine review/promo videos are.
17. Public media count is 358 in the header and 338 in the fetched pages.
18. Contact Form 7 is hinted in HTML and has no rendered form. Tawk.to is named in legal copy; the widget actually loaded is Typebot.
19. `/web/` has an FAQ heading and no questions. Several privacy headings are empty.
20. The contact hero shows a Tirupur Office heading without the street address that appears lower on the same page.
21. Menu configuration could not be confirmed from the REST API (HTTP 401). Rendered HTML was used instead.
22. There is no blog to migrate. A `project` content type exists and is empty.
