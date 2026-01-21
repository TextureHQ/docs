---
---

import { Subtitle } from '@components/Subtitle';

# Sites
<Subtitle>Central location models that connect customers, devices, and energy data</Subtitle>

**Sites** represent physical locations—like homes, buildings, or facilities—within the Texture Platform. They serve as the anchor for energy data, program logic, and device control. Every **Contact**, **Device**, and external dataset (like utility bills or meter intervals) ultimately links back to a Site.

Sites are enriched with location-based context (e.g., ISO, utility territory, weather, carbon intensity), and they power automation, analytics, and orchestration across the platform.

---

## Why Sites?

Sites are foundational objects in Texture. They enable:

- **System Modeling** — Devices, Contacts, and usage data all connect to a Site.
- **Aggregated Metrics** — Summarize total energy consumption, production, storage, and emissions.
- **Geolocation Context** — Automatically assign ISO, utility, and marginal carbon intensity.
- **Data Enrichment** — Integrate with tools like Arcadia or Shovels to ingest bills, permits, and intervals.
- **Unified Access** — Visualize in the [Dashboard](https://app.texturehq.com) or query via [API](/api).

---

## How Sites Are Created

Sites can be created in five main ways:

### 1. Dashboard

- Use **+ Add Site** in the Sites list.
- Enter address details; enrichment runs automatically.

### 2. API

- Call `POST /sites` with address info.
- Texture geocodes and enriches the Site automatically.

### 3. Program Enrollment

- When a contact enrolls in a [Program](../programs-enrollments/overview.md), Texture collects address data and creates a Site.
- All program data and Devices link to this Site.

### 4. Texture Connect

- During [Texture Connect](../integrations/texture-connect.md), the user provides an address.
- A new Site is created and linked to the device.

### 5. Data Source Connections

- Tools like [Arcadia or UtilityAPI](/integrations/apps) sync address data.
- Texture auto-creates a Site for each location and links all synced data.

:::caution
**Geographic Support**

- **U.S.**: Fully supported with all features.
- **International**: Partial support.
  - Weather data: global
  - Emissions data: U.S. only
  - Apps like Shovels or Palmetto: U.S. only
- **Roadmap**: Global enrichment expansion is in progress. Reach out if international support is important for your use case.
:::

---

## What Happens When a Site Is Created?

1. **Geocoding**  
   Texture converts the address into coordinates.

2. **Site Upsert**  
   A new Site is created—or matched to an existing one based on the address footprint.

3. **Contact Linking**  
   If an existing [Contact](./contacts.md) is linked to the address, Texture associates them with the Site. Otherwise, it creates a new record.

4. **Enrichment**  
   Background jobs enhance the Site with:
   - **Territory Assignment**
   - **Marginal Emissions**
   - **Weather Data**
   - App-driven enrichments:
     - **Shovels** (permits)
     - **Palmetto** (energy modeling)
     - **Bayou Energy** (utility billing and intervals)

5. **Data Sync**  
   Devices, utility bills, and interval data linked to the location are automatically associated.

---

## Site Overview in the Dashboard

Each Site record includes the following tabs:

### Overview

- Address & map
- Linked devices
- Energy charts (daily/weekly/monthly)
- Marginal emissions (if available)

### Activity

- Event feed (e.g. "Device Updated", "Utility Bill Imported")
- View raw payloads for auditing

### Bills

- Utility bill summaries
- Itemized charges (if available)
- Interval data (15-minute or hourly)

---

## Managing Sites via API

Texture's REST API supports full Site management.

### Create a Site

```http
POST /sites
```

Provide address info to create a Site and trigger enrichment.

### List Sites

```http
GET /sites
```

Returns all Sites in the workspace with optional filters.

### Fetch Site Details

```http
GET /sites/{id}
```

You can also request related data:

```http
GET /sites/{id}?include=weather,permits,statements,intervals,energy-modeling
```

**Include Parameters**
- **weather**: Weather data (default)
- **permits**: Permit data via Shovels
- **statements**: Utility bills via Arcadia, UtilityAPI, Bayou
- **intervals**: Smart meter interval data (15min or hourly)
- **energy-modeling**: Disaggregated modeling via Palmetto

:::tip
Only include what you need. Including multiple datasets may impact response time.
:::

You can also associate or disassociate Sites from Contacts or Devices by passing related IDs.

For full API details and request/response formats, visit our [interactive REST API docs](/api).

---

## Data & Analytics

Sites act as the central roll-up for location-level data:
- **Consumption** — Grid or local usage
- **Production** — On-site generation
- **Storage** — Battery or thermal storage
- **Emissions** — Real-time marginal intensity
- **Billing** — Charges, usage, and intervals from utility sources

This structure enables unified insight and control at the location level.

---

## Best Practices

- **Use referenceId** to match internal records
- **Model flexibly** — Use one Site for a building or break into sub-Sites for finer resolution
- **Enable enrichments** — Connect Apps for full telemetry and billing data
- **Audit links** — Use API to validate all Site ↔ Contact ↔ Device relationships

---

## Need Help?

Use the live chat in the Dashboard to reach our support team. We can help with setup, enrichment, API usage, or troubleshooting.

---

## Next Steps

- **Explore** the full Site API
- **Connect** enrichment Apps
- **Review** Sites in the Dashboard (Overview, Activity, Bills)
- **Link** Sites to Devices and Contacts

A Site is more than just an address—it's the data backbone for your energy operations in Texture.