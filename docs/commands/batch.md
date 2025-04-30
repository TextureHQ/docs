---
sidebar_position: 4
toc_max_heading_level: 5
---

# Batch Commands

## Overview

Batch Commands provide a powerful way to control multiple devices simultaneously at scale. This capability is essential for enterprise deployments managing thousands of devices, allowing you to execute commands across entire fleets efficiently with a single API call.

Texture's Batch Commands system addresses complex challenges in managing diverse device ecosystems and provides enterprise-grade tools for coordinating device actions at utility scale.

## Core Concepts

### What are Batch Commands?

Batch Commands enable you to send the same command to multiple devices simultaneously based on grouping criteria. The primary methods for executing batch commands are:

1. **Tag-Based Batching**: Execute commands on all devices that share a specific tag
2. **Scheduled Batching**: Set up commands to be executed at specific times across tagged devices

### Device Tagging

Tags are arbitrary labels that can be applied to devices to create logical groupings. They serve as the foundation for batch operations by allowing you to:

- Group devices by any criteria (location, type, program, etc.)
- Target specific subsets of your device fleet
- Create dynamic device collections for different operational needs

## Batch Execution Methods

### Tag-Based Command Execution

Execute commands immediately on all devices sharing a specific tag:

```http
POST /batch-commands
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

This approach is ideal for immediate actions across a device fleet, such as responding to grid events or peak demand periods.

### Scheduled Tag-Based Execution

Schedule commands to execute at specific times for tagged devices:

```http
POST /schedules/tags/{tag}
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

This method enables you to set up recurring device control patterns, such as daily discharge events during peak hours.

## Technical Challenges Solved

Texture's Batch Commands system addresses several complex technical challenges:

### 1. Device Heterogeneity

**Challenge**: A single tag might include multiple device types (e.g., batteries and thermostats)  
**Solution**: Texture intelligently routes commands only to compatible devices, ignoring devices that can't execute the specified command.

For example, a `battery:set-operating-mode` command sent to a tag containing both batteries and thermostats will only be applied to the battery devices.

### 2. API Integration Complexity

**Challenge**: Manufacturer APIs vary greatly in their batch capabilities  
**Solution**: Texture abstracts away these differences, providing consistent batch execution regardless of the underlying APIs:

- For manufacturers with native batch capabilities, Texture leverages these for optimal performance
- For manufacturers without batch support, Texture manages the individual API calls and parallelization
- For devices with rate limits, Texture handles appropriate throttling and retry logic

### 3. Time Zone Management

**Challenge**: Scheduled commands need to account for devices in different time zones  
**Solution**: Texture's scheduling system handles time zone complexity automatically:

- Schedules can be created with specific time zone context
- Global schedules adjust execution time based on each device's location
- Events can be synchronized to execute at the same absolute time across all devices

### 4. Schedule Conflict Resolution

**Challenge**: Devices may have competing schedules from individual and batch commands  
**Solution**: Texture implements sophisticated conflict resolution:

- Schedules have clear priority rules
- Newer scheduled commands take precedence over older ones
- Device-specific schedules override tag-based schedules
- The system maintains schedule history for auditing and rollback purposes

## Data Model

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

## API Access

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

## Common Use Cases

### Demand Response Events

Schedule or trigger immediate discharge of batteries during grid stress events:

1. Create a tag for all eligible batteries (e.g., `dr-program-summer-2025`)
2. When an event occurs, issue a batch command for discharge
3. Schedule a follow-up batch command to reset devices after the event

### Peak Load Management

Create scheduled commands to reduce grid consumption during daily peak periods:

1. Tag devices by utility territory (e.g., `socal-edison`)
2. Set up recurring schedules to align with Time-of-Use rates:
   - Charge batteries during off-peak hours
   - Discharge during peak hours

### Virtual Power Plants

Orchestrate energy resources to provide grid services:

1. Tag batteries by capacity and location
2. Create schedules for coordinated charge/discharge cycles
3. Monitor total fleet capacity and export capabilities

## Best Practices

### Tagging Strategy

- **Hierarchical Tags**: Use consistent prefixes for hierarchical organization (e.g., `location:boston`, `program:demand-response`)
- **Functional Groups**: Tag by device functionality or capability
- **Multiple Tags**: Apply multiple tags to enable flexible grouping options
- **Naming Conventions**: Establish consistent naming patterns for easier management

### Schedule Management

- **Conflict Avoidance**: Review existing schedules before creating new ones
- **Schedule Documentation**: Use clear schedule IDs and descriptions
- **Time Zone Awareness**: Explicitly set time zones for schedules spanning multiple regions

### Performance Considerations

- **Batch Size**: For extremely large fleets (10,000+ devices), consider using multiple smaller batches
- **Status Monitoring**: Use batch command status endpoints to track execution progress
- **Error Handling**: Set up webhooks to monitor for execution failures

## Enterprise Scale Implementation

Texture's Batch Commands system is designed for utility-scale operations, enabling:

- **Synchronization**: Coordinate thousands of devices to act in unison
- **Latency Minimization**: Pre-scheduled commands ensure consistent execution time
- **Reliability**: Robust error handling and recovery mechanisms
- **Observability**: Comprehensive monitoring and reporting

For enterprise use cases, Texture can work with you to create custom tag hierarchies and scheduling patterns optimized for your specific operational needs.