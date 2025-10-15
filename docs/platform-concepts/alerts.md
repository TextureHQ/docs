---
---

# Alerts

**Alerts** surface operational issues, notifications, and insights across the Texture Platform. They consolidate signals from devices, sites, external services, and Texture automations so operators always know what needs attention. Each alert captures what happened, where it occurred, how severe it is, and what actions have been taken.

## Why Alerts matter

- **Situational awareness** – Maintain a real-time pulse on device health, site performance, and platform automations.
- **Coordinated response** – Track acknowledgement, remediation, and resolution so teams never duplicate effort.
- **Platform-wide connectivity** – Link Alerts to Sites and Devices for fast navigation between the incident, the underlying asset, and related context.
- **Auditable history** – Preserve a full record of status changes, snoozes, and resolutions for compliance and post-event analysis.

## Core data model

Alerts follow a consistent schema across the API and Dashboard. Key fields include:

| Field | Description |
| --- | --- |
| `id` / `externalId` | Unique identifiers for the alert in Texture and any upstream system. |
| `workspaceId`, `siteId`, `deviceId` | Scope the alert to a workspace, site, and (optionally) a specific device. |
| `title`, `description` | Human-readable summary and optional detail about the condition. |
| `type`, `subtype` | Structured classification for the alert (see below). Legacy `alertType` remains available for free-text values. |
| `severity` | Required level (`CRITICAL`, `WARNING`, or `INFO`) that communicates urgency. |
| `status` | Operational state (`OPEN`, `ACKNOWLEDGED`, `IGNORED`, `RESOLVED`). |
| `sourceSystem`, `providerName`, `providerCode` | Identify where the alert originated (Texture automations, OEM, partner integration, etc.). |
| `acknowledgedAt/by`, `resolvedAt/by`, `ignoredAt/by`, `snoozedUntil` | Track response workflows and temporary suppression. |
| `createdAt`, `updatedAt` | Timestamps for lifecycle auditing. |
| `manufacturerDeviceId`, `deviceName`, `deviceType`, `deviceModel`, `deviceSerialNumber`, `manufacturer` | Enrich the alert with device metadata when available. |

The schema is federated across the platform graph, so Alerts are accessible from related objects (`Site.alerts`, `Device.alerts`) as well as through direct queries.

## Classification

### Severity

Severity determines how urgently an alert must be handled:

- **Critical** – Immediate action required to maintain safety or system availability.
- **Warning** – Elevated attention needed to prevent impact or degrade performance.
- **Info** – Informational events worth monitoring but not disruptive.

### Status lifecycle

Operators can drive an alert through the following states:

1. **Open** – Newly created and awaiting action.
2. **Acknowledged** – Someone is actively working the issue.
3. **Ignored** – Intentionally suppressed without resolution (e.g., false positive).
4. **Resolved** – Root cause addressed and the alert closed.

Snoozing pauses follow-up for a defined window without changing the underlying status.

### Types and subtypes

Use `type` and (optionally) `subtype` to capture the nature of the issue. Types cover common operational domains (e.g., `COMMUNICATIONS`, `POWER_LIMIT`, `GRID_STATUS`, `HARDWARE_FAULT`, `SOFTWARE_PROCESS`, `SAFETY`). Subtypes add precision where needed (e.g., `BATTERY_METER_COMMS`, `GRID_RESYNC_FAILED`, `TEMPERATURE_SENSOR_FAULT`). This structure powers filtering, routing, and analytics across the platform.

## Working with Alerts across the platform

- **Sites and Devices** – Each alert references its originating site and, when applicable, the specific device. From a site or device view you can pull the associated alerts to understand impact and history.
- **Contextual Graph** – The `alerts` query returns the alert list and an optional context object that embeds the linked Site and Device. This makes it simple to render incident dashboards that include both the alert payload and surrounding asset details.
- **Search and filtering** – Combine `type`, `subtype`, `severity`, `status`, device metadata, and pagination controls to build rich alert consoles in the Dashboard or custom applications.

## Creating and updating Alerts

Texture supports multiple creation paths so you can capture events wherever they originate:

- **Texture API** – Use the `createAlert` mutation to publish alerts from your own systems or automations. Include identifiers (workspace, site, optional device), metadata, and the appropriate classification so downstream workflows can respond. Update status, acknowledgement, snooze windows, or resolution via the `changeAlertStatus` mutation.
- **Dashboard** – Operators can file alerts manually for issues discovered in the field or via other communications channels. These manual entries follow the same schema and lifecycle as API-created alerts.
- **External ingestion** – Alerts can flow in automatically from OEM platforms and partner applications (for example, via AlsoEnergy or manufacturer webhooks). Provide `externalId` or `providerCode` values to maintain traceability back to the source system.

Alerts become immediately queryable through the `alerts` endpoint, which supports filtering by any of the core fields, configurable sorting (currently by creation time), and both offset and cursor pagination. Response metadata includes total counts and paging details so you can stitch the results into dashboards or operational tooling.

## Next steps

- Explore [Sites](/platform-concepts/sites) and [Devices](/platform-concepts/devices) to see how alerts relate to other core platform resources.
- Review the [API reference](/api) for mutation and query examples when integrating alerts into your workflows.
- Reach out to Texture if you need additional alert types, automated ingestion from new providers, or custom routing logic.
