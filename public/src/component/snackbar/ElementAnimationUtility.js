
/**
 * @param {Element} elem
 */
const willAnimate = elem => {
    const name = window.getComputedStyle(elem).getPropertyValue('animation-name');
    return name && name !== 'none';
};

/**
 * @param {Element} elem
 * @param {Function} callback
 */
const waitForAnimation = (elem, callback) => {

    const listener = () => {

        elem.removeEventListener('animationend', listener);
        callback();

    };

    elem.addEventListener('animationend', listener);
};

/**
 * @param {Element} element
 * @param {String} animationClassName
 */
function animate(element, animationClassName, visibleAttribute) {

    element.classList.add(animationClassName);

    return new Promise(resolve => {

        waitForAnimation(element, () => {
            element.classList.remove(animationClassName);
            element.setAttribute(visibleAttribute, "");
            resolve();
        });
    });
}

export { animate };
