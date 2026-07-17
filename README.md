## Gilan's Personal Site

[See this page in action!](http://www.gilansalehi.com)

I do more with less. This page was written entirely in HTML5 and CSS3.

Like what you see?  Want one of your own?

Drop me a line at gilansalehi@gmail.com.

### Publishing Field Notes

Field Notes are plain HTML views loaded by data-wrapper. To publish a note:

1. Add the article view at `views/notes/your-slug.html`.
2. Register its slug and view path in `views/notes.html`.
3. Add its title, summary, and link to `views/notes/index.html`.

Use `views/notes/csbhi.html` as the article template. Links should use
`?page=notes&note=your-slug` and include `data-note="your-slug"` so navigation
updates without a full page load.
