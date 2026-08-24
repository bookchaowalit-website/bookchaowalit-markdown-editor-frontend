---
name: Type / Check
description: A warm editorial proofing bench for writing a small Markdown document and checking its rendered shape.
---

# Design System: Type / Check

## Overview

**Creative North Star: “The proof arrives beside the thought.”**

Type / Check is a local writing bench, not a publishing platform. The source and its lightweight proof sit beside one another like two printing plates. The page should make the loop from typing to visual checking feel immediate, quiet, and inspectable.

## Colors

- Bone `#efe9dc` is the paper ground; paper `#f8f5ed` is the writing surface.
- Ink green `#173b32` carries headings and primary actions.
- Registration red `#bd4f3e` marks the active plate and editorial instructions.
- Proof blue `#2c6282` marks preview state and links.
- Rules use muted taupe `#c7bca8`; avoid gradients and decorative shadows.

## Typography

- Display and prose use a humanist sans stack led by `Avenir Next`, with `Georgia` reserved for the rendered proof.
- Source, counts, plate labels, and controls use a compact monospace stack.
- The display voice is large but editorial, with tight leading; it must not resemble a generic SaaS hero.

## Layout

- The first view introduces the source/proof thesis, the browser-only boundary, and the two-panel writing bench.
- Source is the left plate on wide screens; proof is the right plate. On narrow screens they become a vertical reading sequence.
- Ruled lines, plate numbers, and small editorial notes provide hierarchy instead of cards or floating dashboards.

## Elevation & Depth

Depth is created by paper-on-bone contrast and registration rules. Panels remain flat; no drop shadows or glass surfaces are allowed.

## Shapes

Use square or lightly rounded editorial controls only where touch affordance needs it. Text areas are rectangular proof plates with consistent borders and no pill containers.

## Components

- **Source plate:** editable Markdown with line and character counts.
- **Proof plate:** honest lightweight rendering for headings, emphasis, links, lists, code, and quotes.
- **Plate controls:** reset sample and copy source stay near the source; they never compete with the document.
- **Boundary note:** states that parsing is local and intentionally lightweight.

## Do's and Don'ts

- Do keep source and proof visible together.
- Do show the current character/line state as useful evidence.
- Do keep the parser limitation explicit.
- Don't imply CommonMark completeness, collaboration, publishing, or cloud storage.
- Don't add a generic card grid, decorative hero badge, or fake document metrics.

