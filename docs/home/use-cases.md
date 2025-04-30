---
sidebar_position: 4
---

# Common Use Cases

Texture powers a wide range of energy applications across residential, commercial, and utility scales. This page highlights some common use cases that showcase how developers leverage Texture's platform capabilities.

## Residential Energy Management

**Use Case**: Building smart home energy management applications that optimize solar, storage, and flexible loads.

**How Texture Helps**:
- Connect to residential solar inverters, batteries, EV chargers, and smart thermostats
- Monitor home energy production, consumption, and storage 
- Schedule battery charging/discharging around utility rates
- Enable homeowners to understand and reduce carbon emissions

**Example Implementation**:
```javascript
// Schedule battery charging during low-cost off-peak hours
await texture.commands.scheduleCommand({
  deviceId: "battery-123",
  command: "setMode",
  parameters: { mode: "charge", target: 90 },
  scheduledAt: "2025-05-01T02:00:00Z" // Off-peak time
});
```

## Demand Response Programs

**Use Case**: Implementing demand response programs that incentivize users to reduce electricity use during peak periods.

**How Texture Helps**:
- Monitor real-time device status across a fleet of enrolled devices
- Send batch commands to multiple devices simultaneously
- Access utility rate and grid signal data
- Track response performance and savings

**Example Implementation**:
```javascript
// Reduce load across all enrolled devices during a DR event
const enrolledDevices = await texture.devices.list({ 
  tags: ["dr-program-enrolled"] 
});

await texture.commands.batchCommand(
  enrolledDevices.map(device => ({
    deviceId: device.id,
    command: device.type === "thermostat" 
      ? "setTemperature" 
      : "reduceLoad",
    parameters: device.type === "thermostat"
      ? { temperature: device.currentTemp + 2 }
      : { reductionPercentage: 20 }
  }))
);
```

## Virtual Power Plants (VPPs)

**Use Case**: Creating virtual power plants that aggregate distributed energy resources to provide grid services.

**How Texture Helps**:
- Coordinate diverse assets (batteries, solar, flexible loads)
- Implement automated dispatch logic based on grid conditions
- Track asset performance and availability
- Interface with market platforms through Leap Energy or Shadow Power

**Example Implementation**:
```javascript
// Discharge all available batteries in response to a grid event
const availableBatteries = await texture.devices.search({
  type: "battery",
  query: "stateOfCharge:>50 AND isOnline:true",
  sort: "capacity:desc"
});

const dischargeResponses = await texture.commands.batchCommand(
  availableBatteries.map(battery => ({
    deviceId: battery.id,
    command: "discharge",
    parameters: { 
      rate: "max", 
      duration: 60, // minutes
      minSoc: 20 // Stop at 20% state of charge
    }
  }))
);
```

## Energy Data Analytics

**Use Case**: Building analytics platforms that provide insights into energy usage, production, and optimization opportunities.

**How Texture Helps**:
- Access standardized energy data across device types and manufacturers
- Combine device data with weather, emissions, and utility rate information
- Create custom dashboards and reports
- Export data to business intelligence tools

**Example Implementation**:
```javascript
// Get energy production, consumption, and carbon data for a site
const siteData = await texture.sites.get(siteId, {
  include: ["weather", "carbon", "devices", "utility"]
});

// Calculate site metrics
const production = siteData.devices
  .filter(d => d.type === "inverter")
  .reduce((sum, d) => sum + d.production, 0);

const consumption = siteData.devices
  .reduce((sum, d) => sum + d.consumption, 0);

const emissions = consumption * siteData.carbon.intensity;
```

## EV Charging Management

**Use Case**: Managing electric vehicle charging infrastructure to optimize for cost, emissions, and grid constraints.

**How Texture Helps**:
- Connect to multiple EV charger brands through a unified interface
- Schedule charging based on TOU rates, solar production, or carbon intensity
- Implement smart load management across multiple chargers
- Track charging session data and energy usage

**Example Implementation**:
```javascript
// Smart EV charging that follows solar production
const solarProduction = await texture.devices
  .get(solarInverterId)
  .then(device => device.currentProduction);

// Dynamically adjust EV charging rate based on solar output
await texture.commands.execute({
  deviceId: evChargerId,
  command: "setChargingRate",
  parameters: { 
    amps: Math.min(32, solarProduction / 240), // Convert watts to amps
    followProduction: true
  }
});
```

## Need Help with Your Use Case?

If you have a specific use case not covered here, or need guidance on implementing any of these examples, use the live chat in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team.