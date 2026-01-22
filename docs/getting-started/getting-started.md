---
sidebar_position: 2
---

# Getting Started with Texture

Texture makes your energy systems visible, responsive, and connected—without rebuilding your stack. It works with your existing infrastructure—no migration, no disruptions. Start with a single integration or use case, and expand as you go.

This guide provides a clear roadmap to start building with Texture's energy device platform. Whether you're developing a solar monitoring solution, demand response application, or virtual power plant, the steps below will help you quickly integrate with energy devices.

## Step 1: Create Your Account

1. Sign up at [app.texturehq.com](https://app.texturehq.com)
2. Create your Organization
3. Texture will automatically create Production and Sandbox workspaces for you

## Step 2: Explore the Dashboard

Take a few minutes to familiarize yourself with the Texture Dashboard:

- **Devices**: View connected energy devices and their real-time data
- **Sites**: Browse physical locations and their associated devices
- **Customers**: Manage customer accounts that own devices
- **Apps**: Enable third-party integrations (utility data, weather, emissions, etc.)
- **Developer**: Access your API keys and documentation

## Step 3: Choose Your Integration Method

Texture offers flexible ways to connect energy devices based on your use case:

### Option A: Texture Connect (for Individual Consumer Devices)

Ideal for residential deployments or when device owners need to grant access:

1. Generate a Texture Connect link using our [API](/api) or [SDKs](/getting-started/quickstart)
2. Send this link to your users or embed it in your application
3. Users will authenticate with their device manufacturer accounts
4. Devices appear in your Texture account once connected

**Best for**: Homeowner-owned devices, consumer-facing applications, OAuth-based connections

Learn more: [Texture Connect](/integrations/texture-connect)

### Option B: Integration Hub + Bulk Import (for Fleet/Commercial Deployments)

Ideal for installer-managed systems or commercial fleets:

1. Use [Bulk Import](/integrations/bulk-import) to upload your portfolio of sites, customers, and device IDs at scale
2. Configure [Integration Hub](/integrations/integration-hub) with your OEM credentials to enable automatic data syncing
3. Texture automatically pulls device data on a recurring basis

**Best for**: Installer-managed fleets, commercial deployments, third-party aggregator portfolios

Learn more: [Integration Hub](/integrations/integration-hub) and [Bulk Import](/integrations/bulk-import)

### Option C: Industry Standards (for Utility/Grid Operator Integration)

Ideal for utility-scale deployments or grid integration:

1. Contact us through the Dashboard chat to discuss your requirements
2. We'll help configure standards-based integrations (IEEE 2030.5, OpenADR, etc.)
3. Enable secure, scalable grid coordination

**Best for**: Utilities, grid operators, large-scale DERMS deployments

Learn more: [Industry Standards](/platform-concepts/standards)

## Step 4: Start Using Device Data and Controls

Once devices are connected, you can:

1. **View device data** in the Dashboard to verify proper integration
2. **Fetch device telemetry** through our [API](/api)
3. **Send commands** to devices individually or in batches
4. **Configure webhooks** to receive real-time event notifications

## Step 5: Build Your Application

Now that you're connected, you can build your energy application:

- **Device Monitoring**: Track energy production, consumption, and storage
- **Device Control**: Send commands to charge/discharge batteries, adjust thermostats, etc.
- **Automation**: Create rules and schedules for automatic device control
- **Energy Optimization**: Leverage weather forecasts and carbon data to optimize device operation

## Next Steps

- Complete our [Quickstart tutorial](/getting-started/quickstart) to connect your first device
- Explore [Platform Concepts](/platform-concepts/overview) to understand the Texture data model
- Browse our [API documentation](/api) to start implementing your integration
- Join our [Slack community](https://join.slack.com/t/texture-community/shared_invite/zt-1s59kueqz-sCHumIweCVHi9T~GoXZ6gQ) to connect with other developers

Need help? Use the live chat in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team.