---
sidebar_position: 1
title: Destinations
---

# Destinations

Destinations allow you to specify where and when to receive your data from the Texture platform. You can configure as many destinations as you'd like, giving you complete control over where your data lands.

## What are Destinations?

Destinations are the endpoints where your Texture data gets delivered. Instead of writing custom code to poll our APIs or manually retrieve data, destinations automatically push your data to the right place, in the right format, at the right time.

## Key Benefits

- **Automatic Delivery**: No more polling or manual data retrieval
- **Multiple Formats**: Receive data in JSON, CSV, or custom formats
- **Flexible Scheduling**: Configure when and how often data is sent
- **Reliable Delivery**: Built-in retry logic and error handling
- **Real-time & Batch**: Support for both real-time streaming and batch processing

## Currently Supported Destinations

### Real-time Delivery
- **[Webhooks](/platform-concepts/destinations/webhooks)** - HTTP POST requests to your endpoints
- **[Kafka](/platform-concepts/destinations/kafka)** - Stream data to Apache Kafka topics

### Notifications
- **[Email](/platform-concepts/destinations/email)** - Send data summaries and alerts via email
- **[SMS](/platform-concepts/destinations/sms)** - Receive text message notifications

### Event Types
- **[Event Types](/platform-concepts/destinations/event-types)** - Understand the different types of events you can receive

## Getting Started

1. **Choose your destination type** from the options above
2. **Configure your endpoint** (webhook URL, email address, etc.)
3. **Set up event filters** to specify which data you want to receive
4. **Test your configuration** to ensure data is flowing correctly

## Configuration Examples

Each destination type has its own configuration options. For example:

- **Webhooks**: Configure HTTP endpoints, authentication, and retry logic
- **Email**: Set up email templates, recipients, and delivery schedules
- **Kafka**: Configure topics, partitioning, and serialization formats

## Coming Soon

We're actively working on expanding our destination options:

- **Cloud Storage**: AWS S3, GCP Cloud Storage, Azure Storage
- **Data Warehouses**: Snowflake, Databricks, BigQuery
- **Real-time**: WebSocket, MQTT
- **Notifications**: Push notifications, Slack, Teams
- **SDKs**: Type-definition SDKs for popular languages

## Need Help?

If you need assistance setting up destinations or have questions about specific configurations, check out our [support documentation](/support/slack) or reach out to our team.
