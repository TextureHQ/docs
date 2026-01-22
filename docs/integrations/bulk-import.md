---
sidebar_position: 5
title: Bulk Import
---

# Bulk Import

import { Subtitle } from '@components/Subtitle';

<Subtitle>Upload sites, customers, and device information at scale for fleet onboarding</Subtitle>

Texture's bulk import tool enables large-scale data migration by uploading sites, customers, and device information before [Integration Hub](/integrations/integration-hub) configuration is needed. Use bulk import to complete initial portfolio onboarding or manage net new system uploads at scale.

## Overview

Data onboarding is a two-step process:

1. **Import your portfolio** — Upload Site, Customer, and Device IDs via bulk import (this guide)
2. **Configure integrations** — Connect your OEM and data provider credentials to begin syncing (see [Integration Hub Guide](/integrations/integration-hub))

Once both steps are complete, Texture automatically pulls device performance, energy usage, and program enrollment data on a recurring basis—no manual updates required.

## Before You Begin

### Important Considerations

:::warning Homeowner-Owned Sites
If a homeowner owns the site, they should onboard their device through [Texture Connect](/integrations/texture-connect) rather than through your Integration Hub or bulk import list.
:::

## Data Dictionary

### Contact related fields

| Field | Required | Notes |
|-------|----------|-------|
| `firstName` | Required | Contact's first name |
| `lastName` | Required | Contact's last name |
| `email` | Optional | We prefer a unique email for validation, but you can use a TPO or company-generated email like `dev@company.com` |
| `phone` | Optional | Contact phone number |

### Site related fields

| Field | Required | Notes |
|-------|----------|-------|
| `streetOne` | Required | Street address |
| `streetTwo` | Optional | Apartment, suite, unit, etc. |
| `city` | Required | City name |
| `state` | Required | State abbreviation |
| `postalCode` | Required | ZIP or postal code |
| `country` | Optional | Country code (defaults to US) |

### Device related fields

| Field | Required | Notes |
|-------|----------|-------|
| `manufacturerSlugs` | Required | Must be exactly one of: `tesla`, `enphase`, `solaredge-monitoring-api`, `eg4-electronics`, `franklinwh` |
| `systemIdentifier` | Required | See manufacturer-specific requirements below |

### System Identifier Requirements by Manufacturer

| Manufacturer | System Identifier Format |
|--------------|---------------------|
| `tesla` | DIN or Site UUID |
| `enphase` | Site ID |
| `solaredge-monitoring-api` | Site ID |
| `eg4-electronics` | Inverter serial number |
| `franklinwh` | aGate serial number |

### Additional Variables

| Field | Required | Notes |
|-------|----------|-------|
| `referenceId` | Required | Backreference to your system—typically a `userId`, `accountId`, or `siteId`. This identifier is used to prevent duplicate customer creation and is tied to created sites and devices. |
| `tags` | Optional | Arbitrary labels that create logical device groupings for batch operations. |

## Performing a Bulk Import

### Step 1: Prepare your data file

Download the bulk import template and populate it with your site, customer, and device data. Ensure all required fields are complete and `manufacturerSlugs` values match exactly.

### Step 2: Upload to Texture

In Texture, click **Integration Hub** in the left sidebar, then navigate to **Bulk Import** and upload your prepared file.

### Step 3: Review validation results

Texture validates your upload and displays any errors. Common errors are listed in the Troubleshooting section below.

### Step 4: Confirm import

Once validation passes, confirm the import. Texture creates site and customer records immediately. Device records are created and await Integration Hub configuration to begin syncing data.

## After Import

### What Happens Next

- **Sites and Customers** are created immediately and appear in your [Sites](/platform-concepts/sites) and [Customers](/platform-concepts/contacts) views
- **Devices** are created but remain in a pending state until [Integration Hub](/integrations/integration-hub) is configured
- Once Integration Hub is configured, Texture begins syncing device performance data automatically

### Where to Find Your Data

Imported sites and customers appear in your Sites and Customers views. Once Integration Hub is configured, devices become active and appear in your [Devices](/platform-concepts/devices) view. All imported data becomes available to query via the Texture API.

## Troubleshooting

### Upload Failed with Validation Error

Review the error message in Texture. The most common validation errors are:

#### manufacturerSlugs not specified correctly

The field is case sensitive and must match exactly: `tesla`, `enphase`, `solaredge-monitoring-api`, `eg4-electronics`, or `franklinwh`. Using `Tesla`, `TESLA`, `solaredge`, `eg4`, or any other variation will cause the upload to fail.

#### Invalid address

Ensure all required address fields (`streetOne`, `streetTwo`, `city`, `state`, `postalCode`, `country`) are complete and properly formatted.

#### Address undiscoverable in Mapbox

Our mapping partner, Mapbox, cannot locate the address. Verify the address exists and is formatted correctly. Try variations if the exact format is causing issues.

#### Additional blank rows

Remove any empty rows from your spreadsheet before uploading. Trailing blank rows can cause validation errors.

**Fix the errors in your file and re-upload.**

### Devices Aren't Syncing Data

Devices require [Integration Hub](/integrations/integration-hub) configuration before data syncing begins. See the Integration Hub Guide to connect your OEM credentials.

### Need Help with a Complex Import

Contact your Implementation team for assistance with large migrations, custom data mapping, or integration questions.

## Support

- **For upload questions**: Review the data dictionary and common errors section above
- **For data mapping help**: Contact your Texture Implementation team for guidance on complex scenarios
- **For technical issues**: Use the support panel in Texture or email [support@texturehq.com](mailto:support@texturehq.com) with your organization name and upload details
