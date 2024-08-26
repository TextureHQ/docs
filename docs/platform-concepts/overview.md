---
sidebar_position: 1
---

# Overview

There is nothing on the market quite like the Texture Platform so we have created this guide to help you understand some of the core concepts of the platform and how they fit together.

## What is Texture?

Texture is a platform for managing Energy Networks. 

If you are wondering, "but what is an Energy Network? I have never heard that term before" that makes sense, because we coined the term. See more details in the [Network](network) section.

But let's start at the top.

## Integrations

In order to develop most software in our industry, you need to first integrate with energy devices to get data from them and to be able to control them. Integrating with devices is a complex process that involves understanding the nuances of each manufacturer's API, how to authenticate with it, their specific data formats for telemetry, and their methods of controlling the device.

The Texture Platform simplifies and standardizes all of that by creating a single unified API and data model for each device type which smooths out the quirks of each manufacturer and makes interacting with any manufacturer much simpler.

This enables you to focus on your business rather than the differences in the device API for each manufacturer.

Whereas some other companies in the market offer similar "universal APIs" for integrating with some of the energy devices that the Texture Platform supports, these are just where the Texture Platform begins and not the be all end all. In fact, we can integrate with most other "universal APIs" for energy devices. If you have an existing integration with one of these providers, let us know and we can work with you to get that data ingested into the Texture platform.

In our view, the world would be a much better place with proper standards for the unification of data models across manufacturers and with open protocols for controlling devices and we are working across manufacturers to bring that to reality.

Once this is achieved, every platform that offers only Integrations as a capability will become a commodity and most of the value creation will happen at other layers of the stack so we're planning for that eventuality from the start.

## Retrieving Telemetry Data

We have a whole breakout on [Polling](/docs/devices/polling) so we won't go into depth here but that is how we receive telemetry data from most devices.

When we originally built the Texture Platform, we naively assumed that most manufacturers would support some sort of push mechanism for updates. In reality, almost none do today, so we have built out a rather sophisticated polling capability to retrieve data on a regular interval. 

As mentioned above, we are working with manufacturers to move their APIs to adopt more modern standards and one is a push mechanism like webhooks. The Texture Platform is engineered to take advantage of this from the start, so as soon as a manufacturer supports a push mechanism for telemetry data, we will be able to receive it and work our magic on the data we receive. 

We receive data on a 5 or 15 minute interval for each device (limited by manufacturer APIs). As Texture continues to mature, we endeavor to shift that to tighter schedules, eventually receiving and processing data in real-time.

Once we receive that telemetry data, we leverage a distributed event streaming platform internally to move that data, transform it, warehouse it, and run aggregations against it. 

All of this is seamless to anyone leveraging the Texture platform so you should be able to see clean and up-to-date data for all energy devices in your network in your [Texture Dashboard](https://dashboard.texturehq.com) or via the [Texture API](/api).

## Data Engineering

Not only do we do the basic of standarizing data by device type across manufacturers, but we also take every bit of telemetry data received by the Texture Platform and run it through a series of steps to transform, normalize, and aggregate it in different ways so you can get a view of how things look across your energy network.

This is one of the many ways the Texture Platform provides value beyond the base of pure Integration.

Without us performing all of these steps to clean up and aggregate the data, your company would undoubtedly have to do so yourself to operate your business using all of the Energy Devices in your network. We find it wasteful and duplicative for every company in our industry to do the same thing so we provide it as a core capability of the platform out of the box.

## Signals

Of course data from devices alone is not enough to give you the full picture of a demand-side Energy Network. We need to combine that with data from other sources to get a complete picture of your energy network.

We call this data "Signals" and it takes many forms including, but not limited to:
* Location data
* Utility data
* Weather data
* Marginal carbon emissions data
* Customer billing data

We are constantly adding more signals to the platform so that you can get a complete picture of your energy network.

## Searchability

In addition to all of the Data Engineering work we perform for you, we also maintain robust search capabilities sitting atop Elasticsearch allowing you to slice and dice to sort, filter, group, and search for devices in your [Texture Dashboard](https://dashboard.texturehq.com) or via the [Texture API](/api).

This is yet another powerful capability that we believe almost any company in our industry can leverage but most will not build themselves because it is not a core competency. 

However, this core functionality of the Texture Platform unlocks the capability to render all of your devices on a map, to group devices by any arbitrary query (e.g. show me all of my solar inverters in the state of Texas that are currently generating power) and aggregate data or take action on them.

This is incredibly powerful capability that allows you to find a single device or a group of devices and aggregate data across them (e.g. how much energy is stored across the batteries that match my search) or run commands on them (e.g. stop charging all EVs that are in this demand response zone).

## Rules Engine

Underlying many of the Control capabilities of the Texture Platform is a powerful Rules Engine that allows you to define rules that trigger actions based on the data we receive from your devices or from other data sources (e.g. Utility data or weather).

You can think of it like an if this, then that for your energy devices.

So for example, you could define a rule that says "if the battery is at 100% state of charge, then stop charging it" or "if the solar inverter is generating more than 10kW, then start charging the EVs" or "if it is going to be a cloudy day tomorrow, then charge the batteries to 100% overnight".

This is a powerful capability that allows you to automate many of the tasks that you would otherwise have to do manually.

You can apply rules to a single device or a group of devices, so paired with the ability to search through your energy devices and create groups of them, this Rules Engine is a very powerful tool.
