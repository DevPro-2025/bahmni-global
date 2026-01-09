# Bahmni Global

A comprehensive collection of all Bahmni project repositories as git submodules.

## About Bahmni

[Bahmni](https://www.bahmni.org/) is an open-source hospital information system designed for low-resource settings. It combines and integrates several open-source products including OpenMRS, OpenELIS, Odoo, and others to provide a complete hospital management solution.

## Repository Structure

This repository aggregates all Bahmni component repositories as git submodules for easier management and development.

### Core Components

| Module | Description |
|--------|-------------|
| `bahmni-core` | Core Bahmni backend modules |
| `bahmni-frontend` | Modern frontend application |
| `openmrs-module-bahmniapps` | Bahmni EMR applications |
| `openmrs-distro-bahmni` | OpenMRS distribution for Bahmni |

### Clinical Modules

| Module | Description |
|--------|-------------|
| `bacteriology` | Bacteriology lab module |
| `openmrs-module-appointments` | Appointment scheduling |
| `openmrs-module-bedmanagement` | Bed management |
| `openmrs-module-flowsheet` | Clinical flowsheets |
| `openmrs-module-episodes` | Episode management |

### Infrastructure & Deployment

| Module | Description |
|--------|-------------|
| `bahmni-docker` | Docker deployment configurations |
| `helm-charts` | Kubernetes Helm charts |
| `bahmni-playbooks` | Ansible deployment playbooks |
| `bahmni-infra` | Infrastructure configurations |
| `bahmni-vagrant` | Vagrant development environment |

### Integration & Services

| Module | Description |
|--------|-------------|
| `OpenElis` | Laboratory information system |
| `odoo-modules` | Odoo/OpenERP modules |
| `openerp-atomfeed-service` | Atomfeed service for OpenERP |
| `pacs-integration` | PACS system integration |
| `event-log-service` | Event logging service |

### Testing

| Module | Description |
|--------|-------------|
| `bahmni-e2e-tests` | End-to-end tests |
| `emr-functional-tests` | Functional tests |
| `performance-test` | Performance testing |

## Getting Started

### Clone with Submodules

```bash
# Replace <your-org> with your organization/username
git clone --recursive https://github.com/<your-org>/bahmni-global.git
```

### Initialize Submodules (if already cloned)

```bash
git submodule init
git submodule update
```

### Update All Submodules

```bash
git submodule update --remote --merge
```

## Contributing

Contributions are welcome! Please refer to individual submodule repositories for specific contribution guidelines.

## License

Each submodule has its own license. Please refer to individual repositories for licensing information.

## Resources

- [Bahmni Official Website](https://www.bahmni.org/)
- [Bahmni Documentation](https://bahmni.atlassian.net/wiki/spaces/BAH/overview)
- [Bahmni GitHub Organization](https://github.com/Bahmni)
