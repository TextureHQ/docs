---
sidebar_position: 4
title: SMS
---

## Overview
We currently support sending SMS messages to a single recipient.

SMS messages are disabled for most organizations out of the box due to the cost, especially if they are misconfigured.

> We use Twilio to send SMS messages and they charge us by the message so we have to be conservative with how many we send. 

Contact our team to discuss enabling SMS for your organization.

> We do not have any plans to support sending SMS to multiple recipients at this time, however if it is important to you, please let us know and we can add it to our roadmap.
 
We also limit the types of events you can receive via email to prevent an overwhelming volume of email.

Currently supported event types:

- `device.discovered`
- `device.disconnected`

We can add more event types to the list, just let us know if there are any you think would be useful to receive via SMS. 

But `device.updated` for example is not currently supported since that would generate a lot of SMS messages (as we get a device telemetry update every few minutes for every connected device so it would be far too much to support via SMS).

## Use cases

* **Operations and Maintenance** - Send an SMS message when a new device comes online or goes offline. Useful when out in the field or on-site.