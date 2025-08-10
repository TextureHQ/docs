---
sidebar_position: 17
---

import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/platform-concepts/commands" label="Commands" />

# Grid Services
<Subtitle>Advanced grid interaction capabilities through OEM partnerships</Subtitle>

**Grid Services** provide advanced capabilities for direct grid interaction through partnerships with Original Equipment Manufacturers (OEMs). These services enable devices to participate in grid balancing, demand response programs, and wholesale energy markets with enhanced reliability and support.

Texture has established strong relationships with OEMs backed by SLAs, providing rock-solid support for energy devices that require advanced communication and control capabilities for grid participation.

---

## Why Grid Services?

Grid Services enable advanced energy infrastructure capabilities:

- **Direct Grid Interaction** — Devices interact with the grid in more sophisticated ways than standard commands
- **OEM Partnerships** — Leverage manufacturer-specific capabilities through direct partnerships
- **Enhanced Reliability** — SLA-backed support channels with OEMs for critical operations
- **Market Participation** — Participate in demand response programs and wholesale energy markets
- **Grid Balancing** — Contribute to grid stability during high-demand periods
- **Arbitrage Opportunities** — Take advantage of price differentials in deregulated markets

Grid Services transform your energy devices into active participants in the broader energy ecosystem.

---

## Core Concepts

### What are Grid Services?

Grid Services are specialized commands that allow devices to interact with the grid in more direct and sophisticated ways than standard commands. The most common use case is exporting energy to the grid from batteries during advantageous periods.

### OEM Partnerships

Texture maintains direct relationships with OEMs, providing:

- **Direct Support Channels** — Backed by SLAs for critical operations
- **Enhanced Capabilities** — Access to manufacturer-specific features
- **Reliability Assurance** — Enterprise-grade support for grid-critical operations
- **Testing and Validation** — OEMs test and configure devices for grid service readiness

---

## Use Cases

Grid Services support various advanced energy management scenarios:

### Grid Resilience

Export energy to the grid during high-demand periods to help maintain grid stability and prevent outages.

### Energy Arbitrage

Import energy during low-demand periods and export during high-demand periods to capture price differentials in wholesale markets.

### Demand Response Programs

Participate in utility demand response programs like [DSGS in California](https://www.energy.ca.gov/programs-and-topics/programs/demand-side-grid-support-program) to earn incentives for grid support.

### Market Opportunities

Take advantage of pricing opportunities in deregulated markets like ERCOT through strategic energy import/export.

### Utility Programs

Support utility companies, VPPs, REPs, and CCAs in balancing the grid and offering rebates for grid-supporting activities.

---

## Setup and Enrollment

### Organization Setup

To enable Grid Services for your organization:

1. **Contact Support** — Reach out to support@texturehq.com if you don't have a dedicated support contact
2. **Enable Services** — Work with your Texture Support Team to enable Grid Services
3. **Configure Integration** — Set up the necessary connections and permissions

### Device Enrollment

Once Grid Services are enabled for your organization:

#### Automatic Enrollment
- **SolarEdge** — Devices are automatically enrolled as they're added via the Connect flow
- **Other Manufacturers** — Automatic enrollment based on manufacturer capabilities

#### Manual Enrollment
- **Enphase** — Requires separate enrollment process from standard device enrollment
- **Testing Period** — OEMs need time to test, configure, and validate devices before grid service activation

#### Enrollment Monitoring
If you have configured a [Destination](/platform-concepts/destinations/) for your devices, you'll receive enrollment webhook events that you can monitor [here](/platform-concepts/events).

:::note
**Enrollment Timeline**

Enrollment is not instantaneous. OEMs require time to test devices, configure them, and ensure they're ready for grid service participation before activation.
:::

---

## Grid Service Commands

Grid Service Commands use the same command structure as standard commands, with additional required fields to enable grid interaction.

### Command Structure

```javascript
{
  "deviceId": "device_identifier",
  "input": {
    // Standard command parameters
    "operatingMode": "discharge",
    "enableGridInteraction": true  // Required for Grid Services
  }
}
```

### Key Differences

- **`enableGridInteraction: true`** — Tells the Texture platform to route the command through the manufacturer's Grid Service
- **Enhanced Capabilities** — Access to manufacturer-specific grid interaction features
- **OEM Routing** — Commands are sent to the device manufacturer's Grid Service when possible

---

## Storm Guard Integration

Most OEMs implement a "Storm Guard" feature that affects grid service participation.

### Storm Guard Behavior

When Storm Guard is active on a battery:

- **Automatic Charging** — Battery charges up in response to weather events
- **Grid Service Suspension** — Battery will not participate in Grid Services
- **Command Override** — Grid Service Commands are ignored while Storm Guard is active

### Monitoring Storm Guard Status

You can monitor the current Storm Guard state through the battery data model. See [Battery Data Models](/integrations/data-models/batteries) for details on reading Storm Guard status.

:::caution
**Storm Guard Priority**

Storm Guard takes precedence over Grid Service Commands. When Storm Guard is active, the battery will not respond to grid service commands, even if they are sent successfully.
:::

---

## Supported Manufacturers

Grid Services are available through partnerships with various OEMs:

### Currently Supported
- **Enphase** — Requires separate enrollment process
- **SolarEdge** — Automatic enrollment via Connect flow
- **Additional OEMs** — Contact support for current partnerships

### Capabilities by Manufacturer
Each OEM provides different grid interaction capabilities:

| Manufacturer | Grid Export | Grid Import | Demand Response | Market Participation |
|--------------|-------------|-------------|-----------------|---------------------|
| Enphase | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> |
| SolarEdge | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> | <div style={{textAlign: 'center'}}>✓</div> |

---

## Best Practices

### Command Implementation
- **Always Include `enableGridInteraction`** — Set to `true` for grid service commands
- **Monitor Storm Guard** — Check battery status before sending grid service commands
- **Handle Failures** — Implement proper error handling for grid service command failures
- **Test Commands** — Validate grid service behavior in your development environment

### Operational Considerations
- **Weather Monitoring** — Be aware of weather events that may trigger Storm Guard
- **Market Timing** — Coordinate commands with market conditions and price signals
- **Grid Conditions** — Monitor grid status and demand response events
- **Device Health** — Ensure devices are properly enrolled and connected

---

## Related Topics

- **[Commands](/platform-concepts/commands)** — Standard device control commands
- **[Batch Commands](/platform-concepts/commands/batch-commands)** — Execute grid service commands across multiple devices
- **[Events](/platform-concepts/events)** — Monitor grid service enrollment and status events
- **[Destinations](/platform-concepts/destinations)** — Configure webhooks for grid service monitoring

