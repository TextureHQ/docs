---
---

# Contacts

**Contacts** represent real people (or organizations) who have one or more **Sites** and **Devices** connected to the Texture Platform. Once a Contact is linked, Texture can aggregate their energy usage across all of their Sites and Devices, providing a unified view and enabling deeper insights in both the Texture Dashboard and via API.

## Why Contacts?

By creating a **Contact profile** in Texture, you can:
- Link multiple Sites and Devices to a single individual or entity.
- View **aggregate energy usage** and metrics (consumption, production, emissions, etc.) across all of their Devices.
- Centralize contact info (name, email, phone) and **utility details** (utility territory, wholesale market, ISO).
- Track relevant events in a single **Activity Feed** (e.g., device disconnections or issues).
- Simplify device and usage management through the **API** or the **Texture Dashboard**.

## Contact Profile

A Contact Profile consists of:
- **Identifying Info**: first and last name, email address, phone number.  
- **Links**: references to any Sites or Devices they own.  
- **Location Data**: if relevant, we store address details (either from Sites or direct Contact records).  
- **Reference ID**: an optional unique identifier in your system, allowing you to map internal records to the Contact in Texture.

Once associated with a Site, a Contact's **energy usage** and activity logs become accessible under their profile. If they own multiple Sites (e.g., primary residence and vacation home), Texture aggregates the usage from all those Sites to provide a holistic view.

## Dashboard View

When you open a Contact in the **Contacts** section of the Texture Dashboard, you'll see:

1. **Contact Details**:  
   - Name, email, phone  
   - Linked Site(s) and address(es)  
   - Utility service territory, wholesale market, or ISO if applicable  

2. **Energy Usage**:  
   - An aggregate usage chart that combines data from all their connected Sites and Devices  

3. **Devices**:  
   - A list of the Contact's Devices with their real-time status (e.g., a battery's charge level, a thermostat's operating mode)

4. **Activity Feed**:  
   - Key events related to that Contact's Sites or Devices, like "Device Disconnected" or "Device Updated."

5. **Connect Sessions**:  
   - If the Contact used [Texture Connect](/integrations/texture-connect) to onboard their Devices, you can view any open or recent Connect sessions

All these details help you manage your contacts' energy data in one central location.

## Managing Contacts via API

You can also work with Contacts through the **Texture REST API**. Key endpoints include:

- **List all Contacts**:
  ```http
  GET /contacts
  ```
  Returns all Contacts in your Workspace (with optional pagination or filtering by `referenceId`).

- **Retrieve a single Contact**:
  ```http
  GET /contacts/{id}
  ```
  Gets detailed info for a specific Contact, including their Devices and connections to Sites.

- **Delete a Contact**:
  ```http
  DELETE /contacts/{id}
  ```
  Removes a Contact record from Texture.

- **Fetch Contact Sites**:
  ```http
  GET /contacts/{id}/sites
  ```
  Retrieves all Sites associated with that Contact.

When a Contact has been created (or discovered) in Texture, linking Sites and Devices happens automatically if there's matching location or reference data. You can also manually associate them through the API if you prefer.

## Example Workflow

1. **Create or Identify a Contact**  
   - When a new user is onboarded, you either create a new Contact profile via `POST /contacts` or pass their info through a Connect session.

2. **Link Sites & Devices**  
   - As the user sets up or imports a new Device, Texture checks address/reference data to see if it belongs to an existing Contact. If so, it's automatically linked.

3. **Aggregate Energy Data**  
   - Texture continuously syncs usage and state data. The Contact's Dashboard view updates to show an aggregate of all their Sites/Devices.

4. **Monitor Events & Activity**  
   - Any changes or notable events appear in the Contact's Activity Feed (e.g., device going offline).

5. **Analyze or Automate**  
   - You can run analytics or develop automations based on the Contact's data (like sending them notifications if their device's battery is low).

## Tips & Best Practices

- **Reference IDs**  
  - Use the `referenceId` field to map Texture Contacts to your internal user database.  
- **One Contact, Multiple Sites**  
  - If an individual has multiple properties, linking all their Sites to one Contact keeps usage data consolidated.  
- **Privacy & Security**  
  - Contact records often contain PII. Limit access to the data in your environment.  
- **Webhook Notifications**  
  - Configure webhooks to be notified of Contact-level events in real time (e.g., new device connected).

## Next Steps

- **Browse the [API Reference](/api)** for request/response payloads for `/contacts`, `/contacts/{id}`, etc.  
- **Use the Dashboard** to view, edit, and manage your Contacts interactively.  
- **Combine with Schedules & Commands** to issue automated instructions to their Devices if needed (e.g., turning thermostats to ECO mode).

By leveraging **Contacts**, you gain a 360° view of the people or organizations you serve—along with their Sites, Devices, and day-to-day energy usage—so you can focus on delivering great experiences and innovative energy solutions.
