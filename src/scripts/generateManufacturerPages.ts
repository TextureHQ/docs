/**
 * This script generates individual manufacturer pages based on data fetched
 * from Payload CMS. It creates MDX files for each manufacturer in the docs.
 */

const fs = require("fs");
const path = require("path");
const {
  fetchManufacturers,
  enrichManufacturersWithDeviceTypes,
} = require("./fetchManufacturers");

const DOCS_DIR = path.join(
  process.cwd(),
  "docs",
  "integrations",
  "manufacturers"
);
const DATA_FILE = path.join(process.cwd(), "src", "data", "manufacturers.json");

// Map device types to human-readable names
const deviceTypeDisplayNames = {
  battery: "Batteries",
  charger: "EV Chargers",
  inverter: "Solar Inverters",
  thermostat: "Smart Thermostats",
  vehicle: "Electric Vehicles",
};

/**
 * Generate a MDX file for a manufacturer
 * @param {import('./fetchManufacturers').Manufacturer} manufacturer
 * @returns {string}
 */
function generateManufacturerPage(manufacturer) {
  const supportLevelEmoji = {
    production: "✅",
    development: "🔨",
    planned: "🗓️",
    blocked: "🚫",
  };

  const supportLevelDescription = {
    production: "Production-ready, fully supported integration",
    development: "Integration currently in development",
    planned: "Integration planned for the future",
    blocked: "Integration blocked by the manufacturer",
  };

  const deviceTypesList =
    manufacturer.supported_device_types &&
    manufacturer.supported_device_types.length > 0
      ? manufacturer.supported_device_types
          .map((type) => deviceTypeDisplayNames[type] || type)
          .join(", ")
      : "None reported";

  return `---
id: ${manufacturer.slug}
title: ${manufacturer.name}
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# ${manufacturer.name}

${
  manufacturer.description ||
  `${manufacturer.name} is a manufacturer of energy devices supported by Texture.`
}

${
  manufacturer.website
    ? `**Website**: [${manufacturer.website}](${manufacturer.website})`
    : ""
}

## Support Status

**Support Level**: ${supportLevelEmoji[manufacturer.support_level] || ""} ${
    supportLevelDescription[manufacturer.support_level] ||
    manufacturer.support_level
  }

**Grid Services Support**: ${
    manufacturer.supports_grid_services ? "✅ Supported" : "❌ Not supported"
  }

## Supported Device Types

${deviceTypesList}

## Integration Details

${
  manufacturer.name
} devices are integrated into the Texture platform using our standard OEM integration approach. We never use web scraping or reverse engineering in our device integrations.

`;
}

/**
 * Generate the index page for manufacturers
 * @param {import('./fetchManufacturers').Manufacturer[]} manufacturers
 * @returns {string}
 */
function generateIndexPage(manufacturers) {
  return `---
id: manufacturers
title: Supported Manufacturers
sidebar_position: 1
---

# Supported Manufacturers

Texture works with the following manufacturers to provide integrations for their devices. We work directly with manufacturers to build OEM Partnership APIs with well-documented access to device capabilities.

${manufacturers.map((m) => `- [${m.name}](./${m.slug})`).join("\n")}

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
 * @returns {string}
 */
function generateCategoryJson() {
  return JSON.stringify(
    {
      label: "Manufacturers",
      position: 5,
      link: {
        type: "generated-index",
        description: "Browse all manufacturers supported by Texture",
      },
    },
    null,
    2
  );
}

async function main() {
  try {
    // Create manufacturers directory if it doesn't exist
    if (!fs.existsSync(DOCS_DIR)) {
      fs.mkdirSync(DOCS_DIR, { recursive: true });
    }

    // Check if we already have the data file
    let manufacturers;
    if (fs.existsSync(DATA_FILE)) {
      // Use cached data
      const data = fs.readFileSync(DATA_FILE, "utf8");
      manufacturers = JSON.parse(data);
    } else {
      // Fetch fresh data
      let fetchedManufacturers = await fetchManufacturers();
      manufacturers = await enrichManufacturersWithDeviceTypes(
        fetchedManufacturers
      );

      // Create data directory if needed
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Save the data
      fs.writeFileSync(DATA_FILE, JSON.stringify(manufacturers, null, 2));
    }

    // Generate category JSON
    fs.writeFileSync(
      path.join(DOCS_DIR, "_category_.json"),
      generateCategoryJson()
    );

    // Generate index page
    fs.writeFileSync(
      path.join(DOCS_DIR, "index.md"),
      generateIndexPage(manufacturers)
    );

    // Generate individual manufacturer pages
    manufacturers.forEach((manufacturer) => {
      fs.writeFileSync(
        path.join(DOCS_DIR, `${manufacturer.slug}.md`),
        generateManufacturerPage(manufacturer)
      );
    });

    console.log(
      `Successfully generated ${manufacturers.length} manufacturer pages in ${DOCS_DIR}`
    );
  } catch (error) {
    console.error("Failed to generate manufacturer pages:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { generateManufacturerPage, generateIndexPage };
