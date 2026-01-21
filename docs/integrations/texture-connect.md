---
sidebar_position: 3
title: Texture Connect
# Display up to h5 headings
# https://docusaurus.io/docs/markdown-features/toc#table-of-contents-heading-level
toc_max_heading_level: 5
---

# Texture Connect

import { Subtitle } from '@components/Subtitle';

<Subtitle>Authorize consumer device connections through secure OAuth flows</Subtitle>

**Texture Connect** enables your customers to securely authorize access to their energy devices through OAuth flows. This is the primary method for connecting individual consumer devices like home batteries, EVs, and smart thermostats to your application. 

![Connect Flow Screenshot](/img/connect-intro-desktop.png)

## How It Works

When a customer connects their device through Texture Connect, they:

1. **Authorize Access** - Grant permission to access their device data through the manufacturer's OAuth flow
2. **Complete Setup** - Provide contact information and device preferences
3. **Receive Access** - Your application gets a scoped key to access their device data

## Why Texture Connect is Different

Texture Connect provides **customer-verified data accuracy** through our unique authorization flow, built on official OEM partnerships rather than reverse engineering or web scraping:

### Customer-Confirmed Information

During the Connect flow, customers actively confirm their:
- **Contact Information** - Name, email, phone number
- **Site Details** - Physical address and location data
- **Device Preferences** - Which devices to connect and access permissions

This customer verification ensures that the [Sites](/platform-concepts/sites) and [Contacts](/platform-concepts/contacts) created in your Texture workspace contain **accurate, up-to-date information** that customers have explicitly confirmed.

### Automatic Data Resolution

Once customers complete the flow, Texture automatically:
- Creates or updates Contact records with verified customer information
- Creates or updates Site records with confirmed location data
- Links connected devices to the appropriate Site and Contact
- Provides you with clean, structured data ready for your energy management applications

This approach ensures reliable, high-quality data that you can trust for your energy management applications.

## Integration Methods

Choose the integration method that best fits your application:

### 1. **Texture Connect SDK** (Recommended)
Easiest way to get started with pre-built components:
- **[JavaScript/TypeScript](https://www.npmjs.com/package/@texturehq/connect-sdk)** - For web applications
- **[React](https://www.npmjs.com/package/@texturehq/react-connect-sdk)** - For React applications  
- **[React Native](https://www.npmjs.com/package/@texturehq/react-native-connect-sdk)** - For mobile apps

### 2. **Texture API**
For custom implementations with full control over the flow. See [our open source examples](https://github.com/TextureHQ/examples/tree/main/connect).

### 3. **Dashboard Direct Links**
For testing or manual connections, use the [Texture Dashboard](https://app.texturehq.com) and navigate to the Connect section.

## Configuration Fields

When creating a Texture Connect session, you'll need to provide these configuration fields to track and manage the connected devices:

| Field | Required | Description |
|-------|----------|-------------|
| `redirectUrl` | Yes | This is the url where your user will be redirected after they complete the Connect flow. Generally a link into your application. Could be a web url (e.g. https://mycompany.com/app) or a deeplink into a mobile app (e.g. myapp://device/connected). Note the redirect url will have the `texture_scoped_key` appended to it as a query parameter which, depending on your use case, you may want to store in your app or in your own backend. See the docs for [Scoped Keys](/integrations/scoped-key) for more details. |
| `referenceId` | No | Any unique identifier to reference this customer in your system. Often a `userId`, an identifier for this device or this site. Anything that you can use to identify and find the connected device(s) later on your end. If an identifier of your own is not supplied we will generate one on your behalf of the form `texture-generated:<uuidv7>`. |
| `tags` | No | An optional array of tags which can be used for grouping your devices. Could be some kind of identifier for a group on your end (like a groupId) or it could be any other way you group devices (e.g. by location `boston` or `connecticut` or `flatiron`) whatever you think you may want to aggregate device data by or run batch controls on devices. These will be alterable later by API so you can add and remove tags later. |
| `clientName` | No | This is what will appear in our Connect flow as your company name which your end user will see. In the above screenshot the company name is "Energy Coffee" and this value would go there. If you do not specify a value here it will default to your Organization name, hence why it is optional. But your use case may be connecting devices on behalf of a client and so we include this as an option for maximum flexibility. |
| `customerId` | No | An existing identifier for a customer of yours in the Texture platform. If this is supplied, it takes priority over any information supplied in the optional `customerInfo` object. When you create a connect link a `customerId` will be returned identifying the customer the connect link is for. This returned identifier can be used or provided in this field later to create another connect link for the customer. |

### Advanced Configuration Objects

#### `manufacturerFilters`

An optional object allowing different filters to restrict or narrow down the manufacturers available in the connect flow.

| Property | Description | Example |
|----------|-------------|---------|
| `manufacturers` | Restricts the manufacturers available to those specified in this list. If only 1 manufacturer is specified, the manufacturers selection/search page in the connect flow will be skipped. | `["enphase", "tesla"]` |
| `deviceTypes` | Restricts the manufacturers available to those that have devices available of the specified types. | `["battery"]` |

#### `customerInfo`

An optional object to allow passing in information related to the customer for which the connect link session is for. Information supplied here will pre-populate info in the customer collection form of the connect flow. If you supply a valid first name, last name, email, and location we will bypass this form for the customer.

| Property | Description | Example |
|----------|-------------|---------|
| `firstName` | The first name of the customer going through the connect flow. | `"John"` |
| `lastName` | The last name of the customer going through the connect flow. | `"Doe"` |
| `email` | Email associated with the customer going through the connect flow. | `"example@example.com"` |
| `phone` | Phone number associated with the customer going through the connect flow. | `"555-555-0100"` |
| `location` | A nested object that houses information related to the customer site or location. If this is supplied, then all fields must be supplied, partial information is not accepted. More details on structure can be found in the [API Reference](/api). | `{"streetOne": "1600 Pennsylvania Avenue NW", "city": "Washington","state": "DC", "postalCode": "20500", "country": "US"}` |


## Quick Start: Texture Connect SDK

The Texture Connect SDK is the easiest way to get started with consumer device connections. It provides pre-built components that handle the OAuth flow for you.

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

<br/>

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

<br/>

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

## Advanced: Texture API

For custom implementations with full control over the flow, use the Texture API directly. [Visit our API Reference](/api) to learn more about creating connections.

## Alternative: Direct Credentials

> 📘 **Already have customer credentials?**
> 
> If you already have customer credentials or direct access to manufacturer APIs, we can work with you to ingest those credentials directly. This bypasses the OAuth flow entirely.
> 
> [Contact us](https://www.texturehq.com/contact-us) to discuss direct credential integration options.
