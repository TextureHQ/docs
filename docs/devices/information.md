---
sidebar_position: 2
---

# Static Information

We will pull what we call "static" information about a device. This is generally device metadata that generally does not change over time.

The information we pull for each device is a bit different based on the device type, but there are some commonalities. 

## Identifier

When we register a device on the Texture Platform, we assign it a unique identifier that you can use to query our API so every device has this id.

For this unique identifier we use a `cuid` which is an awesome identifier for all sorts of different reasons (lots of details on [the cuid Github page](https://github.com/ericelliott/cuid)). 

> Note: we toyed with the idea of using something cute like prefixing every identifier with `deviceId-` or something which we have seen as a recent trend in API design which does have a nice advantage in making the identifier a bit more  human readable at a glance (you're never going to mix up a `deviceId` with say a `workspaceId`).
> 
> However, the downside of that approach is that you (and we) can't then validate those ids as a `cuid` without stripping off a prefix which makes it more difficult to process API requests, write to the db with type safety (we have to then just treat it as a string), and so on.
> 
> We chose to prioritize type safety over human readability since we suspect the most common case is that these are read by machines and not humans, but did want to call out our explicit design decision to show that we did consider such a thing and decided against it.

## ReferenceId

You have to supply a `referenceId` when you connect anything to the Texture Platform and this identifier is used as a backreference to something in your system. Generally it is some kind of `userId` or `accountId` or `siteId` or something like that.

You may be thinking "why is the `referenceId` referencing a User or an Account rather than a Device?" and that's a great question!

The answer is essentially because in the most common use cases on our platform, you provide a single `referenceId` when initiating the flow for a user to connect their devices. 

But we often don't know how many devices they have until we have connected to the manufacturer and pulled in that basic information.

<div className="example">
For example, you may provide us with a `referenceId` of `12345` for a connection. Let's say the user which you have referenced by `12345` authenticates with Tesla. Once we connect, we are able to identify that the user has a Model S, a Model Y, a Powerwall, and a Solar Inverter. So they have 4 different devices. 

For you to provide us with a `referenceId` for each of those devices would be a bit of a pain and would require a lot of back and forth.

So instead you provide a `referenceId` for that connection and it applies to all of those devices.

We have considered allowing developers to attach specific identifiers to each device retroactively, but have not had a use case/customer request for it yet. If you are interested in this functionality, please ping us on [our community Slack](/docs/support/slack) and let us know!
</div>

## Basic Metadata

For all devices on the Texture Platform, we have the following information:
1. Manufacturer
1. Model
1. Serial Number

And for most devices we will also have:
1. Location

A quick note on Location: Most of the energy devices on our platform do not move, they are fixtures so for example solar panels, whole home or commercial batteries, smart thermostats, things that are generally bolted down to a fixed location. In these cases, the Location is easy and generally won't change. However we do also support some devices that do move often such as Electric Vehicles. For these devices we have 2 different locations on platform. One which is "static" that is often the homebase of the vehicle, the home in which it is parked and where it most often charges and one which is "dynamic" that is the current location of the vehicle. Some applications and use cases need the static one (e.g. to calculate the tariff cost to charge an EV at home in various points of the day -- in that case the location of the home matters and the location of the vehicle does not) and others the dynamic location (e.g. to know if the vehicle is at home and can be used to provide grid services). We don't know what you are going to build so we provide both when we can and let you decide which is most relevant to your use case.

And for some devices we will have:
1. Year

