# Content Patterns

<Subtitle>Reusable structures for common documentation types</Subtitle>

## Overview

Use these patterns as starting templates for new pages. Adapt as needed, but maintain the core structure.

---

## Pattern 1: Concept Page

**Purpose:** Explain a platform object or system behavior.

**Structure:**

```markdown
# [Concept Name]
<Subtitle>One-sentence definition</Subtitle>

## Overview
What this concept is and why it matters. 2–3 sentences.

## How It Works
Explain the logic, architecture, or relationships. Use:
- Bullet points for key behaviors
- Code examples for data structures
- Diagrams for complex flows

## Key Properties
| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | Display name |

## Common Use Cases
- Use case 1
- Use case 2
- Use case 3

## Capabilities
List the platform capabilities that enable this concept:
- Real-time monitoring
- Event-driven workflows
- AI-native intelligence
- Secure collaboration

## Related Concepts
- [Link to related page]
- [Link to related page]
```

**Example:** `docs/platform-concepts/devices.md`

---

## Pattern 2: Guide / How-To

**Purpose:** Walk through setup, configuration, or a specific task.

**Structure:**

```markdown
# [Task or Goal]
<Subtitle>What this guide helps you accomplish</Subtitle>

## Prerequisites
- Requirement 1
- Requirement 2
- API scope: `scope:name`

## Step 1: [Action]
Description of what to do.

```bash
# Example command or API call
curl -X POST https://api.texturehq.com/...
```

## Step 2: [Action]
Description of next step.

## Step 3: [Action]
Final step and expected result.

## Next Steps
- [Link to related guide]
- [Link to concept page]
```

**Example:** `docs/getting-started/quickstart.md`

---

## Pattern 3: Reference Page

**Purpose:** List API scopes, event types, workflow actions, or other structured data.

**Structure:**

```markdown
# [Reference Topic]
<Subtitle>Complete list of [items]</Subtitle>

## Overview
Brief intro to what's being listed.

## [Category 1]

### Item Name
**Description:** What it does  
**Scope required:** `scope:name`  
**Parameters:**
- `param1` (string) – Description
- `param2` (boolean) – Description

**Example:**
```json
{
  "key": "value"
}
```

## [Category 2]

[Repeat structure]

## Related Pages
- [Link to related guide]
- [Link to concept page]
```

**Example:** `docs/api/overview.md`

---

## Pattern 4: System Behavior Page

**Purpose:** Explain how multiple components interact or orchestrate.

**Structure:**

```markdown
# [System or Process Name]
<Subtitle>How [components] work together</Subtitle>

## Overview
High-level explanation of the system or process.

## Architecture
Describe the flow, components, and relationships. Use:
- Diagrams for visual clarity
- Bullet points for step-by-step flows

## Data Flow
1. Step 1 → System A receives input
2. Step 2 → System B processes data
3. Step 3 → System C outputs result

## Key Behaviors
- Behavior 1
- Behavior 2
- Behavior 3

## Limitations & Constraints
- Constraint 1
- Constraint 2

## Related Pages
- [Link to related concept]
- [Link to related guide]
```

**Example:** `docs/platform-concepts/network.md`

---

## Pattern 5: Workflow Category Page

**Purpose:** Document a category of workflows with examples and trigger/action patterns.

**Structure:**

```markdown
# [Workflow Category]
<Subtitle>What these workflows accomplish</Subtitle>

## Overview
Brief intro to the category and when to use these workflows.

## Common Patterns

### Pattern 1: [Pattern Name]
**When to use:** Description of use case  
**Trigger:** Event type or schedule  
**Actions:**
1. Lookup related data
2. Evaluate condition
3. Execute action

**Example:** "Detect offline devices and alert operators"

### Pattern 2: [Pattern Name]
[Repeat structure]

## Trigger Types
List relevant triggers for this category:
- Platform Events (device.offline, enrollment.created)
- Schedule (daily, hourly)
- Manual

## Action Types
List common actions:
- Notify operators
- Send commands
- Update records
- Push to external systems

## Best Practices
- Practice 1
- Practice 2

## Related Pages
- [Link to workflows overview]
- [Link to platform objects]
```

**Example:** Documentation for "Customer & Enrollment Workflows" or "Asset & Telemetry Workflows"

---

## Pattern 6: Landing Page

**Purpose:** Introduce a section and link to key pages.

**Structure:**

```markdown
# [Section Name]
<Subtitle>What this section covers</Subtitle>

## Overview
1–2 paragraphs explaining the scope and purpose of this section.

## Key Topics

<WelcomeCard
  title="Topic 1"
  description="Short description"
  link="/path/to/page"
/>

<WelcomeCard
  title="Topic 2"
  description="Short description"
  link="/path/to/page"
/>

## Quick Links
- [Link to guide]
- [Link to API reference]
- [Link to support]
```

**Example:** `docs/overview/welcome.mdx`

---

## Common Sections

### Prerequisites

Use when a guide requires setup or permissions.

```markdown
## Prerequisites
- Active Texture account
- API key with `devices:read` scope
- Device connected and reporting telemetry
```

### Best Practices

Use to highlight recommended approaches.

```markdown
## Best Practices
- Use dynamic queries to filter devices by status
- Set webhook retry limits to avoid rate limits
- Test workflows in a staging workspace first
```

### Gotchas / Cautions

Use to flag common mistakes or limitations.

```markdown
:::caution
Workflows do not run across organization boundaries without explicit grants.
:::
```

### Related Pages

Always include at the end of a page.

```markdown
## Related Pages
- [Link to concept]
- [Link to guide]
- [Link to API reference]
```

---

## Content Callouts

Use Docusaurus admonitions to highlight key information:

```markdown
:::tip
Use scoped keys to limit third-party access.
:::

:::caution
This operation cannot be undone.
:::

:::note
Telemetry is deduplicated by timestamp.
:::

:::info
See the [API reference](/docs/api) for full endpoint details.
:::

:::warning
This operation requires `devices:write` scope and cannot be undone.
:::
```

---

## Code Examples

Include realistic, runnable examples:

```markdown
### Example Request

```bash
curl -X GET https://api.texturehq.com/v1/devices \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Example Response

```json
{
  "devices": [
    {
      "id": "dev_abc123",
      "name": "Battery 1",
      "status": "online"
    }
  ]
}
```
```

---

## Agent & AI Integration Examples

When documenting AI-native features, include:

```markdown
## How Agents Work

Agents observe platform state and can:
- Detect changes or opportunities
- Initiate workflows automatically
- Participate in workflows to make decisions
- Execute actions like sending commands or raising alerts

### Example: Predictive Maintenance Agent

**Observes:** Device metrics and historical performance  
**Detects:** Degradation patterns or anomaly indicators  
**Action:** Raises alert and schedules service order

### Example: Dispatch Optimization Agent

**Observes:** Market signals, device availability, and constraints  
**Detects:** Optimal dispatch opportunities  
**Action:** Initiates workflow to send commands to selected devices
```

---

## Tables

Use tables for structured data:

```markdown
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | Unique device identifier |
| name | string | No | Display name for device |
```

---

## Visual Hierarchy

- Use **bold** for key terms on first mention
- Use `code` for API endpoints, scopes, and field names
- Use > blockquotes sparingly, only for extended notes
- Use horizontal rules (`---`) to separate major sections

