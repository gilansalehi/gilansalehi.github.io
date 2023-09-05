import { q, on, load } from '../util/utils.js';

export default function initPages() {
    const container = q('main')[0];

    // load page and attach to main
    on('click', '[data-loader]', function ({ target }) {
        let options = JSON.parse(target.getAttribute('data-loader'));
        let callback = () => target.click();

        load(options.url, { container, callback });
        target.removeAttribute('data-loader');
    });

    return true;
}
