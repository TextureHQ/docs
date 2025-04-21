---
sidebar_position: 1
---

# SF Climate Week Hackathon 2025

Welcome to the **SF Climate Week Hackathon 2025** tutorial! This guide will show you how to leverage the Texture Platform as your central hub for integrating with the official hackathon partner APIs: Bayou Energy, Shovels, and Palmetto's Energy Intelligence.

## Why Use Texture for the Hackathon?

Texture provides a unified platform that simplifies working with multiple energy data sources:

- **Single API Access Point**: One REST API to access data from all three hackathon partner services
- **Unified Dashboard**: Visualize all your energy data in one place through the Texture Dashboard
- **Automatic Data Enrichment**: Texture automatically enhances Sites with weather, emissions, and utility territory data
- **Simplified Auth**: Manage all your API keys and authentication in one secure location
- **Single API Key**: Use your Texture API key instead of managing multiple service credentials

## Getting Started

Before you begin integrating with the hackathon partner APIs, you'll need to:

1. Sign up for a Texture account
2. Create a Workspace
3. Configure each partner API integration

### Step 1: Sign Up for Texture

1. Visit [dashboard.texturehq.com](https://dashboard.texturehq.com) and click "Sign Up"
2. Complete the registration process with your email address
3. Verify your email address through the confirmation link

### Step 2: Create a Workspace

1. After logging in, you'll be prompted to create a new Workspace
2. Name your Workspace (e.g., "SF Climate Hackathon 2025")
3. Complete the workspace setup process

### Step 3: Navigate to the Apps Page

1. In the left sidebar, click on "Apps"
2. You'll see the available integrations, including Bayou Energy, Shovels, and Palmetto's Energy Intelligence

## Configuring Hackathon Partner Integrations

### Bayou Energy Integration

Bayou Energy provides access to utility bill and meter interval data, giving you insights into energy consumption patterns.

To set up Bayou Energy integration:

1. Obtain your Bayou Energy API credentials:
   - Register at [Bayou Energy Developer Portal](https://docs.bayou.energy)
   - Generate an API key from your Bayou Energy developer account

2. Configure in Texture:
   - Navigate to Apps → Bayou Energy in your Texture Dashboard
   - Enter your Bayou Energy API key
   - Click "Save" to activate the integration

Once configured, Texture will:
- Automatically import utility bill and meter interval data
- Link the data to corresponding Sites in your Workspace
- Make the data accessible via the Texture API and Dashboard

### Shovels Integration

Shovels provides permit data for residential and commercial buildings, allowing you to track and monitor permitting status.

To set up Shovels integration:

1. Obtain your Shovels API credentials:
   - Register at [Shovels Developer Portal](https://shovels.ai)
   - Create and copy your API key from the Shovels dashboard

2. Configure in Texture:
   - Navigate to Apps → Shovels in your Texture Dashboard
   - Enter your Shovels API key
   - Click "Save" to activate the integration

3. Important: Create Sites First
   - Since Shovels has nationwide coverage, Texture doesn't automatically create Sites from Shovels data
   - You must first create the Sites you want to fetch permit data for (via Dashboard, REST API, or Connect flow)
   - Once a Site exists, Texture will fetch and associate relevant permit data with it

Once configured, Texture will:
- Fetch permit data related to your existing Sites
- Provide permit status, details, and history
- Display permit information in the Texture Dashboard's "Permits" tab and make it available via API

> **Note:** Not every Site will have permit data available. Shovels has data for permits issued in the last decade, so if a Site shows "No permits," it may simply mean there are no recent permits for that location rather than indicating an issue with the integration.

### Palmetto's Energy Intelligence Integration

Palmetto's Energy Intelligence provides detailed energy modeling for Sites, offering insights into energy usage patterns and efficiency opportunities.

To set up Palmetto's Energy Intelligence integration:

1. Obtain your Palmetto API credentials:
   - Register at [Palmetto Energy Intelligence Developer Portal](https://ei.docs.palmetto.com/)
   - Generate an API key from your Palmetto developer account

2. Configure in Texture:
   - Navigate to Apps → Palmetto's Energy Intelligence in your Texture Dashboard
   - Enter your Palmetto API key
   - Click "Save" to activate the integration

3. Important: Create Sites First
   - Similar to Shovels, you must first create the Sites you want to analyze
   - Create Sites via the Dashboard, REST API, or Connect flow
   - Once a Site exists, Texture will fetch and associate energy modeling data with it

Once configured, Texture will:
- Import energy modeling data for your existing Sites
- Provide disaggregated energy usage information
- Make the data accessible via the Texture API and Dashboard

## Creating and Managing Sites

To take full advantage of these integrations, you'll need to create Sites in Texture. Each Site represents a physical location that will be enriched with data from the hackathon partner APIs.

### Creating a Site

1. In the Texture Dashboard, click on "Sites" in the left sidebar
2. Click the "+ Add Site" button
3. Enter the Site address (must be a U.S. address for full functionality)
4. Click "Create Site"

Texture will automatically:
- Geocode the address
- Determine the utility territory and ISO
- Fetch weather and carbon emissions data
- Pull in data from your configured App integrations (Bayou Energy, Shovels, and Palmetto's Energy Intelligence)

### Retrieving Site Data via API

You can access all the Site data, including information from the hackathon partner APIs, through the Texture REST API:

```http
GET https://api.texturehq.com/v1/sites/{id}?include=weather,permits,statements,intervals,energy-modeling
```

This will return a comprehensive data package including:
- Site details and location information
- Weather data (available by default)
- Permit data from Shovels (if available)
- Utility statements and intervals from Bayou Energy (if available)
- Energy modeling data from Palmetto (if available)

<!-- Hackathon-specific tutorials will be added closer to the event -->

## Need Help?

If you encounter any issues or have questions during the hackathon:

- Meet Victor, Co-founder and CTO of Texture, in-person at the AWS loft
- Join the Hackathon Discord channel and tag @Texture
- Use the live chat in the Texture Dashboard to connect directly with Texture engineers

Good luck with your hackathon project! We're excited to see what you build using Texture and our partner APIs.