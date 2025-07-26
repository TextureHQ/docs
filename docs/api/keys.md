---
sidebar_position: 2
---

# Keys

Today we support three different API Keys on the Texture Platform.

Two of which you can generate yourself and one which is generated and returned to you when you create a Connect link for an end user and they connect a device.

Feel free to create as many API Keys as you need for your use case.

We suggest creating a new key for every context in which you'll be using one so that, in the event that your system gets compromised (which we hope doesn't happen!) you can revoke that single key and not have an impact on any of your other systems. If you use the same key in many contexts and that one key is compromised, you may have more of your systems compromised and you'll have a much longer slog trying to cycle it.

## Server keys
 
You can create these yourself and these are keys that are kept secret and intended to be used only for communication from your backend services to Texture's APIs. These can be used to retrieve device information, to perform actions on devices, and to perform meta functions (like configuring the Texture platform in an automated way).

As their name implies they must be kept secret, so they are never to be used in any context that is user-facing or client-side. This includes on your website, from a mobile app, etc. Texture will do its best to monitor and notice use cases like this and notify you and revoke API keys that may have been used in this manner (as they could compromise the systems of your users).

## Connect keys

These keys are alright to be used publicly. Again, you can create these yourself. 

They can be used in websites, mobile apps, and other front end applications. They are primarily used in connection with our Connect interface for the end user to connect their device(s) and thus you can use them to [create a connect link](/integrations/texture-connect).

They cannot be used to run any commands on any device, to retrieve any device data, or do pretty much anything else. They are only for creating Connect links. In this way they are safe to put into a web application, mobile application, etc. because they cannot be used to do anything destructive or to access any sensitive information.

## Scoped keys

A Scoped key is not an API key you can create through the traditional means in the dashboard. These are special keys that are created and returned when you create and share a Connect link with an end user and they connect their device.

When you authenticate by creating a link session, you will receive back to your redirect url as a query parameter, a scoped key for the user, the name of this query parameter is `texture_scoped_key`. 

This scoped key is keyed only to allow access to that specific users' devices and so it is ideal for use in a client application. If this key is used to access any other device that is not this user's, it will get a 403 response.

More on [Scoped Keys](/integrations/scoped-key)
