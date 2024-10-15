# Batteries

Batteries are a type of device that can be used to store and release electrical energy. They are commonly used in a wide range of applications, including portable electronics, electric vehicles, and renewable energy systems.

When we talk about batteries on Texture though, we are generally referring to large batteries that can power a whole home or used in commercial or industrial applications. These batteries are typically made up of multiple cells, which are connected together to form a battery pack.

Often these batteries are used in conjunction with solar panels, wind turbines, or other renewable energy sources to store energy when it is abundant and release it when it is needed.

Batteries are also used to provide backup power in the event of a grid outage, and can be used to reduce peak demand charges by discharging during times of high electricity prices.

## Battery Models

For the list of battery models we currently support on the Texture Platform, see the [Supported Devices](/docs/sources/supported-devices) page. We are always adding support for more so if you see a battery that you would like to see on platform, please [contact us](https://www.texturehq.com/contact-us) and let us know.

## Battery Data Model

Below is a sample payload from a battery we have on platform. This is a Tesla Powerwall:

```js
{
      "id": "cltqch59v001ddpmfarpz789p",
      "type": "battery",
      "manufacturerDeviceId": "2252266738015794",
      "serialNumber": null,
      "manufacturer": "tesla",
      "model": "tesla_solar_powerwall",
      "modelYear": null,
      "availableCommands": [{
          "slug": "battery:set-reserve",
          "description": "Sets the reserve percentage of the battery."
        }, {
          "slug": "battery:set-operating-mode",
          "description": "Sets the operating mode of the battery."
      }],
      "state": {
        "id": "cltyhxpy406poq4z3zx19y2fs",
        "charge": 18069.15789473684,
        "chargePercentage": 59.30925587453832,
        "chargingState": "charging",
        "whConsumed": 0,
        "chargeRate": -2290,
        "backupReserve": 30,
        "gridStatus": "idle",
        "gridPower": 0,
        "gridEnergy": 0,
        "strategy": "self_consumption",
        "isStormModeEnabled": true,
        "isStormModeActive": false,
        "createdAt": "2024-03-19T14:55:10.493Z"
      },
      "name": "My Home",
      "tags": [],
      "referenceId": "f0786fa0-55e6-5599-bdeb-0e9d2cac75e8"
    }
```

I'll break down each field in the `state` object in detail below:

- `id` - a unique identifier that Texture assigns to the state update
- `charge` - the current charge of the battery in watt-hours (Wh)
- `chargePercentage` - the current charge of the battery as a percentage
- `chargingState` - the current charging state of the battery. Possible values are `charging`, `discharging`, `idle`, `unknown` indicating whether the battery is charging, discharging, or idle, respectively -- pair this with `gridStatus` to understand whether the battery is charging from the grid, discharging to the grid, or idle
- `whConsumed` - the total energy consumed by the battery in watt-hours (Wh) since the last state update
- `chargeRate` - the current charge rate of the battery in watts (W), positive indicates discharging, negative indicates charging
- `backupReserve` - the current backup reserve of the battery as a percentage -- this is the limit below which the battery will not discharge so it is reserved for backup in case of an emergency
- `gridStatus` - the current status of the grid. Possible values are `idle`, `exporting`, `importing`, `unknown` indicating the battery is idle, charging from the grid, or discharging to the grid, respectively
- `gridPower` - the current power flow to/from the grid in watts (W). Postive indicates importing from the grid, negative indicates exporting to the grid
- `gridEnergy` - the total energy flow to/from the grid in watt-hours (Wh) since the last state update
- `strategy` - the current strategy of the battery. Possible values are `self_consumption`, `time_of_use`, `backup`, `unknown` indicating the current strategy of the battery
- `isStormModeEnabled` - Flag indicating whether storm mode is enabled on the battery
- `isStormModeActive` - Flag indicating whether there is an active storm alert currently
- `createdAt` - the date the state update was created in ISO 8601 format


