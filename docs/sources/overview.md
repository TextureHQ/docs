---
sidebar_position: 1
---

# Sources Overview

## What are Sources?

**Sources** are data providers that connect energy devices and related information to the Texture Platform. Sources are the foundation of your Energy Network, enabling Texture to collect telemetry, status information, and control capabilities from various devices and systems.

## Types of Sources

### Device Sources

Device Sources provide direct connections to energy hardware such as:
- Solar inverters
- Battery storage systems
- EV chargers
- Smart thermostats
- Other grid-interactive devices

You can connect devices to Texture using two primary methods:

#### 1. End User Authentication

Ideal for: Residential deployments, consumer devices, and situations where device owners need to authorize access

With this method, device owners authenticate with their manufacturer accounts (e.g., Tesla, Enphase, SolarEdge) through Texture's Connect flow, granting your application permission to access their devices.

**Implementation options:**
- Create a Connect link via our [REST API](/api#tag/Connections)
- Generate a Connect flow in the [Texture Dashboard](https://dashboard.texturehq.com)
- Embed Connect in your app using our SDKs:
  - [JavaScript SDK](/docs/home/quickstart#javascript-sdk)
  - [React SDK](/docs/home/quickstart#react-sdk)
  - [React Native SDK](/docs/home/quickstart#react-native-sdk)

#### 2. Direct API Integration

Ideal for: Commercial deployments, installer-managed systems, and large fleets

This method uses installer or developer credentials directly from the manufacturer to connect devices to Texture, without requiring end-user interaction.

We support direct integration for multiple manufacturers and can help configure the appropriate authentication for your specific needs.

### Utility Data Sources

Texture can also integrate with various utility data sources including:
- Electricity bill information
- Meter interval data
- Demand response program signals
- Time-of-use rate structures

See [Apps](../platform-concepts/apps.md) for more information on available utility data integrations.

## Getting Started with Sources

To begin connecting devices to your Texture account:

1. Create a developer account in the [Texture Dashboard](https://dashboard.texturehq.com)
2. Generate API keys under the Developer section
3. Follow our [Quickstart guide](/docs/home/quickstart) to create your first connection
4. Review [Supported Devices](/docs/sources/supported-devices) to see the full list of available integrations
