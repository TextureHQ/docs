# Tesla

## Overview
We are using the [official Tesla FleetAPI](https://developer.tesla.com/docs/fleet-api) to connect to Tesla accounts. 

For this connection, a typical OAuth flow is used to authenticate the user and obtain consent to access their Tesla account and thus devices.

## Authorization
In the majority of cases, if the user simply clicks "Select All" when connecting their Tesla account, the necessary authorization scopes will be granted.

However, in cases where the user wants to manually select the authorization scopes, the authorization scopes required would depend on the level of access you would like to have. Specifically what kind of device data you would like to access, vehicles vs. energy products (inverters, powerwalls, etc.).

### User flow
When authorizing the Tesla connection, the user will be prompted to select the authorization scopes they would like to grant to Texture.

![Tesla OAuth Consent Screen](/img/oem/tesla/tesla-oauth-consent-screen.png)

> **Note**: At minimum the user must grant the necessary scopes for reading data from the devices you would like to access. If you would like to execute commands on the devices, they must also grant the necessary scopes for that.

The following sections contain images of the checkboxes required for various levels of access.

#### Vehicles
Minimum required scopes for reading vehicle data:  
![Tesla Vehicle Read Authorization Scopes](/img/oem/tesla/tesla-vehicle-read-authorization-scopes.png)

Additional required scopes for executing commands on vehicles (**at least one of these is required**):  
![Tesla Vehicle Command Authorization Scopes](/img/oem/tesla/tesla-vehicle-command-authorization-scopes.png)

#### Energy Products
Minimum required scopes for reading energy product data:  
![Tesla Energy Product Read Authorization Scopes](/img/oem/tesla/tesla-energy-product-read-authorization-scopes.png)

Additional required scopes for executing commands on energy products:  
![Tesla Energy Product Command Authorization Scopes](/img/oem/tesla/tesla-energy-product-command-authorization-scopes.png)

### Additional resources on authorization scopes
For an overview on Tesla's authorization scopes, please refer to the [official Tesla FleetAPI documentation](https://developer.tesla.com/docs/fleet-api#authorization-scopes).

They additionally have an endpoint listing the authorization scopes required for various endpoints [here](https://developer.tesla.com/docs/scopes.json).

### Insufficent Scopes
If the user does not grant the necessary scopes, you will unfortunately either not be able to access their devices, or not be able to access all the data you would like to.

To rectify this situation, direct the user to update the access the Texture application has to their Tesla account. They can also revoke access their as well and then go through the Connect flow again, ensuring the necessary scopes are granted this time around.

![Manage Texture's Tesla Account Access](/img/oem/tesla/tesla-manage-texture-account-access.png)

1. Send the user to [update the access Texture has to their Tesla account](https://auth.tesla.com/user/revoke/consent?revoke_client_id=f8e24ca22654-4253-abfe-b738cdb57dad)
2. They will be prompted to log in, and then can revoke or update access the Texture app has to their account
3. Afterward, they must go through the Connect flow again to grant the necessary scopes or re-grant access to their account under the new scopes.

## Vehicle Command Execution
The new Tesla FleetAPI has some additional requirements when it comes to executing commands on vehicles.

The user must first grant the scope in the above section to allow executing commands on their vehicles, but additionally must register a virtual key with their vehicle.

The basic process for this is as follows:
1. Open the Tesla app and select a vehicle
2. Visit https://www.tesla.com/_ak/cdn.texturehq.com from their phone or desktop

The user will then be prompted to add the key to their selected vehicle.

After adding the key, Texture can now send commands to the vehicle over the internet on your behalf.

### Troubleshooting
If you are attempting to execute one of the vehicle commands via our api, you may notice when querying for the status of the command, that you receive back a `reason` field indicating the following:
```
vehicle rejected request: your public key has not been paired with the vehicle
```

This indicates that the user has not yet paired our virtual key with their vehicle. The user must follow the steps in the previous section to pair the virtual key with their vehicle before Texture can send commands to it.