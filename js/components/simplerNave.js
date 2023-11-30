import { q, on } from '../util/utils.js';

const header = q('header.nav')[0];

//state
let open = false;

//state helpers
function toggleMenu() {
    open = !open;

    header.classList.toggle('open', open);
}

// event listeners
on('click', '[data-action="menu:toggle"]', toggleMenu);
on('keyup', 'body', e => {
    if (e.key === 'Escape' && open) { toggleMenu(); }
});

// view data:
const pages = 'home about resume portfolio contact'.split(' ');
const navList = pages.map(toPageLinkHTML);
// view helpers
const toPageLinkHTML = pageName => html`
    <li>
        <a href="#${pageName}" class="animate hover--underline" data-loader='{"url": "./${pageName}.html", "target":"main" }'>${pageName}</a>
    </li>
`;

// view:
const view = html`
    <header class="nav" data-binding="header:nav">
        <button class="menu-toggle" data-action="toggleMenu"
            style="top: 0; left: 0;"
            tabindex="0"
            type="button"
        >
            <hr>
            <hr>
            <hr>
        </button>
        <nav class="nav__menu">
            ${navList}
        </nav>
        <span class="nav__close" data-action="toggleMenu"></span>
    </header>
`;

// export init:
export default function init() {
    return header;
}

// function html(staticDOM, ...components) {
//     return DocumentFragment()
// }