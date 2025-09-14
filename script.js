// Simple JS for nav, theme, portfolio filtering, and contact form
document.getElementById('menuBtn').addEventListener('click', function(){
  const nav = document.getElementById('navLinks');
  if(window.innerWidth <= 900){
    nav.classList.toggle('menu-open');
  }
});

function handleSubmit(e){
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thanks! Message captured locally (demo).';
  form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  // Normalize icons/labels present in HTML
  const menuBtn = document.getElementById('menuBtn');
  if(menuBtn){ menuBtn.textContent = '☰'; menuBtn.setAttribute('aria-label','Open menu'); }

  // Theme init
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  const theme = saved || 'light';
  root.setAttribute('data-theme', theme);
  if(btn){ btn.textContent = theme === 'dark' ? '🌙' : '☀️'; }
  if(btn){
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  }

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

  // Build enhanced Portfolio with filters
  const portfolio = document.getElementById('portfolio');
  const mason = document.getElementById('portfolioMasonry') || portfolio?.querySelector('.masonry');
  if(portfolio && mason){
    // Inject filters bar if missing
    if(!document.getElementById('portfolioFilters')){
      const filters = document.createElement('div');
      filters.className = 'filters';
      filters.id = 'portfolioFilters';
      filters.setAttribute('role','tablist');
      filters.innerHTML = `
        <button class="filter active" data-filter="all" role="tab" aria-selected="true">All</button>
        <button class="filter" data-filter="devops" role="tab">DevOps</button>
        <button class="filter" data-filter="cloud" role="tab">Cloud</button>
        <button class="filter" data-filter="ai" role="tab">AI</button>
        <button class="filter" data-filter="software" role="tab">Software</button>
      `;
      portfolio.insertBefore(filters, mason);
    }

    // Replace placeholder items with richer cards
    mason.innerHTML = '';
    const items = [
      {img:'assets/img/ai.svg', alt:'AI Cloud Automation', title:'AI Cloud Automation', desc:'End-to-end AI workload deployments with CI/CD, observability, and guardrails.', meta:'Azure • Kubernetes • Jenkins • Terraform', tags:['ai','cloud','devops']},
      {img:'assets/img/cloud.svg', alt:'Palo Alto Automation', title:'Palo Alto Automation', desc:'NGFW automation for DMZ/NAT with ARM, Bash, and Azure Load Balancer.', meta:'ARM • Bash • Azure', tags:['cloud','network','devops']},
      {img:'assets/img/software.svg', alt:'MacroCloud UI', title:'MacroCloud UI', desc:'Multi-cloud console UI for migration progress, auth, and incident views.', meta:'React • Tailwind • Azure', tags:['software','cloud']},
      {img:'assets/img/devops.svg', alt:'IaC Foundation', title:'IaC Foundation', desc:'Terraform/Ansible blueprints for reproducible, secure cloud infrastructure at scale.', meta:'Terraform • Ansible • GitHub Actions', tags:['devops','cloud']},
      {img:'assets/img/ai.svg', alt:'MLOps on AKS', title:'MLOps on AKS', desc:'Model training/serving with pipelines, model registry, and autoscaling on AKS.', meta:'AKS • MLflow • Argo', tags:['ai','cloud','devops']},
      {img:'assets/img/software.svg', alt:'Serverless APIs', title:'Serverless APIs', desc:'Event-driven APIs for telemetry ingestion and alerting with least-privilege design.', meta:'Azure Functions • Event Grid • Bicep', tags:['software','cloud']}
    ];
    items.forEach(it=>{
      const art = document.createElement('article');
      art.className = 'mason card neu-outset reveal';
      art.dataset.tags = it.tags.join(',');
      art.innerHTML = `
        <img class="mason-img" src="${it.img}" alt="${it.alt} thumbnail" loading="lazy" />
        <h4>${it.title}</h4>
        <p>${it.desc}</p>
        <p class="meta">${it.meta}</p>
      `;
      mason.appendChild(art);
    });

    // Filter logic
    const filterBar = document.getElementById('portfolioFilters');
    const cards = () => Array.from(mason.querySelectorAll('article'));
    const setFilter = (key) => {
      cards().forEach(card => {
        const tags = (card.dataset.tags || '').split(',');
        const show = key === 'all' || tags.includes(key);
        card.style.display = show ? 'inline-block' : 'none';
      });
    };
    filterBar.addEventListener('click', (e)=>{
      const btn = e.target.closest('.filter');
      if(!btn) return;
      filterBar.querySelectorAll('.filter').forEach(b=>{ b.classList.toggle('active', b===btn); b.setAttribute('aria-selected', b===btn ? 'true':'false'); });
      setFilter(btn.dataset.filter);
    });
    setFilter('all');
  }
});
