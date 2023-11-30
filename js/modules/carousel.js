import { q } from '../util/utils.js';

export default function initCarousels() {
    q('[data-nav-carousel]').forEach(carousel => {
        const selector = carousel.getAttribute('data-nav-carousel');
        const navPanels = q(selector).map(el => el.cloneNode(true)).map(wrap('li'));
        carousel.append(...navPanels);
    });
}

const wrap = (nodeType) => (el) => {
    const frag = document.createElement(nodeType);
    frag.append(el);
    return frag;
};