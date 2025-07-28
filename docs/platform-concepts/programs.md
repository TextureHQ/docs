---
---

import { Subtitle } from '@components/Subtitle';

# Programs & Enrollments

<Subtitle>Configure and manage offerings users can enroll in—and track their eligibility and status</Subtitle>

A **Program** is any offering that requires a user to sign up or "enroll." Common examples include:

- Demand response initiatives, like [California's Demand Side Grid Support (DSGS) program](https://www.energy.ca.gov/programs-and-topics/programs/demand-side-grid-support-program)
- Battery or thermostat rebate programs provided by utilities, CCAs, or other organizations
- Custom programs that your **Organization** may create and manage on Texture

From a Texture perspective, these Programs follow a common flow:

1. Your **Organization** creates an **Instance** of a Program (e.g., a specific battery rebate rollout).
2. A user enrolls—typically by completing a Texture-hosted form or your custom flow using the API.
3. Texture evaluates eligibility—both in real time and asynchronously.

See below for how Programs, Program Instances, and Enrollments work on Texture.

For a deeper reference, check out our [overview docs](/docs/programs-enrollments/overview.md).

---

## What is a Program?

A **Program** defines the template for an offering users can enroll in—such as "DSGS," "Battery Rebate Program," or "Time-of-Use Billing Pilot."

- **Common fields**: name, description, logo, eligibility criteria, terms, service areas, start/end dates
- **Program Catalog**: Texture maintains a set of shared programs (e.g., DSGS)
- **Custom Programs**: Your **Organization** can also define its own

---

### Program vs. Program Instance

Each Program can have multiple **Program Instances**, which tailor that offering to a specific context:

- **Branding** (logo, name, imagery, copy)
- **Enrollment form** (URL, required fields)
- **Eligibility criteria** and terms

For example, you could run two DSGS Instances—each with its own sign-up form and region-specific rules.

:::tip
Program Instances allow for custom preferences, partner branding, or custom eligibility rules—all without redefining the underlying Program.
:::

---

## Program Instances

A **Program Instance** activates a Program for your **Organization**. Each Instance is fully configurable:

- **Example**: `battery_rebate_nyc` using the base "Battery Rebate Program" but customized for NYC customers
- Each Instance gets a unique `slug` used in enrollment forms and API calls
- Organizations can create multiple Instances from the same Program

### Create an Instance

Use the Texture API:

```http
POST /programs/{programSlug}/instances
```

**Define:**
- `name`, `description`, `logo`
- `eligibilityCriteria`
- `custom terms and fields`

See our API reference for full request and response details.

---

## Enrollments

An **Enrollment** is how a user joins a specific Program Instance. It includes the user's details, the target Instance, and any eligibility evaluation.

### What's Included
- **Customer info**: name, email, address
- **Program Instance**: the slug or ID
- **Custom fields**: flexible fields like utility account number or battery serial

### How to Enroll
1. **Texture-Generated Forms**
   - Use a branded, customizable form hosted by Texture
   - Data is stored automatically when submitted
2. **Custom UI + API**
   - Collect info in your own UI and call:

```http
POST /enrollments
```

---

## Enrollment Identification Methods

You can identify the enrolling user using one of four supported inputs:

- **enrollmentId** — Re-enroll a known customer; pulls prior data
- **customerId** — For existing [Contacts](/docs/platform-concepts/contacts.md) with contact info on file
- **leadId** — For [Leads](/docs/platform-concepts/leads.md); if required fields are missing, Texture returns a 400
- **customerInfo** — For brand new users; all fields must be included

:::caution
If you use `leadId` or `customerInfo`, ensure all required fields are present. Incomplete submissions will be rejected.
:::

---

## Checking Enrollment Status

Once submitted, check enrollment progress with:

```http
GET /enrollments/{enrollmentId}
```

Or retrieve filtered lists:

```http
GET /enrollments?status={status}
```

To receive real-time updates, configure [webhooks](/docs/platform-concepts/destinations/webhooks.md). Texture will send:
- `enrollment.submitted`
- `enrollment.approved`
- `enrollment.rejected`

---

## Eligibility Checks

Programs can define rules users must meet to qualify. Texture checks these during and after enrollment.

**Types of checks:**
- **Synchronous**: Instant checks (e.g., ZIP code, device spec)
- **Asynchronous**: Delayed validations (e.g., utility confirmation)

Track progress with the `eligibility.status` field.

**Typical statuses:**

| Status | Description |
|--------|-------------|
| **candidate** | Started but not fully evaluated |
| **eligible** | Passed initial checks |
| **ineligible** | Failed requirements |
| **submitted** | Formally submitted |
| **approved** | Fully qualified |
| **rejected** | Did not pass |
| **unenrolled** | Previously enrolled, now removed |

---

## Example Workflow

Here's how a battery rebate flow might work:

1. Org creates a Program Instance: `battery-rebate-nyc`
2. Shares Texture form link
3. User provides info
4. Texture runs synchronous checks
5. If eligible, user connects device or utility account
6. Texture performs async checks (if needed)
7. Enrollment progresses through status changes
8. Webhooks notify your system or you poll for updates

---

## Why Programs & Enrollments?

This model helps you:

- Run multiple tailored **Instances** from a shared **Program**
- Evaluate users **instantly** and over time
- Capture **flexible data**
- Automate with **webhook updates**

It lets you launch and scale offerings without rebuilding logic or sign-up flows each time.

---

## Additional Tips for Developers

- **Sandbox Testing**: Try flows in a non-production workspace
- **Error Handling**: Look at HTTP codes and `eligibility.reason` for rejections
- **Security**: Protect API keys and validate any external identifiers
- **Reference Docs**: See the API spec for all payloads and endpoint details

---

## Next Steps

- Explore the **[API Reference](/docs/api/overview.md)** for `/programs`, `/instances`, and `/enrollments`
- Set up **[Destinations](/docs/platform-concepts/destinations/destinations.md)** to receive webhooks
- **Customize or embed** Texture forms
- Reach out via **live chat** in the Dashboard for support or program requests