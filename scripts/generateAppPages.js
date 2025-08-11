/**
 * This script generates individual app pages based on data from the apps.json file.
 * It creates MDX files for each app in the docs.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs', 'integrations', 'apps');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'apps.json');

/**
 * Get status tag styling for generated pages
 */
function getStatusTag(supportLevel) {
  const supportLevelText = {
    'production': 'Production Ready',
    'development': 'In Development', 
    'planned': 'Planned',
    'blocked': 'Blocked'
  };

  const text = supportLevelText[supportLevel] || supportLevel;
  const className = `status-tag status-tag--${supportLevel}`;

  return `<span className="${className}">${text}</span>`;
}

// Map categories to human-readable names
const categoryDisplayNames = {
  'utilityData': 'Utility Data',
  'deviceData': 'Device Data',
  'marketAccess': 'Market Access',
  'crm': 'CRM',
  'permits': 'Permits',
  'rebatesAndIncentives': 'Rebates and Incentives',
  'energyModeling': 'Energy Modeling',
  'weather': 'Weather',
  'emissions': 'Emissions',
  'textureApps': 'Texture Apps',
  'gridServices': 'Grid Services',
  'siteIntelligence': 'Site Intelligence',
};

/**
 * Generate a MDX file for an app
 */
function generateAppPage(app) {
  const PAYLOAD_CMS_URL = 'https://device.cms.texture.energy';
  
  // Create a clean app info card
  const appLogo = app.logo && app.logo.url 
    ? `<img 
        src="${PAYLOAD_CMS_URL}${encodeURI(app.logo.url)}" 
        alt="${app.name} logo" 
        className="app-logo"
      />`
    : `<div className="app-logo-placeholder">
        ${app.name.charAt(0)}
      </div>`;

  const heroSection = `
<div className="app-hero-banner">
  <div className="app-hero-content">
    {/* App Logo and Title */}
    <div className="app-header-section">
      <div className="app-logo-container">
        ${appLogo}
      </div>
      <div className="app-title-section">
        <h1 className="app-title">${app.name}</h1>
        <div className="app-meta">
          <span className="app-category">${categoryDisplayNames[app.category] || app.category}</span>
          ${getStatusTag(app.support_level)}
        </div>
      </div>
    </div>
    
    {/* App Description */}
    <div className="app-description-section">
      <p className="app-description">${app.about 
        ? app.about
        : app.description || `${app.name} is a third-party integration available on the Texture platform.`}</p>
    </div>
    
    {/* Quick Actions */}
    <div className="app-actions-section">
      ${app.learn_more_url ? `
      <div className="app-action-item">
        <a href="${app.learn_more_url}" target="_blank" rel="noopener noreferrer" className="app-external-link">
          <span className="app-external-link-text">Visit ${app.name} Website</span>
          <svg className="app-external-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
      ` : ''}
    </div>
  </div>
</div>

<style jsx>{\`
  .app-hero-banner {
    background: linear-gradient(135deg, #f8fcff 0%, #f1f5f9 100%);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    margin-bottom: 32px;
    overflow: hidden;
  }

  .app-hero-content {
    padding: 32px;
  }

  .app-header-section {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
  }

  .app-logo-container {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .app-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 12px;
  }

  .app-logo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 600;
    color: #64748b;
  }

  .app-title-section {
    flex: 1;
  }

  .app-title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
  }

  .app-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .app-category {
    background: #f1f5f9;
    color: #475569;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid #cbd5e1;
  }

  .app-description-section {
    margin-bottom: 24px;
  }

  .app-description {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
  }

  .app-actions-section {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .app-action-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
  }

  .app-action-label {
    color: #64748b;
    font-weight: 500;
  }

  .app-action-value {
    color: #1e293b;
    font-weight: 600;
  }

  .app-external-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #444ae1;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .app-external-link:hover {
    color: #3730a3;
    text-decoration: none;
  }

  .app-external-link-icon {
    transition: transform 0.2s ease;
  }

  .app-external-link:hover .app-external-link-icon {
    transform: translate(2px, -2px);
  }

  /* Mobile responsive */
  @media (max-width: var(--breakpoint-md)) {
    .app-hero-content {
      padding: 24px;
    }

    .app-header-section {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }

    .app-title {
      font-size: 24px;
    }

    .app-actions-section {
      flex-direction: column;
    }
  }

  /* Dark mode styles */
  [data-theme="dark"] .app-hero-banner {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
    border-color: #334155 !important;
  }

  [data-theme="dark"] .app-logo-container {
    background: #ffffff !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-title {
    color: #f8fafc !important;
  }

  [data-theme="dark"] .app-category {
    background: #334155 !important;
    color: #cbd5e1 !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-description {
    color: #cbd5e1 !important;
  }

  [data-theme="dark"] .app-action-item {
    background: #1e293b !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-action-label {
    color: #94a3b8 !important;
  }

  [data-theme="dark"] .app-action-value {
    color: #f1f5f9 !important;
  }

  [data-theme="dark"] .app-external-link {
    color: #818cf8 !important;
  }

  [data-theme="dark"] .app-external-link:hover {
    color: #a5b4fc !important;
  }

  [data-theme="dark"] .app-logo-placeholder {
    background: linear-gradient(135deg, #334155 0%, #475569 100%) !important;
    color: #cbd5e1 !important;
  }

  /* Hide TOC content but preserve layout space */
  .table-of-contents__link {
    visibility: hidden !important;
  }
  
  .table-of-contents__left-border {
    visibility: hidden !important;
  }

  /* Status tag styles */
  .status-tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-tag--production {
    background-color: #ecfdf5;
    color: #065f46;
  }

  .status-tag--development {
    background-color: #fffbeb;
    color: #92400e;
  }

  .status-tag--planned {
    background-color: #f5f3ff;
    color: #5b21b6;
  }

  .status-tag--blocked {
    background-color: #fef2f2;
    color: #991b1b;
  }

  /* Dark mode status tag styles */
  [data-theme="dark"] .status-tag--production {
    background-color: #064e3b;
    color: #6ee7b7;
  }

  [data-theme="dark"] .status-tag--development {
    background-color: #78350f;
    color: #fbbf24;
  }

  [data-theme="dark"] .status-tag--planned {
    background-color: #4c1d95;
    color: #c4b5fd;
  }

  [data-theme="dark"] .status-tag--blocked {
    background-color: #7f1d1d;
    color: #fca5a5;
  }
\`}</style>`;
  
  return `---
id: ${app.slug}
title: ""
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/apps" label="Apps" />

${heroSection}

${app.description ? `
## Description

${app.description}
` : ''}

${app.configurationFields && app.configurationFields.length > 0 ? `
## Configuration

This app requires the following configuration fields:

${app.configurationFields.map(field => `
- **${field.fieldLabel}** (${field.fieldType === 'secret' ? 'Secret' : 'Text'})${field.isRequired ? ' - Required' : ' - Optional'}
`).join('')}
` : ''}

`;
}

/**
 * Generate the index page for apps
 */
function generateIndexPage(apps) {
  return `---
id: apps
title: Apps
sidebar_position: 1
---

import StaticAppsList from '@site/src/components/StaticAppsList';

# Apps

**Apps** are integrations with third-party services that expand the functionality, data, and capabilities of the Texture Platform. By enabling an App (often by providing the relevant API key or OAuth credentials), you can seamlessly connect external services or datasets to Texture and leverage them across your Sites, Devices, and more.

## Why Apps?

Apps transform Texture into a comprehensive energy management platform:

- **Extend Platform Capabilities** — Integrate best-of-breed services (meter data, weather, emissions) to drive deeper insights and richer functionality
- **Single Pane of Glass** — View and manage all your energy data—meter intervals, device status, lead info, permitting, CRM sync—directly in Texture
- **Faster Onboarding** — Once an App is enabled, Texture automatically handles syncing, reconciling, and updating data at regular intervals
- **Modular Setup** — Pick and choose only the integrations you need by enabling individual Apps

## Available Apps

<StaticAppsList />

## App Integration Process

### Enabling an App

Each App in Texture has its own configuration dialog. Typically you'll:

1. **Obtain an API Key or OAuth Token** from the third party
2. **Paste it into Texture** under **Apps** → **[App Name]**
3. **Configure Additional Options** (e.g., default permissions, region filters)

Once saved, Texture starts syncing or sending data automatically, depending on the App.

## Next Steps

1. **Browse & Enable Apps**  
   Go to **Apps** in the Texture Dashboard to view available integrations, set them up, and configure sync intervals or permissions.

2. **Review Data Flow**  
   See your newly imported data—like Meters, Weather forecasts, or CRM contacts—in the corresponding sections of the Texture Dashboard or via our API endpoints.

3. **Monitor & Iterate**  
   Track how your new integrations add value (e.g., deeper site insights, better energy forecasting, streamlined workflows), and fine-tune settings as needed.

If you have any questions or need help configuring an App, use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team, or contact your Texture representative.
`;
}

/**
 * Create category JSON file
 */
function generateCategoryJson() {
  return JSON.stringify({
    "label": "Apps",
    "position": 6,
    "link": {
      "type": "generated-index",
      "description": "Browse all third-party integrations available on Texture"
    }
  }, null, 2);
}

async function main() {
  try {
    // Create apps directory if it doesn't exist
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
    }
    
    // Read the apps data
    const appsData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // Sort apps by name
    const apps = appsData.sort((a, b) => a.name.localeCompare(b.name));
    
    // Don't generate category JSON - apps should be part of main Integrations section
    // fs.writeFileSync(
    //   path.join(DOCS_DIR, '_category_.json'),
    //   generateCategoryJson()
    // );
    
    // Generate index page
    fs.writeFileSync(
      path.join(DOCS_DIR, 'index.md'),
      generateIndexPage(apps)
    );
    
    // Generate individual app pages
    apps.forEach(app => {
      fs.writeFileSync(
        path.join(DOCS_DIR, `${app.slug}.md`),
        generateAppPage(app)
      );
    });
    
    console.log(`Successfully generated ${apps.length} app pages in ${DOCS_DIR}`);
  } catch (error) {
    console.error('Failed to generate app pages:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main, generateAppPage, generateIndexPage };
