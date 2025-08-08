---
sidebar_position: 16
toc_max_heading_level: 5
---

import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/platform-concepts/commands" label="Commands" />

# Batch Commands
<Subtitle>Execute commands across entire device fleets with a single API call</Subtitle>

**Batch Commands** enable enterprise-scale control of your energy infrastructure by executing the same command across multiple devices simultaneously. This capability is essential for managing thousands of devices efficiently, allowing you to coordinate actions across entire fleets with a single API call.

Texture's Batch Commands system addresses complex challenges in managing diverse device ecosystems and provides enterprise-grade tools for coordinating device actions at utility scale.

---

## Why Batch Commands?

Batch Commands solve critical challenges in enterprise energy management:

- **Scale Efficiency** — Execute commands across thousands of devices with a single API call
- **Device Heterogeneity** — Intelligently route commands only to compatible devices
- **API Abstraction** — Handle varying manufacturer batch capabilities automatically
- **Time Zone Management** — Coordinate actions across devices in different time zones
- **Schedule Coordination** — Manage competing schedules with sophisticated conflict resolution
- **Enterprise Reliability** — Built-in error handling and recovery for utility-scale operations

Batch Commands transform complex fleet management into simple, reliable operations that power your energy automation at scale.

---

## Core Concepts

### Tag-Based Grouping

Tags are arbitrary labels that create logical device groupings for batch operations:

- **Flexible Grouping** — Group devices by location, type, program, or any criteria
- **Dynamic Collections** — Create device subsets for different operational needs
- **Hierarchical Organization** — Use consistent naming patterns for easy management

### Execution Methods

Batch Commands support two primary execution patterns:

1. **Immediate Execution** — Execute commands immediately on all tagged devices
2. **Scheduled Execution** — Set up recurring commands for tagged device groups

---

## Batch Execution Methods

### Tag-Based Command Execution

Execute commands immediately on all devices sharing a specific tag:

```javascript
POST /v1/batch-commands
{
  "tag": "boston-residential",
  "command": {
    "slug": "battery:set-operating-mode",
    "input": {
      "operatingMode": "discharge",
      "enableGridInteraction": true
    }
  }
}
```

**Use Case:** Immediate actions across a device fleet, such as responding to grid events or peak demand periods.

### Scheduled Tag-Based Execution

Schedule commands to execute at specific times for tagged devices:

```javascript
POST /v1/schedules/tags/{tag}
{
  "scheduleId": "your-schedule-id",
  "command": {
    "slug": "battery:set-operating-mode",
    "input": {
      "operatingMode": "discharge",
      "enableGridInteraction": true
    }
  },
  "schedule": {
    "type": "cron",
    "value": "0 14 * * 1-5"
  }
}
```

**Use Case:** Recurring device control patterns, such as daily discharge events during peak hours.

---

## Technical Challenges Solved

Texture's Batch Commands system addresses several complex technical challenges:

### Device Heterogeneity

**Challenge:** A single tag might include multiple device types (e.g., batteries and thermostats)  
**Solution:** Texture intelligently routes commands only to compatible devices, ignoring devices that can't execute the specified command.

For example, a `battery:set-operating-mode` command sent to a tag containing both batteries and thermostats will only be applied to the battery devices.

### API Integration Complexity

**Challenge:** Manufacturer APIs vary greatly in their batch capabilities  
**Solution:** Texture abstracts away these differences, providing consistent batch execution regardless of the underlying APIs:

- **Native Batch Support** — Leverages manufacturer batch capabilities for optimal performance
- **Individual API Management** — Manages individual API calls and parallelization for manufacturers without batch support
- **Rate Limit Handling** — Implements appropriate throttling and retry logic for devices with rate limits

### Time Zone Management

**Challenge:** Scheduled commands need to account for devices in different time zones  
**Solution:** Texture's scheduling system handles time zone complexity automatically:

- **Time Zone Context** — Schedules can be created with specific time zone context
- **Global Synchronization** — Global schedules adjust execution time based on each device's location
- **Absolute Time Coordination** — Events can be synchronized to execute at the same absolute time across all devices

### Schedule Conflict Resolution

**Challenge:** Devices may have competing schedules from individual and batch commands  
**Solution:** Texture implements sophisticated conflict resolution:

- **Priority Rules** — Clear precedence rules for schedule conflicts
- **Temporal Precedence** — Newer scheduled commands take precedence over older ones
- **Device-Specific Override** — Device-specific schedules override tag-based schedules
- **Audit Trail** — Maintains schedule history for auditing and rollback purposes

---

## Data Models

### Tag

```typescript
interface Tag {
  id: string;          // Unique identifier
  name: string;        // Tag name (e.g., "boston-residential")
  deviceIds: string[]; // Devices associated with this tag
}
```

### Batch Command Request

```typescript
interface BatchCommandRequest {
  tag: string;         // The tag identifying devices to target
  command: {
    slug: string;      // Command identifier (e.g., "battery:set-operating-mode")
    input: any;        // Command-specific parameters
  };
}
```

### Schedule

```typescript
interface Schedule {
  id: string;          // Unique schedule identifier
  tag: string;         // Target tag for this schedule
  command: {
    slug: string;      // Command identifier
    input: any;        // Command parameters
  };
  schedule: {
    type: "cron" | "iso" | "recurrence";  // Schedule type
    value: string;     // Schedule specification
    timezone?: string; // Optional timezone
  };
}
```

---

## API Reference

### REST API Endpoints

#### Tag Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/devices/{id}/tags` | GET | List all tags for a device |
| `/devices/{id}/tags` | PUT | Update tags for a device |
| `/tags` | GET | List all tags |
| `/tags/{tag}/devices` | GET | List all devices with a specific tag |

#### Batch Commands

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/batch-commands` | POST | Execute a command on all devices with a specific tag |
| `/batch-commands/{id}` | GET | Get status of a batch command execution |

#### Schedules

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/schedules/tags/{tag}` | POST | Create a schedule for a tagged group of devices |
| `/schedules/tags/{tag}` | GET | List all schedules for a tagged group |
| `/schedules/tags/{tag}/{id}` | DELETE | Delete a specific schedule |

For complete API documentation, refer to our [interactive REST API docs](/api).

---

## Usage Examples

### Creating and Assigning Tags

```javascript
// Add tags to a device
fetch('https://api.texturehq.com/v1/devices/device_123/tags', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    tags: ['east-coast', 'residential', 'pilot-program']
  })
})
```

### Executing a Batch Command

```javascript
// Send discharge command to all batteries in the "demand-response" tag
fetch('https://api.texturehq.com/v1/batch-commands', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    tag: 'demand-response',
    command: {
      slug: 'battery:set-operating-mode',
      input: {
        operatingMode: 'discharge',
        enableGridInteraction: true,
        minimumBatteryReserve: 20
      }
    }
  })
})
```

### Creating a Scheduled Command

```javascript
// Schedule batteries to discharge weekdays at 2pm
fetch('https://api.texturehq.com/v1/schedules/tags/peak-shaving', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    scheduleId: 'weekday-discharge',
    command: {
      slug: 'battery:set-operating-mode',
      input: {
        operatingMode: 'discharge',
        enableGridInteraction: true
      }
    },
    schedule: {
      type: 'cron',
      value: '0 14 * * 1-5',
      timezone: 'America/New_York'
    }
  })
})
```

---

## Common Use Cases

### Demand Response Events

Schedule or trigger immediate discharge of batteries during grid stress events:

1. **Create Device Groups** — Tag all eligible batteries (e.g., `dr-program-summer-2025`)
2. **Execute Commands** — Issue batch commands for immediate discharge when events occur
3. **Schedule Recovery** — Set up follow-up batch commands to reset devices after events

### Peak Load Management

Create scheduled commands to reduce grid consumption during daily peak periods:

1. **Territory Grouping** — Tag devices by utility territory (e.g., `socal-edison`)
2. **Time-of-Use Alignment** — Set up recurring schedules aligned with TOU rates:
   - Charge batteries during off-peak hours
   - Discharge during peak hours

### Virtual Power Plants

Orchestrate energy resources to provide grid services:

1. **Capacity Grouping** — Tag batteries by capacity and location
2. **Coordinated Scheduling** — Create schedules for coordinated charge/discharge cycles
3. **Fleet Monitoring** — Monitor total fleet capacity and export capabilities

---

## Best Practices

### Tagging Strategy

- **Hierarchical Tags** — Use consistent prefixes for hierarchical organization (e.g., `location:boston`, `program:demand-response`)
- **Functional Groups** — Tag by device functionality or capability
- **Multiple Tags** — Apply multiple tags to enable flexible grouping options
- **Naming Conventions** — Establish consistent naming patterns for easier management

### Schedule Management

- **Conflict Avoidance** — Review existing schedules before creating new ones
- **Schedule Documentation** — Use clear schedule IDs and descriptions
- **Time Zone Awareness** — Explicitly set time zones for schedules spanning multiple regions

### Performance Considerations

- **Batch Size** — For extremely large fleets (10,000+ devices), consider using multiple smaller batches
- **Status Monitoring** — Use batch command status endpoints to track execution progress
- **Error Handling** — Set up webhooks to monitor for execution failures

---

## Enterprise Scale Implementation

Texture's Batch Commands system is designed for utility-scale operations, enabling:

- **Synchronization** — Coordinate thousands of devices to act in unison
- **Latency Minimization** — Pre-scheduled commands ensure consistent execution time
- **Reliability** — Robust error handling and recovery mechanisms
- **Observability** — Comprehensive monitoring and reporting

For enterprise use cases, Texture can work with you to create custom tag hierarchies and scheduling patterns optimized for your specific operational needs.

---

## Next Steps

- **Explore** the full Batch Commands API reference
- **Test** batch operations with your device fleet
- **Implement** tagging strategies for your use cases
- **Build** automated workflows using batch commands and schedules

Batch Commands provide the enterprise-scale control layer for your energy infrastructure—enabling coordination, automation, and reliable fleet management across the Texture Platform.