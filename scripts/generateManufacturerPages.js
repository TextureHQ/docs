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
  
  const deviceTypesList = manufacturer.supported_device_types && manufacturer.supported_device_types.length > 0
    ? manufacturer.supported_device_types
        .map(type => deviceTypeDisplayNames[type] || type)
        .join(', ')
    : 'None reported';
  
  const logoHtml = manufacturer.vector_icon && manufacturer.vector_icon.url 
    ? `<div style={{ textAlign: 'center', margin: '20px 0' }}>
  <img 
    src="https://device.cms.texture.energy${encodeURI(manufacturer.vector_icon.url)}" 
    alt="${manufacturer.name} logo" 
    style={{ maxWidth: '200px', maxHeight: '150px' }}
  />
</div>`
    : '';
  
  return `---
id: ${manufacturer.slug}
title: ${manufacturer.name}
sidebar_position: 3
---

# ${manufacturer.name}

${logoHtml}

${manufacturer.description_html 
    ? `<div dangerouslySetInnerHTML={{ __html: \`${manufacturer.description_html.replace(/`/g, '\\`')}\` }} />`
    : manufacturer.description || `${manufacturer.name} is a manufacturer of energy devices supported by Texture.`}

${manufacturer.website_url ? `**Website**: [${manufacturer.name} Website](${manufacturer.website_url})` : ''}

## Support Status

**Support Level**: ${supportLevelEmoji[manufacturer.support_level] || ''} ${supportLevelDescription[manufacturer.support_level] || manufacturer.support_level}

**Grid Services Support**: ${
  manufacturer.supported_device_types?.length === 1 && 
  (manufacturer.supported_device_types[0] === 'vehicle' ||
   manufacturer.supported_device_types[0] === 'charger' ||
   manufacturer.supported_device_types[0] === 'thermostat')
    ? 'N/A (Not applicable for this device type)'
    : (manufacturer.supports_grid_services ? '✅ Supported' : '❌ Not supported')
}

## Supported Device Types

${deviceTypesList}

## Integration Details

${manufacturer.name} devices are integrated into the Texture platform using our standard OEM integration approach. We never use web scraping or reverse engineering in our device integrations.

**Integration Method**: ${manufacturer.source === 'direct' ? '🔌 Direct API integration with the manufacturer' : 
  manufacturer.source === 'smartcar' ? '🚗 Integration via Smartcar partnership' : 
  manufacturer.source ? manufacturer.source : '🔌 Direct API integration with the manufacturer'}

${manufacturer.documentation_html || manufacturer.documentation ? `
## Manufacturer Documentation

${manufacturer.documentation_html 
  ? `<div dangerouslySetInnerHTML={{ __html: \`${manufacturer.documentation_html.replace(/`/g, '\\`')}\` }} />`
  : manufacturer.documentation}
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

## All Manufacturers

${manufacturers.map(m => `- [${m.name}](${m.slug})`).join('\n')}

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