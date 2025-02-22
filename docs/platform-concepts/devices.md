---
sidebar_position: 4
---

# Devices

**Devices** are physical or virtual assets connected to the Texture Platform. They can generate, store, or consume energy—ranging from batteries to EV chargers and thermostats. By onboarding these Devices, you unlock real-time visibility, control, and insights into your energy ecosystem.

## Why Devices?

- **Unified View**: Manage and monitor all energy assets from a single platform.  
- **Real-time Data**: Track device states (like battery charge or thermostat mode) and usage.  
- **Rich Integrations**: Pair with Apps (e.g., UtilityAPI, Enode) to sync data automatically.  
- **Automation & Control**: Send commands (e.g., set charge limit on an EV or adjust a thermostat’s temperature).  
- **Analytics & Reporting**: Surface historical and live metrics—consumption, production, emissions, and more.

## Device Types

Today, Texture supports a broad range of device types, including:

- **Solar Inverters** (e.g., Enphase, SolarEdge)  
- **Electric Vehicles** (e.g., Tesla, BMW)  
- **EV Chargers** (e.g., JuiceBox, Tesla Wall Connector)  
- **Batteries** (e.g., Tesla Powerwall, Enphase IQ Battery)  
- **Smart Thermostats** (e.g., Ecobee, Honeywell)  

We’re always adding more. If you’d like to see a specific device type supported, [let us know](https://texture.atlassian.net/servicedesk/customer/portal/2).

## Device Details in the Dashboard

When you select a Device in the **Devices** section of the Texture Dashboard, you’ll see multiple tabs and data views:

1. **Overview**  
   - **Charge/Operating State**: Real-time status (e.g., discharging, idle).  
   - **Grid Status**: Whether the device is importing or exporting to the grid.  
   - **Location**: The associated Site address or coordinates.  
   - **High-Level Metrics**: Quick stats like battery reserve percentage or current power output.  
   - **Historical Graph**: A chart of device behavior (e.g., charging vs. discharging) over time.  

2. **Activity**  
   - A feed of notable events or changes (e.g., “Device configuration updated,” “Device disconnected”).  
   - Ability to view the raw payload of each update for debugging or audit trails.  

3. **Analytics**  
   - More detailed usage or production graphs (e.g., daily kWh consumption or generation).  
   - Export options to download the underlying data.  

4. **Emissions** (if applicable)  
   - Environmental impact data, such as carbon emissions associated with the device’s usage.  

5. **Device Info**  
   - Manufacturer, model, and serial number.  
   - **Device type** and date added.  
   - **Available commands** that can be sent to the device (e.g., `battery-set-reserve`).  
   - Current or historical tags for identification or grouping.  

6. **Device Schedule**  
   - If scheduling is supported (e.g., thermostats or batteries), set time-based operating modes or temperature setpoints.  

## Managing Devices via API

Texture’s **REST API** offers endpoints for listing, fetching, updating, and deleting Devices. A few highlights:

- **List all Devices**  
  ```http
  GET /devices
  ```
  Fetches a paginated set of devices in your Workspace with optional filters (e.g., `manufacturer`, `type`, `referenceId`).

- **Get a single Device**  
  ```http
  GET /devices/{id}
  ```
  Returns the Device’s details, including current state and available commands.

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

Depending on the device type, Texture maintains a **state object** (e.g., battery charge, thermostat temperature) representing the current state of the device. This telemetry data is fetched from the device (most often via [polling](/docs/devices/polling)) and stored in Texture.

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
  - Combine with [Apps](/docs/platform-concepts/apps) (e.g., UtilityAPI, Enode) to automatically sync new devices from third-party accounts.  

## Next Steps

- **Explore the [API Reference](/api)** for device endpoints (GET, POST, DELETE, etc.).  
- **Tag & Schedule** your devices for hands-off automation.  
- **Monitor Activity** for real-time device updates and logs.  
- **Check Supported Devices** in our [Supported Devices](/docs/sources/supported-devices) list.

With **Devices** on Texture, you get a powerful, centralized way to manage all your energy assets—collecting real-time data, sending commands, and building advanced energy solutions on top of a unified platform.
