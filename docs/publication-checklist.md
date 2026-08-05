# Portfolio Publication Checklist

Status: Required internal release gate. Complete immediately before every public deployment.

Do not launch while any required item is incomplete. Record evidence in the deployment review or pull request without committing credentials, personal records, or confidential material.

## Content and Identity

- [ ] Every public claim originates from `brand-source-of-truth.md` and its authoritative verification records.
- [ ] Company names, founder titles, founded years, addresses, email addresses, and phone numbers match the approved records exactly.
- [ ] LinkedIn and GitHub URLs resolve to the intended public profiles.
- [ ] Personal email addresses, additional personal phone numbers, and personal-location inferences are absent.
- [ ] MacroCloud services, platform capabilities, prototypes, research previews, and roadmap items use their verified maturity labels.
- [ ] PROSKILL IT Technologies replaces the superseded public brand name throughout visible content, metadata, and structured data.
- [ ] No testimonial, customer, employer, partner, certification, or client claim appears without publication approval.

## Metrics and Evidence

- [ ] Every number has a publication decision in `metrics-registry.md`.
- [ ] Time-sensitive facts, including the public GitHub repository count, were revalidated on the release date.
- [ ] Held and prohibited metrics are absent from visible copy, metadata, structured data, images, diagrams, and scripts.
- [ ] Case studies use only approved owner-controlled or sanitized evidence.
- [ ] Outcomes are qualitative unless a verified metric explicitly authorizes numeric wording.

## Media, Rights, and Confidentiality

- [ ] Every published image, logo, icon, diagram, screenshot, animation, badge, video, and font has an approved entry or documented license.
- [ ] MacroCloud and PROSKILL IT Technologies brand assets use approved local source files.
- [ ] Employer and client logos are absent unless explicit rights and naming permission are documented.
- [ ] No internal dashboards, client diagrams, presentations, meeting screenshots, employee photographs, customer cloud-console screenshots, or confidential documents appear.
- [ ] Images and screenshots contain no secrets, personal data, customer data, production identifiers, internal URLs, or unsupported product claims.
- [ ] Required attribution and license notices are present.

## Repository and Security

- [ ] Every featured repository passes the repository classification, documentation, provenance, security, and license gates.
- [ ] `azure-ddns` remains excluded unless its credential review is resolved and the security hold is formally lifted.
- [ ] The repository and generated site pass a secrets scan.
- [ ] No credentials, tokens, private endpoints, production IP addresses, internal hostnames, or confidential configuration are present.
- [ ] Dependencies and externally loaded resources have justified versions, integrity controls where applicable, and acceptable licenses.
- [ ] Contact and external-link behavior does not expose sensitive data through URLs, logs, analytics, or third-party services.

## Functionality and Links

- [ ] All navigation, CTAs, internal links, anchors, downloads, email links, phone links, social links, and repository links work.
- [ ] No CTA advertises an unavailable demo, platform signup, free trial, customer portal, or shipped roadmap capability.
- [ ] Contact forms are disabled unless real delivery, validation, failure handling, spam protection, privacy disclosure, and confirmation are tested.
- [ ] JavaScript-disabled and network-failure states retain essential content and contact information.
- [ ] No console errors, uncaught exceptions, mixed content, or broken assets remain.

## Accessibility and Responsive Behavior

- [ ] Semantic landmarks, heading order, page titles, language, labels, and alternative text are correct.
- [ ] Navigation, dialogs, disclosures, and forms are fully keyboard accessible with visible focus.
- [ ] Automated checks and manual review meet the WCAG 2.2 AA baseline.
- [ ] Text and meaningful UI boundaries meet required contrast ratios.
- [ ] Reduced-motion, forced-colors, zoom at 200%, and text-spacing overrides remain usable.
- [ ] Layout is validated at 320px, 640px, 768px, 1024px, 1280px, and 1440px without unintended overflow.
- [ ] Touch targets are at least 44px and usable on representative mobile devices.

## SEO and Structured Data

- [ ] Each page has a unique, verified title and meta description.
- [ ] Canonical URLs, robots directives, sitemap entries, and internal links use the final production domain.
- [ ] Open Graph and social-preview assets are owned, optimized, and accurate.
- [ ] JSON-LD matches verified identity, company, contact, and capability facts and passes structured-data validation.
- [ ] Superseded domains, company names, trial claims, customer claims, and unsupported metrics are absent from metadata.
- [ ] Redirects and not-found behavior are tested where hosting supports them.

## Performance and Assets

- [ ] Images use appropriate dimensions, responsive sources, modern formats, and lazy loading below the fold.
- [ ] Fonts are self-hosted or intentionally selected, subset where practical, and do not block essential rendering.
- [ ] CSS and JavaScript are production-ready, cacheable, and free of unused effect libraries.
- [ ] Layout shift, largest content rendering, and interaction responsiveness meet the documented performance targets under representative mobile conditions.
- [ ] A production Lighthouse or equivalent audit is reviewed for performance, accessibility, SEO, and best practices.

## Privacy, Analytics, and Compliance

- [ ] Analytics are absent unless intentionally approved and configured with an appropriate privacy disclosure and consent behavior.
- [ ] No unnecessary cookies, trackers, fingerprinting, or third-party embeds are loaded.
- [ ] Published contact information follows the business-only contact policy.
- [ ] Data collection, retention, processor, and deletion behavior are documented for every enabled form or analytics service.
- [ ] License and attribution review covers code, fonts, icons, images, libraries, and copied snippets.

## Browser and Deployment Validation

- [ ] Current Chrome, Edge, Firefox, and Safari behavior is reviewed at supported viewport sizes.
- [ ] The production build or static output is tested from a clean environment.
- [ ] HTTPS, custom domain, certificate, security headers, caching, compression, and error pages are validated in the hosting environment.
- [ ] Deployment rollback is understood and the previous known-good release is recoverable.
- [ ] A final content diff confirms that only approved information will become public.

## Release Approval

| Field | Value |
| --- | --- |
| Release identifier | Pending |
| Reviewer | Pending |
| Content approval | Pending |
| Security approval | Pending |
| Accessibility approval | Pending |
| Deployment approval | Pending |
| Approval date | Pending |

Publication is authorized only when every applicable required item is complete and the release approval table is populated.
