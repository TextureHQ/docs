---
id: apps
title: Apps
sidebar_position: 1
---

import StaticAppsList from '@site/src/components/StaticAppsList';
import { Subtitle } from '@components/Subtitle';

# Apps

<Subtitle>Extend platform capabilities through third-party integrations</Subtitle>

**Apps** are integrations with third-party services that expand the functionality, data, and capabilities of the Texture Platform. By enabling an App (often by providing the relevant API key or OAuth credentials), you can seamlessly connect external services or datasets to Texture and leverage them across your Sites, Devices, and more.

Whether you need weather data for energy optimization, CRM integration for customer management, or utility data for comprehensive site analysis, Texture's App ecosystem provides the building blocks to create a unified energy management solution.

## Why Apps?

Apps transform Texture into a comprehensive energy management platform:

- **Extend Platform Capabilities** — Integrate best-of-breed services (meter data, weather, emissions) to drive deeper insights and richer functionality
- **Single Pane of Glass** — View and manage all your energy data—meter intervals, device status, lead info, permitting, CRM sync—directly in Texture
- **Faster Onboarding** — Once an App is enabled, Texture automatically handles syncing, reconciling, and updating data at regular intervals
- **Modular Setup** — Pick and choose only the integrations you need by enabling individual Apps

## Available Apps

<StaticAppsList />

## App Integration Process

### Enabling an App

Each App in Texture has its own configuration dialog. Typically you'll:

1. **Obtain an API Key or OAuth Token** from the third party
2. **Paste it into Texture** under **Apps** → **[App Name]**
3. **Configure Additional Options** (e.g., default permissions, region filters)

Once saved, Texture starts syncing or sending data automatically, depending on the App.

## Next Steps

1. **Browse & Enable Apps**  
   Go to **Apps** in the Texture Dashboard to view available integrations, set them up, and configure sync intervals or permissions.

2. **Review Data Flow**  
   See your newly imported data—like Meters, Weather forecasts, or CRM contacts—in the corresponding sections of the Texture Dashboard or via our API endpoints.

3. **Monitor & Iterate**  
   Track how your new integrations add value (e.g., deeper site insights, better energy forecasting, streamlined workflows), and fine-tune settings as needed.

If you have any questions or need help configuring an App, use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team, or contact your Texture representative.
