import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Inverters

<Subtitle>Solar energy conversion with power output and grid interaction</Subtitle>

An inverter on the Texture Platform is a cloud-connected solar inverter. We support a variety of solar inverter manufacturers and models, and are always adding more.

## Supported inverters

For the list of vehicle models we currently support on the Texture Platform, see the [Supported Devices](/integrations/manufacturers/devices-and-oems) page. We are always adding support for more so if you see a inverter that you would like to see on platform, please [contact us](https://www.texturehq.com/contact-us) and let us know.

## Inverter Data Model

Below is a sample payload from an inverter on the Texture Platform. This happens to be an Enphase IQ7+:

```js
{
  "id": "clv6r8vyu0c1cj17e8u1r8k5y",
  "availableCommands": [],
  "location": {
    "address": {
      "streetOne": "123 Main St",
      "streetTwo": "Apt 101",
      "city": "Beverly Hills",
      "state": "CA",
      "postalCode": "90210",
      "country": "USA"
    },
    "coordinates": {
      "latitude": 34.1,
      "longitude": -118.3
    }
  },
  "manufacturer": "enphase",
  "model": "enphase:iq7plus",
  "modelYear": null,
  "name": "IQ7+",
  "referenceId": "3affc5b5-8c5e-5bf7-92e6-8e43dbbc6590",
  "serialNumber": "202595692513",
  "state": {
    "id": "clxdl1cl2013twxgsausieuue",
    "power": 79,
    "gridStatus": "unknown",
    "gridPower": null,
    "gridEnergy": null,
    "createdAt": "2024-06-13T18:15:00.000Z",
    "batteryState": null
  },
  "tags": [],
  "type": "inverter",
  "createdAt": "2024-04-19T14:17:39.798Z",
  "updatedAt": "2024-06-13T18:15:00.000Z"
}
```
First I'll break down all of the fields in the root of the inverter object:
- `id` - a unique identifier that Texture assigns to the inverter
- `type` - the type of device, in this case, a `inverter`
- `serialNumber` - the serial number of the device
- `manufacturer` - the manufacturer of the device
- `model` - the model of the device
- `availableCommands` - the commands that are available to send to the inverter
- `state` - the current state of the inverter (see below for details)
- `location` - the location of the inverter
  - `address` - the address of the inverter
  - `coordinates` - the coordinates (latitude/longitude) of the inverter
- `name` - the name of the inverter that the user has assigned with the manufacturer, if any (optional)
- `tags` - the tags that are associated with the device that you provided during the connection process to help group devices (optional)
- `referenceId` - the customer reference ID of the inverter, an identifier in your system that you provide to identify this customer on Texture

Next, I'll break down each field in the `state` object in detail below:
- `id` - a unique identifier that Texture assigns to the state update
- `power` - the current power output of the inverter in watts
- `gridStatus` - the current grid status of the inverter. Possible values are `importing`, `exporting`, `idle`, `unknown`indicating the current grid status of the inverter
- `gridPower` - the current grid power of the inverter in watts
- `gridEnergy` - the current grid energy of the inverter in Wh
- `createdAt` - the date the state update was created in ISO 8601 format
- `batteryState` - the current battery state of the inverter (if it has one)

