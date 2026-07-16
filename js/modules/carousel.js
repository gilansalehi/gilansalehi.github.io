export default function initCarousels(root = document) {
    root.querySelectorAll('[data-nav-carousel]').forEach(carousel => {
        const selector = carousel.getAttribute('data-nav-carousel');
        const navPanels = [...root.querySelectorAll(selector)]
            .map(el => el.cloneNode(true))
            .map(wrap('li'));
        carousel.append(...navPanels);
    });
}

const wrap = (nodeType) => (el) => {
    const frag = document.createElement(nodeType);
    frag.append(el);
    return frag;
};
