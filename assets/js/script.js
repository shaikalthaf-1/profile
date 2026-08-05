'use strict';

/* ==========================================================================
   ENTERPRISE CASE STUDIES DATABASE (15 FEATURED CASE STUDIES)
   ========================================================================== */
const CASE_STUDIES_DATA = {
  'cs-1': {
    title: 'Azure Virtual WAN & Secure Network Architecture',
    category: 'networking',
    badge: 'Azure Virtual WAN',
    complexity: 'Mission Critical',
    metrics: ['100% Traffic Hardened', 'Sub-10ms Cross-VNet Latency'],
    tech: ['Azure Virtual WAN', 'vHUB', 'Palo Alto Cloud NGFW', 'Terraform', 'Networking'],
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
    title: 'Azure Enterprise Migration & Subscription Consolidation',
    category: 'cloud',
    badge: 'Azure Enterprise Migration',
    complexity: 'Enterprise Hardened',
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
    title: 'Enterprise Disaster Recovery & Multi-Region Resiliency',
    category: 'cloud',
    badge: 'Disaster Recovery',
    complexity: 'Mission Critical',
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
    badge: 'CloudOPS & DevSecOps',
    complexity: 'Advanced Architecture',
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
    title: 'Enterprise Service Catalog & Self-Service Automation',
    category: 'automation',
    badge: 'Enterprise Service Catalog',
    complexity: 'Advanced Architecture',
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
    badge: 'AI Jenkins Plugin',
    complexity: 'Advanced Innovation',
    metrics: ['75% Debugging Time Saved', 'Autonomous Root-Cause Analysis'],
    tech: ['AI Agent', 'Jenkins Plugin', 'Python', 'LLM Integration', 'Groovy'],
    problem: 'Engineering teams lost hundreds of hours manually analyzing verbose CI/CD failure logs to diagnose transient pipeline errors.',
    solution: 'Engineered a custom Jenkins extension powered by an autonomous AI agent that extracts build log stack traces, identifies root causes, and recommends automated fix actions.',
    architecture: 'Jenkins Build Failure Event -> AI Agent Plugin Handler -> Log Extraction -> LLM Diagnostics Engine -> Automated GitHub PR Suggestion.',
    terraform: `# Custom Jenkins Plugin Extension Component`,
    businessValue: 'Dramatically reduced MTTR for CI/CD failures and eliminated repetitive troubleshooting overhead for DevOps engineers.',
    timeline: '2 Months'
  },

  'cs-7': {
    title: 'Azure Landing Zone & Management Group Governance',
    category: 'cloud',
    badge: 'Azure Landing Zone',
    complexity: 'Enterprise Hardened',
    metrics: ['100% Policy Compliance', 'Automated CAF Governance'],
    tech: ['Azure CAF', 'Management Groups', 'Azure Policy', 'Terraform', 'Bicep'],
    problem: 'Rapid cloud adoption led to inconsistent subscription configurations, security drift, and fragmented RBAC across business units.',
    solution: 'Architected a scalable Azure Landing Zone hierarchy aligned with Microsoft Cloud Adoption Framework (CAF). Enforced automated guardrails via Azure Policy and Terraform.',
    architecture: 'Tenant Root Group -> Platform & Workloads Management Groups -> Core Networking, Management, & Security Subscriptions.',
    terraform: `module "enterprise_landing_zone" {
  source    = "Azure/caf-enterprise-scale/azurerm"
  version   = "5.0.0"
  root_id   = "uniper-enterprise"
  root_name = "Uniper Global Enterprise"
}`,
    businessValue: 'Standardized subscription provisioning and enforced mandatory security policies across all cloud workloads automatically.',
    timeline: '3 Months'
  },

  'cs-8': {
    title: 'Modular Terraform Blueprint Libraries & State Governance',
    category: 'automation',
    badge: 'Terraform Modules',
    complexity: 'Enterprise Hardened',
    metrics: ['40% Setup Time Saved', 'Zero Drift'],
    tech: ['Terraform', 'HCL', 'OPA Rego', 'Checkov', 'Azure Blob State'],
    problem: 'Duplicate, unversioned Terraform code created deployment inconsistencies and state lock errors across engineering teams.',
    solution: 'Created a centralized, version-controlled module registry for Azure VNets, vHUB, Palo Alto NGFW, AKS, and Key Vault with automated OPA Rego policy testing.',
    architecture: 'GitHub Central Module Registry -> Semantic Release Tags -> Pre-Commit Checkov Scanning -> Automated Private Registry Publishing.',
    terraform: `module "azure_secure_vnet" {
  source  = "app.terraform.io/uniper/network/azurerm"
  version = "2.4.0"
  vnet_name = "vnet-prod-eastus"
  address_space = ["10.0.0.0/16"]
}`,
    businessValue: 'Eliminated code duplication and ensured 100% compliance with corporate infrastructure standards across all engineering squads.',
    timeline: '3 Months'
  },

  'cs-9': {
    title: 'Azure Network Modernization & Palo Alto NGFW Automation',
    category: 'networking',
    badge: 'Azure Network Modernization',
    complexity: 'Mission Critical',
    metrics: ['100% Perimeter Inspection', 'Automated Rule Sync'],
    tech: ['Palo Alto Cloud NGFW', 'Panorama API', 'Azure vHUB', 'Terraform'],
    problem: 'Manual Palo Alto firewall rule changes created configuration bottlenecks and security audit delays across Azure VNets.',
    solution: 'Automated Palo Alto Cloud NGFW rule updates via Terraform and Panorama REST API integration, enabling dynamic security policy deployment during CI/CD execution.',
    architecture: 'Terraform Code -> Panorama REST API Sync -> Palo Alto Cloud NGFW Cluster -> Dynamic Zone Rule Refresh.',
    terraform: `resource "panos_security_rule_group" "edge_protection" {
  position_keyword = "top"
  rules {
    name                  = "Allow-HTTPS-Inbound"
    source_zones          = ["untrust"]
    destination_zones     = ["trust"]
    source_addresses      = ["any"]
    destination_addresses = [var.public_vip]
    applications          = ["ssl", "web-browsing"]
    services              = ["application-default"]
    actions               = "allow"
  }
}`,
    businessValue: 'Accelerated firewall rule change velocity from days to minutes while maintaining complete auditability and zero-trust perimeter control.',
    timeline: '3 Months'
  },

  'cs-10': {
    title: 'GitHub Actions Enterprise Workflow & Runner Fleet Automation',
    category: 'devops',
    badge: 'GitHub Actions',
    complexity: 'Advanced Architecture',
    metrics: ['65% Build Speedup', 'Isolated Private VNet Runners'],
    tech: ['GitHub Actions', 'Self-Hosted Runners', 'Docker', 'Azure VNet', 'Terraform'],
    problem: 'Public GitHub-hosted runners lacked direct network access to private Azure resources, forcing risky temporary firewall exceptions.',
    solution: 'Deployed an auto-scaling fleet of self-hosted GitHub Actions runner containers inside private Azure VNet subnets with ephemeral VM scaling.',
    architecture: 'GitHub Webhook -> Azure Container Instances Auto-Scaler -> Private VNet Runner Ephemeral Execution -> Instant Runner Deletion.',
    terraform: `resource "azurerm_container_group" "github_runner" {
  name                = "aci-runner-fleet"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "Private"
  subnet_ids          = [azurerm_subnet.runner_subnet.id]
  os_type             = "Linux"
  
  container {
    name   = "runner"
    image  = "myacr.azurecr.io/github-runner:latest"
    cpu    = "2.0"
    memory = "4.0"
  }
}`,
    businessValue: 'Enhanced pipeline build security by eliminating public IP exposures while reducing build execution times by 65%.',
    timeline: '2 Months'
  },

  'cs-11': {
    title: 'Enterprise Observability & Prometheus/Grafana Alerting Engine',
    category: 'cloud',
    badge: 'Enterprise Monitoring',
    complexity: 'Enterprise Hardened',
    metrics: ['90% Anomaly Detection Rate', '60% MTTR Reduction'],
    tech: ['Prometheus', 'Grafana', 'Azure Monitor', 'KQL', 'PagerDuty'],
    problem: 'Fragmented monitoring tools caused notification fatigue and delayed detection of infrastructure performance degradation.',
    solution: 'Constructed a unified observability platform deploying Prometheus operators, Grafana dashboards, Log Analytics KQL queries, and automated PagerDuty escalation policies.',
    architecture: 'Prometheus Exporters -> Log Analytics Workspace -> Grafana Analytics Dashboard -> KQL Anomaly Detection -> PagerDuty Urgent Escalation.',
    terraform: `resource "azurerm_monitor_scheduled_query_rules_alert" "memory_alert" {
  name                = "alert-high-memory-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  action {
    action_group = [azurerm_monitor_action_group.pagerduty.id]
  }
  data_source_id = azurerm_log_analytics_workspace.law.id
  query          = "Perf | where CounterName == 'PercentUsedMemory' | summarize avg(CounterValue) by Computer"
}`,
    businessValue: 'Proactively detected 90% of potential outages before customer impact, drastically lowering mean-time-to-resolution (MTTR).',
    timeline: '3 Months'
  },

  'cs-12': {
    title: 'Azure Virtual Hub DMZ & Application Gateway WAF v2 Hardening',
    category: 'networking',
    badge: 'Azure Virtual Hub',
    complexity: 'Mission Critical',
    metrics: ['OWASP Top 10 Protection', 'SSL Offloading & Inspection'],
    tech: ['Azure App Gateway WAF v2', 'Azure vHUB', 'Public VIP', 'TLS 1.3'],
    problem: 'Public web applications were vulnerable to HTTP layer attacks and lacked centralized TLS termination and OWASP inspection.',
    solution: 'Deployed Azure Application Gateway WAF v2 in a dedicated DMZ subnet integrated with Azure Virtual Hub, forcing all public HTTPS traffic through OWASP rule inspection.',
    architecture: 'Internet -> App Gateway WAF v2 (DMZ) -> Palo Alto Cloud NGFW -> Internal vHUB -> Private Spoke Workloads.',
    terraform: `resource "azurerm_web_application_firewall_policy" "waf_policy" {
  name                = "waf-policy-prod"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  
  managed_rules {
    managed_rule_set {
      type    = "OWASP"
      version = "3.2"
    }
  }
}`,
    businessValue: 'Secured all public enterprise endpoints against web application threats and simplified SSL certificate management.',
    timeline: '2 Months'
  },

  'cs-13': {
    title: 'Enterprise AKS Zero-Trust Policy & Container Hardening',
    category: 'devops',
    badge: 'Enterprise CI/CD',
    complexity: 'Mission Critical',
    metrics: ['CIS Benchmark Compliant', 'Zero Critical CVE Pods'],
    tech: ['Kubernetes (AKS)', 'Azure Policy', 'Defender for Containers', 'Trivy'],
    problem: 'Unrestricted pod deployments on Kubernetes clusters posed severe security risks from privilege escalation and unvetted container images.',
    solution: 'Hardened Azure Kubernetes Service (AKS) clusters using Azure Policy for Kubernetes, restricted pod security admission standards, and embedded Trivy image scanning into CI/CD.',
    architecture: 'Azure Policy Gatekeeper -> AKS Admission Controller -> Pod Security Standards (Restricted) -> Trivy Scan Gate.',
    terraform: `resource "azurerm_kubernetes_cluster" "aks_secure" {
  name                = "aks-prod-eastus"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aks-prod"

  private_cluster_enabled = true
  azure_policy_enabled    = true

  default_node_pool {
    name       = "system"
    node_count = 3
    vm_size    = "Standard_D4s_v5"
  }
}`,
    businessValue: 'Achieved complete CIS Kubernetes Benchmark compliance and prevented unauthorized container execution across production environments.',
    timeline: '3 Months'
  },

  'cs-14': {
    title: 'Automated Azure Key Vault Secret & Identity Lifecycle',
    category: 'automation',
    badge: 'Infrastructure Automation',
    complexity: 'Enterprise Hardened',
    metrics: ['Zero Hardcoded Credentials', 'Automated Secret Rotation'],
    tech: ['Azure Key Vault', 'Managed Identity', 'Terraform', 'Azure Policy'],
    problem: 'Hardcoded credentials in application source code created severe compliance risks and password management friction.',
    solution: 'Implemented zero-trust passwordless authentication using Azure Managed Identities and automated Key Vault secret rotation workflows.',
    architecture: 'Azure Managed Identity -> RBAC Secret Officer Role -> Key Vault Private Endpoint -> Automated Event Grid Secret Rotation.',
    terraform: `resource "azurerm_key_vault_secret" "db_secret" {
  name         = "db-prod-password"
  value        = random_password.pwd.result
  key_vault_id = azurerm_key_vault.kv.id
  expiration_date = timeadd(timestamp(), "2160h") # 90 days
}`,
    businessValue: 'Eliminated hardcoded secrets across 100+ application repositories and enforced automated password rotation policies.',
    timeline: '2 Months'
  },

  'cs-15': {
    title: 'MacroCloud Console — Multi-Tenant Cloud Operations Platform',
    category: 'multicloud',
    badge: 'CloudOPS',
    complexity: 'Advanced Architecture',
    metrics: ['Multi-Tenant Workspace RBAC', 'Automated Sub Migration'],
    tech: ['MacroCloud SaaS', 'Azure/AWS API', 'Node.js', 'Python', 'RBAC Engine'],
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
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initAnimatedCounters();
  initCaseStudyFiltersAndSearch();
  initTechPageFilters();
  initModalEngine();
  initCurrentYear();
});

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

/* Case Study Search & Filter Engine */
function initCaseStudyFiltersAndSearch() {
  const searchInput = document.getElementById('case-study-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techSelect = document.getElementById('tech-select');
  const cards = document.querySelectorAll('.case-study-card');
  const resultCount = document.getElementById('result-count');

  if (!cards.length) return;

  let activeCategory = 'all';
  let activeTech = 'all';
  let searchQuery = '';

  const filterCards = () => {
    let visibleCount = 0;

    cards.forEach(card => {
      const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
      const summary = (card.querySelector('.card-summary') ? card.querySelector('.card-summary').textContent : '').toLowerCase();
      const category = card.getAttribute('data-category');
      const tags = (card.getAttribute('data-tech') || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesTech = (activeTech === 'all' || tags.includes(activeTech.toLowerCase()));
      const matchesSearch = (!searchQuery || title.includes(searchQuery) || summary.includes(searchQuery) || tags.includes(searchQuery));

      if (matchesCategory && matchesTech && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultCount) {
      resultCount.textContent = `Showing ${visibleCount} Enterprise Case Studies`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      filterCards();
    });
  });

  if (techSelect) {
    techSelect.addEventListener('change', (e) => {
      activeTech = e.target.value;
      filterCards();
    });
  }
}

/* Technologies Page Live Filter & Search Engine */
function initTechPageFilters() {
  const searchInput = document.getElementById('tech-search');
  const filterBtns = document.querySelectorAll('.tech-filter-btn');
  const cards = document.querySelectorAll('.tech-card');
  const countEl = document.getElementById('tech-count');

  if (!cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  const filterTechCards = () => {
    let visible = 0;

    cards.forEach(card => {
      const name = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
      const desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
      const category = card.getAttribute('data-category');
      const projects = (card.getAttribute('data-projects') || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (!searchQuery || name.includes(searchQuery) || desc.includes(searchQuery) || projects.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countEl) {
      countEl.textContent = `Showing ${visible} Core Technologies`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterTechCards();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterTechCards();
    });
  });
}

/* Modal Renderer Engine */
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
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span class="badge badge-azure">\${data.badge}</span>
        <span style="font-size: 0.75rem; background: var(--bg-surface-elevated); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 600; color: var(--azure-primary);">\${data.complexity}</span>
      </div>
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
