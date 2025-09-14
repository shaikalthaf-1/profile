// Enhanced JavaScript for Shaik Althaf Portfolio Website
// Comprehensive interactive functionality with error handling

// DOM Content Loaded - Initialize all features
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initializeTheme();
  initializeNavigation();
  initializePortfolioFilter();
  initializeModal();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeAnimations();
  initializeLazyLoading();
  updateLegacyContent();
  
  console.log('Portfolio website initialized successfully');
});

// Theme Toggle Functionality
function initializeTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Set initial theme
  root.setAttribute('data-theme', savedTheme);
  if (themeBtn) {
    themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    themeBtn.setAttribute('aria-label', `Switch to ${savedTheme === 'dark' ? 'light' : 'dark'} theme`);
    
    // Add click listener
    themeBtn.addEventListener('click', function() {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
      themeBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} theme`);
      
      // Add transition effect
      root.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        root.style.transition = '';
      }, 300);
    });
  }
}

// Enhanced Navigation System
function initializeNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  // Mobile menu toggle
  if (menuBtn && navLinks) {
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    menuBtn.addEventListener('click', function() {
      const isOpen = navLinks.classList.contains('menu-open');
      navLinks.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', !isOpen);
      menuBtn.textContent = isOpen ? '☰' : '✕';
    });
    
    // Close mobile menu when clicking on links
    navLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && navLinks.classList.contains('menu-open')) {
        navLinks.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      }
    });
  }
  
  // Founder dropdown functionality (fix selector mismatch)
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('show');
      dropdown.classList.toggle('show');
      dropdownToggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Keyboard support for dropdown
    dropdownToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdownToggle.click();
      }
    });
  }
  
  // Active navigation highlighting
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
}

// Portfolio Filter System
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  if (filterButtons.length === 0 || portfolioCards.length === 0) {
    console.log('Portfolio filter elements not found - skipping initialization');
    return;
  }
  
  function setActiveFilter(activeBtn) {
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
  }
  
  function filterProjects(filter) {
    portfolioCards.forEach((card, index) => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.split(' ').includes(filter);
      
      if (shouldShow) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Add event listeners to filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.dataset.filter;
      setActiveFilter(this);
      filterProjects(filter);
    });
    
    // Keyboard support
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Initialize with 'all' filter
  const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
  if (allFilter) {
    setActiveFilter(allFilter);
    filterProjects('all');
  }
}

// Modal System for Project Details
function initializeModal() {
  // Create modal HTML if it doesn't exist
  if (!document.getElementById('projectModal')) {
    const modalHTML = `
      <div id="projectModal" class="project-modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <div class="modal-body">
            <div class="modal-image">
              <img src="" alt="" id="modalImage">
            </div>
            <div class="modal-info">
              <h3 id="modalTitle"></h3>
              <div id="modalTags" class="modal-tags"></div>
              <div id="modalDescription" class="modal-description"></div>
              <div id="modalTech" class="modal-tech"></div>
              <div id="modalDetails" class="modal-details"></div>
              <div class="modal-actions">
                <button class="btn neu" id="modalDemoBtn">View Live Demo</button>
                <button class="btn neu ghost" id="modalCodeBtn">View Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
  }
  
  const modal = document.getElementById('projectModal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  
  // Project data
  const projectData = {
    'ai-automation': {
      title: 'AI Cloud Automation Framework',
      image: 'assets/img/ai.svg',
      tags: ['AI', 'Cloud', 'Automation'],
      description: 'A comprehensive framework for deploying and managing AI workloads in cloud environments with intelligent resource provisioning and automated scaling.',
      tech: 'Azure, Kubernetes, Jenkins, Terraform, Python, Docker',
      details: `
        <h4>Project Overview</h4>
        <p>This framework revolutionizes how AI workloads are deployed and managed in cloud environments by combining intelligent resource provisioning with automated scaling capabilities.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Intelligent resource allocation based on workload requirements</li>
          <li>Automated scaling for training and inference workloads</li>
          <li>Cost optimization through dynamic resource management</li>
          <li>Comprehensive monitoring and observability</li>
          <li>Multi-cloud support (Azure, AWS, GCP)</li>
        </ul>
        <h4>Impact</h4>
        <p>Reduced deployment time by 60% and operational costs by 30% for AI workloads across multiple enterprise clients.</p>
      `
    },
    'cloud-migration': {
      title: 'Multi-Cloud Migration Case Study',
      image: 'assets/img/cloud.svg',
      tags: ['Cloud', 'DevOps', 'Migration'],
      description: 'Seamless migration of enterprise workloads across AWS, Azure, and GCP with zero downtime and enhanced security.',
      tech: 'AWS, Azure, GCP, Terraform, Ansible, Jenkins',
      details: `
        <h4>Challenge</h4>
        <p>Large enterprise needed to migrate critical workloads across multiple cloud providers to avoid vendor lock-in and optimize costs.</p>
        <h4>Solution</h4>
        <ul>
          <li>Comprehensive assessment of existing infrastructure</li>
          <li>Custom migration tools and automation scripts</li>
          <li>Phased migration approach with rollback capabilities</li>
          <li>Enhanced security and compliance implementation</li>
        </ul>
        <h4>Results</h4>
        <p>Successfully migrated 200+ applications with zero downtime, achieving 25% cost reduction and improved disaster recovery capabilities.</p>
      `
    }
  };
  
  // Modal show/hide functions
  function showModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Populate modal content
    modal.querySelector('#modalImage').src = project.image;
    modal.querySelector('#modalTitle').textContent = project.title;
    modal.querySelector('#modalDescription').textContent = project.description;
    modal.querySelector('#modalTech').innerHTML = `<strong>Technologies:</strong> ${project.tech}`;
    modal.querySelector('#modalDetails').innerHTML = project.details;
    
    // Populate tags
    const tagsContainer = modal.querySelector('#modalTags');
    tagsContainer.innerHTML = project.tags.map(tag => 
      `<span class="tag ${tag.toLowerCase()}">${tag}</span>`
    ).join('');
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    closeBtn.focus();
  }
  
  function hideModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('read-more-btn')) {
      e.preventDefault();
      const projectId = e.target.dataset.project;
      showModal(projectId);
    }
  });
  
  closeBtn.addEventListener('click', hideModal);
  backdrop.addEventListener('click', hideModal);
  
  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      hideModal();
    }
  });
}

// Contact Form Handler
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formMsg = document.getElementById('formMsg');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      
      // Simulate form submission
      setTimeout(() => {
        if (formMsg) {
          formMsg.textContent = 'Thanks! Your message has been received. I will get back to you soon.';
          formMsg.style.color = 'var(--success, #28a745)';
        }
        
        contactForm.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }, 1000);
    });
  }
}

// Global handleSubmit function for backward compatibility
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  if (msg) {
    msg.textContent = 'Thanks! Message captured locally (demo).';
    msg.style.color = 'var(--success, #28a745)';
  }
  if (form) form.reset();
}

// Smooth Scrolling System
function initializeSmoothScrolling() {
  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  // Add smooth scrolling to all anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId);
    }
  });
  
  // Make smoothScrollTo globally available
  window.smoothScrollTo = smoothScrollTo;
}

// Animation System
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        
        // Add staggered animation for portfolio cards
        if (entry.target.classList.contains('portfolio-card')) {
          const cards = document.querySelectorAll('.portfolio-card');
          const cardIndex = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${cardIndex * 0.1}s`;
        }
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal, .neu-outset, .portfolio-card').forEach(el => {
    observer.observe(el);
  });
}

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
}

// Legacy Content Updates
function updateLegacyContent() {
  // Update hero content if needed
  const hero = document.querySelector('.hero');
  const heroP = hero?.querySelector('.hero-left p');
  const cta = hero?.querySelector('.cta');
  
  if (heroP && /Cloud Networking|production-grade/.test(heroP.textContent || '')) {
    heroP.innerHTML = 'Automating cloud infrastructure and AI platforms across Azure, AWS, and GCP. <strong>Terraform • Ansible • Kubernetes • Jenkins • GitHub Actions</strong>';
  }
  
  if (cta) {
    const [primaryBtn, secondaryBtn] = cta.querySelectorAll('a');
    if (primaryBtn) {
      primaryBtn.textContent = 'Explore My Work';
      primaryBtn.classList.add('neu');
      primaryBtn.setAttribute('href', '#portfolio');
    }
    if (secondaryBtn) {
      secondaryBtn.textContent = 'Contact Me';
      secondaryBtn.classList.add('neu', 'ghost');
      secondaryBtn.setAttribute('href', '#contact');
      secondaryBtn.removeAttribute('target');
      secondaryBtn.removeAttribute('rel');
    }
  }
  
  // Fix encoding issues
  document.querySelectorAll('.meta').forEach(el => {
    el.textContent = el.textContent.replace(/�/g, '•');
  });
  
  if (heroP) {
    heroP.innerHTML = heroP.innerHTML.replace(/�/g, '•');
  }
  
  // Normalize hero info icons
  const heroInfo = document.querySelectorAll('.hero-info li');
  if (heroInfo[0]) heroInfo[0].textContent = '✉️ shaikalthafcgl@gmail.com';
  if (heroInfo[1]) heroInfo[1].textContent = '📍 India';
  
  // Footer cleanup
  const footerP = document.querySelector('.footer .container p');
  if (footerP) {
    let text = footerP.textContent;
    text = text.replace(/^c\s/, '© ').replace(/\?\?/g, '❤️').replace(/�/g, '•');
    footerP.textContent = text;
  }
}

// Add Modal Styles
function addModalStyles() {
  const modalStyles = `
    .project-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .project-modal.active {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(4px);
    }
    
    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--card);
      border-radius: 16px;
      max-width: 800px;
      max-height: 90vh;
      width: 90%;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border);
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
      color: var(--muted);
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .modal-close:hover {
      background: var(--accent);
      color: white;
      transform: scale(1.1);
    }
    
    .modal-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    
    .modal-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-surface);
      border-radius: 12px;
      padding: 2rem;
    }
    
    .modal-image img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    
    .modal-info h3 {
      margin: 0 0 1rem 0;
      color: var(--text);
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .modal-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .modal-description {
      color: var(--muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .modal-tech {
      color: var(--muted);
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--bg-surface);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    
    .modal-details {
      color: var(--muted);
      line-height: 1.6;
    }
    
    .modal-details h4 {
      color: var(--text);
      margin: 1.5rem 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .modal-details ul {
      margin: 0.5rem 0;
      padding-left: 1.2rem;
    }
    
    .modal-details li {
      margin-bottom: 0.3rem;
    }
    
    .modal-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
        max-height: 95vh;
      }
      
      .modal-body {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 1.5rem;
      }
      
      .modal-actions {
        flex-direction: column;
      }
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Script error:', e.error);
});

// Export functions for global access
window.smoothScrollTo = function(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

window.handleSubmit = handleSubmit;