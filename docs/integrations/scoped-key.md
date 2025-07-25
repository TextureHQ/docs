---
sidebar_position: 4
title: Scoped Key
---

# Scoped Key

After a user successfully goes through the Connect flow and connects their account from a device manufacturer a scoped key will be created allowing access to data related to this users devices.

If you are using the [Texture Connect SDK](/integrations/texture-connect#texture-connect-sdk) then the scoped key will be returned to your application in the `onSuccess` handler. If you are navigating to the hosted connect flow yourself, we will redirect back to your provided url and add a `texture_scoped_key` query parameter to it, containing the scoped key for the newly connected user/account.

You should store this key securely in your mobile application or system in connection with the user who went through the Connect flow if you want to use it later.

This token can immediately be used from front end applications to retrieve data specific to that user.

## Using the Scoped Key
You can then use this scoped key to make requests to the Texture API to retrieve data related to the newly connected account.

This scoped key will only be able to retrieve data related to the user who went through the Connect flow and connected their account. It will not be able to retrieve data for any other user or perform any other platform actions.

This is an incredibly powerful feature as it will allow you to retrieve data from the Texture API without needing to stand up your own backend server to proxy requests through. You can make requests directly from your front end application to the Texture API.
