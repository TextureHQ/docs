---
sidebar_position: 2
title: Texture Connect
# Display up to h5 headings
# https://docusaurus.io/docs/markdown-features/toc#table-of-contents-heading-level
toc_max_heading_level: 5
---

# Texture Connect

Texture Connect is the name of the flow through which your end users can go through to establish a connection to their devices via Texture. 

![Connect Flow Screenshot](/img/connect-intro-desktop.png)

Currently, we support 3 different methods for connecting a device to the Texture platform via the Connect flow.

1. Link creation via Texture API (see [our open source examples](https://github.com/TextureHQ/examples/tree/main/connect))
1. Texture Connect SDK [JavaScript](https://www.npmjs.com/package/@texturehq/connect-sdk), [React](https://www.npmjs.com/package/@texturehq/react-connect-sdk), or [React Native](https://www.npmjs.com/package/@texturehq/react-native-connect-sdk)
1. Directly via the Texture Dashboard ([Direct link to the Connect Flow](https://dashboard.texturehq.com/sources?tab=Connect+Links))

The method you select depends on how you are looking to integrate the Texture platform into your own application and the level of effort you are able to provide for it.

## Fields

Using the Connect flow is the way you first introduce a device to the Texture platform and as a result, there are a series of fields you need to provide that will allow you track and manage the connected devices later. You will need to provide these items regardless of the manner in which you decide to connect the device.

| field          | required | details                                                                                                                                                                                                                                                                                                                                                   |
|----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `referenceId`  | no      | Any unique identifier to reference this customer in your system. Often a `userId`, an identifier for this device or this site. Anything that you can use to identify and find the connected device(s) later on your end. If an identifier of your own is not supplied we will generate one on your behalf of the form `texture-generated:<uuidv7>`                                                                                                                                         |
| `tags`         | no       | An optional array of tags which can be used for grouping your devices. Could be some kind of identifier for a group on your end (like a groupId) or it could be any other way you group devices (e.g. by location `boston` or `connecticut` or  `flatiron`) whatever you think you may want to aggregate device data by or run batch controls on devices. These will be alterable later by API so you can add and remove tags later. |
| `redirectUrl`  | yes      | This is the url where your user will be redirected after they complete the Connect flow. Generally a link into your application. Could be a web url (e.g. https://mycompany.com/app) or a deeplink into a mobile app (e.g. myapp://device/connected). Note the redirect url will have the `texture_scoped_key` appended to it as a query parameter which, depending on your use case, you may want to store in your app or in your own backend. See the docs for [Scoped Keys](/docs/sources/scoped-key) for more details. |
| `clientName`   | no       | This is what will appear in our Connect flow as your company name which your end user will see. In the above screenshot the company name is "Energy Coffee" and this value would go there. If you do not specify a value here it will default to your Organization name, hence why it is optional. But your use case may be connecting devices on behalf of a client and so we include this as an option for maximum flexibility.                                                                 |                                                                                                                                                                   |
| `manufacturerFilters`   | no       | An optional object allowing different filters to restrict or narrow down the manufacturers available in the connect flow.  <table><thead><tr><th>Name</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>`manufacturers`</td><td>Restricts the manufacturers available to those specified in this list. If only 1 manufacturer is specified, the manufacturers selection/search page in the connect flow will be skipped.</td><td>`["enphase", "tesla"]`</td></tr><tr><td>`deviceTypes`</td><td>Restricts the manufacturers available to those that have devices available of the specified types.</td><td>`["battery"]`</td></tr></tbody></table>     
| `customerInfo`   | no       | An optional object to allow passing in information related to the customer for which the connect link session is for. Information supplied here will pre-populate info in the customer collection form of the connect flow. If you supply a valid first name, last name, email, and location we will bypass this form for the customer. <table><thead><tr><th>Name</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>`firstName`</td><td>The first name of the customer going through the connect flow.</td><td>`John`</td></tr><tr><td>`lastName`</td><td>The last name of the customer going through the connect flow</td><td>`Doe`</td></tr><tr><td>`email`</td><td>Email associated with the customer going through the connect flow.</td><td>`example@example.com`</td></tr><tr><td>`phone`</td><td>Phone number associated with the customer going through the connect flow.</td><td>`555-555-0100`</td></tr><tr><td>`location`</td><td>A nested object that houses information related to the customer site or location. If this is supplied, then all fields must be supplied, partial information is not accepted. More details on structure cna be found in the [api reference](/api#/paths/connections/post)</td><td><br />```{"streetOne": "1600 Pennsylvania Avenue NW", "city": "Washington","state": "DC", "postalCode": "20500", "country": "US" }```</td></tr></tbody></table>                                                                                                                                                                              |
| `customerId`   | no       | An existing identifier for a customer of yours in the Texture platform. If this is supplied, it takes priority over any information supplied in the optional `customerInfo` object. When you create a connect link a `customerId` will be returned identifying the customer the connect link is for. This returned identifier can be used or provided in this field later to create another connect link for the customer.                                                                                                                                                                             |


## Link Creation via Texture API

Link creation can be done via the Texture API using one of your [API Keys ](/docs/api/keys).

[Texture API > Post Connections](/api#/paths/connections/post)

## Texture Connect SDK

Our Connect SDK provides a bit less configurability, but is the easiest way to get started with connecting devices to the Texture platform for your Organization.

### Installation

#### Javascript/Typescript

Simply [install it from NPM](https://www.npmjs.com/package/@texturehq/connect-sdk)

```
$ npm install @texturehq/connect-sdk
```

or if you prefer Yarn:

```
$ yarn add @texturehq/connect-sdk
```

Including via CDN also works (recommend pinning a specific version in this case instead of `latest`). A `Texture` property will be added to the global window object.

```html html
<script src="https://unpkg.com/@texturehq/connect-sdk@latest/dist/connect-sdk.iife.js"></script>
```

and then [use it](#usage-javascript)!

#### React

Simply [install it from NPM](https://www.npmjs.com/package/@texturehq/react-connect-sdk)

```
$ npm install @texturehq/react-connect-sdk
```

or if you prefer Yarn:

```
$ yarn add @texturehq/react-connect-sdk
```

and then [use it](#usage-react)!

#### React Native

Simply [install it from NPM](https://www.npmjs.com/package/@texturehq/react-native-connect-sdk)

```
$ npm install @texturehq/react-native-connect-sdk
```

or if you prefer Yarn:

```
$ yarn add @texturehq/react-native-connect-sdk
```

and then [use it](#usage-react-native)!

### Usage

#### Javascript/Typescript {#usage-javascript}

```javascript javascript
import { createConnectSession } from "@texturehq/connect-sdk-web";

const texture = createConnectSession({
  connectApiKey: "<connect-api-key>",
  connectOptions: {
    referenceId: "<reference-id-from-your-system>",
    clientName: "Name for your application",
    redirectUrl: "https://your-application.com/redirect",
    tags: ["tag1", "tag2"],
    manufacturerFilters: { manufacturers: ['honeywell', 'daikin'] },
    customerInfo: {
      email: "example@example.com",
      phone: "555-555-0100",
      firstName: "John",
      lastName: "Doe",
    },
  },
  onSuccess: ({ scopedKey }) => {
    // The scopedKey returned is a string that can be used to make requests to Texture API
    // to retrieve data related to the newly connected account
  },
  onError: ({ type, reason }) => {
    // The error object contains a type and reason
    // type is identifier for the type of error that occurred
    // reason is a string that provides more information about the error
    // type 'popup-blocked' means that the popup window was blocked from opening
    // type 'popup-closed' means that the popup window was closed before the connection was established
  },
});

// Open the popup window
texture.open();

// You can also pass in options when opening the popup window
texture.open({
  width: 500,
  height: 600,
});

// Close the popup window
texture.close();

// Get the current link/connect url
console.log(texture.url);

// Get the current scoped key (only available after a successful flow is completed)
console.log(texture.scopedKey);
```

#### React {#usage-react}

The Texture Connect SDK exposes a `useCreateConnectSession` hook which will handle much of the process for creating a link session.

It returns a method called "open" which you can call from your React code whenever you would like to open a pop-up which will guide the user through connecting their device to your application via the Texture platform.

```jsx
import { useCreateConnectSession } from "@texturehq/react-connect-sdk";

function App() {
  const { open } = useCreateConnectSession({
    connectApiKey: "<connect-api-key>",
    connectOptions: {
      referenceId: "<reference-id-from-your-system>",
      clientName: "Name for your application",
      redirectUrl: "https://your-application.com/redirect",
      tags: ["tag1", "tag2"],
      manufacturerFilters: { manufacturers: ['honeywell', 'daikin'] },
      customerInfo: {
        email: "example@example.com",
        phone: "555-555-0100",
        firstName: "John",
        lastName: "Doe",
      },
    },
    onSuccess: (session) => {
      console.log(session);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="card">
        <button onClick={() => open()}>Open Texture</button>
      </div>
    </>
  );
}

export default App;
```

#### React Native {#usage-react-native}

The Texture Connect SDK exposes a `TextureConnect` component which will handle much of the process for creating a link session.

Wrap `TextureConnect` around a component, and your component will become a button that opens the Connect flow from your React Native code. It displays as a popover which will guide users through connecting their devices to your application via the Texture Platform.

It's worth noting you should supply the `redirectUrl` to the `TextureConnect` props via `connectOptions`, this should be the custom URL scheme of your mobile app. e.g: `facebook://`

```jsx
import { TextureConnect } from '@texturehq/react-native-connect-sdk';

// ...

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextureConnect
          connectApiKey="<YOUR_CONNECT_API_KEY>"
          connectOptions={{
            clientName: 'Name for your application',
            referenceId: '123',
            redirectUrl: 'example://',
            manufacturerFilters: { manufacturers: ['honeywell', 'daikin'] },
            customerInfo: {
              email: "example@example.com",
              phone: "555-555-0100",
              firstName: "John",
              lastName: "Doe",
            },
          }}
          onError={(type, reason) => console.log(type, reason)}
          onSuccess={(scopedKey) => console.log("Texture Scoped Key", scopedKey)}
        >
            <Text>Tap here to connect a device.</Text>
        </TextureConnect>
    </GestureHandlerRootView>
  );
}
```

### Examples

Check out some examples in our [open source repository](https://github.com/TextureHQ/examples/tree/main/connect).

> 📘 What if I have the user or device credentials already?
> 
> Some manufacturers and devices require this authentication flow to be completed by end users to connect to the device and others do not which is why we provide this flow. 
> 
> However, it is quite possible that you already have user credentials or you have direct access to credentials through the manufacturer. 
> 
> We can work with you directly to ingest those credentials or use your credentials with the manufacturer, please contact us and we can help!
