---
sidebar_position: 5
title: Kafka
---

import { BackLink } from '@components/BackLink';

<BackLink to="/platform-concepts/destinations" label="Destinations" />

# Kafka

## Overview
Kafka destinations let you push any events from your workspace directly to a Kafka topic. When you create a Kafka destination you provide:

- **Label** – a name for the destination
- **Device type** – optional filter to only send events for certain device types
- **Brokers** – comma separated list of brokers for your cluster
- **Client ID** – unique identifier for this Kafka client
- **Topic** – the Kafka topic to publish events to

Texture supports both SSL and SASL connections. For SASL you can choose `plain`, `scram-sha-256` or `scram-sha-512` authentication and supply a username and password. If you select `none`, no authentication is used.

There are no restrictions on event types for Kafka destinations; all events from your workspace can be forwarded to your Kafka cluster.

## Use cases

* **Real‑time processing** – feed events into your own streaming pipelines
* **Data warehousing** – ship events to your data lake via Kafka connectors

