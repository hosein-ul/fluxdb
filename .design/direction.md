# Design Direction: Modern Industrial Engineering (FluxDB Studio)

## Concept
A bespoke, high-precision engineering console for distributed database architecture (Linear / Raycast / Datadog grade). Replaces the generic AI-slop blue-gradient SaaS look with a tactile, dark graphite slate foundation and high-voltage Electric Cadmium Amber surgical accents.

## Typographic System
- **Display & Headlines:** Cabinet Grotesk / General Sans (via Fontshare CDN / Google Fonts), set with tight negative tracking (`tracking-[-0.035em]`) and high weight contrast (800 Extrabold vs 300 Light).
- **Body & Controls:** General Sans / DM Sans (400 Regular, 500 Medium, 600 Semibold).
- **Code & Telemetry:** Geist Mono / Fragment Mono (`tabular-nums font-mono`), crisp 11px/13px for data structures, types, constraints, and SQL AST diffs.
- **Micro-labels:** High-density uppercase with wide letter-spacing (`text-[10px] uppercase tracking-[0.12em] font-mono text-[#8B9BB4]`).

## Color System (60-30-10 Rule)
- **Foundation 60%:** Graphite Slate `#0B0E14` (neutral base), Deep Inset Wells `#070A0F`.
- **Structural 30%:** Elevated Surface `#121722`, Surface Inset `#0E121B`, Hairline Borders `#1C2436`, Strong Borders `#28354D`.
- **Surgical Accent 10%:**
  - Cadmium Amber Core: `#F59E0B`
  - Cadmium Deep/Hover: `#D97706`
  - Cadmium Glow/Soft: `rgba(245, 158, 11, 0.12)`
  - Cadmium Border: `rgba(245, 158, 11, 0.35)`
- **Functional Semantics:**
  - Primary Key Badge: Amber `#F59E0B`
  - Foreign Key Badge: Cyan-Slate `#38BDF8`
  - Unique / Index: Emerald `#10B981`
  - Text Primary: Crisp Ivory `#F1F5F9`
  - Text Secondary: Muted Steel `#94A3B8`
  - Text Tertiary: Deep Slate `#64748B`

## Interaction & Motion
- **6-State Elements:** default, hover, physical active (`active:scale-[0.98]` or `active:translate-y-0.5`), focus-visible (2px ring amber/40 with offset), disabled, loading.
- **Tactile Details:** `kbd` shortcut badges, status telemetry indicators, recessed wells with inner shadow, crisp 1px borders.
- **Zero-Tolerance Slop Blocklist:**
  - NO sparkle pills (`✨`)
  - NO fake avatars or fake testimonials
  - NO centered generic H1 with blue gradients
  - NO generic 3-box pastel icon grids
