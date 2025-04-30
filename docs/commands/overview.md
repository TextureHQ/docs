---
sidebar_position: 1
---

# Overview

## What are Commands?

Commands are operations you send to energy devices through the Texture platform to control their behavior, retrieve data, or modify settings. Commands provide the "control" aspect of Texture's connect-monitor-control functionality.

With Texture Commands, you can:

- Control battery systems (charge, discharge, set modes)
- Adjust EV charging (start, stop, set charge rates)
- Manage solar inverters (enable/disable, set power limits)
- Control smart thermostats (adjust temperature, change modes)
- Schedule operations for future execution
- Run batch commands across multiple devices
- Create automation rules triggered by events or conditions

## Command Namespacing

All Commands are namespaced by [Workspace](/docs/platform-concepts/workspaces), enabling you to segregate operations between environments like development, staging, and production.

> 🤔 Please note: all temperatures are returned in Fahrenheit only for now. We are building a platform capability to allow an Organization to specify their desired temperature units and have them apply to data sent and returned via API and in the Dashboard, but until that feature is released, we had to pick one and most of our initially supported smart thermostat manufacturers supported Fahrenheit out of the box so we took the same approach. Stay tuned for different temperature unit support.

## Fetching device list

Retrieve a comprehensive list of all devices connected to the Texture platform for your current Workspace.

This endpoint is mostly intended for development and diagnostic uses as it will not scale particularly well for any Organization with a large volume of devices connected.

That said, it does support cursor-based pagination so you could theoretically iterate page-by-page and eventually slurp down all connected devices. However, this is not really the intended use for this endpoint, we would much rather you configure a [Destination](/docs/destinations/overview) like s3 or a data warehouse/data lake if you are looking to fetch every connected device.

## Fetching specific device information

For a specific device, you will be able to retrieve the detailed attributes about the device including its manufacturer, model number, serial number, and its most recent state.

By default we will either pull from our cache or, if it is stale, seamlessly do a real-time fetch of the current state of the device for you.

### Real time v. cached

For performance reasons, most use cases can be supported via the most recent Cached data point that Texture has retrieved, however if we inspect our cache and the most recent data point is outdated, we will attempt\* to fetch a more recent data point for you in real-time.

> "Attempt" is used here because if Texture has an outdated cached version, it is likely that is because there is an outage on the Device manufacturer side so we were unable to retrieve a more recent data point, or the user has disconnected the device credentials from the manufacturer side. In both cases, unfortunately Texture will not be able to retrieve a more updated data point in real-time either (unless the manufacturer API was down and is now back up)

You can also specify via our various Read methods to pull cached data going back for your Organization's configured Retention period. By default this is 14 days, however we can enable longer Retention via the API for a price.

Please [reach out to us](https://www.texturehq.com/contact-us) if this longer Retention interests you.

## Commands

We support many different Commands to take action on various energy devices but they all share the same simple format and structure.

For more details, see the docs on our [Commands](/docs/commands).

For details about the specific commands, see details on our [REST API](/api) documentation.
