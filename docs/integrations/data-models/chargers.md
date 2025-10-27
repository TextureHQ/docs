import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Chargers

<Subtitle>Electric vehicle charging equipment with power output and charging states</Subtitle>

A charger on the Texture Platform is an electric vehicle charger. We support a variety of charger manufacturers and models, and are always adding more. 

## Supported Chargers

For the list of vehicle models we currently support on the Texture Platform, see the [Supported Devices](/integrations/manufacturers/devices-and-oems) page. We are always adding support for more so if you see a charger that you would like to see on platform, please [contact us](https://www.texturehq.com/contact-us) and let us know.

## Charger Data Model

Below is a sample payload from a charger on the Texture Platform. This sample shows a ChargePoint Home Flex charger:

```js
{
  "id": "clu1bux2r028i13yldndeaqrx",
  "availableCommands": [
    {
      "slug": "charger:set-operating-mode",
      "description": "Sets the operating mode of the charger."
    }
  ],
  "manufacturer": "chargepoint",
  "model": "chargepoint:homeflex",
  "modelYear": null,
  "name": "garage",
  "referenceId": "dadsas",
  "serialNumber": "0910042001280644380223649652",
  "state": {
    "id": "clxdkewjh00b3wxgs4iewglc8",
    "chargingState": "discharging",
    "isPluggedIn": true,
    "chargerVoltage": 22,
    "chargerCurrent": 51,
    "chargerWattage": 7563,
    "createdAt": "2024-06-13T18:00:03.025Z"
  },
  "tags": [],
  "type": "charger",
  "createdAt": "2024-03-21T14:28:20.580Z",
  "updatedAt": "2024-06-13T18:00:03.025Z"
}
```
First I'll break down all of the fields in the root of the thermostat object:
- `id` - a unique identifier that Texture assigns to the charger
- `type` - the type of device, in this case, a `charger`
- `serialNumber` - the serial number of the device
- `manufacturer` - the manufacturer of the device
- `model` - the model of the device
- `availableCommands` - the commands that are available to send to the charger
- `state` - the current state of the charger (see below for details)
- `name` - the name of the charger that the user has assigned with the manufacturer, if any (optional)
- `tags` - the tags that are associated with the charger that you provided during the connection process to help group devices (optional)
- `referenceId` - the customer reference ID of the charger, something you provide to identify this customer

Next, I'll break down each field in the `state` object in detail below:
- `id` - a unique identifier that Texture assigns to the state update
- `chargingState` - the current charging state of the charger. Possible values are `charging`, `discharging`, `idle`, `unknown` indicating whether the charger is charging, discharging, idle, or an unknown state respectively.
- `isPluggedIn` - whether the a vehicle is currently plugged in to the charger or not
- `chargerVoltage` - the voltage of the charger in volts (V)
- `chargerCurrent` - the current of the charger in amperes (A)
- `chargerWattage` - the power of the charger in watts (W)
- `createdAt` - the date the state update was created in ISO 8601 format



