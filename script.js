'use strict';

/* ==========================================================================
   ENTERPRISE CASE STUDIES DATABASE (20 DETAILED CASE STUDIES)
   ========================================================================== */
const CASE_STUDIES_DATA = {
  'cs-1': {
    title: 'Azure Multi-Region & Secure Virtual Hub Architecture',
    category: 'cloud',
    badge: 'Azure & Security',
    metrics: ['100% Inbound/Outbound Traffic Hardened', 'Sub-10ms Cross-VNet Latency'],
    tech: ['Azure Virtual WAN', 'vHUB', 'Palo Alto Cloud NGFW', 'Terraform', 'Azure Networking'],
    problem: 'Enterprise multi-region VNet connectivity lacked centralized security traffic inspection, creating fragmented firewall configurations and unpredictable latency.',
    solution: 'Designed and deployed an Azure Virtual Hub network backbone with Palo Alto Cloud NGFW integrated using Terraform. Implemented custom Virtual Hub Route Tables forcing 100% of spoke and internet traffic through zero-trust inspection nodes.',
    architecture: 'Dual-Region Hub-and-Spoke model with Azure vHUB in Primary East US and Secondary West Europe connected via Global VNet Peering and Palo Alto Cloud NGFW.',
    terraform: `module "azure_vhub_paloalto" {
  source              = "git::https://github.com/shaikalthaf-1/tf-azure-vhub-paloalto.git"
  resource_group_name = "rg-enterprise-network-prod"
  location            = "eastus"
  vwan_id             = module.azure_vwan.vwan_id
  vhub_address_prefix = "10.100.0.0/16"
  palo_alto_rules     = var.enterprise_firewall_ruleset
}`,
    businessValue: 'Established a unified enterprise network security perimeter, eliminating uninspected traffic paths and meeting strict SOC2 and ISO27001 regulatory compliance requirements.',
    timeline: '6 Months (Multi-Region Rollout)'
  },

  'cs-2': {
    title: 'Enterprise Subscription-to-Subscription Azure Migration',
    category: 'cloud',
    badge: 'Enterprise Migration',
    metrics: ['Zero Downtime', '100% IaC Replicable'],
    tech: ['Azure Resource Mover', 'Terraform', 'Azure DevOps', 'PowerShell'],
    problem: 'Corporate restructuring required moving 50+ enterprise workloads across Azure subscriptions without business downtime or resource configuration loss.',
    solution: 'Engineered an automated migration workflow using Azure Resource Mover and Terraform state refactoring scripts. Re-provisioned target subscription resources reproducibly with automated validation tests.',
    architecture: 'Automated subscription extraction pipeline reading existing ARM templates, converting configurations to modular HCL, and executing staged cutovers.',
    terraform: `resource "azurerm_subscription_template_deployment" "migration_cutover" {
  name             = "sub-migration-prod-eastus"
  location         = "eastus"
  template_content = file("\${path.module}/templates/sub_migration.json")
  parameters_content = jsonencode({
    targetSubscriptionId = var.target_sub_id
  })
}`,
    businessValue: 'Delivered enterprise cloud consolidation ahead of schedule with zero operational disruption to active trading platforms.',
    timeline: '4 Months'
  },

  'cs-3': {
    title: 'Enterprise Resiliency & Multi-Region Disaster Recovery',
    category: 'cloud',
    badge: 'Resiliency & DR',
    metrics: ['RTO < 15 Mins', 'RPO < 1 Min'],
    tech: ['Azure Site Recovery', 'Traffic Manager', 'Azure Networking', 'Terraform'],
    problem: 'Production application platforms lacked verified multi-region failover capabilities, leaving mission-critical services vulnerable to single-region Azure outages.',
    solution: 'Architected an active-passive multi-region disaster recovery framework with Azure Traffic Manager health checks, automated Azure Site Recovery replication, and geo-replicated data tiers.',
    architecture: 'Primary region in Azure East US with automated replication to Azure West US secondary region, orchestrated by automated failover runbooks.',
    terraform: `resource "azurerm_site_recovery_replicated_vm" "dr_vm" {
  name                                      = "app-vm-prod-replica"
  resource_group_name                       = azurerm_resource_group.dr_rg.name
  recovery_vault_name                       = azurerm_recovery_services_vault.vault.name
  source_recovery_fabric_name               = "EastUS-Fabric"
  source_vm_id                              = azurerm_linux_virtual_machine.primary_vm.id
  target_recovery_fabric_id                 = azurerm_site_recovery_fabric.target.id
  target_resource_group_id                  = azurerm_resource_group.dr_rg.id
  target_recovery_network_id                = azurerm_virtual_network.dr_vnet.id
}`,
    businessValue: 'Guaranteed mission-critical business continuity and achieved strict SLA compliance for enterprise financial operations.',
    timeline: '3 Months'
  },

  'cs-4': {
    title: 'CloudOPS — End-to-End Enterprise CI/CD & DevSecOps Platform',
    category: 'devops',
    badge: 'DevSecOps & CI/CD',
    metrics: ['40%+ Deployment Speedup', '100% Automated Security Scanning'],
    tech: ['Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes (AKS)', 'SonarQube', 'Trivy'],
    problem: 'Manual application builds and unstandardized deployment scripts created deployment bottlenecks and frequent release errors.',
    solution: 'Built an enterprise-wide DevSecOps pipeline automating code compilation with Maven, containerization via Docker, static code analysis with SonarQube, container security scanning with Trivy, and deployment to AKS.',
    architecture: 'Git push trigger -> SonarQube Quality Gate -> Trivy Vulnerability Scan -> Nexus Artifact Push -> AKS Blue-Green Deployment.',
    terraform: `resource "azuredevops_serviceendpoint_azurecr" "acr_endpoint" {
  project_id            = azuredevops_project.devops_proj.id
  service_endpoint_name = "acr-prod-connection"
  azurecr_spn_role_assignment = true
  azurecr_name          = azurerm_container_registry.acr.name
  resource_group        = azurerm_resource_group.rg.name
}`,
    businessValue: 'Accelerated release velocity by over 40% while ensuring 100% of deployed container images passed security compliance gates.',
    timeline: '5 Months'
  },

  'cs-5': {
    title: 'Self-Service Multi-Cloud Infrastructure Catalog',
    category: 'ai',
    badge: 'Self-Service & Automation',
    metrics: ['~40% Setup Time Saved', 'Multi-Cloud Support'],
    tech: ['Azure', 'AWS', 'GCP', 'Terraform', 'Python', 'Web API'],
    problem: 'Development teams faced long lead times when requesting cloud infrastructure, waiting up to 5 days for manual ops fulfillment.',
    solution: 'Created an enterprise self-service infrastructure catalog enabling pre-approved Azure, AWS, and GCP infrastructure requests with automated approval workflows and modular Terraform deployments.',
    architecture: 'Web Service Portal -> Automated Policy Validation -> Async Terraform Execution Pipeline -> Cloud Provider API -> Automated Slack Notification.',
    terraform: `module "self_service_vnet" {
  source        = "git::https://github.com/shaikalthaf-1/tf-modules.git//azure-vnet"
  environment   = var.requested_env
  vnet_address  = var.requested_subnet
  owner_email   = var.requestor_email
}`,
    businessValue: 'Reduced cloud environment provisioning from 5 days to under 15 minutes, drastically boosting developer productivity across multi-cloud engineering groups.',
    timeline: '4 Months (Live at app.dhakium.com)'
  },

  'cs-6': {
    title: 'AI Jenkins Plugin (AutoFix Agent)',
    category: 'ai',
    badge: 'AI Innovation',
    metrics: ['75% Debugging Time Saved', 'Autonomous Root-Cause Analysis'],
    tech: ['AI Agents', 'Jenkins Plugin', 'Python', 'LLM API', 'Groovy'],
    problem: 'Engineering teams lost hundreds of hours manually analyzing verbose CI/CD failure logs to diagnose transient pipeline errors.',
    solution: 'Engineered a custom Jenkins extension powered by an autonomous AI agent that extracts build log stack traces, identifies root causes, and recommends automated fix actions.',
    architecture: 'Jenkins Build Failure Event -> AI Agent Plugin Handler -> Log Extraction -> LLM Diagnostics Engine -> Automated GitHub PR Suggestion.',
    terraform: `# Deployed as custom Jenkins Plugin Extension`,
    businessValue: 'Dramatically reduced MTTR for CI/CD failures and eliminated repetitive troubleshooting overhead for DevOps engineers.',
    timeline: '2 Months'
  },

  'cs-7': {
    title: 'MacroCloud Console — Multi-Tenant Cloud Operations Platform',
    category: 'multicloud',
    badge: 'MacroCloud SaaS',
    metrics: ['Multi-Tenant Isolation', 'Automated Cross-Cloud RBAC'],
    tech: ['MacroCloud Platform', 'Azure/AWS API', 'Node.js', 'Python', 'RBAC Engine'],
    problem: 'Managing multi-tenant cloud workspaces across Azure and AWS required complex, manual RBAC and workspace isolation handling.',
    solution: 'Architected MacroCloud Console (`console.macrocloud.in`), a unified platform automating Resource Group and Subscription migrations, multi-tenant workspace provisioning, and centralized RBAC policy enforcement.',
    architecture: 'Multi-tenant SaaS Architecture with Tenant Isolation Proxy, OAuth2/SSO Provider, Cross-Cloud API Orchestrator, and Live Activity Logging.',
    terraform: `module "tenant_workspace" {
  source         = "./modules/tenant_workspace"
  tenant_id      = var.tenant_id
  cloud_provider = "azure"
  rbac_roles     = ["Reader", "Contributor"]
}`,
    businessValue: 'Provides enterprise clients with a single pane of glass for multi-cloud deployment, governance, and resource optimization.',
    timeline: 'Ongoing Flagship Development (macrocloud.in)'
  }
};

/* ==========================================================================
   APP INITIALIZATION & INTERACTIVE ENGINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNetworkCanvas();
  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initAnimatedCounters();
  initCaseStudyFilters();
  initModalEngine();
  initCurrentYear();
});

/* Canvas Network Background Animation */
function initNetworkCanvas() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };

  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(Math.floor(width / 25), 45);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 120, 212, ${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0078d4';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    requestAnimationFrame(animate);
  };

  animate();
}

/* Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile Nav */
function initMobileNav() {
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-navigation]');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ScrollSpy for Active Navigation Link */
function initScrollSpy() {
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  if (!sections.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          const isMatch = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', isMatch);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Scroll Reveal Animations */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('[data-reveal]');
  
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(el => observer.observe(el));
}

/* Animated Counters */
function initAnimatedCounters() {
  const counterEls = document.querySelectorAll('[data-counter]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-counter'), 10);
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / targetVal));

        const timer = setInterval(() => {
          start += 1;
          el.textContent = start + '+';
          if (start >= targetVal) {
            el.textContent = targetVal + '+';
            clearInterval(timer);
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

/* Case Study Category Filters */
function initCaseStudyFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-study-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Case Study Modal Engine */
function initModalEngine() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const contentArea = document.getElementById('modal-content');

  if (!backdrop || !contentArea) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-modal]');
    if (btn) {
      const csId = btn.getAttribute('data-open-modal');
      const data = CASE_STUDIES_DATA[csId];
      if (data) {
        renderModalContent(contentArea, data);
        backdrop.classList.add('is-open');
        document.body.classList.add('modal-open');
      }
    }
  });

  const closeModal = () => {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function renderModalContent(container, data) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span class="badge badge-azure">\${data.badge}</span>
      <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">Timeline: \${data.timeline}</span>
    </div>
    <h2>\${data.title}</h2>
    
    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Business Challenge</div>
    <p>\${data.problem}</p>

    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Solution Architecture</div>
    <p>\${data.solution}</p>
    
    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Architecture Pattern</div>
    <p style="background: var(--bg-surface); padding: 0.85rem 1.1rem; border-radius: var(--radius-sm); font-size: 0.9rem; border-left: 3px solid var(--azure-primary); border: 1px solid var(--border-subtle);">\${data.architecture}</p>

    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Quantitative Results &amp; Business Impact</div>
    <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
      \${data.metrics.map(m => `<span style="background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.4rem 0.85rem; border-radius: var(--radius-full); font-weight: 600; font-size: 0.85rem;">✓ \${m}</span>`).join('')}
    </div>
    <p>\${data.businessValue}</p>

    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Terraform / HCL Blueprint Sample</div>
    <pre class="code-block"><code>\${escapeHtml(data.terraform)}</code></pre>

    <div style="font-size: 1.05rem; font-weight: 600; color: var(--azure-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">Technologies Used</div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
      \${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-surface); padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); color: var(--text-secondary);">\${t}</span>`).join('')}
    </div>
  `;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Current Year */
function initCurrentYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
