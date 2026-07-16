// Function to handle intersection changes
const handleIntersect = (entries) => {
    entries.forEach(entry => {
        // Check if the element is intersecting
        const element = entry.target;
        const animationClasses = element.dataset.scrollAnimation.split(' ');

        animationClasses.forEach(ac => {
            if (entry.isIntersecting) {
                element.classList.toggle(ac, true);
            } else {
                setTimeout(_ => {
                    element.classList.toggle(ac, false);
                }, 1500);
            }
        });
    });
};

const observer = new IntersectionObserver(handleIntersect);

export default function initScrollAnimations(root = document) {
    // Find and observe all elements with the specified class name
    const elementsToObserve = [...root.querySelectorAll('[data-scroll-animation]')];

    elementsToObserve.forEach(element => {
        if (element.classList.contains('animate__animated')) {
            return; // already being observed
        } else {
            element.classList.add('animate__animated');
            observer.observe(element);
        }
    });

    return elementsToObserve;
};

export function disconnectScrollAnimations(root = document) {
    root.querySelectorAll('[data-scroll-animation]').forEach(element => {
        observer.unobserve(element);
    });
}

