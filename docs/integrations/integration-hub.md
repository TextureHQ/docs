---
sidebar_position: 4
title: Integration Hub
---

# Integration Hub

import { Subtitle } from '@components/Subtitle';

<Subtitle>Connect third-party data sources to enable automatic device data syncing</Subtitle>

Texture's Integration Hub connects your third-party data sources—device manufacturers, monitoring platforms, and utility providers—directly to the Texture Platform. Configure your integrations here to enable automatic data syncing for your imported sites and devices.

## Overview

Data onboarding is a two-step process:

1. **Import your portfolio** — Upload Site, Customer, and Device IDs via [Bulk Import](/integrations/bulk-import)
2. **Configure integrations** — Connect your OEM and data provider credentials to begin syncing (this guide)

Once both steps are complete, Texture automatically pulls device performance, energy usage, and program enrollment data on a recurring basis—no manual updates required.

:::warning Homeowner-Owned Sites
If a homeowner owns the site, they should onboard their device through [Texture Connect](/integrations/texture-connect) rather than through your Integration Hub or bulk import list.
:::

This guide covers integration setup. For Grid Services programs or custom requirements, contact your Implementation team.

## Before You Begin

Each integration requires credentials from the third-party platform. Review the prerequisites for your specific integration below, and ensure you have:

- Admin or account owner access to the third-party portal
- Legal authorization to share site data with Texture
- Awareness of any existing data-sharing relationships that might conflict with Texture access

## After Configuration

Once you've connected an integration, Texture begins syncing data automatically. Here's what to expect:

### Initial Sync Timing

Depending on the number of devices in your portfolio, the initial data load can take 30 minutes to 1 hour before all devices are accessible in Texture.

### Ongoing Data Sync

After the initial load, Texture maintains:

- **Telemetry data**: Device state updates every 5-15 minutes
- **Alerts and faults**: Real-time system error notifications
- **Program enrollment**: Automatic updates as devices join or leave programs
- **Historical data**: Up to 2 years of historical telemetry (where available from the OEM)

### Where to Find Your Data

Synced devices appear in your [Devices](/platform-concepts/devices), [Sites](/platform-concepts/sites), and [Customers](/platform-concepts/contacts) views and become available to query via the Texture API. You can subscribe to specific [destinations](/platform-concepts/destinations) (like webhooks or events) to get real-time updates on newly discovered devices.

## Tesla PowerHub

Connect Tesla devices to monitor energy production, consumption, and status. For Grid Services programs, PowerHub must be configured for control operations—your Implementation team will handle this setup.

**PowerHub Portal**: [https://powerhub.energy.tesla.com/](https://powerhub.energy.tesla.com/)

### Prerequisites

- PowerHub account with admin access
- Ability to generate API credentials in PowerHub
- Coordination with Texture to whitelist IP addresses (one-time setup)

### Setup

#### Step 1: Whitelist Texture IP addresses

In PowerHub, navigate to **Access & Security → API Access** and add the required Texture IP addresses to your allowlist. You can find these IP addresses in the Texture Dashboard when setting up your Tesla PowerHub integration.

Contact your Texture team if you need assistance with IP whitelisting.

#### Step 2: Generate API credentials

In the API Access section, click **Add Client Credential**. You'll need to configure:

- **Name**: Enter a descriptive name (e.g., "Texture Access")
- **Role**: Select **Writer** if you need control/grid services access, or **Viewer** for monitoring only
- **Expiration**: Select the expiration date (maximum 1 year from creation date)

After creating the credential, you'll receive:

- Client ID
- Client Secret

#### Step 3: Configure in Texture

In Texture, click **Integration Hub** in the left sidebar, then select **Tesla** and enter:

- Client ID
- Client Secret

Click **Connect**. Texture will validate your credentials and begin syncing device data.

### Grid Services Requirements

If you're running a Grid Services program with Tesla devices, your PowerHub instance must be enabled for grid services control. This requires coordination between Texture and Tesla. Your Implementation team will guide you through:

- Program ID configuration
- Control permissions setup
- Testing and validation

## FranklinWH

Connect FranklinWH home energy systems to monitor battery and solar performance. FranklinWH uses partner credentials (CP and CK) to authenticate third-party platforms.

### Prerequisites

- CP and CK credentials (provided by FranklinWH or your Texture Implementation team)
- Confirmation of device onboarding workflow for new installations

### Setup

#### Step 1: Obtain credentials

Request CP (Client Partner) and CK (Client Key) credentials from FranklinWH. If Texture is managing your implementation, your team will provide these directly.

#### Step 2: Configure in Texture

In Texture, click **Integration Hub** in the left sidebar, then select **FranklinWH** and enter:

- CP
- CK

Click **Connect**. Texture validates credentials immediately and begins syncing existing devices.

### Important Considerations

**New device onboarding**: Confirm with your Texture team how newly installed devices will flow into Texture. Some workflows require manual association; others sync automatically based on installer accounts.

**Grid Services programs**: Texture must register a program ID directly with FranklinWH to enable control operations. Your Implementation team handles this configuration and will coordinate testing before program launch.

## SolarEdge

Connect SolarEdge systems to track production and site performance. SolarEdge uses account-level API keys for third-party platform access.

**Monitoring Portal**: [https://monitoring.solaredge.com/](https://monitoring.solaredge.com/)

### Prerequisites

- SolarEdge Monitoring Portal account with owner access
- Ability to generate API keys in the portal

### Setup

#### Step 1: Generate API key

In the SolarEdge Monitoring Portal, navigate to **My Account → Company Details → API Access** and copy your API key.

#### Step 2: Configure in Texture

In Texture, click **Integration Hub** in the left sidebar, then select **SolarEdge** and enter your API key.

Click **Connect**. Texture validates the key and begins syncing site and inverter data.

### Important Considerations

**API deprecation**: This integration uses SolarEdge's V1 API, which will be deprecated in the future. SolarEdge has not announced a specific timeline. Texture will migrate to the updated v2 API before deprecation—no action required from you.

**Grid Services programs**: Texture must register a program ID directly with SolarEdge to enable control operations. Your Implementation team will guide you through program configuration and testing.

## Enphase

Connect Enphase energy systems to Texture. Enphase uses OAuth-based authentication through their developer platform.

**Developer Portal**: [https://developer-v4.enphase.com/](https://developer-v4.enphase.com/)  
**Enlighten Dashboard**: [https://enlighten.enphaseenergy.com/](https://enlighten.enphaseenergy.com/)

### Prerequisites

- Enphase Developer account
- Enphase developer application (created in the developer portal)
- Enphase Enlighten account credentials

### Setup

#### Step 1: Create or select your application

In the Enphase Developer Portal, create a new application or select an existing one. Note your:

- API Key
- Client ID
- Client Secret

#### Step 2: Configure in Texture

In Texture, click **Integration Hub** in the left sidebar, then select **Enphase** and enter:

- API Key
- Client ID
- Client Secret
- Enlighten email
- Enlighten password

Click **Connect**. Texture will authenticate via OAuth and begin syncing system data.

### Important Considerations

**API usage metering**: Enphase meters API calls and may charge based on usage volume. If another platform is already pulling data from your Enphase account, coordinate with your Texture team to avoid duplicate API calls and potential double-billing.

**API fees**: Texture does not absorb the monthly Enphase API fees when utilizing your own developer account. Discuss this with your Implementation team if there are concerns.

**Grid Services programs**: Texture must register a program ID directly with Enphase to enable control operations. Your Implementation team will assist with advanced control onboarding and testing.

## SMA

Connect SMA inverters to monitor solar production and system health. SMA integration uses client credentials generated by Texture on your behalf.

### Prerequisites

- Authorization to share SMA data with Texture
- Account owner email for data access validation

### Setup

#### Step 1: Receive credentials from Texture

Your Texture Implementation team will generate a unique Client ID and Client Secret for your SMA integration. You'll receive these credentials directly from Texture.

#### Step 2: Configure in Texture

In Texture, click **Integration Hub** in the left sidebar, then select **SMA** and enter:

- Client ID (provided by Texture)
- Client Secret (provided by Texture)
- Authorized account owner email (used to validate third-party data sharing)

Click **Connect**. Texture validates credentials and begins syncing inverter data.

### Important Considerations

**Monitoring only**: The SMA integration currently supports monitoring capabilities only. Control operations are not available for SMA devices at this time.

## Troubleshooting

### Credentials Rejected

- Verify you copied the full credential string with no extra spaces
- Confirm the account has admin/owner permissions
- Check that IP addresses are whitelisted (Tesla only)

### No Data Appearing After Connection

- Wait 30 minutes to 1 hour for initial sync to complete
- Verify devices are active and communicating in the OEM portal
- Check that your sites are properly mapped in Texture

### Sync Stopped Working

- Credentials may have expired—regenerate in the OEM portal
- API rate limits may have been exceeded (Enphase)
- Contact support if the integration status shows "Error"

## Need Help?

- **For setup questions**: Review the in-platform tooltips and help text as you configure each integration
- **For Grid Services programs**: Contact your Texture Implementation team before configuring control-enabled integrations
- **For technical issues**: Use the support panel in Texture or email [support@texturehq.com](mailto:support@texturehq.com) with your organization name and integration details
