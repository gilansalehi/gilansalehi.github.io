import { g } from '../util/utils.js';

// html
const menuBtn = g('div.nav__icon', { tabindex: 0 }, [
    g('hr'),
    g('hr'),
    g('hr'),
]);
const menu = g('nav.nav__menu');
const menuCloseBtn = g('span.nav__close');
const menuWrapper = g('header.nav');

// state
let open = false;

function toggleMenu() {
    open = !open;
    // ... render/update
    menuWrapper.classList.toggle('open', open);
}

// event listeners
menuBtn.addEventListener('click', toggleMenu);
menuBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') { toggleMenu(); }
});
menuCloseBtn.addEventListener('click', toggleMenu);

// init
export default function init() {
    menuWrapper.appendChild(menuBtn);
    menuWrapper.appendChild(menu);
    menuWrapper.appendChild(menuCloseBtn);

    document.body.appendChild(menuWrapper);
}
