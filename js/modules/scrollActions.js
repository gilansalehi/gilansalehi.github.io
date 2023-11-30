import { q } from '../util/utils.js';

// Function to handle intersection changes
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        // Check if the element is intersecting
        const element = entry.target;
        const { once, ...config } = JSON.parse(element.dataset.scrollAction);

        if (entry.isIntersecting) {
            for ( const [action, target] of Object.entries(config) ) {
                switch (action) {
                    case 'click': q(target).forEach(el => el.click()); break;
                }
            }

            if (once) {
                observer.unobserve(element);
                element.parentElement.removeChild(element);
            }
        }
    });
};

const observer = new IntersectionObserver(handleIntersect);

export default function initScrollActions() {
    // Find and observe all elements with the specified class name
    let elementsToObserve = q('[data-scroll-action]');

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    return elementsToObserve;
};

// data-trigger='{ "on": "click", "do": "scrollTo", "as": }', generic JSON event handler
// data-toggle='{}' // implicitly click?
// data-binding='{ "text": "variableName", "class": { "className": boolean } }' // aka propMap
// data-stream?
// data-ref="block:element"
// data-action="block:action"
// data-wrapper='{}' // holds refs?
