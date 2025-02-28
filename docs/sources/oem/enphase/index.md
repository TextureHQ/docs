# Enphase

## Overview
We are using the [Enphase API v4](https://developer-v4.enphase.com/) to connect to Enphase accounts. 

For this connection, a typical OAuth flow is used to authenticate the user and obtain consent to access their Enphase account and thus devices.

## Device Updates
One quirk with Enphase systems is that they don't always seem to update their data in real-time or on a regular cadence.

Our [platform polls](/docs/devices/polling) the Enphase API every 15 minutes for new data, but the Enphase system may not be reporting any new data yet. When we do receive new data, we will update the device(s) in Texture with the new data and backfill any missing data since the last reported data point for the associated Enphase device(s).

## Battery Commands
If you are using our [set operating mode command](/docs/commands#set-operating-mode) with Enphase batteries, there is one main thing to be aware of.

There is a limitation with the Enphase API where we currently don't have a way to manipulate or adjust the battery system's tariff or rate settings. This means that while you may want to export energy to the grid during a specific time of day, for example, the battery system's tariff settings may not align with this.

In the scenario above, where you want to export to the grid during potentially non-peak hours. While the battery may not align and export to the grid, we will set it up such that it at least discharges the battery to cover home loads until the target reserve level is reached. Curtailing more expensive grid power usage still during this time.

If you enroll your users in our grid services program, we can control the battery system to optimize for grid services. See the [Enphase Grid Services](#enphase-grid-services) section below for more information.

## Enphase Grid Services
In cases where your organization needs or desires features like off-peak grid export, we can work with you to allow enabling your customers to enroll their Enphase systems in one of our grid services programs.

Once enabled for your organization, you can start to send your customers your unique enphase authorization link to enroll their Enphase system(s).

### How to enroll your customers in a grid services program
The basic process for your customer's to enroll in a grid services program is as follows:
1. Your customer first goes through the connect flow as normal, connecting their Enphase account to Texture.
2. Send them an authorization link to enroll in one of our grid services programs.

You can chain these flows together as described above, by constructing a connect link with the `redirectUrl` set to the enphase grid services authorization link. Then the `redirectUrl` query parameter in the enphase grid services authorization link can be set to a final redirect url to navigate to after the customer completes the grid services enrollment.

> **Note:** After the customer completes step 1 you will still be able to monitor and send commands to their Enphase system(s). The grid services program will only start to take effect once the customer has enrolled and allows more advanced control of the battery system.

### How to find your organization's authorization url
The base enphase authorization link for your organization will look like this:
```
https://enphase.connect.texturehq.com/<organization-token>
```

You can find your organization's unique url (if enabled) programmatically by making a `GET` request to our [organization endpoint with a valid API key](/api).

The response will contain your organization's base enphase authorization link, if enabled, under the `oemSpecifics.enphase.gridServicesAuthorizationUrl` path in the response.

### Query Parameters
The following table details the query parameters that can be used with the enphase authorization link.

| Name | Required? | Description                                                                                                                                                                   |
|-----------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| programSlug     | yes       | Unique identifier for the Enphase Grid Services program to enroll the user in. Typically, a state code for states where we have available programs.                            |
| referenceId      | yes        | Unique identifier in your system to tie to the user enrolling in Grid Services. This should ideally be the same id utilized during the Texture Connect flow. |
| clientName      | no        | Allows adjusting the name that is displayed on the intro screen of the Enphase Grid Services enrollment flow. If not provided, it will fall back/use your organization's name. |
| redirectUrl      | no        | Allows you to set a redirect url to navigate to when the user clicks "Continue" after completing their Enphase Grid Services enrollment. |


### Programs
Enphase Grid Services programs are per state, and we currently have programs available in the following states:

| Program State | Program Slug |
|---------------|--------------|
| California    | CA           |
| Texas         | TX           |

> **Note:** If there is a mismatch between the state of the Enphase system and the state of the grid services program, the system will not be able to enroll in the program.

### Examples
Let's say your organization's token is `my-org-token` and you want to enroll a customer in the California grid services program. The authorization link would look like this:
```
https://enphase.connect.texturehq.com/my-org-token?programSlug=CA
```

If you also wanted to adjust the name displayed on the intro screen to be `My Company`, the authorization link would look like this:
```
https://enphase.connect.texturehq.com/my-org-token?programSlug=CA&clientName=My%20Company
```

### Battery Commands
Once a customer's Enphase system is enrolled in a grid services program, we will be able to control the battery system to optimize for grid services. This means that we will be able to control the battery system to export to the grid during off-peak hours, for example.

There are some caveats or things to be aware of:
- Commands won't take effect for at least 1 minute after they are sent.
- Commands at maximum will last up to 4 hours.
- If the target reserve level is reached before the command expires, the battery system will return to its operation mode before the command was sent.
- The lowest target reserve level that can be set is 10%.
