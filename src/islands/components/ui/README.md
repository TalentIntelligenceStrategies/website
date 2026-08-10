# `components/ui/` — shadcn primitives that arrive with a port

This directory is **populated by porting, not scaffolded ahead of it.**

Almost every 21st.dev component is built on shadcn/ui and imports its primitives as
`@/components/ui/card`, `@/components/ui/button`, and so on. Those files come down with
the component itself, in `get_component`'s `registryDependencies.filesWithRegistry` —
copy each one here verbatim, keeping its filename.

Two things to know before you trust that payload:

- **It is not always complete.** A component can import a registry file that the payload
  omits (observed: `@/components/ui/timeline-animation`). Search 21st for it by name, or
  drop the wrapper.
- **A pre-installed shadcn set would be worse than none.** Installing the full library
  up front means every future port silently binds to whichever variant landed first,
  which is the drift `styles.css` already paid for once. Let each port bring its own.

`@` resolves to `src/islands/` (see `vite.config.js`), so these imports work unedited.
Colours resolve through the generated Tailwind config: `bg-card`, `text-muted-foreground`,
`bg-primary`, `border-input` and `ring-ring` are aliased onto TIS tokens in
`scripts/gen-tailwind-config.mjs`. A shadcn name that is *not* aliased there does not
exist, and the component renders visibly unstyled — that is the guard working.

Full procedure: `DESIGN.md` §15.5.
