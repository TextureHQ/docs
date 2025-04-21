---
sidebar_position: 11
---

# Apps

**Apps** are integrations with third-party services that expand the functionality, data, and capabilities of the Texture Platform. By enabling an App (often by providing the relevant API key or OAuth credentials), you can seamlessly connect external services or datasets to Texture and leverage them across your Sites, Devices, and more. 

Below is an overview of how Apps work, plus a brief description of many of the Apps currently available in Texture.

---

## Why Apps?

- **Extend Platform Capabilities**: Integrate best-of-breed services (e.g., meter data, weather, emissions) to drive deeper insights and richer functionality.  
- **Single Pane of Glass**: View and manage all your energy data—meter intervals, device status, lead info, permitting, CRM sync, etc.—directly in Texture.  
- **Faster Onboarding**: Once an App is enabled, Texture automatically handles syncing, reconciling, and updating data at regular intervals.  
- **Modular Setup**: Pick and choose only the integrations you need by enabling individual Apps.  

---

## Enabling an App

Each App in Texture has its own configuration dialog. Typically you’ll:
1. **Obtain an API Key or OAuth Token** from the third party.  
2. **Paste it into Texture** under **Apps** → **[App Name]**.  
3. **Configure Additional Options** (e.g., default permissions, region filters).

Once saved, Texture starts syncing or sending data automatically, depending on the App.

---

## Utility Data

### Arcadia
Arcadia facilitates access to renewable energy data and sustainability programs. By connecting your Arcadia account, Texture can pull utility usage and billing data, giving you a consolidated view of your energy footprint.

### UtilityAPI
**UtilityAPI** provides utility billing and meter data for energy monitoring and customer engagement. Once you connect UtilityAPI to Texture (by entering your UtilityAPI keys), Texture will:

1. **Crawl** your UtilityAPI instance to locate all Bills and Meters.
2. **Resolve Entities** by matching addresses and geocoded data to existing Sites on Texture. New Sites are auto-created if needed.
3. **Sync** Bill and Meter data on a regular schedule for ongoing visibility.
4. **Surface** these Meters and their interval data in your Texture Dashboard or via our API, correlating them with Device data for deeper insights.

### Bayou Energy
Bayou Energy integration allows you to import energy usage data from utility bills and meters for optimized resource use and planning. By connecting your Bayou Energy account, Texture can access utility bill data and interval meter data, providing detailed insights into energy consumption patterns.

---

## Device Data

### Smartcar
Smartcar integration gives you real-time vehicle data, enabling remote EV commands and usage insights. Perfect for building advanced EV management solutions on top of Texture.

### Enode
Enode offers access to a broad range of energy devices—EVs, inverters, thermostats, batteries. Connecting Enode helps unify device controls and telemetry in Texture.

### Deraapi (Coming soon)
Deraapi integration extends support for additional smart energy devices. Once live, you’ll be able to seamlessly import device data for enhanced management.

---

## Market Access

### Shadow Power
Shadow Power enables behind-the-meter financial applications. By connecting it, you can sync financial data and glean new revenue or cost-saving opportunities.

### Leap
Leap allows you to enroll in or manage demand response programs. Through Leap’s platform, you can access broader energy markets and monetize aggregated resources.

---

## CRM

### HubSpot (Coming soon)
Integrate HubSpot CRM to sync customer and lead information with energy data in Texture. Ideal for a unified lead-to-enrollment workflow.

### Salesforce (Coming soon)
Salesforce integration allows you to link CRM records and automation workflows with your Texture data, bringing powerful synergy between energy insights and customer engagement.

---

## Permits

### Shovels
Shovels surfaces permitting data for your Sites. Enable it to attach relevant permit data to your Texture Sites, allowing you to track and monitor permitting status and details.

---

## Energy Modeling

### Palmetto's Energy Intelligence
Palmetto's Energy Intelligence provides detailed energy modeling for your Sites. This integration delivers disaggregated data on a Site's energy footprint, offering insights into energy usage patterns, efficiency opportunities, and optimization strategies.

---

## Weather

### National Weather Service (NWS)
Integrate NWS for predictive weather data to drive advanced energy demand forecasting, maintenance scheduling, and more.

### OpenWeather
OpenWeather provides global meteorological data, letting you align energy consumption or generation with local forecasts.

### Tomorrow.io (Coming soon)
Tomorrow.io expands on hyper-local weather insights and real-time adjustments to optimize device usage and energy operations.

---

## Emissions

### WattTime
WattTime shows real-time emissions data. By pairing it with your energy usage or device data, you can optimize for lower-carbon electricity and measure cleaner consumption.

---

## Texture Apps

### My Texture
“My Texture” is an optional portal that you can deploy for your own users, letting them log in and view their device or usage data in a branded dashboard experience. We handle logins via a magic link so this is a very easy way to allow your customers to see the same great Texture data that you do when you view your own data in the Texture Dashboard.

---

## Grid Services

### Tesla Grid Services
If you have a Tesla Grid Services account, connect it to enable real-time access to Tesla device data and robust dispatch capabilities for distributed energy resources.

---

## Next Steps

1. **Browse & Enable Apps**  
   Go to **Apps** in the Texture Dashboard to view available integrations, set them up, and configure sync intervals or permissions.
2. **Review Data Flow**  
   See your newly imported data—like Meters, Weather forecasts, or CRM contacts—in the corresponding sections of the Texture Dashboard or via our API endpoints.
3. **Monitor & Iterate**  
   Track how your new integrations add value (e.g., deeper site insights, better energy forecasting, streamlined workflows), and fine-tune settings as needed.

If you have any questions or need help configuring an App, visit our [Customer Portal](https://texture.atlassian.net/servicedesk/customer/portal/2) or contact your Texture representative.