import { BackLink } from '@components/BackLink';
import { Subtitle } from '@components/Subtitle';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Thermostats

<Subtitle>HVAC control systems with temperature settings and operating modes</Subtitle>

A thermostat on the Texture Platform is a cloud-connected smart thermostat. We support a variety of thermostat manufacturers and models, and are always adding more. 

## Supported Thermostats

For the list of vehicle models we currently support on the Texture Platform, see the [Supported Devices](/integrations/manufacturers/devices-and-oems) page. We are always adding support for more so if you see a smart thermostat that you would like to see on platform, please [contact us](https://www.texturehq.com/contact-us) and let us know.

## Thermostat Data Model

Below is a sample payload from a smart thermostat on the Texture Platform. This happens to be an Ecobee Smart Thermostat Premium:

```js
{
  "id": "cllgn0u4r000008l7eazybfbo",
  "name": "string",
  "serialNumber": "b1143000-69ac-481f-9bef-4bfd96198786",
  "referenceId": "2952bc94-0273-4087-830b-d0ab2bece1e7",
  "manufacturer": "ecobee",
  "type": "thermostat",
  "model": "nikeSmart",
  "modelYear": 2021,
  "state": {
    "ambientTemperature": 72.3,
    "operatingMode": "auto",
    "heatTarget": 72.5,
    "coolTarget": 75.5,
    "fanMode": "auto"
  },
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
  "availableCommands": [
    {
      "slug": "thermostat:set-operating-mode",
      "description": "Sets the operating mode of the thermostat."
    },
    {
      "slug": "thermostat:set-fan-mode",
      "description": "Sets the fan mode of the thermostat."
    }
  ],
  "tags": [
    "bedroom",
    "upstairs"
  ],
  "createdAt": "2024-04-01T00:00:00.000Z",
  "updatedAt": "2024-04-01T00:00:00.000Z"
}
```
First I'll break down all of the fields in the root of the thermostat object:
- `id` - a unique identifier that Texture assigns to the thermostat
- `type` - the type of device, in this case, a `thermostat`
- `serialNumber` - the serial number of the device
- `manufacturer` - the manufacturer of the device
- `model` - the model of the device
- `availableCommands` - the commands that are available to send to the thermostat
- `state` - the current state of the thermostat (see below for details)
- `location` - the location of the thermostat
  - `address` - the address of the thermostat
  - `coordinates` - the coordinates (latitude/longitude) of the thermostat
- `name` - the name of the thermostat that the user has assigned with the manufacturer, if any (optional)
- `tags` - the tags that are associated with the device that you provided during the connection process to help group devices (optional)
- `referenceId` - the customer reference ID of the thermostat, an identifier in your system that you provide to identify this customer on Texture

Next, I'll break down each field in the `state` object in detail below:
- `id` - a unique identifier that Texture assigns to the state update
- `ambientTemperature` - the current ambient temperature in degrees Fahrenheit
- `operatingMode` - the current operating mode of the thermostat. Possible values are `off`, `heat`, `cool`, `auto`, `eco`, `unknown` indicating the thermostat operating mode
- `heatTarget` - the current heat target temperature in degrees Fahrenheit
- `coolTarget` - the current cool target temperature in degrees Fahrenheit
- `fanMode` - the current fan mode of the thermostat. Possible values are `auto`, `on`, `off`, `circulate`, `unknown` indicating the current mode of the fan
- `createdAt` - the date the state update was created in ISO 8601 format


## Thermostat Specifics
Below are some more in-depth descriptions of concepts which are specific to smart thermostats.

### Operating Modes
Thermostats have something called the Operating Mode which, as its name implies, dictates the current operating mode of the thermostat. The possible values are `off`, `heat`, `cool`, `auto`, `eco`, `unknown`.

* `heat` - The thermostat is heating the home to the heat target temperature and once it hits that target temperature it will turn off until the temperature drops below the `heatTarget` temperature in which case it will turn back on. As a result, only a `heatTarget` temperature is provided.
* `cool` - The thermostat is cooling the home to the cool target temperature and once it hits that target temperature it will turn off until the temperature rises above the `coolTarget` temperature in which case it will turn back on. As a result, only a `coolTarget` temperature is provided.
* `auto` - The thermostat is trying to maintain the home temperature by adjusting heating or cooling based on the temperature so there are two set points provided, both the heat and cool target temperatures. The thermostat will automatically throttle the system on or off and heat or cool based on the target temperatures to keep it heated above the `heatTarget` and cooled below the `coolTarget`.
* `eco` - The thermostat is in eco mode so similar to `auto` but generally tries to use less power. This is done through various means by different manufacturers: using occupancy sensors to minimize the amount of time the system is on, using wider temperature ranges to stick within the mode and not staying directly to the exact heat/cool targets, using lower fan speeds, etc.
* `unknown` - the operating mode of the thermostat is unknown

### Fan Modes
Thermostats have something called the Fan Mode which, as its name implies, dictates the current fan mode of the thermostat. The possible values are `auto`, `on`, `off`, `circulate`, `unknown`.

* `auto` - The fan will be on when it needs to be on to hit the current operating mode `heatTarget` or `coolTarget` and off otherwise.
* `on` - The fan is on
* `off` - The fan is off
* `circulate` - The fan is on to circulate the air, often at a lower rate than `on` to circulate the air
* `unknown` - The fan mode of the thermostat is unknown (this should generally not happen it is a kind of catch all in case the thermostat does not provide a fan mode or we are unable to determine or map it to our other standard modes)

### Energy Consumption
Unfortunately, while the Texture Platform supports thermostats, we do not currently support energy consumption data for thermostats. This is because we often do not know what device is on the other side of the thermostat, and therefore, we cannot calculate energy consumption for a thermostat.

We are working with some manufacturers of devices like heat pumps to get direct energy consumption data and if we had a reliable source to know what device it is connected to and its power consumption in the various operating modes, we would be able to calculate energy consumption for a thermostat.

However in almost every case the thermostat is just a device that sits outside an HVAC system and just throttles it on and off based on the temperature it reads and the thermostat's target temperature so it has no access to energy data and doesn't have a way to calculate energy consumption itself.

Further, for cooling it is often electric (either a traditional A/C compressor or a heat pump) but for heating it could often be a gas heater or something where electricity consumption is not relevant.