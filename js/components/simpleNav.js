import { q } from '../util/utils.js';

const menuBtn = q('[data-binding="nav:icon"')[0];
const menu = q('[data-binding="nav:menu"]')[0];
const menuWrapper = q('[data-binding="header:nav"]')[0];
const menuCloseBtn = q('[data-binding="nav:close"]')[0];

let open = false;

function toggleMenu() {
    open = !open;
    menuWrapper.classList.toggle('open', open);
}

menuBtn.addEventListener('click', toggleMenu);
menuBtn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') { toggleMenu(); }
});
menuCloseBtn.addEventListener('click', toggleMenu);

export default function init() {
    return {
        menuBtn,
        menu,
        menuWrapper,
        open,
    }
}