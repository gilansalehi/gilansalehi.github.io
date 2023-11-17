
// Function to handle intersection changes
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        // Check if the element is intersecting
        const element = entry.target;
        const animationClasses = element.dataset.scrollAnimation.split(' ');

        animationClasses.forEach(ac => element.classList.toggle(ac, entry.isIntersecting));
    });
};

const observer = new IntersectionObserver(handleIntersect);

export default function initScrollAnimations() {
    // Find and observe all elements with the specified class name
    let elementsToObserve = document.querySelectorAll('[data-scroll-animation]');

    elementsToObserve.forEach(element => {
        const config = element.getAttribute('data-scroll-animation');

        if (element.classList.contains('animate__animated')) {
            return; // already being observed
        } else {
            element.classList.add('animate__animated');
            observer.observe(element);
        }
    });

    return elementsToObserve;
};


