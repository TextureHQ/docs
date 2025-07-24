/**
 * This script fetches manufacturer data from Payload CMS and creates static data
 * for use in the Docusaurus site build. This allows us to generate static pages
 * for manufacturers rather than fetching them client-side.
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

/**
 * @typedef {Object} VectorIcon
 * @property {string} id
 * @property {string} alt
 * @property {string} filename
 * @property {string} mimeType
 * @property {number} filesize
 * @property {number} width
 * @property {number} height
 * @property {Object} sizes
 * @property {Object} sizes.thumbnail
 * @property {string|null} sizes.thumbnail.url
 * @property {Object} sizes.card
 * @property {string|null} sizes.card.url
 * @property {Object} sizes.tablet
 * @property {string|null} sizes.tablet.url
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} url
 */

/**
 * @typedef {Object} Manufacturer
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {VectorIcon} vector_icon
 * @property {boolean} supports_grid_services
 * @property {string} support_level
 * @property {string[]} [supported_device_types]
 * @property {string} [description]
 * @property {string} [description_html]
 * @property {string} [about]
 * @property {string} [website_url]
 * @property {string} [documentation]
 * @property {string} [documentation_html]
 * @property {string} [source]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {Manufacturer[]} docs
 * @property {number} totalDocs
 * @property {number} limit
 * @property {number} totalPages
 * @property {number} page
 * @property {number} pagingCounter
 * @property {boolean} hasPrevPage
 * @property {boolean} hasNextPage
 * @property {number|null} prevPage
 * @property {number|null} nextPage
 */

const PAYLOAD_CMS_URL = "https://device.cms.texture.energy";
const OUTPUT_DIR = path.join(process.cwd(), "src", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "manufacturers.json");

/**
 * Fetches manufacturer data from Payload CMS
 * @returns {Promise<Manufacturer[]>}
 */
async function fetchManufacturers() {
  try {
    const response = await axios.get(`${PAYLOAD_CMS_URL}/api/manufacturers`, {
      params: {
        limit: 1000,
      },
    });

    // Process manufacturers - ensure they have slugs
    const manufacturers = response.data.docs.map((manufacturer) => {
      // If manufacturer doesn't have a slug, create one from the name
      if (!manufacturer.slug) {
        manufacturer.slug = manufacturer.name
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-");
      }
      return manufacturer;
    });

    return manufacturers;
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    return [];
  }
}

/**
 * Enriches manufacturer data with device type information
 * @param {Manufacturer[]} manufacturers
 * @returns {Promise<Manufacturer[]>}
 */
async function enrichManufacturersWithDeviceTypes(manufacturers) {
  try {
    // Fetch all device models
    const response = await axios.get(`${PAYLOAD_CMS_URL}/api/device_models`, {
      params: {
        limit: 1000,
      },
    });

    const deviceModels = response.data.docs;

    // Create a map to track device types by manufacturer
    const manufacturerDeviceTypes = new Map();

    // Process each device model
    deviceModels.forEach((model) => {
      if (model.manufacturer && model.manufacturer.id && model.type) {
        const manufacturerId = model.manufacturer.id;
        if (!manufacturerDeviceTypes.has(manufacturerId)) {
          manufacturerDeviceTypes.set(manufacturerId, new Set());
        }
        manufacturerDeviceTypes.get(manufacturerId).add(model.type);
      }
    });

    // Add device types to manufacturer objects
    return manufacturers.map((manufacturer) => {
      const deviceTypes = manufacturerDeviceTypes.get(manufacturer.id);
      return {
        ...manufacturer,
        supported_device_types: deviceTypes ? Array.from(deviceTypes) : [],
      };
    });
  } catch (error) {
    console.error("Error enriching manufacturers with device types:", error);
    return manufacturers;
  }
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Fetch manufacturers
    let manufacturers = await fetchManufacturers();

    // Enrich with device types
    manufacturers = await enrichManufacturersWithDeviceTypes(manufacturers);

    // Sort manufacturers by name
    manufacturers.sort((a, b) => a.name.localeCompare(b.name));

    // Write output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manufacturers, null, 2));

    console.log(
      `Successfully fetched ${manufacturers.length} manufacturers and saved to ${OUTPUT_FILE}`
    );
  } catch (error) {
    console.error("Failed to fetch manufacturers:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
module.exports = { fetchManufacturers, enrichManufacturersWithDeviceTypes };
