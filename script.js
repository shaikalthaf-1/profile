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
    terraform: `# Azure DevOps Service Endpoint for AKS Connection
resource "azuredevops_serviceendpoint_azurecr" "acr_endpoint" {
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
    terraform: `# No infrastructure code required; deployed as Jenkins Plugin Extension`,
    businessValue: 'Dramatically reduced MTTR for CI/CD failures and eliminated repetitive troubleshooting overhead for DevOps engineers.',
    timeline: '2 Months (Internal Innovation Project)'
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
    terraform: `# MacroCloud Multi-Tenant Workspace Definition
module "tenant_workspace" {
  source         = "./modules/tenant_workspace"
  tenant_id      = var.tenant_id
  cloud_provider = "azure"
  rbac_roles     = ["Reader", "Contributor"]
}`,
    businessValue: 'Provides enterprise clients with a single pane of glass for multi-cloud deployment, governance, and resource optimization.',
    timeline: 'Ongoing Flagship Development (macrocloud.in)'
  },

  'cs-8': {
    title: 'Infrastructure as Code Policy Governance',
    category: 'cloud',
    badge: 'IaC Governance',
    metrics: ['100% Policy Compliance', 'Zero Drift'],
    tech: ['Terraform', 'OPA (Rego)', 'Checkov', 'GitHub Actions', 'Azure'],
    problem: 'Developers occasionally committed unverified Terraform configurations that violated security policies.',
    solution: 'Integrated Open Policy Agent (OPA) Rego policies into GitHub Actions PR pipelines, blocking non-compliant infrastructure changes before deployment.',
    architecture: 'Git PR -> Checkov Scan -> OPA Rego Rule Engine -> Automated PR Gate Approval.',
    terraform: `# OPA Enforcement Example: Enforce Encryption at Rest for Storage Accounts`,
    businessValue: 'Achieved 100% IaC policy compliance and eliminated security misconfigurations in production.',
    timeline: '2 Months'
  },

  'cs-9': {
    title: 'Palo Alto Cloud NGFW Automation & Security Hardening',
    category: 'cloud',
    badge: 'Firewall Security',
    metrics: ['100% Perimeter Inspection', 'Automated Failover'],
    tech: ['Palo Alto Cloud NGFW', 'Azure vHUB', 'Terraform', 'Azure Network Watcher'],
    problem: 'Manual Palo Alto firewall rule updates led to configuration inconsistencies between staging and production.',
    solution: 'Automated Palo Alto Cloud NGFW rule updates via Terraform and Panorama API integration, ensuring dynamic security policy sync.',
    architecture: 'Panorama Management Console -> Git Sync -> Terraform Provider Palo Alto -> Azure vHUB Inspection Node.',
    terraform: `resource "paloalto_security_rule" "allow_https" {
  name        = "allow-internal-https"
  source      = ["10.0.0.0/8"]
  destination = ["any"]
  action      = "allow"
}`,
    businessValue: 'Strengthened enterprise cloud perimeter defense and automated security audit compliance.',
    timeline: '3 Months'
  },

  'cs-10': {
    title: 'Azure DevOps Multi-Tenant Pipeline Architecture',
    category: 'devops',
    badge: 'Pipeline Architecture',
    metrics: ['50+ Pipelines Standardized', 'Reusable Templates'],
    tech: ['Azure DevOps', 'YAML', 'Azure Key Vault', 'PowerShell'],
    problem: 'Multiple project teams maintained duplicate YAML pipelines, causing maintenance nightmares when secrets or build steps changed.',
    solution: 'Designed a centralized YAML template repository with standardized build, test, and release templates referencing Azure Key Vault for secret management.',
    architecture: 'Centralized Pipeline Repo -> Extended Project Pipelines -> Azure Key Vault Integration -> Azure Deployment Target.',
    terraform: `# Centralized Azure DevOps Variable Group
resource "azuredevops_variable_group" "prod_vars" {
  project_id   = azuredevops_project.devops_proj.id
  name         = "prod-secrets-group"
  allow_access = true
  key_vault {
    name                = azurerm_key_vault.kv.name
    service_endpoint_id = azuredevops_serviceendpoint_azurerm.endpoint.id
  }
}`,
    businessValue: 'Reduced pipeline maintenance effort by 70% across 50+ enterprise application repositories.',
    timeline: '3 Months'
  },

  'cs-11': {
    title: 'Enterprise Prometheus & Grafana Observability Engine',
    category: 'devops',
    badge: 'Observability',
    metrics: ['90% Anomaly Detection', '60% MTTR Reduction'],
    tech: ['Prometheus', 'Grafana', 'Azure Monitor', 'Log Analytics', 'KQL'],
    problem: 'Operations teams lacked real-time visibility into microservice latency spikes and cluster node memory pressure.',
    solution: 'Deployed Prometheus operators on AKS and configured Grafana dashboards with KQL integrations to monitor infrastructure health and trigger PagerDuty alerts.',
    architecture: 'AKS Microservices -> Prometheus Exporters -> Alertmanager -> PagerDuty & Slack Notification Hub.',
    terraform: `# Prometheus Operator Helm Release via Terraform
resource "helm_release" "prometheus" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
}`,
    businessValue: 'Enabled proactive incident resolution, preventing major outages and improving system reliability.',
    timeline: '3 Months'
  },

  'cs-12': {
    title: 'Azure DMZ Micro-segmentation & Application Gateway WAF v2',
    category: 'cloud',
    badge: 'DMZ Security',
    metrics: ['Zero WAF Bypasses', 'OWASP Top 10 Protected'],
    tech: ['Azure App Gateway WAF v2', 'Azure Load Balancer', 'NSG', 'Private Endpoints'],
    problem: 'Public-facing web applications required advanced WAF inspection and micro-segmentation to defend against OWASP exploits.',
    solution: 'Provisioned Azure Application Gateway WAF v2 with custom rule sets, HTTPS offloading, and Private Endpoint connections to backend AKS clusters.',
    architecture: 'Internet -> App Gateway WAF v2 -> Internal Load Balancer -> Private Endpoint -> AKS Pods.',
    terraform: `resource "azurerm_application_gateway" "waf" {
  name                = "appgw-waf-prod"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "eastus"
  sku {
    name     = "WAF_v2"
    tier     = "WAF_v2"
    capacity = 2
  }
}`,
    businessValue: 'Secured critical web applications against web exploits and DDoS attacks, ensuring continuous compliance.',
    timeline: '2 Months'
  },

  'cs-13': {
    title: 'Enterprise AKS Zero-Trust Security & Policy Hardening',
    category: 'devops',
    badge: 'Kubernetes Security',
    metrics: ['CIS Benchmark Compliant', 'Zero Critical CVEs'],
    tech: ['AKS', 'Azure Policy', 'Defender for Containers', 'Trivy', 'Helm'],
    problem: 'Kubernetes pods ran with elevated privileges, exposing the cluster to container escape risks.',
    solution: 'Enforced Azure Policy for Kubernetes, restricted pod security admission, enabled Defender for Containers, and integrated Trivy scanning in CI/CD.',
    architecture: 'Azure Policy Engine -> Gatekeeper Constraint Templates -> AKS Cluster Enforcement -> Microsoft Defender Telemetry.',
    terraform: `resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-prod-secure"
  location            = "eastus"
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aks-prod"
  private_cluster_enabled = true
  identity { type = "SystemAssigned" }
}`,
    businessValue: 'Achieved enterprise compliance for containerized workloads in production.',
    timeline: '3 Months'
  },

  'cs-14': {
    title: 'Self-Hosted Auto-Scaling GitHub Actions Runner Fleet',
    category: 'devops',
    badge: 'CI/CD Infrastructure',
    metrics: ['65% Build Speedup', 'Private VNet Access'],
    tech: ['GitHub Actions', 'Azure VNet', 'Docker', 'Self-Hosted Runners', 'Terraform'],
    problem: 'GitHub-hosted runners could not access private Azure VNets, preventing internal deployment automation.',
    solution: 'Deployed an auto-scaling runner fleet inside Azure VNets using containerized runners managed by Terraform.',
    architecture: 'GitHub Webhook -> Auto-scaler Listener -> Azure Container Apps / VMs -> Private VNet Deployment.',
    terraform: `# Terraform Auto-scaling Runner Fleet Module`,
    businessValue: 'Accelerated CI/CD build speeds while keeping network traffic entirely within private corporate boundaries.',
    timeline: '2 Months'
  },

  'cs-15': {
    title: 'ServiceNow Automated Infrastructure Provisioning',
    category: 'ai',
    badge: 'ITSM Automation',
    metrics: ['5 Days to 15 Mins', '100% Self-Service'],
    tech: ['ServiceNow', 'Azure DevOps REST API', 'Terraform', 'Azure', 'AWS'],
    problem: 'Manual ITSM ticket approval delays slowed down developer environment creation.',
    solution: 'Integrated ServiceNow catalog items directly with Azure DevOps pipeline REST APIs to execute Terraform provisioning automatically upon approval.',
    architecture: 'ServiceNow Ticket Approved -> REST Webhook -> Azure DevOps Pipeline Run -> Terraform Apply.',
    terraform: `# Terraform Orchestration Module for ServiceNow Automation`,
    businessValue: 'Replaced manual ticket handling with instant, policy-compliant cloud resource provisioning.',
    timeline: '3 Months'
  },

  'cs-16': {
    title: 'Azure ExpressRoute & Hybrid Cloud Connectivity Backbone',
    category: 'cloud',
    badge: 'Hybrid Networking',
    metrics: ['10 Gbps Bandwidth', '99.99% SLA'],
    tech: ['Azure ExpressRoute', 'VPN Gateway', 'Azure Route Server', 'BGP Routing'],
    problem: 'On-premises data centers required high-speed, redundant connectivity to Azure cloud environments.',
    solution: 'Configured dual-provider Azure ExpressRoute circuits with active-active BGP routing and fallback VPN gateways.',
    architecture: 'On-Premises Router -> ExpressRoute Direct -> Azure Gateway Subnet -> VNet Backbone.',
    terraform: `resource "azurerm_express_route_circuit" "er" {
  name                  = "er-circuit-prod"
  resource_group_name   = azurerm_resource_group.rg.name
  location              = "eastus"
  service_provider_name = "Equinix"
  peering_location      = "Washington DC"
  bandwidth_in_mbps     = 10000
  sku { tier = "Standard"; family = "MeteredData" }
}`,
    businessValue: 'Established high-throughput, low-latency hybrid cloud connectivity supporting seamless data migration.',
    timeline: '4 Months'
  },

  'cs-17': {
    title: 'Silver Peak SD-WAN & Azure Virtual Hub Integration',
    category: 'cloud',
    badge: 'SD-WAN Networking',
    metrics: ['Global Connectivity', 'Automated Route Sync'],
    tech: ['Silver Peak SD-WAN', 'Azure Virtual Hub', 'Azure Route Server', 'BGP'],
    problem: 'Distributed global offices experienced high latency and manual routing management when connecting to Azure cloud applications.',
    solution: 'Integrated Silver Peak SD-WAN virtual appliances directly into Azure Virtual Hub with dynamic BGP route propagation.',
    architecture: 'Branch Offices -> Silver Peak SD-WAN -> Azure Virtual Hub BGP Peering -> Azure VNets.',
    terraform: `# SD-WAN BGP Peering Module for Azure Virtual Hub`,
    businessValue: 'Streamlined global network management and improved application performance for branch office users worldwide.',
    timeline: '4 Months'
  },

  'cs-18': {
    title: 'Automated Azure Key Vault Secret & Identity Lifecycle',
    category: 'cloud',
    badge: 'Identity & Secrets',
    metrics: ['Zero Hardcoded Keys', 'Automated Rotation'],
    tech: ['Azure Key Vault', 'Managed Identity', 'Terraform', 'Azure DevOps'],
    problem: 'Hardcoded API keys and manual secret updates posed severe security risks across application deployment pipelines.',
    solution: 'Implemented Azure Managed Identities and Azure Key Vault with automated secret rotation policies managed via Terraform.',
    architecture: 'Azure Key Vault -> Workload Identity -> Application Pod / App Service (Zero Credentials Stored).',
    terraform: `resource "azurerm_key_vault_secret" "db_conn" {
  name         = "db-connection-string"
  value        = var.db_password
  key_vault_id = azurerm_key_vault.kv.id
}`,
    businessValue: 'Eliminated credential exposure risks and automated security compliance audit logging.',
    timeline: '2 Months'
  },

  'cs-19': {
    title: 'AWS EC2 Auto Scaling & Elastic Load Balancer Optimization',
    category: 'cloud',
    badge: 'AWS Infrastructure',
    metrics: ['Auto-Scaling Enabled', '30% Cost Reduction'],
    tech: ['AWS EC2', 'VPC', 'Auto Scaling', 'ALB', 'CloudWatch', 'Terraform'],
    problem: 'AWS web application instances suffered from capacity bottlenecks during peak traffic hours while incurring high idle costs.',
    solution: 'Architected dynamic EC2 Auto Scaling Groups behind Application Load Balancers with CloudWatch target tracking metrics.',
    architecture: 'AWS ALB -> Auto Scaling Group -> Multi-AZ EC2 Subnets -> CloudWatch Alarms.',
    terraform: `resource "aws_autoscaling_group" "web_asg" {
  name                = "asg-web-prod"
  vpc_zone_identifier = var.private_subnet_ids
  target_group_arns   = [aws_lb_target_group.alb_tg.arn]
  min_size            = 2
  max_size            = 10
  desired_capacity    = 2
}`,
    businessValue: 'Guaranteed seamless application scaling under peak load while optimizing cloud infrastructure spend.',
    timeline: '2 Months'
  },

  'cs-20': {
    title: 'Multi-Cloud DevSecOps Governance & Compliance Framework',
    category: 'devops',
    badge: 'Multi-Cloud Governance',
    metrics: ['SOC2 & ISO Ready', 'Unified Telemetry'],
    tech: ['Azure', 'AWS', 'Terraform', 'GitHub Actions', 'Checkov', 'SonarQube'],
    problem: 'Managing separate compliance controls for Azure and AWS created audit gaps and security posture fragmentation.',
    solution: 'Established a unified DevSecOps compliance framework with standardized Terraform modules, GitHub Actions security gates, and centralized logging.',
    architecture: 'Developer Commit -> Multi-Cloud Static Security Checks -> Dynamic Policy Evaluation -> Deployment.',
    terraform: `# Multi-Cloud Unified Compliance Governance Blueprint`,
    businessValue: 'Provided executive leadership with complete visibility into multi-cloud compliance and security posture.',
    timeline: '6 Months'
  }
};

/* ==========================================================================
   APP INITIALIZATION & INTERACTIVE ENGINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initCaseStudyFilters();
  initModalEngine();
  initCurrentYear();
});

/* Theme Switcher */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(toggleBtn, storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeIcon(toggleBtn, nextTheme);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? '🌙' : '☀️';
  btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/* Header Scroll Class */
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile Navigation */
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
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  revealItems.forEach(el => observer.observe(el));
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
    <div class="modal-meta-bar">
      <span class="badge badge-azure">\${data.badge}</span>
      <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">Timeline: \${data.timeline}</span>
    </div>
    <h2>\${data.title}</h2>
    
    <div class="modal-section-title">Business Problem &amp; Challenge</div>
    <p>\${data.problem}</p>

    <div class="modal-section-title">Solution Architecture &amp; Implementation</div>
    <p>\${data.solution}</p>
    
    <div class="modal-section-title">Architecture Pattern</div>
    <p style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.9rem; border-left: 3px solid var(--azure-primary);">\${data.architecture}</p>

    <div class="modal-section-title">Quantitative Results &amp; Business Impact</div>
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
      \${data.metrics.map(m => `<span style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.4rem 0.8rem; border-radius: var(--radius-full); font-weight: 600; font-size: 0.85rem;">✓ \${m}</span>`).join('')}
    </div>
    <p>\${data.businessValue}</p>

    <div class="modal-section-title">Terraform / HCL Implementation Sample</div>
    <pre class="code-block"><code>\${escapeHtml(data.terraform)}</code></pre>

    <div class="modal-section-title">Technologies Used</div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
      \${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-surface-elevated); padding: 0.25rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); color: var(--text-secondary);">\${t}</span>`).join('')}
    </div>
  `;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Footer Year */
function initCurrentYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
