---
---

# Devices

**Devices** are physical or virtual assets connected to the Texture Platform. They can generate, store, or consume energy—ranging from batteries to EV chargers and thermostats. By onboarding these Devices, you unlock real-time visibility, control, and insights into your energy ecosystem.

## Why Devices?

- **Unified View**: Manage and monitor all energy assets from a single platform.  
- **Real-time Data**: Track device states (like battery charge or thermostat mode) and usage.  
- **Rich Integrations**: Pair with Apps (e.g., UtilityAPI, Enode) to sync data automatically.  
- **Automation & Control**: Send commands (e.g., set charge limit on an EV or adjust a thermostat's temperature).
- **Analytics & Reporting**: Surface historical and live metrics—consumption, production, emissions, and more.

## Device Types

Today, Texture supports a broad range of device types, including:

- **Solar Inverters** (e.g., Enphase, SolarEdge)  
- **Electric Vehicles** (e.g., Tesla, BMW)  
- **EV Chargers** (e.g., JuiceBox, Tesla Wall Connector)  
- **Batteries** (e.g., Tesla Powerwall, Enphase IQ Battery)  
- **Smart Thermostats** (e.g., Ecobee, Honeywell)  

We're always adding more. If you'd like to see a specific device type supported, [let us know](https://texture.atlassian.net/servicedesk/customer/portal/2).

## Device Information

### Static Information

When a device is connected to the Texture Platform, we retrieve and store "static" information—device metadata that generally doesn't change over time. This information varies by device type but includes common elements:

#### Device Identifier

Every device on the Texture Platform receives a unique identifier using `cuid` (a collision-resistant unique identifier). This ID is used to query our API and reference the device in all operations.

> **Design Note**: We chose `cuid` over human-readable prefixes (like `deviceId-`) to prioritize type safety and validation over human readability, since these IDs are primarily used by machines rather than humans.

#### Reference ID

You must provide a `referenceId` when connecting devices to the Texture Platform. This identifier serves as a backreference to your system—typically a `userId`, `accountId`, or `siteId`.

The `referenceId` applies to the entire connection, not individual devices, because users often have multiple devices from a single manufacturer connection.

**Example**: A user with `referenceId: "12345"` connects their Tesla account and discovers they have a Model S, Model Y, Powerwall, and Solar Inverter. All four devices share the same `referenceId`.

#### Basic Metadata

All devices include:
- **Manufacturer**: The company that made the device
- **Model**: The specific model of the device  
- **Serial Number**: The device's unique serial number

Most devices also include:
- **Location**: The device's physical location (see note below)

Some devices include:
- **Year**: The year the device was manufactured

**Location Details**: Most energy devices are fixed installations (solar panels, batteries, thermostats). For mobile devices like Electric Vehicles, we track both:
- **Static Location**: The homebase where the vehicle typically charges
- **Dynamic Location**: The vehicle's current location

### State Updates

State Updates represent the current state of a device at a specific moment in time. This can include power output from a solar inverter, fan mode of a thermostat, or charge level of a battery or electric vehicle.

#### Update Frequency

In an ideal world, updates would come in real-time. In practice, most updates arrive at 5 or 15-minute intervals based on manufacturer capabilities, often through [polling](#polling) since most manufacturers don't yet support real-time push updates.

> **Manufacturer Note**: If you're a manufacturer and we're not already working together, we'd love to collaborate on real-time push updates! Please [contact us](https://www.texturehq.com/contact-us).

#### Real-time ETL Process

For every state update, we perform the following steps in near real-time:

1. **Normalize Data**: Convert disparate structures and units from manufacturers into standard units
2. **Map to Standards**: Map normalized data to [Texture standard data models](#data-models)
3. **Enrich with Context**: Add weather data, marginal carbon emissions, pricing data, etc.
4. **Pair with Meter Data**: If enabled, combine behind-the-meter data with utility meter data
5. **Store and Distribute**: 
   - Store in our database for REST and GraphQL API access
   - Store in Elasticsearch for faceted queries and analytics
   - Store in our data warehouse for intensive analytics and reverse ETL
   - Push to configured [Destinations](/platform-concepts/destinations/) for your systems
6. **Maintain History**: Keep a complete history of state updates for each device

### Polling

When we first built the Texture Platform, we hoped most devices would support real-time push updates. However, we discovered that most devices require us to poll for state updates at regular intervals.

#### How Polling Works

Once a device is connected, we automatically set up a polling schedule to fetch state updates at regular intervals (generally 5 or 15 minutes, depending on the manufacturer).

The polling frequency is constrained by:
- How often the manufacturer receives data from the device
- The manufacturer's cloud infrastructure capabilities
- Device communication protocols

#### Custom Polling Intervals

Currently, we don't offer customizable polling intervals. If this feature would be valuable for your use case, please let us know via our [Slack community](/support/slack).

## Data Models

As much as possible, our data models are designed to be consistent across different device types, making it easier to write applications that work with many different devices.

### Common Concepts

All devices share these common concepts:

- **Basic Information**: All devices have the following basic information:
  - `id` - Unique identifier assigned by Texture
  - `referenceId` - Identifier you assign to reference the device in your systems
  - `manufacturer` - The company that made the device
  - `model` - The model of the device
  - `serialNumber` - The serial number of the device
  - `tags` - A list of tags for organizing your devices
  - `location` - The location of the device (fidelity may vary)
  - `type` - The type of the device
  - `createdAt` - The date the device was created
  - `updatedAt` - The date the device was last updated

- **State Updates**: Information sent from the device to the Texture Platform on a regular cadence
- **Commands**: Information sent from the Texture Platform to the device to trigger actions

### Device-Specific Data Models

We have detailed data models for each device type:

- [Batteries](/integrations/data-models/batteries)
- [Chargers](/integrations/data-models/chargers)  
- [Electric Vehicles](/integrations/data-models/vehicles)
- [Inverters](/integrations/data-models/inverters)
- [Thermostats](/integrations/data-models/thermostats)

## Device Details in the Dashboard

When you select a Device in the **Devices** section of the Texture Dashboard, you'll see multiple tabs and data views:

1. **Overview**
   - **Charge/Operating State**: Real-time status (e.g., discharging, idle).
   - **Grid Status**: Whether the device is importing or exporting to the grid.
   - **Location**: The associated Site address or coordinates.
   - **High-Level Metrics**: Quick stats like battery reserve percentage or current power output.
   - **Historical Graph**: A chart of device behavior (e.g., charging vs. discharging) over time.

2. **Activity**  
   - A feed of notable events or changes (e.g., "Device configuration updated," "Device disconnected").
   - Ability to view the raw payload of each update for debugging or audit trails.

3. **Analytics**
   - More detailed usage or production graphs (e.g., daily kWh consumption or generation).
   - Export options to download the underlying data.

4. **Emissions** (if applicable)
   - Environmental impact data, such as carbon emissions associated with the device's usage.

5. **Device Info**  
   - Manufacturer, model, and serial number.  
   - **Device type** and date added.  
   - **Available commands** that can be sent to the device (e.g., `battery-set-reserve`).  
   - Current or historical tags for identification or grouping.  

6. **Device Schedule**  
   - If scheduling is supported (e.g., thermostats or batteries), set time-based operating modes or temperature setpoints.  

## Managing Devices via API

Texture's **REST API** offers endpoints for listing, fetching, updating, and deleting Devices. A few highlights:

- **List all Devices**  
  ```http
  GET /devices
  ```
  Fetches a paginated set of devices in your Workspace with optional filters (e.g., `manufacturer`, `type`, `referenceId`).

- **Get a single Device**  
  ```http
  GET /devices/{id}
  ```
  Returns the Device's details, including current state and available commands.

- **Delete a Device**  
  ```http
  DELETE /devices/{id}
  ```
  Removes a Device from the Texture Platform.

- **Device History**  
  ```http
  GET /devices/{id}/history
  ```
  Retrieves archived state data (charging state, ambient temperature, power output, etc.) over a specified date range.

- **Device Commands**  
  ```http
  GET /devices/{id}/commands
  ```
  Retrieves past or pending commands sent to the device. You can also send new commands via endpoints like `battery:set-reserve` or `thermostat:set-operating-mode`.

For full details on the request/response structure, see our [API documentation](/api).

## Device States & Commands

Depending on the device type, Texture maintains a **state object** (e.g., battery charge, thermostat temperature) representing the current state of the device. This telemetry data is fetched from the device (most often via [polling](#polling)) and stored in Texture.

You can also send **commands** to supported devices:

- **Thermostat**: Set operating mode (heat/cool/auto/off), fan mode, temperature targets.  
- **Battery**: Change battery reserve level, operating mode (charge, discharge, idle).  
- **Charger/Vehicle**: Start or stop charging, set charge limit, and more.

These operations allow for integrated control and real-time updates across your energy network.

## Scheduling & Automation

Many devices (e.g., thermostats, batteries) can be scheduled to run in specific modes at certain times. Texture provides:

- **Device Schedules** (per-device)  
- **Tag Schedules** (group devices by tag and apply a shared schedule)

This is especially useful for time-of-use strategies, demand response, or temperature setbacks overnight.

## Tips & Best Practices

- **Reference IDs**
  - Use the `referenceId` field to map your internal device IDs or account numbers.
- **Tagging**
  - Tag devices to batch commands or schedule them in groups.
- **Privacy & Security**
  - Manage API keys carefully and set appropriate role-based access control.
- **Integration**
  - Combine with [Apps](/platform-concepts/apps) (e.g., UtilityAPI, Enode) to automatically sync new devices from third-party accounts.

## Next Steps

- **Explore the [API Reference](/api)** for device endpoints (GET, POST, DELETE, etc.).
- **Tag & Schedule** your devices for hands-off automation.
- **Monitor Activity** for real-time device updates and logs.
- **Check Supported Devices** in our [Supported Manufacturers](/integrations/manufacturers/devices-and-oems) list.

With **Devices** on Texture, you get a powerful, centralized way to manage all your energy assets—collecting real-time data, sending commands, and building advanced energy solutions on top of a unified platform.
