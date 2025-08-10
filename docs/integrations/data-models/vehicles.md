import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Vehicles

<Subtitle>Connected EVs with battery levels, range, and charging status</Subtitle>

A vehicle on the Texture Platform is a car, truck, or other vehicle that is electric or plug-in hybrid. We support a variety of vehicle manufacturers and models, and are always adding more. 

We do not support any ICE (internal combustion engine) aka gasoline-powered vehicles since we are an electric energy management platform.

## Supported Vehicle Models

For the list of vehicle models we currently support on the Texture Platform, see the [Supported Devices](/integrations/manufacturers/devices-and-oems) page. We are always adding support for more so if you see a vehicle that you would like to see on platform, please [contact us](https://www.texturehq.com/contact-us) and let us know.

## Vehicle Data Model

Below is a sample payload from a vehicle on the Texture Platform. This happens to be a Tesla Model Y:

```js
{
    "id": "cltqavafq02cb10ua7o4joo4q",
    "type": "vehicle",
    "manufacturerDeviceId": "1493084953679313",
    "serialNumber": "1493084953679313",
    "manufacturer": "tesla",
    "model": "tesla_model_y",
    "modelYear": null,
    "availableCommands": [{
          "slug": "vehicle:set-charge-limit",
          "description": "Sets the vehicle charge limit."
        }, {
          "slug": "vehicle:set-operating-mode",
          "description": "Sets the operating mode of the vehicle."
      }],
    "state": {
      "id": "clu19sheu024213yldjtpbtit",
      "charge": null,
      "chargingState": "discharging",
      "chargePercentage": 57,
      "chargeCompletionDate": null,
      "chargeCompletedAt": "2024-03-21T13:30:23.833Z",
      "chargeLimit": 80,
      "isPluggedIn": false,
      "chargerVoltage": 2,
      "chargerCurrent": 0,
      "chargerWattage": 0,
      "range": 169,
      "latitude": 39.988509,
      "longitude": -104.983243,
      "createdAt": "2024-03-21T13:30:27.750Z"
    },
    "name": "Gertie",
    "tags": [],
    "referenceId": "79f380ec-241c-5193-8473-faf40a29939b"
  }
  ```
First I'll break down all of the fields in the root of the vehicle object:
- `id` - a unique identifier that Texture assigns to the vehicle
- `type` - the type of device, in this case, a `vehicle`
- `manufacturerDeviceId` - the unique identifier that the manufacturer assigns to the vehicle
- `serialNumber` - the serial number of the vehicle (for a vehicle this is generally the VIN number)
- `manufacturer` - the manufacturer of the vehicle
- `model` - the model of the vehicle
- `modelYear` - the year the vehicle was manufactured (note this may be `null` for some manufacturers that do not currently expose this information via API)
- `availableCommands` - the commands that are available to send to the vehicle
- `state` - the current state of the vehicle (see below for details)
- `name` - the name of the vehicle that the user has assigned with the manufacturer, if any (optional)
- `tags` - the tags that are associated with the vehicle that you provided during the connection process to help group devices (optional)
- `referenceId` - the reference ID of the vehicle, something you provide to identify this customer/device

Next, I'll break down each field in the `state` object in detail below:
- `id` - a unique identifier that Texture assigns to the state update
- `charge` - the current charge of the vehicle in watt-hours (Wh). This is the total amount of energy stored in the vehicle's battery.
- `chargingState` - the current charging state of the vehicle. Possible values are `charging`, `discharging`, `idle`, `unknown` indicating whether the vehicle is charging, discharging, idle, or an unknown state respectively.
- `chargePercentage` - the current charge of the vehicle as a percentage of the total battery capacity
- `chargeCompletionDate` - the date and time that the vehicle is expected to be fully charged -- `null` if the vehicle is not currently charging
- `chargeCompletedAt` - the date and time that the vehicle was last fully charged
- `chargeLimit` - the maximum charge limit of the vehicle as a percentage of the total battery capacity that the vehicle will charge to, in the example above the vehicle will only charge to 80% of its total capacity but no higher
- `isPluggedIn` - whether the vehicle is currently plugged in or not
- `chargerVoltage` - the voltage of the charger in volts (V)
- `chargerCurrent` - the current of the charger in amperes (A)
- `chargerWattage` - the power of the charger in watts (W)
- `range` - the estimated range of the vehicle in miles
- `latitude` - the latitude of the vehicle's last known location
- `longitude` - the longitude of the vehicle's last known location
- `createdAt` - the date the state update was created in ISO 8601 format



