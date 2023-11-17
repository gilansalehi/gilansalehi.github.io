
// Function to handle intersection changes
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        // Check if the element is intersecting
        const element = entry.target;
        const action = element.dataset.scrollAction;

        action.forEach(ac => {
            element.click();
        });
    });
};

const observer = new IntersectionObserver(handleIntersect);

export default function initScrollAnimations() {
    // Find and observe all elements with the specified class name
    let elementsToObserve = document.querySelectorAll('[data-scroll-action]');

    elementsToObserve.forEach(element => {
        const config = JSON.parse(element.getAttribute('data-scroll-action'));
        // click & target selector
        // animate & animation classes
        if (element.classList.contains('animate__animated')) {
            return; // already being observed
        } else {
            element.classList.add('animate__animated');
            observer.observe(element);
        }
    });

    return elementsToObserve;
};


