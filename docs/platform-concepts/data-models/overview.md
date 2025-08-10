---
sidebar_position: 1
---

# Overview

As much as possible, the data models for devices are designed to be consistent across different device types. This makes it easier to write applications that work with many different devices.

## Common Concepts

There are a few concepts that are common to all devices:
- Basic Information - All devices have the following basic information (for more information on this see [Static Information](/platform-concepts/devices#device-information)):
    - `id` - a unique identifier that Texture assigns to the device
    - `referenceId` - This is an identifier that is assigned by you, the user, and is used to reference the device in your own systems. Often this is a user id, an email, or anything else so you can find the device(s) later
    - `manufacturer` - The company that made the device
    - `model` - The model of the device
    - `serialNumber` - The serial number of the device
    - `tags` - A list of tags that you can use to organize your devices
    - `location` - The location of the device (note the fidelity may vary)
    - `type` - The type of the device
    - `createdAt` - The date the device was created
    - `updatedAt` - The date the device was last updated
- [State Updates](/platform-concepts/devices#state-updates) - The information that is sent from the device to the Texture Platform on a regular cadence so that you can monitor and make decisions based on it.
- [Commands](/platform-concepts/commands) - The information that is sent from the Texture Platform to the device to make it do something. Not all devices support commands, but many do and we have tried to make commands as consistent as possible across device types

We have breakout pages with details on the data model for each Device Type:
- [Batteries](/integrations/data-models/batteries)
- [Chargers](/integrations/data-models/chargers)
- [Electric Vehicles](/integrations/data-models/vehicles)
- [Inverters](/integrations/data-models/inverters)
- [Thermostats](/integrations/data-models/thermostats)
