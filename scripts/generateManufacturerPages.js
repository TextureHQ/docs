/**
 * This script generates individual manufacturer pages based on data fetched
 * from Payload CMS. It creates MDX files for each manufacturer in the docs.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PAYLOAD_CMS_URL = 'https://device.cms.texture.energy';
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'sources', 'manufacturers');
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

  const supportLevelColors = {
    'production': '#065f46', // emerald-800
    'development': '#92400e', // amber-800
    'planned': '#5b21b6', // violet-800
    'blocked': '#991b1b' // red-800
  };

  const supportLevelBgColors = {
    'production': '#ecfdf5', // emerald-50
    'development': '#fffbeb', // amber-50
    'planned': '#f5f3ff', // violet-50
    'blocked': '#fef2f2' // red-50
  };

  const color = supportLevelColors[supportLevel] || '#6b7280';
  const bgColor = supportLevelBgColors[supportLevel] || 'transparent';
  const text = supportLevelText[supportLevel] || supportLevel;

  return `<span style={{ 
    backgroundColor: '${bgColor}',
    color: '${color}',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  }}>${text}</span>`;
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
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
          opacity: '0.9'
        }}
      />`
    : `<div style={{ 
        width: '120px', 
        height: '80px', 
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: '600',
        color: '#6b7280'
      }}>
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
<div style={{
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '12px',
  marginBottom: '32px'
}}>
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div style={{
      borderRight: '1px solid #d1d5db',
      background: '#f8fcff',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '32px',
        padding: '24px 24px 0 24px'
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          flexShrink: '0',
          width: '160px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          ${manufacturerLogo}
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gap: '12px',
        padding: '0 24px 24px 24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <span style={{ fontWeight: '500', color: '#6b7280', fontSize: '14px' }}>Type</span>
          <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>Energy Device Manufacturer</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <span style={{ fontWeight: '500', color: '#6b7280', fontSize: '14px' }}>Status</span>
          ${getStatusTag(manufacturer.support_level)}
        </div>
        

        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <span style={{ fontWeight: '500', color: '#6b7280', fontSize: '14px' }}>Grid Services</span>
          <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>${
            manufacturer.supported_device_types?.length === 1 && 
            (manufacturer.supported_device_types[0] === 'vehicle' ||
             manufacturer.supported_device_types[0] === 'charger' ||
             manufacturer.supported_device_types[0] === 'thermostat')
              ? 'N/A'
              : (manufacturer.supports_grid_services ? 'Supported' : 'Not supported')
          }</span>
        </div>
        

        
        ${manufacturer.website_url ? `
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <span style={{ fontWeight: '500', color: '#6b7280', fontSize: '14px' }}>Website</span>
          <a href="${manufacturer.website_url}" target="_blank" rel="noopener noreferrer" style={{
            color: '#444ae1',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}>Visit Website</a>
        </div>
        ` : ''}
        <div className="device-types-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '16px 0'
        }}>
          <span style={{ fontWeight: '500', color: '#6b7280', fontSize: '14px' }}>Supported Device Types</span>
          <span className="device-types-value" style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px', textAlign: 'right', maxWidth: '60%' }}>${manufacturer.supported_device_types && manufacturer.supported_device_types.length > 0
            ? manufacturer.supported_device_types.map(type => {
                const deviceTypeText = {
                  'battery': 'Batteries',
                  'charger': 'EV Chargers',
                  'inverter': 'Solar Inverters',
                  'thermostat': 'Smart Thermostats',
                  'vehicle': 'Electric Vehicles'
                };
                return deviceTypeText[type] || type;
              }).join(', ')
            : 'None'}</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div style={{
      padding: '48px 32px 32px 16px'
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        fontSize: '18px',
        fontWeight: '600',
        color: '#1f2937'
      }}>About ${manufacturer.name}</h3>
      
      <p style={{
        margin: '0 0 20px 0',
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#4b5563'
      }}>${manufacturer.about 
        ? manufacturer.about
        : manufacturer.description_html 
        ? manufacturer.description_html.replace(/<[^>]*>/g, '').substring(0, 300) + (manufacturer.description_html.replace(/<[^>]*>/g, '').length > 300 ? '...' : '')
        : manufacturer.description || `${manufacturer.name} is a manufacturer of energy devices supported by Texture.`}</p>
    </div>
  </div>
</div>`;
  
  return `---
id: ${manufacturer.slug}
title: ${manufacturer.name}
sidebar_position: 3
---

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