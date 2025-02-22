---
sidebar_position: 5
---

# Sites

**Sites** represent physical locations (like a home or commercial building) in the Texture Platform. They serve as a central model to which **Customers**, **Devices**, and external data (e.g., utility bills, meter intervals) all connect.

Texture automatically creates or updates a **Site** when a Device or utility account is onboarded, then enriches it with location-based data (utility territory, ISO, marginal carbon emissions, weather, etc.). All Site data can be viewed in the [Dashboard](https://dashboard.texturehq.com) and accessed programmatically via our [API](/api).

---

## Why Sites?

- **Core Model**: Everything else (Devices, Customers, usage data) links back to a Site.
- **Aggregated Metrics**: View total energy consumption, production, storage, and emissions for each Site.
- **Geolocation & Signals**: Automatically assigned utility territory, ISO, and real-time carbon emissions data.
- **Enrichment & Automation**: Integrations (e.g., Arcadia, UtilityAPI, or Shovels) add billing, meter intervals, or permit data to the Site.
- **Dashboard & API**: Easily visualize or pull all Site info programmatically for deeper analysis or automation.

---

## What Happens When a Site is Created?

When a user (or system) provides location details (e.g., an address) during Device or utility onboarding:
1. **Geocoding**
   - Texture converts the address into latitude/longitude coordinates.
2. **Site Creation/Upsert**
   - A new Site record is created—or an existing Site is updated if it matches the same address footprint.
3. **Customer Linking**
   - If the address is linked to an existing [Customer](./customers.md), we associate the new Site with that Customer. Otherwise, Texture creates a new Customer record.
4. **Territory Assignment**
   - Texture determines the utility territory, ISO, and (if applicable) the wholesale market for that Site's coordinates.
5. **Signal Collection**
   - Jobs run to pull in local weather, marginal carbon emissions (via WattTime), or other signals to enrich the Site's data.
6. **Device/Utility Data Sync**
   - Any Devices or utility billing/interval data associated with that location auto-link to the newly created Site.

---

## Site Overview in the Dashboard

Each Site in the **Sites** section of the Dashboard offers multiple tabs:

1. **Overview**
   - **Map & Address**: Displaying the location.
   - **Devices**: A quick list of the Devices installed at that Site.
   - **Energy Charts**: Aggregated daily, weekly, or monthly data (e.g., total kWh used/stored/produced).
   - **Marginal Carbon Emissions**: If available, the real-time or historical carbon intensity at that location.

2. **Activity**
   - A feed of relevant events (e.g., "Device Updated," "Utility Bill Imported"), including raw payload details for auditing.

3. **Bills**
   - **Usage**: Summaries of historical energy usage from utility statements (if integrated via an App like UtilityAPI).
   - **Charges**: If provided by the utility, itemized cost breakdowns.
   - **Meter Intervals**: Interval data (e.g., 15-minute or hourly usage) for a granular view of consumption.

---

## Managing Sites via API

Texture's **REST API** exposes endpoints to list, fetch, and update Site data. Key calls include:

- **List all Sites**
  ```http
  GET /sites
  ```
  Returns all Sites in your Workspace, with optional filters and pagination.

- **Get a specific Site**
  ```http
  GET /sites/{id}
  ```
  Retrieves detailed info about a Site, including its location, Devices, and aggregated usage data.

You can also associate or unassociate a Site with a Customer or Device by specifying the relevant IDs in your requests.

For full API details and request/response formats, visit our [interactive REST API docs](/api).

---

## Data & Analytics

Sites offer a holistic view of energy data:
- **Consumption**: Total energy consumed from the grid or other sources.
- **Production**: Energy generated onsite (e.g., from a solar inverter).
- **Storage**: Total energy stored onsite (e.g., in whole home batteries).
- **Emissions**: Real-time marginal carbon intensity and total emissions data (via WattTime or other partners).
- **Billing**: Utility bills, charges, and meter intervals, if your organization has enabled relevant Apps (e.g., UtilityAPI, Arcadia).

This aggregated approach helps you see how all Devices and cCstomers at a location impact overall energy usage and costs.

---

## Tips & Best Practices

- **Reference IDs**
  - Use a custom `referenceId` or site name if you need consistent mapping to your own system.
- **One Site, Many Devices**
  - If multiple users in the same building have separate meters or devices, you can create sub-Sites or keep them under one main Site—depending on your business logic.
- **Enrichment**
  - Make sure you have location-based integrations (like weather or emissions) set up to get the most out of Sites.
- **Linking**
  - Sites automatically link to [Customers](./customers.md), but you can override or manually adjust these associations via the API.

---

## Need Help or Have Questions?

If you run into any issues or have specific requests around Sites, please reach out through our [Customer Portal](https://texture.atlassian.net/servicedesk/customer/portal/2). We're here to help expand functionality and ensure your energy data is as rich and actionable as possible.

---

## Next Steps

- **Browse the [API](/api)** for full details on Site endpoints.
- **Enable Apps** that provide utility billing or meter data to enrich your Sites further.
- **Explore** the Site's Dashboard tabs (Overview, Activity, Bills) to track usage, events, and costs.
- **Combine** with [Devices](./devices.md) and [Customers](./customers.md) for a complete energy management solution.

A **Site** is more than just an address—it's a living, enriched data model that powers all your energy insights in Texture.