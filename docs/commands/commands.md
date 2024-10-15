---
sidebar_position: 2
toc_max_heading_level: 5
---

# Commands

## Introduction

The energy landscape is messy. Across device manufacturers you have different inputs, different API signatures, different models. We provide a simple interface on top of all that chaos. We have created a clean command structure for taking action on devices across the Texture platform.

Every command has its own API endpoint that defines the corresponding info that is needed to send the command. 

The general info needed is the `deviceId` of the device you want the command executed on and an `input` payload containing any specific information needed for the command being executed. In some cases no payload may be necessary.

An example request to set the operating mode of a thermostat to `"off"`, would look like:

```js title="POST https://api.texturehq.com/v1/commands/thermostat/set-operating-mode"
{
   "deviceId": "cllcsqn45000008mn3u76afas",
   "input": {
      "operatingMode": "off"
   }
}
```

For your convenience, we also include an array of the `availableCommands` when you request information about a device via our API. The response includes a JSONSchema blob which represents the allowable form of the `input` needed to enact that specific command. This should prove helpful in making a type safe request to the Texture API for any command you are making.

For details about the specific commands, see details on our [REST API](/api) documentation.

# Asynchronous by Design
Commands are asynchronous by design. This means that when you send a command to a device, you will receive a command `id` in the response. You can use this `id` to check the status of the command and see if it has been executed successfully or not.

In the vast majority of cases, the command will be executed immediately and successfully. However, in some cases, the command may fail. 

For example, if a manufacturer API is down, or if the user has disconnected the device credentials from the manufacturer side, then Texture will not be able to run the command successfully.

In those cases, you have a few options:

1. You can use the `GET /commands/{id}` endpoint to get the status of that command, often through polling (if you want to know the status of the command immediately).
2. You can use the `GET /devices/{deviceId}/commands` endpoint to get a list of all commands for a device, and then filter for the command you are interested in.
3. You can configure a [Destination](/docs/destinations/overview) webhook to receive a notification when the command has been executed (and we will push out an error message if the command has failed).

# Supported Commands

## Batteries

### Set Reserve

We allow you to set the reserve on a battery. The reserve is the lowest a home battery will discharge before it will start acting as a passthrough for the grid and stop discharging. The reason to set and keep a minimum reserve is to ensure that a home is never without power in case of an outage.

```js title="POST https://api.texturehq.com/v1/commands/battery/set-reserve"
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "chargePercentage": 30
  }
}
```

The above example will set the battery reserve for this battery to 30% which means that it will not discharge below 30%. It will freely discharge capacity, but once it gets to that 30% threshold, it will act as a passthrough for any energy source upstream (the grid, a solar inverter, and windmill, etc.).

### Set Operating Mode
With this command you can set a battery to a desired operating mode, for this command these operating modes are `charge`, `discharge`, `idle`, or `reset`.

These are not the typical device operating modes, but fundamental charging states of the battery itself (outside of `reset`). The idea of this command is help influence or prioritize the charging state of the home battery.

In addition to the operating mode there are additional parameters you can pass in:

- `minimumBatteryReserve` - Used when specifying `discharge` as the desired operating mode. This will be the value the backup reserve is adjusted to or minimum charge to reach. (Defaults to 20%)
- `maximumBatteryReserve` - Used when specifying `charge` as the desired operating mode. This will be the value the backup reserve is adjusted to or maximum charge to reach. (Defaults to 95%)
- `enableGridInteraction` - Whether or not the battery should attempt to import from (charging) or export to the grid (discharging). This flag isn't leveraged if `idle` is desired. (Defaults to false)
- `executionPriority` - The priority for the attempts at setting the operating mode. By default, we will attempt to execute the command via "grid_services" first, if applicable, falling back to "baseline" battery control. To bypass the "grid_services" attempt, set this to an empty array, or specify only ["baseline"]. The "baseline" priority is always attempted last (whether specified or not).

> **Note:** When specifying `reset` as the desired operating mode, none of the additional parameters are necessary. We will cache the last known operating mode and settings prior to setting other operating modes for up to 24 hours.

#### Operating Mode Behavior
The below table outlines the general strategy and implications of each operating mode in tandem with the `enableGridInteraction` flag.

Generally though, when the `enableGridInteraction` flag is set to `true` a "Time of use" like mode for the given battery is used. When set to `false` a "Self Consumption" like mode is used.

| Desired Operating Mode | Enable Grid Interaction | Battery Strategy | Battery Reserve | Notes 
|----------------|---------------------------------|--------------------------|-----------------|-----------------|
| `charge`       | true                            | Time of use              | Adjusted to `maximumBatteryReserve`. | Battery will not import from the grid if it is not authorized to do so. Time of use settings may be updated, if applicable, to simulate off peak hours to stimulate charging
| `discharge`    | true                            | Time of use              | Adjusted to `minimumBatteryReserve` (if specified), otherwise the batteries current backup reserve is used | Battery will not export to the grid if it is not authorized to do so. Time of use settings may be updated, if applicable, to simulate peak hours to stimulate discharging
|
| `charge`       | false                           | Self Consumption         | Adjusted to `maximumBatteryReserve`. | Battery may still import from the grid to charge if capable and solar is insufficient
| `discharge`    | false                           | Self Consumption         | Adjusted to `minimumBatteryReserve` (if specified), otherwise the batteries current backup reserve is used |
|
| `idle`         | N/A                             | Self Consumption / Time of use         | Adjusted to the current charge level of battery | Stategy used depends on value of `enableGridInteraction` flag
| `reset`        | N/A                             | N/A                      | N/A             | Reset the battery to the last known settings (within 24 hours) |

#### Examples

##### Discharge the battery, exporting to the grid if possible

```js title="POST https://api.texturehq.com/v1/commands/battery/set-operating-mode"
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "discharge",
    "minimumBatteryReserve": 20,
    "enableGridInteraction": true
  }
}
```

##### Charge the battery from excess solar primarily

> **Note:** It is still possible the battery may import from the grid. This is because the battery may not be able to charge from solar alone, or the battery may be configured to import from the grid to charge.

```js title="POST https://api.texturehq.com/v1/commands/battery/set-operating-mode"
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "charge",
    "maximumBatteryReserve": 100
  }
}
```

##### Reset the battery to the last known settings (within 24 hours)

```js title="POST https://api.texturehq.com/v1/commands/battery/set-operating-mode"
{
  "deviceId": "clm6r8xuf0003systrvwyfn42",
  "input": {
    "operatingMode": "reset"
  }
}
```

#### Additional Information
You can further [view the command endpoint and give it a try in our api reference](https://docs.texturehq.com/docs/actions/commands#set-operating-mode).

Under the hood we will primarily use the batteries equivalent “Self Consumption” operating mode when `enableGridInteraction=false`. Reducing reliance or usage of the grid.

When `enableGridInteraction=true` we will use the batteries equivalent “Time of use” operating mode. Allowing import from the grid and export to the grid if the battery is installed/configured to do so and the connected utility allows this grid interaction.

We will continue to improve this command with further feedback from you, and make better inferences on the best way to configure the battery to achieve the desired charging state at the point of executing this command.

## Thermostats

### Set Operating Mode

With this command, you can set a thermostat to different operating modes including `cool`, `heat`, `off`, and more.

```js title="POST https://api.texturehq.com/v1/commands/thermostat/set-operating-mode"
{
   "slug": "thermostat:set-operating-mode",
   "deviceId": "cllcsqn45000008mn3u76afas",
   "input": {
      "operatingMode": "cool",
      "coolTarget": 72
   }
}
```

The above example will set the smart thermostat's operating mode to `cool` and the `coolTarget` of 72 means that it will continue to cool to keep the temperature below 72 degrees Fahrenheit. Once the temperature goes below 72 the thermostat will shut off the A/C compressor until the temperature rises above the `coolTarget` threshold.

### Set Fan Mode

With this command, you can set the fan mode of a thermostat to different operating modes including `auto`, `on`, `off` and `circulate`.

```js title="POST https://api.texturehq.com/v1/commands/thermostat/set-fan-mode"
{
   "slug": "thermostat:set-fan-mode",
   "deviceId": "cllcsqn45000008mn3u76afas",
   "input": {
      "fanMode": "auto"
   }
}
```

The above example will set the smart thermostat's fan mode to `auto` which means that the fan will only run when the heating or cooling system is running.

## Chargers

### Set Operating Mode

With this command, you can set a charging process to different operating modes including `start-charging` or `stop-charging.` 

```js title="POST https://api.texturehq.com/v1/commands/charger/set-operating-mode"
{  
    "slug": "charger:set-operating-mode",  
    "deviceId": "cllcsqn45000008mn3u76afas",  
    "input": {  
       "operatingMode": "start-charging",  
    }  
}
```

## Vehicles

### Set Operating Mode

With this command, you can set a vehicle charging process to different operating modes including `start-charging` or `stop-charging.`

```js title="POST https://api.texturehq.com/v1/commands/vehicle/set-operating-mode"
{  
    "slug": "vehicle:set-operating-mode",  
    "deviceId": "cllcsqn45000008mn3u76afas",  
    "input": {  
       "operatingMode": "start-charging",  
    }  
}
```

### Set Charge Limit

 With this command, you can set a charge limit of the vehicle (in percent, from 0 up to 100).

```js title="POST https://api.texturehq.com/v1/commands/vehicle/set-charge-limit"
{  
    "slug": "vehicle:set-charge-limit",  
    "deviceId": "cllcsqn45000008mn3u76afas",  
    "input": {  
       "chargeLimit": "80",  
    }  
}
```
