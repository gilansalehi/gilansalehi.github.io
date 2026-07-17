## Gilan's Personal Site

[See this page in action!](https://www.gilansalehi.com)

The site is static HTML and CSS enhanced by
[data-wrapper](https://data-wrapper.org). It uses physical directories for
ordinary browser routes and has no client-side router or build step.

GitHub Pages publishes the `docs/` directory. Each public route has a complete
`index.html` document, while shared navigation and page content live in
`docs/views/` and are loaded by data-wrapper.

### Local Development

Serve `docs/` as the web root so root-relative view and asset URLs behave like
they do in production:

```bash
http-server docs -p 8080 -c-1
```

### Publishing Field Notes

Field Notes pair a physical route with a plain HTML view. To publish a note:

1. Add the article view at `docs/views/notes/your-slug.html`.
2. Add its route shell at `docs/notes/your-slug/index.html` and set the shell's
   `data-view` to the article view.
3. Add its title, summary, and route to `docs/views/notes/index.html`.

Use `docs/views/notes/csbhi.html` and
`docs/notes/geometric-duality/index.html` as templates. Links should use the
ordinary route form `/notes/your-slug/`.
