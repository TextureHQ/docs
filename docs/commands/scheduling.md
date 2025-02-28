---
sidebar_position: 3
---

# Scheduling

## Introduction

The Device Schedules product is crafted to empower developers and device fleet operators, offering seamless
synchronization and control of devices through the Texture platform.

It provides a unified API for scheduling, eliminating the need to consider manufacturers or device types. As of now,
thermostats and batteries from all supported manufacturers are compatible with this product, and we're actively working
to extend support to additional device types in the near future.

This documentation elucidates the APIs offered under the Device Schedules product and guides developers in their
utilization.

## Overview

As with most other entities on the Texture platform, all APIs provided under the Schedule product are name-spaced
by [Workspace](/docs/platform-concepts/workspaces). This enables developers to easily segregate data from different
environments such as `staging`, `production`, etc. The **deviceId** required by the API is the same device ID that is
created when the device is connected to the workspace.

## General Scheduling Capabilities

Currently our API supports creating and updating schedules that are aligned to a weekly interval. As the product and
platform continue to evolve, we will offer additional scheduling and event driven device state rules that will allow for
more complex device monitoring and controls. The existing API works via
the [Set Operating Mode Command API](/docs/commands) and schedules commands to be sent to the device to enter the
specified operating mode during the specified rule interval.

### An Example Schedule

![Device Schedule Example](/img/Scheduling-Device_Schedule.drawio.png)

The schedule above simulates a device that has a default operating mode in the mornings and evening during the week, a *
*day** operating mode during the hours of 8a-6p, and then a **weekend** mode that is active on the weekends. Lets say
this is for battery device that optimized to store energy in the evenings and weekends but is designed to discharge to
the grid during demand periods during the day.

An example schedule for this hypothetical device would look as follows:

```json title="POST https://api.texture.energy/v1/devices/clpkn2je80006102tx7d0jhb8/schedule"
{
  "schedule": {
    "deviceTimezone": "US/Eastern",
    "defaultDeviceOperatingMode": {
      "operatingMode": "charge",
      "minimumBatteryReserve": 20,
      "maximumBatteryReserve": 95,
      "enableGridInteraction": false
    }
  },
  "rules": [
    {
      "daysOfWeek": [
        1,
        // "monday"
        2,
        // "tuesday"
        3,
        // "wednesday"
        4,
        // "thursday"
        5
        // "friday"
      ],
      "startTime": "08:00",
      "endTime": "18:00",
      "deviceOperatingMode": {
        "operatingMode": "discharge",
        "minimumBatteryReserve": 10,
        "maximumBatteryReserve": 95,
        "enableGridInteraction": true
      }
    },
    {
      "daysOfWeek": [
        0,
        // "sunday"
        6
        // "saturday"
      ],
      "startTime": "00:00",
      "endTime": "23:59",
      "deviceOperatingMode": {
        "operatingMode": "charge",
        "minimumBatteryReserve": 10,
        "maximumBatteryReserve": 95,
        "enableGridInteraction": true
      }
    }
  ]
} 
```

### How it works

Our scheduling engine works on a fairly straight forward event loop that examines the last minute worth of device
triggers and then dispatches the scheduled command to the device as it transits the rising or falling edge of the
window. A rising edge is defined as entering from either the **defaultDeviceOperatingMode** into a rule state, or going
from one rule to another, "an adjacent rule transition". This is evaluated looking backwards to obtain most recent
device state and enable the graceful transition between modes to prevent state thrashing. This state machine is
described in the figure below:

![Scheduling Rule Engine State Machine](/img/Scheduling-Rule_Engine-statemachine.drawio_1.png)

The intention of this design is to a offer granular, yet scalable device state evaluation tracking and as the platform
expands to offer additional capabilities around event driven rule evaluation on device updates, as well as more complex
historical or analytic analysis performed over groups of devices to simplify device fleet management.

## Endpoint & schema overview

View the full endpoint and schema overview in the [API Reference](/api).

### Schedule

| Schedules                        | Endpoint                                               | Schema                            |
|----------------------------------|--------------------------------------------------------|-----------------------------------|
| **Get schedules for a device**   | GET /v1/devices/\{deviceId\}/schedules                 | [DeviceSchedule](#deviceschedule) |
| **Get a schedule for a device**  | GET /v1/devices/\{deviceId\}/schedule/\{scheduleId}    | [DeviceSchedule](#deviceschedule) |
| **Create a new device schedule** | POST /v1/devices/\{deviceId\}/schedule                 | [DeviceSchedule](#deviceschedule) |
| **Delete all device schedules**  | DELETE /v1/devices/\{deviceId\}/schedules              | [DeviceSchedule](#deviceschedule) |
| **Delete a device schedule**     | DELETE /v1/devices/\{deviceId\}/schedule/\{scheduleId} | [DeviceSchedule](#deviceschedule) |


### Creating schedule

To create a schedule for a device, you'll need to provide the following information:

- `deviceId` - The ID of the device for which you want to create a schedule
- `defaultDeviceOperatingMode` - The default operating mode for the device (specific to the deviceType)
- `rules` - An array of rules that define the schedule
- `deviceTimezone` - (Optional) The timezone override in which the schedule should be evaluated

### Checking a device schedule

To check the schedule for a device, you'll need to provide the following information:

- `deviceId` - The ID of the device for which you want to check the schedule

Devices can have only one active schedule. By updating a schedule you will be invalidating any existing schedule for the
device.

### Device Rules

A schedule comprises a set of rules. Each rule consists of the following information:

- `startTime` - The time at which the rule should start ("HH:MM")
- `endTime` - The time at which the rule should end ("HH:MM")
- `daysOfWeek` - An array of days of the week on which the rule should be active (e.g. [0,1,2] for Sunday, Monday,
  Tuesday)
- `deviceOperatingMode` - The operating mode for the device during the rule (specific to the deviceType)

### Device Operating Modes

View our complete list of available device operating modes [here](/docs/commands).

### DeviceSchedule

A `DeviceSchedule`is the common response object type for our Device Scheduling API. The response type is very similar to
the post body with some enriched information from the database returned as a list of the active or future schedules. 
The basic layout of the type is described in the [API Reference](/api) as the response object to the GET Device Schedules endpoint.

## Schedules & Rules Notes:

- Scheduled rule intervals **cannot** overlap
- The scheduled operating modes must match the specified device type
- A schedule must have at least one rule
- A schedule must specify a Timezone to evaluate the schedule against
  - **We support the IANA database of timezones so any valid timezone string will validate, e.g.:**
    - US/Eastern
    - US/Central
    - US/Mountain
    - US/Pacific

## Device Schedule Notes:

- A device can have only one active schedule
- Creating a schedule starting `now` with an open end date with remove all prior schedules
- Similarly, POSTing a new schedule will remove any existing schedules that overlap with the new schedule.
- A schedule can be created with a start date in the past, but it will not be active until the next rule interval
- Rule triggers or resets to the default operating mode only occur on the edge of the rule interval. If you need to
  trigger a rule immediately, you can use the [Set Operating Mode Command API](/docs/commands) to force the device into
  the desired state.