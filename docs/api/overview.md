---
sidebar_position: 1
---

# API Overview

## Unified API for Energy Devices

Texture's API provides a standardized interface to interact with any supported energy device, regardless of manufacturer. Our API enables you to:

- **Read** device telemetry, status, and configuration data
- **Write** commands to control devices (charge, discharge, set modes, etc.)
- **Manage** device connections, sites, and customers
- **Configure** automations, schedules, and rules
- **Access** supplemental data like weather forecasts and carbon intensity

## API Resources

| Resource | Description |
|----------|-------------|
| [Devices](/api#tag/Devices) | Get device information, telemetry, and send commands |
| [Sites](/api#tag/Sites) | Manage physical locations and their associated devices |
| [Customers](/api#tag/Customers) | Create and manage customer records |
| [Commands](/api#tag/Commands) | Send operations to devices individually or in batches |
| [Connections](/api#tag/Connections) | Create and manage device connection flows |
| [Weather](/api#tag/Weather) | Access forecast data for your sites |

## Using the API

Our API follows REST principles with JSON payloads and standard HTTP methods. Authentication is performed using API keys which you can generate in the [Dashboard](https://dashboard.texturehq.com/developer).

```bash
# Example: Get a list of your devices
curl -X GET https://api.texturehq.com/v1/devices \
  -H "Texture-Api-Key: your_api_key"
```

## Documentation

We provide Swagger/OpenAPI documentation for our entire API:

- [Interactive API Explorer](/api)
- [OpenAPI Specification](https://api.texturehq.com/v1/docs/swagger.json)

You can use the OpenAPI specification to generate client libraries in your preferred programming language.
