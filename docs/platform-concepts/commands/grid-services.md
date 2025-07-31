---
sidebar_position: 17
---

import { BackLink } from '@components/BackLink';

<BackLink to="/platform-concepts/commands" label="Commands" />

# Grid Services

Texture's Grid Services provide advanced capabilities through partnerships with OEMs.

We've established strong relationships with OEMs and we also have direct support channels with these OEMs, in many cases backed by SLAs.

This allows us to provide rock solid support for energy devices on the grid that have a need for more advanced communication and control capabilities.

## Overview

Grid Services are a specific type of control that allows you to have devices interact with the grid in a more direct way.

The most common use case for Grid Services is exporting energy to the grid from a battery on the Texture platform during a time that is advantageous for a variety of reasons.

Use cases for Grid Services include:

- Exporting energy to the grid from a battery on the Texture platform during a time of high demand to help grid resilience
- Importing energy from the grid to a battery on the Texture platform during a time of low demand

These capabilities are useful for:

- Utility Companies looking to balance the grid
- VPPs, REPs, and CCAs that are able to take advantage of wholesale energy arbitrage
- CCAs, utilities, and other organizations looking to offer rebates for participating in activities that help grid resilience
- Any party looking to participate in demand response programs (like [DSGS in California](https://www.energy.ca.gov/programs-and-topics/programs/demand-side-grid-support-program))
- Parties looking to take advantage of pricing opportunites in deregulated markets like ERCOT

## Setup

In order to setup Grid Services, you will need to work with your Texture Support Team to enable Grid Services for your Organization.

If you do not already have a dedicated support contact, please reach out to us at support@texturehq.com and we will help you get set up.

## Enrollment

Once you have enabled Grid Services for your Organization, you will be able to enroll devices into the Grid Service.

Grid Services have their own enrollment process separate from the device enrollment process for [Enphase](/integrations/manufacturers/enphase).

Texture will automatically enroll your devices into the Grid Services for other manufacturers (e.g. SolarEdge) as they are added via the Connect flow once you have enabled Grid Services for your Organization.

Enrollment is unfortunately not an instantaneous process as the OEMs need time to test the devices, configure them, and ensure that they are ready for use before they are fully ready to be used in Grid Services.

If you have configured a [Destination](/platform-concepts/destinations/) for your devices, you will see enrollment webhook events fired [here](/platform-concepts/events).

## Grid Service Commands

We have tried our best to make the process of sending Grid Service Commands as easy as possible.

As a result, they are using the same set of [Commands](/platform-concepts/commands) that are used for all other device actions, just with a few extra required fields.

Adding `enableGridInteraction: true` to a Command will tell the Texture platform to send the command to the device manufacturer's Grid Service, if possible.

## Storm Guard

Note that most OEMs have a feature called "Storm Guard" which is a setting on a battery that will instruct it to charge up in the event of a weather event.

You can see more about reading the current state of Storm Guard [here](/platform-concepts/data-models/batteries).

While a Storm Guard is active, the battery will not participate in Grid Services, even if a Grid Service Command is sent.

