# Terminology

<Subtitle>Standard terms and definitions for Texture documentation</Subtitle>

## Core Platform Terms

### Device

A physical asset connected to Texture (battery, inverter, thermostat, EVSE). Devices report telemetry and respond to commands.

**Use:** "Connect devices to start monitoring telemetry."  
**Avoid:** Asset, resource, unit, endpoint

### Metrics

Real-time and historical time-series data reported by devices, such as power, energy, state of charge, or temperature.

**Use:** "Query metrics for any device in your workspace."  
**Avoid:** Data, readings, telemetry (legacy term)

### Event

A timestamped state change in the platform that can trigger workflows.

**Use:** "The `device.offline` event fires when telemetry stops."  
**Avoid:** Trigger, notification, alert (unless specifically about alerts)

### Workflow

Automated logic that responds to events by executing actions like API calls, commands, or resource updates. Workflows can be driven by human-defined logic or AI agents.

**Use:** "Build workflows to automate device control."  
**Avoid:** Automation, flow, rule, pipeline

### Agent

An AI-powered worker that observes platform state, detects changes or opportunities, and either initiates workflows or participates within them by making decisions or triggering actions.

**Use:** "Agents monitor fleet health and trigger maintenance workflows."  
**Avoid:** Bot, AI worker, assistant

### Command

An instruction sent to a device, such as "start charging" or "set temperature."

**Use:** "Send commands to control device behavior."  
**Avoid:** Action, request, instruction

### Organization

The top-level access boundary in Texture. Represents a company or partner.

**Use:** "Each organization has its own API keys and workspaces."  
**Avoid:** Account, tenant, company

### Workspace

A group of devices, sites, and programs within an organization.

**Use:** "Create workspaces to segment operations by region or program."  
**Avoid:** Project, folder, group

### Scope

A permission level assigned to API keys, such as `devices:read` or `programs:write`.

**Use:** "This endpoint requires `devices:write` scope."  
**Avoid:** Permission, access level, privilege

### Permission

Fine-grained access rules for specific actions and data. Permissions are bundled into roles.

**Use:** "Users with this permission can create and delete sites."  
**Avoid:** Access level, privilege

### Role

A named permission bundle assigned to users, defining what actions they can perform.

**Use:** "Assign the operator role to grant monitoring access."  
**Avoid:** User type, access level

### Collection

A static or dynamic group of sites or devices that can be shared across organizations or used for scoped access.

**Use:** "Create collections to share device access with partners."  
**Avoid:** Group, folder, set

### Site

A physical location with devices, meters, and metadata. Sites represent customer locations or facilities.

**Use:** "Each site can have multiple devices and meters."  
**Avoid:** Location (unless referring to the address object), facility, premises

### Meter

A utility or sub-meter that measures energy consumption or production. Can be physical, virtual, or calculated.

**Use:** "Link meters to sites for billing and settlement."  
**Avoid:** Utility meter, gauge

### Region

A geographic zone such as a utility service area, wholesale market, or regulatory boundary.

**Use:** "Filter devices by region to match ISO territories."  
**Avoid:** Zone, area, territory (unless specific to context)

---

## Program & Enrollment Terms

### Program

A demand response or VPP offering that devices can enroll in.

**Use:** "Create programs to manage DER participation."  
**Avoid:** Campaign, initiative, offer

### Enrollment

The act of registering a device into a program.

**Use:** "Enroll devices to participate in demand events."  
**Avoid:** Registration, signup, opt-in

### Program Instance

A scheduled occurrence of a program, such as a summer demand response season.

**Use:** "Program instances define when enrollments are active."  
**Avoid:** Season, period, cycle

### Dispatch Event

A demand response or VPP dispatch event that triggers device actions (distinct from platform events).

**Use:** "Devices respond to dispatch events by adjusting load."  
**Avoid:** Call, event (ambiguous with platform events), signal (unless ISO/RTO context)

### Contact

An individual or entity engaged with the platform, such as a customer or site owner.

**Use:** "Each enrollment requires an associated contact."  
**Avoid:** Customer (unless specifically a customer), user, person

### Account

A company-level record representing a customer, partner, or service entity.

**Use:** "Accounts group multiple contacts and sites."  
**Avoid:** Organization (reserved for platform orgs), company

---

## Technical Terms

### API Key

A credential used to authenticate requests to the Texture API. Keys are scoped to organizations and permissions.

**Use:** "Generate API keys in the dashboard."  
**Avoid:** Token, credential, auth key

### Webhook

An HTTP endpoint that receives event notifications from Texture.

**Use:** "Configure webhooks to stream events to your system."  
**Avoid:** Callback, listener, hook

### Connection

A customer-configured integration to external systems such as Snowflake, ADMS, or other data platforms.

**Use:** "Configure connections to sync data with your warehouse."  
**Avoid:** Integration (when referring to customer-configured), destination, target

### App

A platform-managed integration to external services like Leap, Arcadia, or utility APIs.

**Use:** "Install apps to connect manufacturer APIs."  
**Avoid:** Integration (when referring to platform-managed), connector, plugin

### Manufacturer

The company that produces a device model (e.g., Tesla, Enphase, ecobee).

**Use:** "Texture supports manufacturers across solar, storage, and HVAC."  
**Avoid:** Vendor, brand, OEM (unless in OEM context)

### Device Model

A specific product from a manufacturer (e.g., Tesla Powerwall 2, ecobee SmartThermostat).

**Use:** "Each device model has a standardized data schema."  
**Avoid:** Type, variant, SKU

### Document

Uploaded or generated files tied to engagement, compliance, or operational records.

**Use:** "Attach documents to enrollments for audit trails."  
**Avoid:** File, attachment, record

### Service Order

A customer-initiated work request for installation, maintenance, or support.

**Use:** "Service orders track work requests from intake to completion."  
**Avoid:** Ticket, request, work order

### Outage

A customer-impacting grid event with restoration tracking and status updates.

**Use:** "Monitor outages to coordinate customer communications."  
**Avoid:** Incident, disruption, event

---

## Data & Reporting Terms

### Dimension

Named filters or attributes for segmenting data, such as device type, region, or program.

**Use:** "Add dimensions to reports for granular analysis."  
**Avoid:** Filter, tag, attribute (unless specific)

### Report

Aggregated or templated outputs across metrics and events, used for analysis or compliance.

**Use:** "Generate reports to track program performance."  
**Avoid:** Dashboard, summary, export

### Alert

A persistent signal of an issue requiring attention, with resolution tools scoped to each device or site.

**Use:** "Alerts notify operators of offline devices or threshold breaches."  
**Avoid:** Notification (unless UI-specific), warning, alarm

### Action

A discrete task that agents or workflows can execute, such as sending commands, raising alerts, or updating systems.

**Use:** "Workflows execute actions based on event conditions."  
**Avoid:** Step, task, operation (unless specific)

---

## Access & Security Terms

### Scoped Key

An API key with limited permissions, such as read-only access to specific resources.

**Use:** "Issue scoped keys to third-party integrations."  
**Avoid:** Restricted key, limited key, subset key

### Cross-Organization Sharing

The ability to grant another organization access to your devices or telemetry.

**Use:** "Enable cross-organization sharing for program operators."  
**Avoid:** Multi-tenant access, partner sharing

### Audit Log

A record of all API requests, commands, and workflow executions. Every action is logged, scoped, and traceable.

**Use:** "Review audit logs to track system changes."  
**Avoid:** Activity log, history, trail

---

## Commerce & Financials Terms

### Bill

An imported utility bill record showing charges for energy consumption or demand.

**Use:** "Import bills to calculate program savings."  
**Avoid:** Invoice (reserved for platform-issued charges), statement

### Invoice

A structured charge issued by the platform to organizations or participants.

**Use:** "Invoices track program fees and settlements."  
**Avoid:** Bill (reserved for utility bills), charge

### Payment

A financial disbursement or receipt between parties.

**Use:** "Record payments for program participation."  
**Avoid:** Transaction, transfer

### Payment Method

A linked account for sending or receiving funds, such as bank accounts or cards.

**Use:** "Add a payment method to enable direct deposits."  
**Avoid:** Account (ambiguous), method

### Tariff

A rate structure used for cost or value calculations, defining pricing tiers and time-of-use rates.

**Use:** "Apply tariffs to calculate bill impacts."  
**Avoid:** Rate, pricing structure

### Capital Credit

Allocations and retirements representing member equity in cooperative utilities.

**Use:** "Track capital credits for member distributions."  
**Avoid:** Credit, allocation

---

## Writing Guidelines

- **Be specific:** Use the exact term, not a synonym or approximation.
- **Be consistent:** Use the same term throughout a page and across docs.
- **Define on first use:** If a term is new or complex, define it in context.
- **Link to concepts:** When introducing a term, link to its concept page if available.

---

## Avoid These Terms

| 🚫 Avoid | ✅ Use Instead |
|----------|---------------|
| Asset | Device |
| Data | Metrics (or be specific) |
| Telemetry | Metrics (updated terminology) |
| Automation | Workflow |
| Bot | Agent |
| Integration | App (platform) or Connection (customer) |
| Destination | Connection |
| Rule | Workflow (or condition, if specific) |
| Pipeline | Workflow (or data flow, if specific) |
| Location | Site (unless referring to address) |
| Notification | Alert (for persistent issues) or Event (for state changes) |

