# Signals

import { Subtitle } from '@components/Subtitle';

<Subtitle>Enrich energy data with contextual intelligence for deeper insights</Subtitle>

**Signals** are enrichment data sources included as a core capability of the Texture platform for all sites and devices. While your devices, meters, and utility bills provide the foundation, signals automatically layer on weather patterns and carbon emissions data that transform raw energy data into actionable intelligence.

## Why Signals?

Energy data in isolation tells only part of the story. Signals unlock the full picture by:

- **Adding Context**: Weather data explains energy consumption patterns and solar generation variance
- **Enabling Optimization**: Carbon emissions data helps time energy usage for maximum environmental impact

- **Supporting Forecasting**: Historical signal patterns enable predictive analytics and demand forecasting
- **Automating Insights**: Real-time signal integration drives intelligent automation and alerts

## How Signals Work

The Texture platform follows a systematic enrichment process:

1. **Ingest Source Data**: Device telemetry, utility bills, meters, and monitoring systems
2. **Normalize and Schema**: Convert to standardized Texture data models
3. **Create Core Objects**: Generate [Sites](/platform-concepts/sites) and [Devices](/platform-concepts/devices) from normalized data
4. **Enrich with Signals**: Layer contextual data to create comprehensive energy intelligence

This approach ensures that every energy data point is automatically contextualized with relevant environmental and operational information—no additional configuration required.

## Available Signals

### Weather Data

Weather signals provide critical context for energy generation and consumption patterns.

| Signal | Source | Description |
|--------|--------|-------------|
| **Weather Conditions** | [National Weather Service (NWS)](/platform-concepts/apps) | Current weather data for real-time energy optimization and operational insights |
| **Global Weather Data** | [OpenWeather](/platform-concepts/apps) | Worldwide current weather conditions for efficiency optimization and generation alignment |

:::tip Advanced Weather Data
For customers requiring more sophisticated weather insights, the [Tomorrow.io app](/platform-concepts/apps) provides hyper-local weather data with advanced forecasting capabilities for enhanced energy operations optimization.
:::

### Carbon Emissions

Track and optimize for environmental impact with real-time emissions data.

| Signal | Source | Description |
|--------|--------|-------------|
| **Marginal CO2 Emissions** | [WattTime](/platform-concepts/apps) | Real-time carbon intensity data to optimize consumption for cleaner electricity use |



## Signal Integration

Signals are automatically integrated through our [Apps](/platform-concepts/apps) ecosystem:

- **WattTime App**: Provides marginal carbon emissions data with utility-level granularity
- **OpenWeather App**: Delivers global weather data for energy optimization
- **National Weather Service App**: Provides current weather conditions for real-time operational insights

For customers with advanced weather requirements, the **Tomorrow.io app** can be optionally enabled to provide hyper-local weather insights and enhanced forecasting capabilities.

These apps are enabled by default for all Texture customers, automatically enriching your site data with relevant signal information without any configuration required.

:::tip Core Platform Feature
Signal enrichment is included as a standard feature for all sites and devices on the Texture platform. Weather and emissions data is automatically matched to your sites based on geographic location and utility service territory.
:::

## Signal Data Access

Signal data is accessible through:

- **Dashboard Views**: Integrated directly into site and device dashboards
- **API Endpoints**: Programmatic access to historical and real-time signal data
- **Event Streams**: Real-time signal updates through the [Events](/platform-concepts/events) system
- **Metrics Integration**: Combined with energy metrics for comprehensive analytics

## Use Cases

### Demand Response Optimization

Combine current weather conditions with carbon emissions data to optimize battery dispatch during peak demand periods while minimizing environmental impact.

### Solar Generation Analysis

Use real-time weather data to understand solar output patterns and optimize battery charging schedules based on current generation conditions.



### Grid Services

Leverage real-time emissions data to participate in carbon-aware grid services programs.

## Best Practices

1. **Leverage Built-in Signals**: Weather and emissions signals are automatically available for all sites—no setup required
2. **Monitor Data Quality**: Track signal data freshness and accuracy through dashboard alerts
3. **Combine Signals**: Use multiple signal types together for more sophisticated optimization strategies
4. **Historical Analysis**: Leverage signal history to identify patterns and improve forecasting models
5. **API Integration**: Build signal awareness into your applications for dynamic optimization

## Next Steps

- Review detailed signal documentation: [Weather](/platform-concepts/signals/weather), [Marginal Carbon Emissions](/platform-concepts/signals/marginal-carbon-emissions)
- Access signal data through your dashboard or API (automatically available for all sites)
- Explore [Metrics](/platform-concepts/metrics) that incorporate signal data
- Set up [Events](/platform-concepts/events) to monitor signal updates
