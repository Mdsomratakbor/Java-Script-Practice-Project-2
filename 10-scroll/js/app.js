const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener('click', () => {
    //linksContainer.classList.toggle('show-links');
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    containerHeight === 0 ? linksContainer.style.height = `${linksHeight}px` : linksContainer.style.height = 0;
})

const nvabar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// ****** fixed navbar *****
window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = nvabar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        nvabar.classList.add('fixed-nav')
    } else {
        nvabar.classList.remove("fixed-nav");
    }

    if (scrollHeight > 500) {
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove("show-link");
    }
})

// ********* smooth scroll ******

const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // prevent default
        e.preventDefault();
        // navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        // calculate the heights
        const navHeight = nvabar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = nvabar.classList.contains('fixed-nav');

        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight;
        }
        if (navHeight > 82) {
            position = position + containerHeight;
        }
        window.scrollTo({
            left: 0,
            top: position,
        })
        linksContainer.style.height = 0
    })
})