/**
 * Core Javascript for viktorkoves.com
 *
 * Should be kept as lean as possible
 */

const OpenClass = '-open';

const menuBtn = document.getElementById('menu-btn');
const headerElem = document.getElementById('header');

// Mark menu as not open
menuBtn.setAttribute('aria-expanded', 'false');

menuBtn.addEventListener('click', () => {
    if (headerElem.classList.contains(OpenClass)) {
        headerElem.classList.remove(OpenClass);
        menuBtn.setAttribute('aria-expanded', 'false');
    }
    else {
        headerElem.classList.add(OpenClass);
        menuBtn.setAttribute('aria-expanded', 'true');
    }
});
