# data-wrapper Routes Guide

This guide defines a portable routing convention for static sites built with
data-wrapper. It favors browser-native paths, physical HTML documents, and
component-owned behavior. It does not require a client-side router or build
step.

## Core Model

A project chooses one directory as its public web root:

- GitHub Pages supports `/docs` as a branch publishing source.
- Cloudflare Pages can use a directory such as `/site` as its output directory.
- Local development must serve that directory, not the repository root.

The directory name is not part of the public URL:

```text
Repository path              Public URL
docs/index.html              /
docs/about/index.html        /about/
docs/views/about/index.html  /views/about/
docs/css/style.css           /css/style.css
```

Everything inside the public root is public. Everything outside it is excluded
from static deployment.

## Project Structure

Use physical route documents and organize component views by route ownership:

```text
repository/
  README.md
  ROUTES.md
  tests/

  docs/                         Public root; may be named site/ on another host
    index.html                  /
    about/
      index.html                /about/
    portfolio/
      index.html                /portfolio/
    notes/
      index.html                /notes/
      first-note/
        index.html              /notes/first-note/

    views/
      layout.html               Shared site chrome
      home/
        index.html              Home root component
      about/
        index.html              About root component
        contact.html            About-owned child component
      portfolio/
        index.html
      notes/
        index.html
        first-note.html

    js/
      modules/
        page-behavior.js        Reusable behavior without component ownership
```

Shared components such as the layout, navigation, and footer may live directly
under `views/`. Route-specific components belong beneath `views/<route>/`.

## Route Documents

Every public route MUST have a physical `index.html` document. The document
owns concerns that must exist before data-wrapper loads:

- Doctype, language, viewport, and character encoding
- Page title and description
- Canonical URL and social metadata
- Stylesheets, import map, framework script, and compatibility shim
- Synchronous bootstrap code, such as restoring saved theme settings
- The route's root data-wrapper mount

Example `docs/about/index.html` body:

```html
<body>
  <data-wrapper
    id="site"
    src="/views/layout.html"
    data-page="about"
    data-view="/views/about/index.html"
  ></data-wrapper>
</body>
```

Repeating this small document boilerplate is intentional. Each route gets a
real browser entrypoint, independent metadata, direct-link support, native
Back/Forward behavior, and the host's ordinary 404 behavior.

Use directory routes with trailing slashes consistently:

```html
<a href="/about/">About</a>
<a href="/notes/first-note/">First note</a>
```

Primary navigation MUST NOT depend on query parameters, hashes, `pushState`, or
click interception when a physical route can represent the destination.

## Layout Responsibility

The shared layout owns site-wide chrome and behavior:

- Primary navigation
- Page outlet
- Menu state
- Global theme state
- Global keyboard behavior

The route document declares the selected page and root view. The layout reads
that declaration and composes the page:

```html
<main class="page-outlet">
  <template *src="currentView"></template>
</main>
```

A string rendered through `*src` creates a child `<data-wrapper>`. The loaded
route view is therefore its own component with its own module and lifecycle.

The layout SHOULD NOT own behavior that is specific to one route or inspect
descendant markup to discover page-specific features.

## Component Modules

A data-wrapper view may contain one component module. That module is the
component's entrypoint, not the only JavaScript it may use.

Route components SHOULD import reusable behavior from ordinary JavaScript
modules:

```html
<script type="module" data-module="@site/about">
  import initPageBehavior from '/js/modules/page-behavior.js';

  export default context => {
    initPageBehavior(context);

    return {
      contactLabel: 'Get in touch',
    };
  };
</script>

<article class="about">
  <h1 $text="contactLabel"></h1>
</article>
```

This preserves the component's single module slot for its own bindings while
allowing shared lifecycle helpers, formatters, and utilities to be composed as
normal ES modules.

Avoid assigning a generic external file as every component's module if that
prevents components from declaring their own exports. Treat generic behavior
as an imported helper instead.

## Nested Components

A route root component may compose smaller components that it owns:

```html
<article class="about">
  <section>...</section>
  <data-wrapper src="/views/about/contact.html"></data-wrapper>
</article>
```

Create a child component when it has an independent state surface, lifecycle,
reuse case, or meaningful ownership boundary. Static markup does not need to
be split merely to make files smaller.

## Public And Private Data

Any file the browser can fetch is public, including:

- Route documents
- Component views
- JavaScript modules
- Images and data files

Directly visiting a component view may display incomplete or unstyled markup.
That is acceptable; view URLs are implementation resources, not canonical
pages.

Never place secrets or genuinely private data inside the public root. If data
must be delivered conditionally to an authorized browser, it requires a server
or protected API. Client-side routing, obfuscation, and hidden view URLs do not
provide access control.

For search discovery:

- Include only canonical route URLs in `sitemap.xml`.
- Optionally disallow `/views/` in `robots.txt`.
- Treat crawler directives as indexing guidance, not security.

## Host Configuration

The static host must publish the selected public directory as `/`.

GitHub Pages example:

```text
Source: Deploy from a branch
Branch: main
Folder: /docs
```

Cloudflare Pages example:

```text
Build output directory: site
```

Local example:

```bash
http-server docs -p 8080 -c-1
```

Root-relative asset and view URLs are required so nested routes resolve against
the public root rather than their current directory:

```html
<!-- Correct from every route -->
<img src="/images/profile.jpg" alt="">

<!-- Incorrect from /about/ -->
<img src="images/profile.jpg" alt="">
```

## When A Router Is Justified

Use a client-side router only when the application genuinely needs runtime
route matching, such as deeply stateful application screens or routes that
cannot be represented by deployed files.

A router is not needed for a finite collection of content pages. Prefer the
browser and static host for those routes.

## New Route Checklist

1. Create `<public-root>/<route>/index.html`.
2. Give it route-specific title, description, canonical URL, and social data.
3. Mount the shared layout with `data-page` and `data-view` declarations.
4. Create `views/<route>/index.html` as the route's root component.
5. Give that view a unique component module when it needs bindings or behavior.
6. Import shared behavior rather than consuming the component module slot.
7. Use ordinary root-relative links to the new route.
8. Add the canonical route to `sitemap.xml`.
9. Add feed entries when the route publishes syndicated content.
10. Keep all private data outside the public root or behind an authenticated API.
