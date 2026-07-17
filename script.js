'use strict';

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navigationLinks = navigation ? [...navigation.querySelectorAll('a[href^="#"]')] : [];
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const closeNavigation = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigationLinks.forEach((link) => link.addEventListener('click', closeNavigation));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNavigation();
      menuButton.focus();
    }
  });
}

const updateHeader = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 16);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const setActiveNavigation = () => {
  if (!observedSections.length) return;

  const readingLine = Math.min(window.innerHeight * 0.3, 240);
  const activeSection = observedSections.reduce((current, section) => {
    return section.getBoundingClientRect().top <= readingLine ? section : current;
  }, null);

  navigationLinks.forEach((link) => {
    const active = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
    link.classList.toggle('is-active', Boolean(active));
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

let navigationFrame = 0;
const requestNavigationUpdate = () => {
  if (navigationFrame) return;
  navigationFrame = window.requestAnimationFrame(() => {
    setActiveNavigation();
    navigationFrame = 0;
  });
};

setActiveNavigation();
window.addEventListener('scroll', requestNavigationUpdate, { passive: true });
window.addEventListener('resize', requestNavigationUpdate);

const revealItems = document.querySelectorAll('[data-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  document.documentElement.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8%', threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
