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
| [Devices](/api) | Get device information, telemetry, and device history |
| [Device Commands](/api) | Send operations to specific devices |
| [Sites](/api) | Manage physical locations with associated devices and weather data |
| [Customers](/api) | Create and manage customer records |
| [Connections](/api) | Create device connection flows for end users |
| [Programs](/api) | Access energy program definitions |
| [Enrollments](/api) | Manage program enrollments |
| [Metrics](/api) | Access aggregated metrics (consumption, production, storage, etc.) |
| [Leads](/api) | Create and manage leads for energy programs |
| [Commands](/api) | Specialized device commands for batteries, thermostats, etc.) |

## Using the API

Our API follows REST principles with JSON payloads and standard HTTP methods. Authentication is performed using API keys which you can generate in the [Dashboard](https://app.texturehq.com), within the Developer section.

```bash
# Example: Get a list of your devices
curl -X GET "https://api.texturehq.com/v1/devices" \
  -H "Texture-Api-Key: your_api_key"

# Example: Get device metrics for consumption
curl -X GET "https://api.texturehq.com/v1/metrics/consumption?period=day&timeframe=1d" \
  -H "Texture-Api-Key: your_api_key"

# Example: Create a connection for device onboarding
curl -X POST "https://api.texturehq.com/v1/connections" \
  -H "Texture-Api-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "referenceId": "your-reference-id",
    "redirectUrl": "https://your-app.example.com/callback",
    "clientName": "Your Application"
  }'
```

## Documentation

We provide comprehensive documentation for our entire API:

- [Interactive API Explorer](/api) - Browse and test API endpoints
- [OpenAPI Specification](https://api.texturehq.com/v1/docs/swagger.json) - Full API specification
- [Example Applications](https://github.com/TextureHQ) - Sample code and implementation examples

You can use the OpenAPI specification to generate client libraries in your preferred programming language or use our provided SDKs for common platforms.
