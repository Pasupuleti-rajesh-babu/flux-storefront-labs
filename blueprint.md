You are a senior front-end performance engineer tasked with writing a complete build plan for a repository called flux-storefront-labs.
Output a single, well-structured document that contains zero code, zero placeholders, zero dummy text.
The plan must be actionable and explicit, giving another developer everything they need to implement the project, but without including any source files.

Deliver the plan in clear English using numbered sections, bullet lists, and short paragraphs.
Follow the outline below exactly.

⸻

1) Executive Summary

– One short paragraph that states the goal: create a performance-first storefront theme system with a small core and plug-in “adapters” (Liquid + generic).
– Define “done”: passes Core Web Vitals, runs on at least two adapters, Lighthouse CI green, Theme Check clean when Liquid adapter is enabled.

2) Functional Scope

List each feature area and call out what is in and out:
	1.	Layout & navigation (header, footer, mega-menu, search entry).
	2.	Homepage (hero, featured collections/products).
	3.	Collection page (product grid, tag-based filters, URL state).
	4.	Product page (gallery, sticky ATC, trust badges, low-stock logic).
	5.	Cart drawer (open/close, update, error states).
	6.	Predictive search (products + collections).
	7.	Theme settings and design tokens.
	8.	Analytics events (search, add_to_cart, checkout_start).
	9.	Support for multiple adapters (Liquid, generic HTML).
	10.	What is purposely left out (e.g., customer accounts, multilingual).

3) Architecture & Adapter Pattern

– Describe core layer (HTML templates, Tailwind CSS, vanilla JS modules).
– Explain adapter interface: how a platform adapter supplies data (JSON), partials, routing.
– Specify responsibilities of Liquid adapter vs generic adapter.
– Detail folder naming convention for adapters and how they’re selected at build time.

4) Information Architecture & Data Model

– List design tokens (colors, spacing, typography) and how they compile to CSS utilities.
– Enumerate data objects required by core (Product, Collection, Cart, SearchResult).
– Note platform-specific fields Liquid must expose (variants, metafields, price formatting).
– Tag strategy for filters: single-word tags, delimiter rules, max length.

5) UX Design Guidelines

– Header and mobile nav behavior, focus trapping, escape key.
– Hero component hierarchy and image cropping rules.
– Collection filters: checkbox UX, active chips, keyboard interaction.
– PDP layout order and sticky ATC trigger distance.
– Cart drawer animation timing, error messaging style.
– Predictive search panel open/close interactions.
– Breakpoints and tap-target sizing.

6) Performance & Core Web Vitals Targets

– Numeric targets: LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms.
– Asset policy: single CSS ≤ 40 KB gzipped, single JS ≤ 35 KB gzipped, lazy-load images, preload hero image.
– Font strategy: system stack first, minimal custom, async preload.
– Third-party scripts: allowed (analytics only) vs banned.

7) SEO & Structured Data

– Canonical handling, meta rules, open-graph tags.
– JSON-LD for Product and Breadcrumb on PDP and Collection.
– Clean URL guidelines and handle formatting.

8) Analytics & Event Map

– Define GA4 events: search_query, search_select, add_to_cart, checkout_start.
– Event parameters required (e.g., product_id, collection_id, query_length).
– Data-layer naming conventions.
– Verification checklist (GA4 debug view, network calls).

9) Accessibility Checklist

– Keyboard paths for all interactive elements.
– ARIA roles where native semantics insufficient.
– Color-contrast ratio minimums (WCAG AA).
– Screen-reader announcements for cart updates and filter changes.

10) Security & Privacy Notes

– No PII in localStorage; only cart/token if required.
– Escape dynamic content before rendering to prevent XSS.
– CSP header suggestions.

11) Tech Stack & Tooling

– HTML5, Tailwind CSS compiled via PostCSS.
– Vanilla JS; optional TypeScript flagged as “nice to have.”
– Lighthouse CI for performance gates.
– Theme Check only run when Liquid adapter present.
– Prettier + ESLint for formatting/linting.
– Node 18 LTS baseline.

12) Repository Structure (Directory-Level Only)

List top-level folders (no files):

/core       - shared templates, styles, scripts  
/adapters   - platform-specific layers (liquid/, generic/)  
/scripts    - build & deploy tooling  
.github/    - CI workflows  
docs/       - project documentation  

13) CI/CD & Quality Gates

– PR workflow: install deps, lint, build, Theme Check (if Liquid), Lighthouse CI against preview URL.
– Fail thresholds: Lighthouse categories ≥ 90, lint 0 errors, Theme Check 0 errors.
– Tagging and release policy (semver).

14) Implementation Milestones

Provide a sequenced checklist (each with “goal / actions / done when”).
Milestones: repo setup → core layout → navigation → homepage → collection filters → PDP features → cart drawer → adapters wiring → performance pass → analytics pass → CI green → docs complete.

15) Testing & QA Plan

– Unit expectations for JS modules.
– Manual paths: guest add-to-cart, filter flow, predictive search, keyboard nav.
– Cross-browser: latest Chrome, Firefox, Safari, Edge; mobile Safari + Chrome Android.
– Perf audit procedure (local LH, production LH).
– Regression checklist before tag.

16) Documentation Outline

– Quick-start, prerequisites, local dev commands.
– How to add a new adapter.
– How to configure design tokens.
– How to verify Core Web Vitals.
– Troubleshooting FAQ.

17) Risks & Mitigations

– Risk: adapter divergence → Mitigation: shared contracts + tests.
– Risk: tag bloat slows filters → Mitigation: enforce naming rules and lazy data fetch.
– Risk: JS bundle creep → Mitigation: size budgets in CI.

18) Acceptance Criteria

– All functional areas operate as described.
– Core Web Vitals meet targets on adapter demos.
– Lighthouse CI passes.
– Accessibility checklist passes.
– Documentation complete and accurate.

