---
id: devices-and-oems
title: Devices & OEMs
---

import StaticManufacturersList from '@site/src/components/StaticManufacturersList';
import { Subtitle } from '@components/Subtitle';

# Devices & OEMs

<Subtitle>Connect energy devices from leading manufacturers through official partnerships</Subtitle>

We partner directly with energy device manufacturers to provide secure, reliable integrations. **We never use web scraping or reverse engineering**—instead, we work directly with manufacturers to build official OEM Partnership APIs with contractual SLAs and dedicated support channels. This ensures reliability, security, and long-term viability, unlike reverse-engineered solutions that are unstable and prone to breaking. [Learn more about our approach](https://www.texturehq.com/blog/why-texture-doesnt-reverse-engineer-apis-and-why-that-matters).

Browse our supported manufacturers below to find devices for your energy management needs.

<StaticManufacturersList />

## How to Connect Devices

### Consumer Devices: Texture Connect

For individual consumer devices (like home batteries, EVs, or thermostats), use [Texture Connect](/integrations/texture-connect) to securely connect customer accounts through OAuth. This enables customers to authorize access to their devices while maintaining control over their data.

### Fleet Devices: OEM APIs

For owned fleets of devices (like utility-scale batteries or commercial EV chargers), use direct OEM APIs to onboard devices in bulk. This provides programmatic access for large-scale deployments and enterprise management.

### Device Management Features

- **Real-time Monitoring**: Track device performance and status
- **Remote Control**: Send commands to devices when supported
- **Data Collection**: Gather historical performance data
- **Alerts**: Set up notifications for device events and issues

### Automatic Device Resolution

Texture automatically reverse geocodes all device connections and resolves devices to [Sites](/platform-concepts/sites) and [Contacts](/platform-concepts/contacts). This creates a unified view of your energy ecosystem, linking devices to physical locations and customer relationships without manual configuration.

## Device Data Models

Each device type has a detailed data model with consistent structure across manufacturers. Explore the data models to understand what information is available for each device type:

- **[Batteries](/integrations/data-models/batteries)** - Energy storage systems with charge levels, grid status, and backup capabilities
- **[EV Chargers](/integrations/data-models/chargers)** - Electric vehicle charging equipment with power output and charging states  
- **[Electric Vehicles](/integrations/data-models/vehicles)** - Connected EVs with battery levels, range, and charging status
- **[Solar Inverters](/integrations/data-models/inverters)** - Solar energy conversion with power output and grid interaction
- **[Smart Thermostats](/integrations/data-models/thermostats)** - HVAC control systems with temperature settings and operating modes



## Troubleshooting

Common issues and solutions for device integrations:

- **Connection Issues**: Check network connectivity and authentication
- **Data Sync Problems**: Verify API permissions and rate limits  
- **Control Limitations**: Some devices may have restricted control capabilities

## Need a Different Device?

- **Manufacturers**: Want to see your devices supported? [Contact us](https://www.texturehq.com/contact-us)
- **Customers**: Need a specific manufacturer or device? [Submit a request](https://texture.atlassian.net/servicedesk/customer/portal/2/group/3/create/13) 