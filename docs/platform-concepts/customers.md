---
---

# Customers

**Customers** represent real people (or organizations) who have one or more **Sites** and **Devices** connected to the Texture Platform. Once a Customer is linked, Texture can aggregate their energy usage across all of their Sites and Devices, providing a unified view and enabling deeper insights in both the Texture Dashboard and via API.

## Why Customers?

By creating a **Customer profile** in Texture, you can:
- Link multiple Sites and Devices to a single individual or entity.
- View **aggregate energy usage** and metrics (consumption, production, emissions, etc.) across all of their Devices.
- Centralize contact info (name, email, phone) and **utility details** (utility territory, wholesale market, ISO).
- Track relevant events in a single **Activity Feed** (e.g., device disconnections or issues).
- Simplify device and usage management through the **API** or the **Texture Dashboard**.

## Customer Profile

A Customer Profile consists of:
- **Identifying Info**: first and last name, email address, phone number.  
- **Links**: references to any Sites or Devices they own.  
- **Location Data**: if relevant, we store address details (either from Sites or direct Customer records).  
- **Reference ID**: an optional unique identifier in your system, allowing you to map internal records to the Customer in Texture.

Once associated with a Site, a Customer's **energy usage** and activity logs become accessible under their profile. If they own multiple Sites (e.g., primary residence and vacation home), Texture aggregates the usage from all those Sites to provide a holistic view.

## Dashboard View

When you open a Customer in the **Customers** section of the Texture Dashboard, you'll see:

1. **Customer Details**:  
   - Name, email, phone  
   - Linked Site(s) and address(es)  
   - Utility service territory, wholesale market, or ISO if applicable  

2. **Energy Usage**:  
   - An aggregate usage chart that combines data from all their connected Sites and Devices  

3. **Devices**:  
   - A list of the Customer's Devices with their real-time status (e.g., a battery's charge level, a thermostat's operating mode)

4. **Activity Feed**:  
   - Key events related to that Customer's Sites or Devices, like "Device Disconnected" or "Device Updated."

5. **Connect Sessions**:  
   - If the Customer used [Texture Connect](/integrations/texture-connect) to onboard their Devices, you can view any open or recent Connect sessions

All these details help you manage your customers' energy data in one central location.

## Managing Customers via API

You can also work with Customers through the **Texture REST API**. Key endpoints include:

- **List all Customers**:
  ```http
  GET /customers
  ```
  Returns all Customers in your Workspace (with optional pagination or filtering by `referenceId`).

- **Retrieve a single Customer**:
  ```http
  GET /customers/{id}
  ```
  Gets detailed info for a specific Customer, including their Devices and connections to Sites.

- **Delete a Customer**:
  ```http
  DELETE /customers/{id}
  ```
  Removes a Customer record from Texture.

- **Fetch Customer Sites**:
  ```http
  GET /customers/{id}/sites
  ```
  Retrieves all Sites associated with that Customer.

When a Customer has been created (or discovered) in Texture, linking Sites and Devices happens automatically if there's matching location or reference data. You can also manually associate them through the API if you prefer.

## Example Workflow

1. **Create or Identify a Customer**  
   - When a new user is onboarded, you either create a new Customer profile via `POST /customers` or pass their info through a Connect session.

2. **Link Sites & Devices**  
   - As the user sets up or imports a new Device, Texture checks address/reference data to see if it belongs to an existing Customer. If so, it's automatically linked.

3. **Aggregate Energy Data**  
   - Texture continuously syncs usage and state data. The Customer's Dashboard view updates to show an aggregate of all their Sites/Devices.

4. **Monitor Events & Activity**  
   - Any changes or notable events appear in the Customer's Activity Feed (e.g., device going offline).

5. **Analyze or Automate**  
   - You can run analytics or develop automations based on the Customer's data (like sending them notifications if their device's battery is low).

## Tips & Best Practices

- **Reference IDs**  
  - Use the `referenceId` field to map Texture Customers to your internal user database.  
- **One Customer, Multiple Sites**  
  - If an individual has multiple properties, linking all their Sites to one Customer keeps usage data consolidated.  
- **Privacy & Security**  
  - Customer records often contain PII. Limit access to the data in your environment.  
- **Webhook Notifications**  
  - Configure webhooks to be notified of Customer-level events in real time (e.g., new device connected).

## Next Steps

- **Browse the [API Reference](/api)** for request/response payloads for `/customers`, `/customers/{id}`, etc.  
- **Use the Dashboard** to view, edit, and manage your Customers interactively.  
- **Combine with Schedules & Commands** to issue automated instructions to their Devices if needed (e.g., turning thermostats to ECO mode).

By leveraging **Customers**, you gain a 360° view of the people or organizations you serve—along with their Sites, Devices, and day-to-day energy usage—so you can focus on delivering great experiences and innovative energy solutions.
