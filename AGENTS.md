# Project Guidance

## Working Agreement

- Before modifying code, inspect the relevant implementation and documentation.
- If missing information could materially affect scope, behavior, architecture,
  dependencies, destructive actions, or validation, ask concise questions and wait.
- Do not ask questions whose answers are available in the repository.
- Treat research, review, explanation, brainstorming, and planning requests as
  non-editing work unless the user explicitly requests implementation.
- Never infer an instruction to revert, delete, install dependencies, run servers,
  or run tests. Perform those actions only when explicitly requested.
- The user normally owns dependency installation, local servers, test execution,
  and visual validation unless that work is explicitly delegated.
- Do not add tests, dependencies, or tooling without approval.
- Prefer the existing architecture and framework idioms. Ask before introducing a
  competing pattern.
- Keep exploration and status reporting concise. Read the smallest relevant set of
  files first, then expand only when evidence requires it.
- State consequential assumptions. When requirements conflict, pause and ask.

## Architecture

- `docs/` is the complete public root deployed by GitHub Pages.
- Read `ROUTES.md` before changing routes, route shells, layouts, or view ownership.
- Use data-wrapper directives for rendering and reactivity. Do not implement
  imperative DOM rendering in component modules.
- Keep route-specific behavior in the route component's colocated module script.
- Preserve the global CSS cascade. Use component-scoped CSS where appropriate.
- Use root-relative URLs for public assets and views so nested routes resolve
  correctly.

## Project Conventions

- Prefer `'A B C'.split(' ')` for editable string arrays whose values contain no
  whitespace. Use a different visible delimiter when values contain spaces.
- Read `DEPENDENCIES.md` before changing externally hosted scripts, import maps,
  versions, or integrity metadata.
- Record proposed test cases as titles in `TESTS.md`. Do not implement or run tests
  unless the user explicitly delegates that work.
- The user owns dependency installation, local servers, and browser-based visual
  verification unless explicitly stated otherwise.
