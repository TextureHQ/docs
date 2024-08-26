---
sidebar_position: 9
---

# Polling

When we first set out to build the Texture Platform, our strong hope was that most devices would have some ability to push data to us in real-time. Our vision was that we would be able to connect to a device and it would push data to us as it changed. 

This would allow us to have a rich and up-to-date view of the state of the world and an excellent understanding of energy usage in real-time.

However, as we built out the platform we quickly discovered that the reality is that most devices are not capable of this, and so we have to reach out to them at a regular interval to get their state updates.

As we continue to work with device manufacturers, we are helping to move them more toward them pushing data to the Texture Platform in real-time rather than requiring us to poll and fetch it.

## What is Polling?
Once a device is connected, we automatically set up a schedule to poll the device for its state updates. 

This is done at a regular interval (generally 5 or 15 minutes) that differs per manufacturer.

The frequency of these updates is constrained a bit by the data sources upstream and how often the manufacturer gets data from the device to their own cloud infrastructure.

In a perfect world the device would push data to us in real-time, but we are continuously working to improve this and shift it more toward real-time.

## Custom Polling Intervals
Today we do not offer a way to customize the polling interval for a device.

If a feature like this would be of interest to you, please let us know via our [Slack community](/docs/support/slack) and we can consider adding it to our roadmap.
