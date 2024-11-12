---
sidebar_position: 2
---

# Webhooks

## Introduction

This way, you can ensure that your application always has the most up-to-date information without the need for frequent polling of the API. The following documentation details the configuration, usage, and capabilities of Texture's Webhook functionality.

Each Webhook is associated with a specific Workspace in the Texture platform. This ensures that the data sent to the Webhook is specific to the devices within that Workspace. As an example, if you have separate Workspaces for `staging` and `production`, the Webhooks will only send updates relevant to their associated environments.

We have sample applications written in some common languages which are available [here](https://github.com/TextureHQ/examples/tree/main/destinations/webhooks) in our open source examples repository.

# Configuring webhooks

Developers have the flexibility to set up multiple Webhooks as per their requirements. Here's a breakdown of the configuration options available:

1. **Label**: Assign a recognizable name to each Webhook for easier differentiation
   1. Example: "Staging Webhook" or "Production Alerts"
2. **URL**: Define the endpoint where the Webhook should send the POST request
   1. Example: "\<https://yourdomain.com/webhook-endpoint"\>
3. **Headers:** Optional. Configure necessary headers, often used for authentication or other specific requirements. Texture will append these headers to the POST request when sending the Webhook.
   1. Example: `{ "Authorization": "Bearer YOUR_TOKEN" }`
4. **Configuration**:
   1. At launch, our Firehose configuration pushes every event from the associated Workspace to the Webhook
   2. In subsequent versions, you'll be able to filter events either based on event type or specific device types so you will have a lot of power and control to specify which types of events go where
5. **Secret**:
   1. Optional, but you can provide any string secret to us
   2. Before we send the webhook, we will take the payload and with that and this secret we will generate a signature such that you can verify that the payload came from Texture and was not tampered with along the way
6. **Schedule:**
   1. By default, the Webhook operates in real-time. This means that every event triggers an immediate push
   2. Future implementations will allow batching. Developers can then opt for a cadence, ranging from once per minute to once per day

# Payloads

When your endpoint receives a Webhook POST request, ensure to:

1. **Verify the source:** Always check the incoming headers or payload attributes to confirm the request comes from Texture. [More details here](#verification-of-payloads)
2. **Acknowledge receipt:** Respond to the Webhook with a 200 OK status code promptly to acknowledge receipt. If not acknowledged, Texture may attempt to resend the data
3. **Process data asynchronously:** Given the potential volume of data, it's advisable to process the Webhook data in the background, especially if data processing can be time-consuming

The payload that your endpoint will receive will vary a bit depending on the [Event Type](event-types.mdx) and the [Device Type](devices/data-models/overview.md).

However, there are some commonalities that all share:

1. **type:** The flavor of event you are receiving. See more details on the [Event Types](event-types.mdx) detail page, but this will be a string which looks like `device.created`
2. **deviceId:** The id of the device for which this event applies
3. **organizationId:** The organization for which this payload is relevant. Useful in case you send multiple organization webhooks to the same endpoint
4. **workspaceId:** The workspace for which this payload is relevant. Useful in case you send webhooks from multiple workspaces to the same endpoint

> 🤔 
> 
> You may notice that [Event Types](event-types.mdx)follow the convention of `noun.verb` to specify what kind of thing it is referring to and what happened to that thing whereas the [Command Types](/docs/commands) follow the convention of `noun:verb` to specify an action to carry out on a device.
> 
> This is intentional! We were thinking of you dear developer when we came up with these conventions . We thought it'd be far easier for you if you could distinguish, at a glance, between the Event and Command without having to clutter up the structure or having to prefix every item with stream or act or something.
> 
> **If you see periods, you know it's an Event and if you see colons, you know it's a Command.**

## Verification of payloads

At Texture, we prioritize the security and integrity of the data we send to your applications. To ensure that the webhooks you receive are genuinely from us and haven't been tampered with, we include a signature header in every webhook POST request we send.

### How the Signature is Created

The signature is generated using an HMAC (Hash-based Message Authentication Code) computed from the payload of the webhook and a `secret` that you provide or we share with you (it's optional when you configure a Stream Destination, if you don't provide one we create a random one for you). This `secret` can be any string, we are not discerning, but we use it to generate the signature. Specifically, we utilize the SHA-256 hash algorithm for this HMAC calculation.

### How to Verify the Signature on Your End

1. **Capture the Signature:** Grab the `Texture-Signature` value from the headers of the incoming POST request. This value represents the signature we computed.
2. **Compute the HMAC:** Using the payload of the incoming request and your secret key, compute the HMAC in the same way we do. Here's a sample code in TypeScript/JavaScript: 
   ```javascript
   import crypto from 'crypto';
   const computeHMAC = (payload, secret) => {  
     const hmac = crypto.createHmac('sha256', secret);  
     hmac.update(JSON.stringify(payload));  
     return hmac.digest('hex');  
   };
   ```
3. **Compare the Signatures:** The HMAC you've just computed should match the `Texture-Signature` header value. If they're identical, the webhook is verified. If they're different, the webhook may have been tampered with or didn't originate from Texture.

> 📘 Texture-Signature or texture-signature?
> 
> When we apply the `Texture-Signature` header we sent it across with casing exactly like that. 
> 
> However, the actual spec for them indicates that HTTP headers are case insensitive. So it is very likely that your server may convert them to all lowercase so you are actually looking for a `texture-signature` header. 
> 
> This can be a gotcha especially if you are inspecting headers and using `"Texture-Signature"`as a key because it may actually be converted to lowercase in your server (Express and Fastify for Node.js both do this).
> 
> Same goes for any custom headers you provide us with. We will send them back to you, but due to the nature of the HTTP spec and the case insensitivity of headers, it's possible you'll get them back as "different" from what you provided because some link in the chain may convert them to all lowercase.
> 
> Anyway, just giving a helpful tip here in case you aren't able to find the headers as expected -- they're there.

### Important Considerations

**Timing Attacks**: When comparing the HMAC you computed with the `Texture-Signature` header value, it's crucial to use a constant-time comparison function instead of the regular equality (===) check to prevent timing attacks. This gets rather esoteric so we will skip an in-depth description of a timing attack here but you can see an example of a constant-time comparison function in our open source examples repository. We do also include a header `Texture-Timestamp` which was the exact time we sent the request from our servers so you can verify that a webhook has been timely delivered (and it's good practice to ignore any that are not).

**Payload Format**: Ensure you use the raw payload for the HMAC computation. The order and whitespace matter. Typically, reading the raw request body from the incoming request, without parsing or manipulating it, is the way to go.

By following these steps and always verifying the webhook signature, you can trust that the data you're receiving is securely and directly from Texture.

## Don't forget!

Remember, setting up Webhooks requires careful consideration of data volume, processing time, and error handling. Always monitor your Webhooks for any anomalies or potential bottlenecks.

## Testing Webhooks Locally

Since webhooks are sent from the Texture servers running in the cloud, you can not set a webhook destination as `http://localhost` or `http://127.0.0.1` or they will not be delivered. However, as a developer you likely have a need to test a webhook hitting your local machine.

This is where a development tool such as [ngrok](https://ngrok.com/) can come in handy.

ngrok (and tools like it) will spin up a proxy that will allow you to expose ports on your local machine to the internet in a way that is addressable externally.

Then you can create a webhook in the Texture dashboard, specify the ngrok url and Texture will now be able to hit your local machine which you can use for testing.
