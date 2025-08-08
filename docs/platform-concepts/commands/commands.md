---
sidebar_position: 15
toc_max_heading_level: 5
---

import { Subtitle } from '@components/Subtitle';

# Commands
<Subtitle>Direct control and automation across your energy infrastructure</Subtitle>

**Commands** in Texture provide a unified interface for controlling devices across different manufacturers and protocols. We abstract away the complexity of varying API signatures, input formats, and device models—giving you a clean, consistent way to take action on your energy infrastructure.

Every command has its own dedicated API endpoint with clearly defined input requirements. Commands are asynchronous by design, enabling reliable execution even when devices are temporarily unavailable or manufacturer APIs are experiencing issues.

---

## Why Commands?

Commands enable you to:

- **Unified Control** — Control devices across different manufacturers with a single interface
- **Reliable Execution** — Asynchronous design ensures commands complete even with temporary failures
- **Real-Time Response** — Get immediate feedback on command status and execution
- **Automated Workflows** — Trigger commands based on events, schedules, or conditions
- **Grid Services Integration** — Leverage advanced grid interaction capabilities through OEM partnerships
- **Batch Operations** — Execute commands across multiple devices simultaneously

Commands transform complex device interactions into simple, reliable API calls that power your energy automation.

---

## Command Structure

All commands follow a consistent pattern for reliable execution:

### Request Format

```javascript
{
  "deviceId": "device_identifier",
  "input": {
    // Command-specific parameters
  }
}
```

### Response Format

```javascript
{
  "id": "command_identifier",
  "status": "pending|success|failed",
  "deviceId": "device_identifier",
  "command": "command_type",
  "createdAt": "timestamp"
}
```

### Command Lifecycle

1. **Submit Command** — Send command via API endpoint
2. **Receive ID** — Get command identifier for tracking
3. **Monitor Status** — Check execution status via polling or webhooks
4. **Handle Results** — Process success/failure and take appropriate action

---

## Available Commands

Texture supports commands across multiple device types, each with specific capabilities:

| Device Type | Available Commands | Primary Use Cases |
|-------------|-------------------|-------------------|
| **Batteries** | Set Reserve, Set Operating Mode | Energy storage optimization, grid services |
| **Thermostats** | Set Operating Mode, Set Fan Mode | HVAC control, comfort management |
| **Chargers** | Set Operating Mode | EV charging control |
| **Vehicles** | Set Operating Mode, Set Charge Limit | EV battery management |

Each command includes detailed JSONSchema validation to ensure type-safe requests.

---

## Battery Commands

### Set Reserve

Control the minimum charge level that a battery will maintain before acting as a grid passthrough.

**Purpose:** Ensure homes never lose power during outages by maintaining a minimum reserve.

```javascript
POST /v1/commands/battery/set-reserve
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "chargePercentage": 30
  }
}
```

**Behavior:** The battery will discharge freely until reaching the specified percentage, then act as a passthrough for upstream energy sources (grid, solar, wind, etc.).

### Set Operating Mode

Control the fundamental charging state of a battery with four operating modes: `charge`, `discharge`, `idle`, or `reset`.

**Operating Modes:**

| Mode | Purpose | Grid Interaction |
|------|---------|------------------|
| `charge` | Prioritize charging the battery | Optional (configurable) |
| `discharge` | Prioritize discharging the battery | Optional (configurable) |
| `idle` | Maintain current charge level | Uses current settings |
| `reset` | Restore last known settings | Restores previous configuration |

**Additional Parameters:**

- **`minimumBatteryReserve`** — Used with `discharge` mode to set backup reserve
- **`maximumBatteryReserve`** — Used with `charge` mode to set maximum charge level
- **`enableGridInteraction`** — Allow import/export from grid (default: false)
- **`executionPriority`** — Control execution strategy (grid_services vs baseline)

#### Operating Mode Behavior

The table below outlines the behavior of each operating mode:

| Desired Mode | Grid Interaction | Strategy | Reserve Behavior | Notes |
|--------------|------------------|----------|------------------|-------|
| `charge` | true | Time of use | Adjusted to `maximumBatteryReserve` | May update time-of-use settings for off-peak charging |
| `discharge` | true | Time of use | Adjusted to `minimumBatteryReserve` | May update time-of-use settings for peak discharging |
| `charge` | false | Self Consumption | Adjusted to `maximumBatteryReserve` | May still import from grid if solar insufficient |
| `discharge` | false | Self Consumption | Adjusted to `minimumBatteryReserve` | Uses solar first, excess may charge battery |
| `idle` | N/A | Current strategy | Maintains current charge level | Strategy depends on `enableGridInteraction` setting |
| `reset` | N/A | N/A | N/A | Restores last known settings (within 24 hours) |

:::note
**Grid Services Override**

If the device is enrolled in a grid services program, the battery will be controlled by the program rather than these operating mode settings.
:::

#### Examples

**Discharge with grid export:**
```javascript
POST /v1/commands/battery/set-operating-mode
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "discharge",
    "enableGridInteraction": true
  }
}
```

**Charge from solar primarily:**
```javascript
POST /v1/commands/battery/set-operating-mode
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "charge"
  }
}
```

**Reset to previous settings:**
```javascript
POST /v1/commands/battery/set-operating-mode
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "reset"
  }
}
```

---

## Thermostat Commands

### Set Operating Mode

Control HVAC operating modes including `cool`, `heat`, `off`, and more.

```javascript
POST /v1/commands/thermostat/set-operating-mode
{
  "deviceId": "cllcsqn45000008mn3u76afas",
  "input": {
    "operatingMode": "cool",
    "coolTarget": 72
  }
}
```

**Behavior:** The thermostat will maintain the specified temperature by cycling the HVAC system on and off as needed.

### Set Fan Mode

Control fan operation with modes: `auto`, `on`, `off`, and `circulate`.

```javascript
POST /v1/commands/thermostat/set-fan-mode
{
  "deviceId": "cllcsqn45000008mn3u76afas",
  "input": {
    "fanMode": "auto"
  }
}
```

**Behavior:** `auto` mode runs the fan only when heating or cooling is active.

---

## Charger Commands

### Set Operating Mode

Control EV charging with `start-charging` or `stop-charging` modes.

```javascript
POST /v1/commands/charger/set-operating-mode
{
  "deviceId": "cllcsqn45000008mn3u76afas",
  "input": {
    "operatingMode": "start-charging"
  }
}
```

---

## Vehicle Commands

### Set Operating Mode

Control vehicle charging with `start-charging` or `stop-charging` modes.

```javascript
POST /v1/commands/vehicle/set-operating-mode
{
  "deviceId": "cllcsqn45000008mn3u76afas",
  "input": {
    "operatingMode": "start-charging"
  }
}
```

### Set Charge Limit

Set the maximum charge percentage for vehicle batteries (0-100%).

```javascript
POST /v1/commands/vehicle/set-charge-limit
{
  "deviceId": "cllcsqn45000008mn3u76afas",
  "input": {
    "chargeLimit": "80"
  }
}
```

---

## Command Status and Monitoring

### Asynchronous Execution

Commands are asynchronous by design to handle real-world scenarios:

- **Immediate Response** — Get command ID instantly upon submission
- **Status Tracking** — Monitor execution via polling or webhooks
- **Failure Handling** — Commands may fail due to manufacturer API issues or disconnected credentials
- **Retry Logic** — Built-in retry mechanisms for temporary failures

### Monitoring Options

1. **Polling** — Use `GET /commands/{id}` to check status
2. **Device History** — Use `GET /devices/{deviceId}/commands` to view all commands
3. **Webhooks** — Configure destinations to receive command completion events

### Error Handling

Common failure scenarios include:
- Manufacturer API downtime
- Disconnected device credentials
- Invalid command parameters
- Device offline or unavailable

:::tip
**Command Reliability**

Most commands execute immediately and successfully. For critical operations, implement webhook monitoring to handle edge cases where commands may fail or be delayed.
:::

---

## Best Practices

- **Validate Inputs** — Use the JSONSchema from `availableCommands` for type-safe requests
- **Monitor Status** — Implement webhook monitoring for critical commands
- **Handle Failures** — Design your application to handle command failures gracefully
- **Batch Operations** — Use batch commands for operations across multiple devices
- **Test Commands** — Validate command behavior in your development environment
- **Check Device Status** — Verify device connectivity before sending commands

---

## Next Steps

- **Explore** the full Commands API reference
- **Test** commands with your devices
- **Implement** webhook monitoring for reliable execution
- **Build** automated workflows using commands and events

Commands provide the direct control layer for your energy infrastructure—enabling automation, optimization, and reliable device management across the Texture Platform.

---

## Related Topics

For advanced command capabilities, see:

- **[Batch Commands](/platform-concepts/commands/batch-commands)** — Execute commands across multiple devices simultaneously
- **[Grid Services](/platform-concepts/commands/grid-services)** — Advanced grid interaction capabilities through OEM partnerships
