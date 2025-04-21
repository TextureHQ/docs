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

## How Sites are Created

Sites can be created through several paths in the Texture Platform:

1. **Dashboard Creation**
   - Navigate to the Sites list in the Dashboard and click the "+ Add Site" button
   - Provide the address information for the Site
   - The Site will be created and automatically enriched with location data

2. **API Creation**
   - Use the REST API by calling `POST /sites` and providing the address information
   - The API will create the Site and initiate automatic data enrichment

3. **Program Enrollment**
   - When a customer enrolls in a [Program](../programs-enrollments/overview.md) through the Texture Onboard flow, we collect their address details and automatically create a Site for them
   - This Site becomes the central location for all enrolled devices and program-related data

4. **Texture Connect Flow**
   - Going through our [Texture Connect](../sources/texture-connect.md) flow to connect a device requires providing an address
   - Once the customer completes the flow, Texture creates a Site at that address and links the newly connected device to it

5. **Data Source Connection**
   - When connecting a data source (such as [Arcadia or UtilityAPI](./apps.md)) that already has customer location data, Texture automatically:
     - Pulls in the data
     - Creates Sites for each unique address
     - Links this data to the corresponding Site on our platform

> **Note:** Regarding geographic support:
> - **U.S. Addresses**: Currently fully supported with all features and data sources
> - **Limited International Support**: Some regions outside the U.S. are supported with reduced functionality:
>   - Weather data is available globally
>   - Marginal carbon emissions data is U.S. only
>   - Some Apps (Palmetto's Energy Intelligence, Shovels) only work with U.S. addresses
> - **Future Plans**: We intend to expand global site support over time
> - **Feedback Welcome**: Please let us know if global site support is important for your use case

## What Happens When a Site is Created?

When a user (or system) provides address information for a new Site:
1. **Geocoding**
   - Texture converts the address into latitude/longitude coordinates to find it in the real world
2. **Site Creation/Upsert**
   - A new Site record is created—or an existing Site is updated if it matches the same address footprint
3. **Customer Linking**
   - If the address is linked to an existing [Customer](./customers.md), we associate the new Site with that Customer. Otherwise, Texture creates a new Customer record
4. **Automatic Data Enrichment**
   - Several background processes are initiated to enhance the Site with valuable data:
     - **Territory Assignment**: Determining the utility territory, ISO, and wholesale market for that Site's coordinates
     - **Carbon Emissions**: Fetching marginal carbon emissions data for the Site location
     - **Weather Data**: Collecting local weather data and forecasts
     - **Apps Integration**: If any [Apps](./apps.md) are enabled that provide additional data for the Site:
       - **Shovels**: Fetching permit data related to the Site
       - **Palmetto's Energy Intelligence**: Adding energy modeling data for the Site
       - **Bayou Energy**: Connecting utility bill and meter interval data
5. **Device/Utility Data Sync**
   - Any Devices or utility billing/interval data associated with that location auto-link to the newly created Site

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

Texture's **REST API** exposes endpoints to create, list, fetch, and update Site data. Key calls include:

- **Create a Site**
  ```http
  POST /sites
  ```
  Creates a new Site by providing address information. This initiates the automatic data enrichment process.

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

  The GET request supports an optional `include` query parameter to retrieve additional data associated with the Site:
  ```http
  GET /sites/{id}?include=weather,permits,statements,intervals,energy-modeling
  ```
  
  These optional include values are:
  
  - **weather**: Weather data for the Site (included by default for all Sites)
  - **permits**: Permit data if the Shovels app is enabled and data is available
  - **statements**: Monthly utility bills including energy used, total charges, and PDF bills if connected via Arcadia, UtilityAPI, or Bayou Energy
  - **intervals**: Smart meter interval data (typically 15-minute or 1-hour) if available from the utility
  - **energy-modeling**: Disaggregated data on a Site's energy footprint from services like Palmetto's Energy Intelligence

  > **Note:** Including additional data may impact API performance, so we recommend including only the data you need for your specific use case.

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

If you run into any issues or have specific requests around Sites, please use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner). A human from our team will reply quickly to help expand functionality and ensure your energy data is as rich and actionable as possible.

---

## Next Steps

- **Browse the [API](/api)** for full details on Site endpoints.
- **Enable Apps** that provide utility billing or meter data to enrich your Sites further.
- **Explore** the Site's Dashboard tabs (Overview, Activity, Bills) to track usage, events, and costs.
- **Combine** with [Devices](./devices.md) and [Customers](./customers.md) for a complete energy management solution.

A **Site** is more than just an address—it's a living, enriched data model that powers all your energy insights in Texture.