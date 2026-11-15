---
name: EventHub Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#822c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#aa3b00'
  on-tertiary-container: '#ffd1c1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  mono-metric:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-tablet: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends the operational precision and keyboard-driven efficiency of Linear with the vibrant, social momentum of Eventbrite. It is engineered for modern event organizers, ticketing directors, and production managers navigating fast-moving operations, ticket tiers, schedule conflicts, and live-event telemetry.

### Visual Aesthetic & Philosophy
- **Modern Tactical SaaS:** Pristine light mode clarity built on layered off-white zinc and slate surfaces, offset by vibrant electric indigo/violet primary actions.
- **Controlled Excitement:** High-energy amber and coral-orange accents bring urgency and warmth without compromising executive legibility.
- **Architectural Micro-Surfaces:** Layouts rely on ultra-fine 1px architectural micro-borders, generous inner padding, and whisper-soft multi-stop drop shadows to produce tactile separation without heavy visual weight.
- **Tone & Voice:** Purposeful, sharp, reliable, and fluid. Interactions feel instantaneous, data-dense yet breathe naturally.

## Colors

The palette leverages a crisp white core, structured slate neutrals, an electric indigo-purple primary scale, and warm amber-orange accents for statuses, ticket sales thresholds, and alert states.

### Core Role Assignments
- **Primary (`#4F46E5` / `#6366F1` / `#7C3AED`):** Primary interactions, confirmed states, selected schedule blocks, and checkout conversions.
- **Secondary (`#7C3AED`):** Secondary interactive accents, VIP tier markers, analytics highlights, and focused interactive highlights.
- **Tertiary & Warm Accents (`#EA580C` / `#F59E0B` / `#FF7849`):** Live status beacons, capacity warnings, "Selling Fast" badges, and real-time alerts.
- **Neutrals (`#0F172A` Slate 900 down to `#F8FAFC` Slate 50):** 
  - Canvas Root: `#FFFFFF`
  - Subtle Section Fill: `#F8FAFC`
  - Recessed Containers / Inputs: `#F1F5F9`
  - Hairline Borders: `#E2E8F0`
  - Subtle Text: `#64748B`
  - Body Text: `#334155`
  - Dominant Headings & High-Contrast Accents: `#0F172A`

## Typography

Typography establishes an editorial yet engineered rhythm. Headings utilize `Plus Jakarta Sans` for geometric authority, crisp terminals, and energetic letterforms. Body copy, UI labels, form controls, and tabular telemetry leverage `Inter` for clarity under high information density.

### Hierarchy & Usage
- **Display & Headings:** Tightly tracked headings (`-0.02em` to `-0.03em`) avoid loose letter shapes and provide a polished software product appearance.
- **Numbers & Metrics:** Tabular figures (`tnum`) must be enforced for attendee counters, revenue metrics, seat availability badges, and timestamp readouts.
- **Labels & Micro-text:** Capitalize labels conservatively; avoid all-caps except for category badges and ticket status pills (`label-sm`).

## Layout & Spacing

The layout philosophy follows a responsive 12-column fluid grid system bounded by max-width containers for administrative consoles (`1440px`) and focused checkout flows (`1040px`).

### Grid & Breakpoints
- **Mobile (< 768px):** 4-column layout, `1rem` outer margins, `1rem` gutters. Toolbars collapse to sticky bottom sheets.
- **Tablet (768px - 1024px):** 8-column layout, `1.5rem` outer margins, `1rem` gutters. Metric strips collapse to a 2x2 grid.
- **Desktop (1024px - 1440px):** 12-column layout, `2rem` outer margins, `1.5rem` gutters. Multi-pane operational views (navigation + master list + detail drawer).
- **Wide Screens (> 1440px):** 12-column fixed-max layout centered with automatic margins.

### Spacing Principles
- Density changes contextually: high-density table views and event runs-of-show use `space-xs` and `space-sm` row padding.
- Dashboard cards and high-level summaries breathe using `space-lg` internal card padding.

## Elevation & Depth

This design system avoids heavy drop shadows, opting for subtle multi-stop ambient shadows combined with 1px border definition.

### Layering Archetypes
- **Level 0 (Flat / Canvas):** Surface color `#FFFFFF` or `#F8FAFC`, no shadow, delineated strictly by 1px solid `#E2E8F0` micro-borders.
- **Level 1 (Cards, Metric Tiles):** Multi-layered ambient shadow:
  - `0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.05)`
  - Outlined with `1px solid #E2E8F0`
- **Level 2 (Popovers, Dropdowns, Date Pickers):**
  - `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`
  - Outlined with `1px solid #CBD5E1`
- **Level 3 (Modals, Slide-over Drawers):**
  - `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`
  - Paired with backdrop blur overlay: `rgba(15, 23, 42, 0.4)` over `blur(4px)`

## Shapes

The geometric personality features balanced rounded geometry.

### Radius System
- **Cards, Panels, & Surfaces:** `1rem` (16px, `rounded-xl`) and `1.5rem` (24px, `rounded-2xl`) for primary structural containers.
- **Buttons, Inputs, & Form Selectors:** `0.5rem` (8px, `rounded-md`) providing a structured, modern software feel.
- **Pills, Badges, & Status Chips:** Full pill radius (`9999px`) to differentiate atomic tags and status labels from interactive buttons.
- **Micro Elements:** Checkbox and swatch elements use `0.25rem` (4px).

## Components

### Buttons
- **Primary:** Solid `#4F46E5` background, white label (`label-lg` or `label-md`), `rounded-md` (8px), subtle inset top shadow `inset 0 1px 0 rgba(255, 255, 255, 0.15)`. On hover: `#4338CA`.
- **Secondary:** White background, `#0F172A` text, 1px solid `#E2E8F0`, ambient shadow Level 1. On hover: `#F8FAFC` fill, `#CBD5E1` border.
- **Tertiary / Ghost:** Transparent background, `#475569` text. Hover: `#F1F5F9` fill, `#0F172A` text.
- **Destructive:** Soft red wash (`#FEF2F2`), `#DC2626` text, border 1px solid `#FEE2E2`. Hover: `#DC2626` background, white text.

### Chips & Status Badges
- Constructed with full-pill radius (`9999px`), `label-sm` (11px, 600 weight), `py-0.5 px-2.5`.
- **Live / Active Event:** Background `#ECFDF5`, text `#059669`, with a pulsing 6px `#10B981` dot.
- **Selling Fast / High Demand:** Background `#FFF7ED`, text `#EA580C`, with a small ember glyph.
- **Sold Out / Past:** Background `#F1F5F9`, text `#64748B`.
- **Draft / In Review:** Background `#EEF2FF`, text `#4F46E5`.

### Input Fields & Controls
- **Text Inputs:** Height 40px, padding `0 12px`, background `#FFFFFF`, border 1px solid `#CBD5E1`, border-radius 8px. Text size `14px` (`body-md`).
  - **Focus State:** 1px solid `#4F46E5`, paired with outer ring: `0 0 0 3px rgba(79, 70, 229, 0.15)`.
- **Checkboxes & Radios:** 18px x 18px. Radios use full pill; checkboxes use 4px radius. Checked state uses solid `#4F46E5` with sharp white glyphs.

### Cards & Panels
- **Event Metric Card:** White canvas, 1px solid `#E2E8F0`, 16px corner radius (`rounded-xl`), 20px internal padding. Includes title, mono metric counter (`mono-metric`), and delta sparkline.
- **Interactive Ticket Tier Card:** Hover transition with border shift from `#E2E8F0` to `#6366F1`, Level 2 elevation lift, and right-hand action icon toggle.

### Lists & Tables
- Table headers: `#F8FAFC` background, 1px top and bottom `#E2E8F0` borders, `label-md` tracked caps in `#64748B`.
- Table rows: Minimum 48px height, single-line border-bottom `#F1F5F9`, alternating hover background `#F8FAFC`.