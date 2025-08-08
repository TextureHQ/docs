---
---

# Apps

import { Subtitle } from '@components/Subtitle';

<Subtitle>Extend platform capabilities through third-party integrations</Subtitle>

**Apps** are integrations with third-party services that expand the functionality, data, and capabilities of the Texture Platform. By enabling an App (often by providing **the** **relevant** API key or OAuth credentials), you can seamlessly connect external services or datasets to Texture and leverage them across your Sites, Devices, and more.fix 

---

## Why Apps?

Apps transform Texture into a comprehensive energy management platform:

- **Extend Platform Capabilities** — Integrate best-of-breed services (meter data, weather, emissions) to drive deeper insights and richer functionality
- **Single Pane of Glass** — View and manage all your energy data—meter intervals, device status, lead info, permitting, CRM sync—directly in Texture
- **Faster Onboarding** — Once an App is enabled, Texture automatically handles syncing, reconciling, and updating data at regular intervals
- **Modular Setup** — Pick and choose only the integrations you need by enabling individual Apps

---

## App Integration Process

### Enabling an App

Each App in Texture has its own configuration dialog. Typically you'll:

1. **Obtain an API Key or OAuth Token** from the third party
2. **Paste it into Texture** under **Apps** → **[App Name]**
3. **Configure Additional Options** (e.g., default permissions, region filters)

Once saved, Texture starts syncing or sending data automatically, depending on the App.

---

## Available Apps

### Utility Data

Connect to utility billing and meter data for comprehensive energy monitoring.

| App | Description |
|-----|-------------|
| **Arcadia** | Easily connect with Arcadia for access to renewable energy data and sustainability initiatives. |
| **UtilityAPI** | Access utility billing and meter data for energy monitoring and customer engagement. |
| **Bayou Energy** | Integrate energy data from Bayou Energy to optimize resource use and planning. |
| **Deck** | Access utility data across electricity, water, gas, waste, and telco—globally standardized and ready to scale. |

### Device Data

Connect to additional device types and manufacturers for comprehensive device management.

| App | Description |
|-----|-------------|
| **Smartcar** | Access real-time vehicle data, enabling enhanced insights and remote vehicle control for a more connected customer experience. |
| **Enode** | Easily connect with Enode to access real-time data from over 1000 energy devices, including EVs, solar inverters, home batteries, and thermostats. Unlock insights to improve energy management, efficiency, and site performance. |
| **DERAPI** (Coming soon) | Connect with a wide range of smart energy devices, unlocking insights for improved energy management and efficiency initiatives. |
| **SolarEdge Monitoring API** | Connect with SolarEdge Monitoring to enable real-time visibility into system performance, empowering data-driven insights and proactive energy management without direct control. |
| **Verdigris** | Connect smart meters to monitor real-time building energy usage and surface actionable insights. |
| **AlsoEnergy** | Access live inverter data for deeper performance insights and real-time alerting, keeping energy systems seamlessly connected and transparent. |

### Market Access

Connect to energy markets and financial applications for revenue opportunities.

| App | Description |
|-----|-------------|
| **Shadow Power** | Connect behind-the-meter assets with financial systems, enabling smarter, data-driven energy solutions. |
| **Leap** | Enable demand response programs and access energy markets for grid flexibility. |

### CRM

Integrate customer relationship management systems for unified workflows.

| App | Description |
|-----|-------------|
| **HubSpot** (Coming soon) | Sync HubSpot CRM with energy data to streamline customer relationship management and lead tracking. |
| **Salesforce** (Coming soon) | Sync energy data with Salesforce to enhance customer engagement and workflow automation. |

### Permits

Track and manage permitting data for your Sites.

| App | Description |
|-----|-------------|
| **Shovels** | Manage permits and compliance in the energy sector with seamless regulatory data integration. |

### Rebates and Incentives

Track and capture available incentives for your energy projects.

| App | Description |
|-----|-------------|
| **Eli** | View eligible energy incentives on your Sites to unlock and capture value for you or your customers with ease. |

### Energy Modeling

Get detailed energy insights and optimization strategies.

| App | Description |
|-----|-------------|
| **Palmetto's Energy Intelligence** | Access disaggregated, hourly home energy usage and scenario modeling with physics-based insights for electrification and efficiency upgrades. |
| **60Hertz** | 60Hertz Energy provides a purpose-built CMMS platform specifically designed for managing distributed energy resources like solar, wind, battery storage, and microgrids, with unique offline capabilities for remote operations and integrated monitoring-to-maintenance workflows. |
| **Aurora Solar** | Import accurate solar designs and production estimates to streamline project analysis and customer proposals. |

### Weather

Integrate weather data for predictive energy management.

| App | Description |
|-----|-------------|
| **National Weather Service (NWS)** | Integrate NWS for predictive weather data to drive advanced energy demand forecasting, maintenance scheduling, and more. |
| **OpenWeather** | Use global weather data to align energy generation and consumption for better efficiency. |
| **Tomorrow.io** (Coming soon) | Optimize energy operations with hyper-local weather insights and real-time adjustments. |

### Emissions

Track and optimize for environmental impact.

| App | Description |
|-----|-------------|
| **WattTime** | View carbon emissions alongside your energy device metrics to understand and optimize consumption for cleaner electricity use. |
| **WattCarbon** | Track energy, carbon, and cost savings with certified M&V for any type of demand side energy project. |

### Texture Apps

Deploy branded experiences for your users.

| App | Description |
|-----|-------------|
| **My Texture** | "My Texture" is an optional portal that you can deploy for your own users, letting them log in and view their device or usage data in a branded dashboard experience. We handle logins via a magic link so this is a very easy way to allow your customers to see the same great Texture data that you do when you view your own data in the Texture Dashboard. |

### Grid Services

Enable advanced grid interaction capabilities.

| App | Description |
|-----|-------------|
| **Tesla Grid Services** | Seamlessly connect to Tesla Grid Services, enabling real-time access to device data and remote dispatch capabilities for optimized energy management and grid interactions. |
| **Savant** | Savant integration unlocks circuit-level insight, adaptive Energy Modes, and remote control of storage, solar, and backup assets—fostering intelligent consumption, storm-ready resilience, and harmonious coordination with the grid. |
| **EG4** | Unlock full visibility and control of EG4 Electrics inverters with instant data access and remote management capabilities—empowering intelligent energy use and efficient grid coordination. |
| **Enphase** | Access Grid Services enabling grid export with utility-level control. |
| **SolarEdge** | Connect with SolarEdge, enabling real-time monitoring, remote control, and optimized energy management for efficient grid interaction. |
| **FranklinWH** | Effortlessly integrate with FranklinWH, providing real-time device data access and remote control for enhanced energy optimization and seamless grid interaction. |

---

## Next Steps

1. **Browse & Enable Apps**  
   Go to **Apps** in the Texture Dashboard to view available integrations, set them up, and configure sync intervals or permissions.

2. **Review Data Flow**  
   See your newly imported data—like Meters, Weather forecasts, or CRM contacts—in the corresponding sections of the Texture Dashboard or via our API endpoints.

3. **Monitor & Iterate**  
   Track how your new integrations add value (e.g., deeper site insights, better energy forecasting, streamlined workflows), and fine-tune settings as needed.

If you have any questions or need help configuring an App, use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team, or contact your Texture representative.