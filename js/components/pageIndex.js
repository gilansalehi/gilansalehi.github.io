import { q, on, load } from '../util/utils.js';
import initScrollAnimations from './scrollAnimations.js';

export default function initPages() {
    const container = q('main')[0];
    const header = q('header')[0];

    // load page and attach to main
    on('click', '[data-loader]', function ({ target }) {
        let options = JSON.parse(target.getAttribute('data-loader'));
        let callback = () => {
            target.click();
            initScrollAnimations();
        };

        load(options.url, { container, callback });
        target.removeAttribute('data-loader');
    });

    // track current page:
    window.addEventListener('hashchange', function ({ oldURL, newURL }) {
        const oldPage = hashOf(oldURL);
        const newPage = hashOf(newURL);
        header.classList.remove(oldPage);
        header.classList.add(newPage);
        this.document.body.dataset.currentPage = newPage;
    });

    return true;
}

const hashOf = url => url.split('#')[1];