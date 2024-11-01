---
sidebar_position: 3
title: Email
---

## Overview
We currently support sending email to a single recipient.

> We do not have any plans to support sending email to multiple recipients at this time, however if it is important to you, please let us know and we can add it to our roadmap. In the meantime, you can set up a Google Group for your team and send email to that group which is a workaround for multiple recipients.

We also limit the types of events you can receive via email to prevent an overwhelming volume of email.

Currently supported event types:

- `device.discovered`
- `device.disconnected`

We can add more event types to the list, just let us know if there are any you think would be useful to receive via email. 

But `device.updated` for example is not currently supported since that would generate a lot of email (as we get a device telemetry update every few minutes for every connected device so it would be far too much to support via email).

## Use cases

* **Operations and Maintenance** - Send an email when a new device comes online or goes offline. Useful when out in the field or on-site.