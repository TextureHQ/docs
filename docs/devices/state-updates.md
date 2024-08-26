---
sidebar_position: 3
---

# State Updates

We want to get information from the Energy Devices that are connected to the Texture Platform and make that information available to you so you can monitor the devices on platform, make decisions based on it, and possibly take action based on it.

We call the bundle of telemetry data/information associated with that update a "State Update" because it represents the state of the device at that moment in time. This state can be anything from the current power output of a solar inverter, to the current fan mode of a thermostat, to the current charge of a battery or electric vehicle.

In a perfect world these updates would come in real-time or near real-time. In practice, most of these updates come in at 5 or 15 minute intervals based on the manufacturer, often through [polling](/docs/devices/polling) since most manufacturers don't yet support real-time push updates. We try to get this telemetry data as often as possible, but are hamstrung by manufacturer limitations. 

> If you are a manufacturer and we're not chatting already, we'd love to work with you to move more toward push/real-time updates to reduce the need for polling! Please [contact us](https://www.texturehq.com/contact-us) if we don't have an open thread already.

## Real-time ETL

For every state update we receive, we take the following steps in nearly real-time via our event-driven system:

1. We normalize all of the data taking the disparate structures and units from manufacturers and converting them all into standard units
2. We then map that normalized data to the [Texture standard data models](/docs/devices/data-models/overview).
3. We then enrich them with other sources of data, where applicable, possibly including weather data, marginal carbon emissions data, pricing data, etc.
4. If enabled, we will pair this behind-the-meter demand-side production/consumption/storage with meter data
5. Then after all of this data transformation, we take that state update and:
   1. store the state update in our database (so that it can be retrieved via our REST and GraphQL APIs)
   2. store it in Elasticsearch (so it can be used for faceted queries and analytics and aggregations)
   3. store it in our data warehouse (for more intensive analyticts and for reverse ETL)
   4. push it out via any [Destination](/docs/destinations/overview) you have configured so you can use it in your own systems or analytics
6. And we maintain a history of state updates for eath device so that you can see and understand its energy usage over time. This is a key part of the Texture Platform and is used to power many of our features.
