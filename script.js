// Enhanced JS for nav, theme, portfolio filtering, animations, and contact form

// Mobile Navigation Toggle
document.getElementById('menuBtn')?.addEventListener('click', function(){
  const nav = document.getElementById('navLinks');
  if(window.innerWidth <= 900){
    nav.classList.toggle('menu-open');
  }
});

// Contact Form Handler
function handleSubmit(e){
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thanks! Message captured locally (demo).';
  form.reset();
}

// Smooth Scrolling for Anchor Links
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Enhanced Portfolio Filtering
class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioCards = document.querySelectorAll('.portfolio-card');
    this.init();
  }

  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.setActiveFilter(e.target);
        this.filterProjects(filter);
      });
    });
  }

  setActiveFilter(activeBtn) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  filterProjects(filter) {
    this.portfolioCards.forEach(card => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
}

// Portfolio Project Details Modal
class ProjectModal {
  constructor() {
    this.modal = null;
    this.projects = this.getProjectData();
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div id="projectModal" class="project-modal">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
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
                <button class="btn neu" onclick="window.open('#', '_blank')">View Live Demo</button>
                <button class="btn neu ghost" onclick="window.open('#', '_blank')">View Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('projectModal');
  }

  bindEvents() {
    // Read More button clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more-btn')) {
        e.preventDefault();
        const projectId = e.target.dataset.project;
        this.showProject(projectId);
      }
    });

    // Modal close events
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close')) {
        this.hideModal();
      }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.hideModal();
      }
    });
  }

  showProject(projectId) {
    const project = this.projects[projectId];
    if (!project) return;

    // Populate modal content
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').innerHTML = project.description;
    document.getElementById('modalTech').innerHTML = project.tech;
    document.getElementById('modalDetails').innerHTML = project.details;
    
    // Populate tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = project.tags.map(tag => 
      `<span class="tag ${tag.toLowerCase()}">${tag}</span>`
    ).join('');

    // Show modal with animation
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  getProjectData() {
    return {
      'ai-automation': {
        title: 'AI Cloud Automation Framework',
        image: 'assets/img/ai.svg',
        tags: ['AI', 'Cloud', 'Automation'],
        description: 'A comprehensive framework for deploying and managing AI workloads in cloud environments with intelligent resource provisioning and automated scaling.',
        tech: '<strong>Technologies:</strong> Azure, Kubernetes, Jenkins, Terraform, Python, Docker',
        details: `
          <h4>Project Overview</h4>
          <p>This framework revolutionizes how AI workloads are deployed and managed in cloud environments. By combining intelligent resource provisioning with automated scaling capabilities, it ensures optimal performance while minimizing costs.</p>
          
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
        tech: '<strong>Technologies:</strong> AWS, Azure, GCP, Terraform, Ansible, Jenkins',
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
      },
      'palo-alto': {
        title: 'Palo Alto NGFW Automation',
        image: 'assets/img/devops.svg',
        tags: ['Cloud', 'DevOps', 'Security'],
        description: 'Automated deployment and configuration of Palo Alto Next-Generation Firewalls with DMZ setup and Azure integration.',
        tech: '<strong>Technologies:</strong> ARM Templates, Bash, Azure, Palo Alto NGFW',
        details: `
          <h4>Project Scope</h4>
          <p>Automated the deployment and configuration of Palo Alto NGFWs for enterprise security architecture with DMZ implementation.</p>
          
          <h4>Implementation</h4>
          <ul>
            <li>ARM template development for infrastructure deployment</li>
            <li>Automated NGFW configuration and policy management</li>
            <li>DMZ setup with proper network segmentation</li>
            <li>Integration with Azure Load Balancer</li>
            <li>Monitoring and alerting implementation</li>
          </ul>
          
          <h4>Outcome</h4>
          <p>Reduced deployment time from weeks to hours while ensuring consistent security configurations across all environments.</p>
        `
      },
      'ai-monitoring': {
        title: 'AI-Driven Infrastructure Monitoring',
        image: 'assets/img/ai.svg',
        tags: ['AI', 'DevOps', 'Monitoring'],
        description: 'Intelligent monitoring system using machine learning to predict infrastructure failures and optimize resource allocation.',
        tech: '<strong>Technologies:</strong> Python, ML Models, Prometheus, Grafana, Kubernetes',
        details: `
          <h4>Innovation</h4>
          <p>Revolutionary monitoring system that uses machine learning to predict infrastructure issues before they impact users.</p>
          
          <h4>Capabilities</h4>
          <ul>
            <li>Predictive failure analysis with 95% accuracy</li>
            <li>Automated incident response and self-healing</li>
            <li>Resource optimization recommendations</li>
            <li>Anomaly detection and alerting</li>
            <li>Performance trend analysis</li>
          </ul>
          
          <h4>Business Impact</h4>
          <p>Reduced unplanned downtime by 80% and improved system performance by 40% through proactive issue resolution.</p>
        `
      },
      'macrocloud': {
        title: 'MacroCloud Platform',
        image: 'assets/img/software.svg',
        tags: ['Cloud', 'Platform', 'SaaS'],
        description: 'Comprehensive multi-cloud management platform with unified deployment and monitoring capabilities.',
        tech: '<strong>Technologies:</strong> React, Node.js, Tailwind CSS, Multi-Cloud APIs',
        details: `
          <h4>Platform Overview</h4>
          <p>MacroCloud is a revolutionary platform that simplifies multi-cloud infrastructure management through a unified interface.</p>
          
          <h4>Core Features</h4>
          <ul>
            <li>Unified multi-cloud deployment</li>
            <li>Cost optimization and monitoring</li>
            <li>Security and compliance management</li>
            <li>Automated migration tools</li>
            <li>Real-time analytics and reporting</li>
          </ul>
          
          <h4>Market Position</h4>
          <p>Leading solution for enterprises seeking cloud freedom and operational efficiency across AWS, Azure, and GCP.</p>
        `
      },
      'gitops': {
        title: 'Enterprise GitOps Pipeline',
        image: 'assets/img/devops.svg',
        tags: ['DevOps', 'GitOps', 'CI/CD'],
        description: 'Complete GitOps implementation with automated deployments and compliance monitoring for enterprise applications.',
        tech: '<strong>Technologies:</strong> GitLab CI, ArgoCD, Kubernetes, Helm, Terraform',
        details: `
          <h4>GitOps Implementation</h4>
          <p>Comprehensive GitOps solution enabling declarative infrastructure and application management through Git workflows.</p>
          
          <h4>Pipeline Features</h4>
          <ul>
            <li>Automated CI/CD with GitLab</li>
            <li>ArgoCD for continuous deployment</li>
            <li>Helm charts for application packaging</li>
            <li>Automated rollback capabilities</li>
            <li>Compliance and audit logging</li>
          </ul>
          
          <h4>Enterprise Benefits</h4>
          <p>Improved deployment frequency by 10x while maintaining 99.9% uptime and full compliance with enterprise security policies.</p>
        `
      }
    };
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize enhanced features
  initializeApp();
});

function initializeApp() {
  // Normalize icons/labels present in HTML
  const menuBtn = document.getElementById('menuBtn');
  if(menuBtn){ 
    menuBtn.textContent = '☰'; 
    menuBtn.setAttribute('aria-label','Open menu'); 
  }

  // Initialize Theme Toggle
  initializeTheme();

  // Initialize Portfolio Features
  if (document.querySelector('.portfolio-grid')) {
    new PortfolioFilter();
    new ProjectModal();
  }

  // Initialize Smooth Scrolling
  initializeSmoothScrolling();

  // Initialize Animations
  initializeScrollAnimations();

  // Initialize Navigation
  initializeNavigation();

  // Legacy content updates
  updateLegacyContent();
}

// Theme Management
function initializeTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const theme = saved || 'dark'; // Default to dark theme
  
  root.setAttribute('data-theme', theme);
  if(btn){ 
    btn.textContent = theme === 'dark' ? '🌙' : '☀️'; 
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
      
      // Add transition effect
      root.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        root.style.transition = '';
      }, 300);
    });
  }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId);
    }
  });
}

// Enhanced Navigation with Active State Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  // Update active navigation on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu auto-close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navLinks');
      if (nav && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
      }
    });
  });
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
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

// Performance Optimization - Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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

// Legacy Content Updates (keeping existing functionality)
function updateLegacyContent() {

  const hero = document.querySelector('.hero');
  const p = hero?.querySelector('.hero-left p');
  const cta = hero?.querySelector('.cta');
  if(p && /Cloud Networking|production-grade/.test(p.textContent || '')){
    p.innerHTML = 'Automating cloud infrastructure and AI platforms across Azure, AWS, and GCP. <strong>Terraform • Ansible • Kubernetes • Jenkins • GitHub Actions</strong>';
  }
  if(cta){
    const [a,b] = cta.querySelectorAll('a');
    if(a){ a.textContent = 'Explore My Work'; a.classList.add('neu'); a.setAttribute('href', '#portfolio'); }
    if(b){ b.textContent = 'Contact Me'; b.classList.add('neu','ghost'); b.setAttribute('href','#contact'); b.removeAttribute('target'); b.removeAttribute('rel'); }
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal, .neu-outset').forEach(el=> io.observe(el));

  // Simple slider
  const slider = document.querySelector('.slider');
  if(slider){
    const slides = Array.from(slider.querySelectorAll('.slide'));
    let idx = 0;
    const show = (i)=>{ slides.forEach((s,j)=> s.classList.toggle('active', j===i)); };
    slider.querySelector('.prev')?.addEventListener('click', ()=>{ idx=(idx-1+slides.length)%slides.length; show(idx); });
    slider.querySelector('.next')?.addEventListener('click', ()=>{ idx=(idx+1)%slides.length; show(idx); });
    setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); }, 6000);
  }

  // Parallax-ish hero background
  const bg = document.querySelector('.hero-bg');
  if(bg){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY * 0.15;
      bg.style.transform = `translateY(${y}px)`;
    });
  }

  // Fix encoding artifacts like replacement chars in meta bullets
  document.querySelectorAll('.meta').forEach(el=>{
    el.textContent = el.textContent.replace(/�/g, '•');
  });
  const heroP = document.querySelector('.hero-left p');
  if(heroP){ heroP.innerHTML = heroP.innerHTML.replace(/�/g, '•'); }

  // Normalize hero info icons
  const heroInfo = document.querySelectorAll('.hero-info li');
  if(heroInfo[0]) heroInfo[0].textContent = '✉️ shaikalthafcgl@gmail.com';
  if(heroInfo[1]) heroInfo[1].textContent = '📍 India';

  // Footer cleanup
  const footerP = document.querySelector('.footer .container p');
  if(footerP){
    let t = footerP.textContent;
    t = t.replace(/^c\s/, '© ').replace(/\?\?/g, '❤️').replace(/�/g, '•');
    footerP.textContent = t;
  }
}

// Add Modal Styles Dynamically
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

// Initialize modal styles when DOM loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addModalStyles);
} else {
  addModalStyles();
}

