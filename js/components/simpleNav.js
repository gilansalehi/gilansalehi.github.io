import { q, on } from '../util/utils.js';

const header = q('[data-ref="menu:wrapper"]')[0];

let open = false;

function toggleMenu() {
    open = !open;

    header.classList.toggle('open', open);
}

on('click', '[data-action="menu:toggle"]', toggleMenu);
on('keyup', 'body', e => {
    if (e.key === 'Escape' && open) { toggleMenu(); }
});

export default function init() {
    return header;
}