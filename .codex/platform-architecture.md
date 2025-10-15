# Platform Architecture

<Subtitle>How Texture's core systems work together</Subtitle>

## Overview

Texture is an AI-native platform for coordinating energy operations across assets, teams, and partners. It unifies fragmented data, exposes it through a secure data cloud, and powers intelligent workflows—defined by humans or driven by agents.

The platform is designed for:
- Secure, role-based access with audit trails
- Event-driven operations that trigger instant reactions
- AI-native intelligence supporting agents and automation
- Real-time ingest, state updates, and operational APIs
- Cross-organization collaboration and data sharing

---

## Platform Capabilities

### Secure

Role-based access, workspace isolation, and audit trails are built in from ingest to action. Every operation is scoped, logged, and traceable.

### Event-driven

Changes trigger reactions instantly. Events stream across systems, keeping everything in sync. Platform events flow through workflows, APIs, and webhooks in real time.

### AI-native

Data is structured for intelligence—supporting agents, detection, and summarization out of the box. Agents observe platform state, detect changes, and initiate or participate in workflows.

### Real-time

Low-latency ingest, live state updates, and operational APIs enable immediate insight and control across fleets and programs.

---

## Core Platform Layers

### Integrations

Comprehensive data connectivity and processing pipeline for diverse sources.

**Ingestion** – Connect to anything—meters, DERs, spreadsheets, APIs, or legacy systems. Stream, poll, or upload.

**Transformation** – Clean and structure data on the fly. Normalize telemetry, resolve metadata, and build digital twins.

**Enrichment** – Geocode assets and layer in real-world context like weather, emissions, and market signals.

### Data Cloud

Live data access and collaboration layer enabling real-time visibility across teams and systems.

**Monitoring** – Track system behavior and detect change in real time across sites, assets, and programs.

**Data Access** – Query or sync live data anywhere—dashboards, APIs, notebooks, or partner systems.

**Aggregations, Metrics & Reports** – Run logic, feed models, or surface insights with high-resolution, contextualized data.

**Collaboration & Sharing** – Enable trusted, permissioned collaboration across orgs:
- **Workspaces** — Multi-org environments with shared, real-time data
- **Collections** — Scoped, dynamic sharing of sites, devices, or programs
- **Shared Reports** — PII-free, no-login visibility into outcomes

### Device Cloud

A managed, grid-aware backend for OEMs and operators. Device Cloud provides the infrastructure needed to onboard, manage, and operate fleets without building a custom stack.

**Models & SKUs** – Structured catalog of device models and configurations.

**Fleet Registry** – Central record of deployed devices with live status.

**Commissioning** – Streamlined onboarding and secure activation workflows.

**Firmware Rollouts** – Manage staged, secure updates across fleets.

**Access & Credentials** – Provision, rotate, and revoke device-level credentials.

**Diagnostics & Alerts** – Built-in monitoring for connectivity, health, and anomalies.

**Device Audit Logs** – End-to-end visibility into lifecycle events and changes.

### Workflows

Coordinate and automate actions across customers, assets, and operations—powered by AI agents or human-defined logic.

**Trigger Types** (how workflows start):
- **Platform Events** – Run when alerts, devices, connections, commands, contacts, enrollments, or sites change
- **Schedule** – Run on a recurring schedule
- **Event** – Trigger when something changes
- **Workflow** – Start from other workflows for modular automation
- **Manual** – Run only when manually triggered

**Action Types** (what workflows do):
- **Lookup** – Fetch related data from linked objects
- **Condition** – Evaluate conditions and branch workflow logic
- **Notify** – Send notifications via email, SMS, Slack, or webhooks
- **Control** – Manage execution with loops, delays, and programmatic logic
- **Push** – Write data to external systems via APIs
- **Summarize** – Aggregate and analyze data using AI or statistical methods

**Control Flow**:
- Conditions & branching
- Pauses & waits
- Retries & loops
- Parallelism

---

## Platform Objects

Texture models the grid as a programmable, observable platform. These core objects structure how we represent infrastructure, data, control systems, identity, and integrations.

### 1. Physical & Virtual Infrastructure

**Sites** – Core physical locations with devices, meters, and metadata.

**Devices** – Controllable or monitored energy assets.

**Meters** – Utility or sub-meters, including virtual and calculated.

**Locations** – Structured addresses tied to sites, contacts, or orgs.

**Regions** – Geographic zones like utility areas, markets, or regulatory boundaries.

**Collections** – Static or dynamic groups of sites or devices.

### 2. Analytics

**Metrics** – Real-time and historical time series data.

**Events** – Discrete system or device state changes.

**Dimensions** – Named filters or attributes for segmenting data.

**Reports** – Aggregated or templated outputs across metrics and events.

**Alerts** – Persistent signals of issues requiring attention, with resolution tools scoped to each device or site.

### 3. Control & Automation

**Commands** – Direct, verifiable instructions sent to controllable devices.

**Schedules** – Timed or recurring command patterns.

**Agents** – AI-powered workers that observe platform state, detect changes or opportunities, and either initiate workflows or participate within them.

**Actions** – Discrete tasks agents can run—like sending commands, raising alerts, or updating systems.

### 4. CRM & Engagement

**Contacts** – Individuals or entities engaged with the platform.

**Accounts** – Company-level records representing customers, partners, or service entities.

**Programs** – Structured offerings and incentive models.

**Enrollments** – A contact's participation in a program.

**Documents** – Uploaded or generated files tied to engagement or compliance.

**Service Orders** – Customer-initiated work requests.

**Outages** – Customer-impacting grid events and restoration tracking.

### 5. Access, Identity & Scope

**Users** – Authenticated individuals.

**Organizations** – Primary entities that own data and assets.

**Workspaces** – Scoped containers for organizing data and access.

**Roles** – Named permission bundles assigned to users.

**Permissions** – Fine-grained access rules for actions and data.

**API Keys** – Scoped credentials for authenticating programmatic access.

### 6. Extensibility & Integrations

**Apps** – Platform-managed integrations (e.g., Leap, Arcadia).

**Connections** – Customer-configured integrations (e.g., Snowflake, ADMS).

**APIs** – Public and internal programmatic interfaces.

**Webhooks** – Outbound event triggers to external systems.

### 7. Commerce & Financials

**Bills** – Imported utility bill records.

**Payments** – Financial disbursements or receipts.

**Invoices** – Structured charges issued to orgs or participants.

**Payment Methods** – Linked accounts for sending or receiving funds.

**Tariffs** – Rate structures used for cost or value calculations.

**Capital Credits** – Allocations and retirements.

---

## Data Flow

1. **Ingestion** → Connect sources and stream data into Texture
2. **Transformation** → Normalize, structure, and enrich data
3. **Storage** → Metrics, events, and state updates available in real time
4. **Event fires** → Workflow or agent evaluates conditions
5. **Actions execute** → Commands, notifications, API calls, or updates
6. **Results logged** → Audit trail and observability

---

## Key Design Principles

1. **Event-driven by default** – Changes trigger reactions instantly across systems
2. **AI-native intelligence** – Agents and automation are first-class platform capabilities
3. **Security and auditability** – Every action is logged, scoped, and traceable
4. **Real-time coordination** – Low-latency operations enable immediate insight and control
5. **Cross-organization collaboration** – Trusted, permissioned data sharing across partners

