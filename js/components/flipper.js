import { q, on } from '../util/utils.js';


export default function init () {
    on('click', '.flip__container', function () {
        this.classList.toggle('show-back');
    });
};