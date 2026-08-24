# Markdown Editor — product truth

Markdown Editor is a lightweight, fully client-side writing bench for drafting
notes, README fragments, and small documentation passages. The product's core
loop is immediate: type Markdown, see a readable preview, and copy the source
when the draft is ready to leave the browser.

It is not a CommonMark-complete editor, collaboration tool, publishing CMS, or
cloud document store. Its value is the fast feedback loop between source and
rendered shape.

> Product truth inferred from the existing README, routes, copy, and implementation because this batch was explicitly authorized to proceed without an interview.

## Audience and scene

- A developer drafting a README or technical note.
- A writer checking whether simple Markdown structure reads correctly.
- A browser session where the source and preview remain local.

## Constraints

- Keep the existing lightweight renderer and client-only behavior honest.
- Preserve headings, emphasis, code, lists, links, blockquotes, and copy source.
- Do not imply full Markdown compatibility or saved documents.
- The visual system should make source and result feel like two related pages,
  not two generic dashboard cards.
