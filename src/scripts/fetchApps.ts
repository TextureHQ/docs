/**
 * This script fetches apps data from Payload CMS and creates static data
 * for use in the Docusaurus site build. This allows us to generate static pages
 * for apps rather than fetching them client-side.
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

/**
 * @typedef {Object} Logo
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
 * @typedef {Object} ConfigurationField
 * @property {string} fieldType
 * @property {string} fieldName
 * @property {string} fieldLabel
 * @property {boolean} isRequired
 * @property {string} id
 */

/**
 * @typedef {Object} App
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {Logo} logo
 * @property {string} support_level
 * @property {ConfigurationField[]} configurationFields
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} is_included
 * @property {string} [learn_more_url]
 * @property {boolean} is_featured_on_home_page
 * @property {string} [about]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {App[]} docs
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
const OUTPUT_FILE = path.join(OUTPUT_DIR, "apps.json");

/**
 * Fetches apps data from Payload CMS
 * @returns {Promise<App[]>}
 */
async function fetchApps() {
  try {
    const response = await axios.get(`${PAYLOAD_CMS_URL}/api/apps`, {
      params: {
        limit: 1000,
      },
    });

    return response.data.docs;
  } catch (error) {
    console.error("Error fetching apps:", error);
    return [];
  }
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Fetch apps
    const apps = await fetchApps();

    // Sort apps by name
    apps.sort((a, b) => a.name.localeCompare(b.name));

    // Write output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(apps, null, 2));

    console.log(
      `Successfully fetched ${apps.length} apps and saved to ${OUTPUT_FILE}`
    );
  } catch (error) {
    console.error("Failed to fetch apps:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
module.exports = { fetchApps };
