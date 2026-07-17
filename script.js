document.documentElement.classList.add('js');

const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const header = document.querySelector('[data-header]');
const internalLinks = navigation
  ? [...navigation.querySelectorAll('a[href^="#"]')]
  : [];

const setMenuState = (isOpen, { returnFocus = false } = {}) => {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  navigation.dataset.open = String(isOpen);
  document.body.classList.toggle('menu-open', isOpen);

  const accessibleLabel = menuToggle.querySelector('.sr-only');
  if (accessibleLabel) {
    accessibleLabel.textContent = isOpen ? 'Close navigation' : 'Open navigation';
  }

  if (isOpen) {
    const firstLink = navigation.querySelector('a');
    firstLink?.focus();
  } else if (returnFocus) {
    menuToggle.focus();
  }
};

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false, { returnFocus: true });
    }
  });

  const desktopQuery = window.matchMedia('(min-width: 64rem)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setMenuState(false);
  });
}

if (header) {
  const updateHeaderState = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if ('IntersectionObserver' in window && internalLinks.length > 0) {
  const sections = internalLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (sectionId) => {
    internalLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) setActiveLink(visibleEntry.target.id);
    },
    {
      rootMargin: '-25% 0px -60% 0px',
      threshold: [0, 0.2, 0.5]
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
