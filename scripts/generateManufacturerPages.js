/**
 * This script generates individual manufacturer pages based on data fetched
 * from Payload CMS. It creates MDX files for each manufacturer in the docs.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PAYLOAD_CMS_URL = 'https://device.cms.texture.energy';
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'integrations', 'manufacturers');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'manufacturers.json');

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

// Map device types to human-readable names
const deviceTypeDisplayNames = {
  'battery': 'Batteries',
  'charger': 'EV Chargers',
  'inverter': 'Solar Inverters',
  'thermostat': 'Smart Thermostats',
  'vehicle': 'Electric Vehicles'
};

/**
 * Fetches manufacturer data from Payload CMS
 */
async function fetchManufacturers() {
  try {
    const response = await axios.get(`${PAYLOAD_CMS_URL}/api/manufacturers`, {
      params: {
        limit: 1000
      }
    });
    
    // Process manufacturers - ensure they have slugs
    const manufacturers = response.data.docs.map(manufacturer => {
      // If manufacturer doesn't have a slug, create one from the name
      if (!manufacturer.slug) {
        manufacturer.slug = manufacturer.name
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-');
      }
      return manufacturer;
    });
    
    return manufacturers;
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    return [];
  }
}

/**
 * Enriches manufacturer data with device type information
 */
async function enrichManufacturersWithDeviceTypes(manufacturers) {
  try {
    // Fetch all device models
    const response = await axios.get(`${PAYLOAD_CMS_URL}/api/device_models`, {
      params: {
        limit: 1000
      }
    });
    
    const deviceModels = response.data.docs;
    
    // Create a map to track device types by manufacturer
    const manufacturerDeviceTypes = new Map();
    
    // Process each device model
    deviceModels.forEach(model => {
      if (model.manufacturer && model.manufacturer.id && model.type) {
        const manufacturerId = model.manufacturer.id;
        if (!manufacturerDeviceTypes.has(manufacturerId)) {
          manufacturerDeviceTypes.set(manufacturerId, new Set());
        }
        manufacturerDeviceTypes.get(manufacturerId).add(model.type);
      }
    });
    
    // Add device types to manufacturer objects
    return manufacturers.map(manufacturer => {
      const deviceTypes = manufacturerDeviceTypes.get(manufacturer.id);
      return {
        ...manufacturer,
        supported_device_types: deviceTypes ? Array.from(deviceTypes) : []
      };
    });
  } catch (error) {
    console.error('Error enriching manufacturers with device types:', error);
    return manufacturers;
  }
}

/**
 * Generate a MDX file for a manufacturer
 */
function generateManufacturerPage(manufacturer) {
  const supportLevelEmoji = {
    'production': '✅',
    'development': '🔨',
    'planned': '🗓️',
    'blocked': '🚫'
  };
  
  const supportLevelDescription = {
    'production': 'Production-ready, fully supported integration',
    'development': 'Integration currently in development',
    'planned': 'Integration planned for the future',
    'blocked': 'Integration blocked by the manufacturer'
  };
  

  
  // Create a clean, Seam-inspired manufacturer info card
  const manufacturerLogo = manufacturer.logo && manufacturer.logo.url 
    ? `<img 
        src="https://device.cms.texture.energy${encodeURI(manufacturer.logo.url)}" 
        alt="${manufacturer.name} logo" 
        className="manufacturer-logo"
      />`
    : `<div className="manufacturer-logo-placeholder">
        ${manufacturer.name.charAt(0)}
      </div>`;

  // Support level mapping
  const supportLevelText = {
    'production': 'Production Ready',
    'development': 'In Development', 
    'planned': 'Planned',
    'blocked': 'Blocked'
  };

  // Device type mapping
  const deviceTypeText = {
    'battery': 'Batteries',
    'charger': 'EV Chargers', 
    'inverter': 'Solar Inverters',
    'thermostat': 'Smart Thermostats',
    'vehicle': 'Electric Vehicles'
  };

  const deviceTypesList = manufacturer.supported_device_types && manufacturer.supported_device_types.length > 0
    ? manufacturer.supported_device_types.map(type => deviceTypeText[type] || type).join(', ')
    : 'None reported';

  const heroSection = `
<div className="manufacturer-hero-card">
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div className="manufacturer-details-section">
      <div className="manufacturer-logo-container">
        <div className="manufacturer-logo-wrapper">
          ${manufacturerLogo}
        </div>
      </div>
      
      <div className="manufacturer-details-grid">
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Type</span>
          <span className="manufacturer-detail-value">Energy Device Manufacturer</span>
        </div>
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Status</span>
          ${getStatusTag(manufacturer.support_level)}
        </div>
        
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Grid Services</span>
          <span className="manufacturer-detail-value">${
            manufacturer.supported_device_types?.length === 1 && 
            (manufacturer.supported_device_types[0] === 'vehicle' ||
             manufacturer.supported_device_types[0] === 'charger' ||
             manufacturer.supported_device_types[0] === 'thermostat')
              ? 'N/A'
              : (manufacturer.supports_grid_services ? 'Supported' : 'Not supported')
          }</span>
        </div>
        
        ${manufacturer.website_url ? `
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Website</span>
          <a href="${manufacturer.website_url}" target="_blank" rel="noopener noreferrer" className="manufacturer-website-link">
            Visit Website
          </a>
        </div>
        ` : ''}
        <div className="manufacturer-detail-row device-types-row">
          <span className="manufacturer-detail-label">Supported Device Types</span>
          <span className="manufacturer-detail-value device-types-value">${manufacturer.supported_device_types && manufacturer.supported_device_types.length > 0
            ? manufacturer.supported_device_types.map(type => {
                const deviceTypeText = {
                  'battery': 'Batteries',
                  'charger': 'EV Chargers',
                  'inverter': 'Solar Inverters',
                  'thermostat': 'Smart Thermostats',
                  'vehicle': 'Electric Vehicles'
                };
                return deviceTypeText[type] || type;
              }).sort().join(', ')
            : 'None'}</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div className="manufacturer-about-section">
      <h3 className="manufacturer-about-title">About ${manufacturer.name}</h3>
      
      <p className="manufacturer-about-description">${manufacturer.about 
        ? manufacturer.about
        : manufacturer.description_html 
        ? manufacturer.description_html.replace(/<[^>]*>/g, '').substring(0, 300) + (manufacturer.description_html.replace(/<[^>]*>/g, '').length > 300 ? '...' : '')
        : manufacturer.description || `${manufacturer.name} is a manufacturer of energy devices supported by Texture.`}</p>
    </div>
  </div>
</div>

<style jsx>{\`
  .manufacturer-hero-card {
    background: var(--ifm-card-background-color);
    border: 1px solid #9ca3af;
    border-radius: 12px;
    margin-bottom: 32px;
  }

  .manufacturer-hero-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: stretch;
  }

  .manufacturer-details-section {
    border-right: 1px solid #d1d5db;
    background: #f8fcff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .manufacturer-logo-container {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    padding: 24px 24px 0 24px;
  }

  .manufacturer-logo-wrapper {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    flex-shrink: 0;
    width: 200px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .manufacturer-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.9;
  }

  .manufacturer-logo-placeholder {
    width: 160px;
    height: 80px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #6b7280;
  }

  .manufacturer-details-grid {
    display: grid;
    gap: 12px;
    padding: 0 24px 24px 24px;
  }

  .manufacturer-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .manufacturer-detail-row:last-child {
    border-bottom: none;
  }

  .manufacturer-detail-label {
    font-weight: 500;
    color: #6b7280;
    font-size: 14px;
  }

  .manufacturer-detail-value {
    font-weight: 600;
    color: #1f2937;
    font-size: 14px;
  }

  .manufacturer-website-link {
    color: #444ae1;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: text-decoration 0.2s ease;
  }

  .manufacturer-website-link:hover {
    text-decoration: underline;
  }

  .device-types-row {
    align-items: flex-start;
    padding: 16px 0;
  }

  .device-types-value {
    text-align: right;
    max-width: 60%;
    line-height: 1.4;
    word-wrap: break-word;
    hyphens: auto;
  }

  .manufacturer-about-section {
    padding: 48px 32px 32px 16px;
  }

  .manufacturer-about-title {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }

  .manufacturer-about-description {
    margin: 0 0 20px 0;
    font-size: 18px;
    line-height: 1.6;
    color: #4b5563;
  }

  /* Mobile responsive - stack columns */
  @media (max-width: var(--breakpoint-md)) {
    .manufacturer-hero-desktop {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .manufacturer-details-section {
      border-right: none;
      border-bottom: 1px solid #d1d5db;
      margin-bottom: 16px;
    }
  }

  /* Dark mode styles */
  [data-theme="dark"] .manufacturer-hero-card {
    background: #2d2d2d !important;
    border-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-details-section {
    background: #1f1f2e !important;
    border-right-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-logo-wrapper {
    background: #ffffff !important;
    border-color: #e5e7eb !important;
  }

  [data-theme="dark"] .manufacturer-detail-label {
    color: #d1d5db !important;
  }

  [data-theme="dark"] .manufacturer-detail-value {
    color: #ffffff !important;
  }

  [data-theme="dark"] .manufacturer-website-link {
    color: #b4b9ff !important;
  }

  [data-theme="dark"] .manufacturer-about-title {
    color: #ffffff !important;
  }

  [data-theme="dark"] .manufacturer-about-description {
    color: #d1d5db !important;
  }

  [data-theme="dark"] .manufacturer-detail-row {
    border-bottom-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-logo-placeholder {
    background: linear-gradient(135deg, #374151 0%, #4b5563 100%) !important;
    color: #d1d5db !important;
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
id: ${manufacturer.slug}
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Back to Supported Manufacturers" />

# ${manufacturer.name}

${heroSection}

${manufacturer.description_html 
    ? `<div dangerouslySetInnerHTML={{ __html: \`${manufacturer.description_html.replace(/`/g, '\\`')}\` }} />`
    : ''}

${manufacturer.documentation_html || manufacturer.documentation ? `
<div dangerouslySetInnerHTML={{ __html: \`${manufacturer.documentation_html 
  ? manufacturer.documentation_html.replace(/`/g, '\\`')
  : manufacturer.documentation}\` }} />
` : ''}

`;
}

/**
 * Generate the index page for manufacturers
 */
function generateIndexPage(manufacturers) {
  return `---
id: manufacturers
title: Supported Manufacturers
sidebar_position: 1
---

import StaticManufacturersList from '@site/src/components/StaticManufacturersList';

# Supported Manufacturers

Texture works with the following manufacturers to provide integrations for their devices. We work directly with manufacturers to build OEM Partnership APIs with well-documented access to device capabilities.

<StaticManufacturersList />

## Our Integration Approach

**We never use web scraping or reverse engineering in any of our device integrations.**

We work directly with manufacturers or partners to build OEM Partnership APIs with well-documented access to device capabilities. These partnerships include contractual SLAs and dedicated communication channels for support.

Reverse-engineered APIs are unstable, undocumented, and prone to break at any time. They create high maintenance overhead, introduce major security and compliance risks (often requiring storage of sensitive user credentials), and are limited to only what a user could do in an app's interface.

Our approach ensures the reliability, security, and long-term viability of our platform. This strategic decision enables more sophisticated integrations and provides an enterprise-grade foundation for the entire energy ecosystem.

For a more detailed explanation of why we take this approach, read our blog post: [Why Texture Doesn't Reverse Engineer APIs and Why That Matters](https://www.texturehq.com/blog/why-texture-doesnt-reverse-engineer-apis-and-why-that-matters).

## Integration Request

If you are a manufacturer and would like to see your devices supported on the Texture platform, please [let us know](https://www.texturehq.com/contact-us).

If you are a customer with a request for a specific manufacturer or device, please [submit here](https://texture.atlassian.net/servicedesk/customer/portal/2/group/3/create/13).
`;
}

/**
 * Create category JSON file
 */
function generateCategoryJson() {
  return JSON.stringify({
    "label": "Manufacturers",
    "position": 5,
    "link": {
      "type": "generated-index",
      "description": "Browse all manufacturers supported by Texture"
    }
  }, null, 2);
}

async function main() {
  try {
    // Create manufacturers directory if it doesn't exist
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
    }
    
    // Create data directory if needed
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Fetch fresh data - always fetch fresh data during build
    let manufacturers = await fetchManufacturers();
    manufacturers = await enrichManufacturersWithDeviceTypes(manufacturers);
    
    // Sort manufacturers by name
    manufacturers.sort((a, b) => a.name.localeCompare(b.name));
    
    // Save the data
    fs.writeFileSync(DATA_FILE, JSON.stringify(manufacturers, null, 2));
    
    // Generate category JSON
    fs.writeFileSync(
      path.join(DOCS_DIR, '_category_.json'),
      generateCategoryJson()
    );
    
    // Generate index page
    fs.writeFileSync(
      path.join(DOCS_DIR, 'index.md'),
      generateIndexPage(manufacturers)
    );
    
    // Generate individual manufacturer pages
    manufacturers.forEach(manufacturer => {
      fs.writeFileSync(
        path.join(DOCS_DIR, `${manufacturer.slug}.md`),
        generateManufacturerPage(manufacturer)
      );
    });
    
    console.log(`Successfully generated ${manufacturers.length} manufacturer pages in ${DOCS_DIR}`);
  } catch (error) {
    console.error('Failed to generate manufacturer pages:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main, generateManufacturerPage, generateIndexPage };