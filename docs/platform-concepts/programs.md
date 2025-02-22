---
sidebar_position: 10
---

# Programs & Enrollments

A **Program** is any offering that requires a user to sign up or “enroll.” Common examples include:
- Demand response initiatives, like [California’s Demand Side Grid Support (DSGS) program](https://www.energy.ca.gov/programs-and-topics/programs/demand-side-grid-support-program)
- Battery rebate programs provided by utilities (e.g., [Xcel Energy’s Renewable Battery Connect](https://co.my.xcelenergy.com/s/renewable/battery-connect)) or CCAs (e.g. [3CE's Residential Battery Rebate Program](https://3cenergy.org/rebates/residential-battery-rebate-program/))
- Custom programs that your Organization may create and manage on Texture

From the Texture perspective, these Programs share a common workflow:
1. Your **Organization** creates an **Instance** of a Program (e.g., a specific battery rebate rollout in a certain region).  
2. A user Enrolls (typically by filling out a Texture-generated form or via your own custom flow calling the Texture API).
3. Texture validates eligibility—both in real time (synchronous checks) and over time (asynchronous checks).

Below is an overview of Programs, how to create Program Instances, and how Enrollments (including eligibility checks) work on the Texture Platform.

---

## What is a Program?

A Program defines the high-level structure for an offering that end users can enroll in. For example, “DSGS,” “Battery Rebate Program,” or “Time-of-Use Billing Pilot.”

- **Common fields**: name, description, logo, eligibility criteria, terms, states or regions where it’s available, start/end times, etc.  
- **Catalog vs. Organization-specific**: Texture maintains a catalog of standard programs (like DSGS or various battery rebates). Your Organization can also define its own.

### Program vs. Program Instance

A single Program can have multiple **Program Instances**, each potentially with different:
- **Branding** (logo, name, images, text)
- **Enrollment form URL** and fields
- **Eligibility criteria** or custom terms

Because each Organization’s requirements differ, you can create as many Instances of a Program as you need. For example, if your organization wants to run California DSGS in two different territories, you might set up two Instances—each with its own sign-up form link, name, and specialized set of data fields.

---

## Program Instances

Program Instances are how you **activate** a Program for your Organization. They let you customize the Program details, branding, and any extra data requirements.

- **Example**: `battery_rebate_nyc`, which uses the base “Battery Rebate Program” but is branded and configured specifically for New York City customers.  
- Each Instance has its own `slug` that you can use in a Texture-generated enrollment form URL or via API.
- An **Organization** can create multiple Instances of the same Program.

### Creation

You can create a Program Instance by calling the Texture API:

```
POST /programs/{programSlug}/instances
```

This lets you define things like:
- `name`, `description`, `logo`, etc.
- Additional or overriding `eligibilityCriteria`
- Custom terms for your Instance

See our interactive [API reference](/api) for details on the request and response formats.

---

## Enrollments

An **Enrollment** is how a specific user (Customer) joins a Program Instance. It bundles everything needed to validate a user’s participation.

### Enrollment Data
- **Customer info**: name, email, address, etc.
- **Program Instance**: which specific Program Instance the user is enrolling in.
- **Custom fields**: Some Programs require arbitrary data points (e.g., utility account number). Texture supports these via dynamic enrollment forms or through your own front-end calling our API.

### How to Enroll
1. **Texture-Generated Forms**  
   - Texture can generate a fully customizable form link for your Program Instance. You can brand it with your own name, logo, and required fields. Once a user submits, Texture stores their data automatically.
2. **Direct API Calls**  
   - If you have an existing sign-up flow, collect user info in your own UI and call:  
     ```
     POST /enrollments
     ```
     to create the Enrollment.

### Checking Enrollment Status

Once an enrollment is submitted, you can retrieve the status (and other information) by calling:

```
GET /enrollments/{enrollmentId}
```

Or fetch a list of enrollments with various filters via:

```
GET /enrollments?status={status}
```

For near real-time updates without polling, you can configure **Destination webhooks**. Texture will send:
- `enrollment.submitted` when a user first enrolls,
- `enrollment.approved` if they pass final checks,
- `enrollment.rejected` if they fail eligibility.

---

## Eligibility Checks

Many Programs come with eligibility rules. Texture can run these checks:
- **Synchronous**:  
  - E.g., verifying address location or battery specs instantly. Texture uses geocoding to confirm the address and can query device manufacturer APIs for capacity.
  - Provides real-time feedback (e.g., “You do not appear to be in California; you’re ineligible.”).
- **Asynchronous**:  
  - Some checks take extra time, like verifying enrollment history with third parties or utility confirmations. The user’s status updates as soon as these checks complete.

You can see the `eligibility.status` field in the Enrollment to track overall progress. Typical statuses:
- **candidate** – The user has started enrollment but not passed all checks yet
- **eligible** – All synchronous checks passed; asynchronous checks may still be ongoing
- **ineligible** – The user definitively doesn’t meet requirements
- **submitted** – The user’s enrollment data has been formally submitted
- **approved** – The enrollment is fully approved
- **rejected** – The user was ultimately rejected
- **unenrolled** – The user was once enrolled but has since been unenrolled

---

## Example Workflow

Below is a common end-to-end flow for a battery rebate Program:

1. **Organization Creates a Program Instance**  
   - E.g., `battery-rebate-nyc` with custom branding and eligibility rules.
2. **Shares a Texture Enrollment Form Link (Optional)**  
   - The form can be customized to capture your required fields, branding, and disclaimers.
3. **User Provides Basic Info**  
   - Name, address, etc.
4. **Texture Runs Synchronous Checks**  
   - Confirms location eligibility, basic Program requirements, etc.
5. **If Eligible, Prompt Device Connection**  
   - Texture prompts the user to connect their device (via Texture Connect) or link their utility account (via one of the configured Apps).
6. **Asynchronous Checks**  
   - If additional external validation is required (e.g., verifying utility account), Texture runs those in the background.
7. **Enrollment Status Updates**  
   - The status transitions from `candidate` → `eligible` → `submitted` → `approved` or `rejected` depending on final checks.
8. **Receive Webhook Notifications or Poll**  
   - If configured, you’ll receive `enrollment.submitted`, then `enrollment.approved` or `enrollment.rejected` webhooks. Otherwise, you can poll the `/enrollments/{id}` endpoint to track changes.

---

## Why Programs & Enrollments?

By introducing **Programs**, **Program Instances**, and **Enrollments**, Texture simplifies the process of managing complex offerings with unique branding, requirements, and sign-up flows. You can:

- **Handle multiple Program Instances** for the same underlying Program
- Run **instant** and **delayed** eligibility checks
- Capture **custom data fields** and attach relevant devices or utility accounts
- Receive real-time notifications via webhook on enrollment updates

This modular approach lets you focus on delivering valuable incentives or demand response initiatives without reinventing the entire sign-up and verification process each time.

---

## Additional Tips for Developers

- **Testing in Sandbox**: Create a sandbox workspace to trial your Program Instances and Enrollment flows before going live.  
- **Error Handling**: Check for proper HTTP status codes and `reason` fields in the `eligibility` object when the status is `ineligible` or `rejected`.  
- **Security**: Ensure you protect your API keys and verify any external references (like manufacturer IDs) to avoid unauthorized enrollments.  
- **Documentation & SDKs**: Refer to our [API reference](/docs/api) or consult available SDKs to streamline integration.

---

## Next Steps

- **Explore the API**  
  - [View our Swagger/OpenAPI spec](/api) for endpoints and payload details on `/programs`, `/programs/{programSlug}/instances`, `/enrollments`, etc.
- **Configure Destinations for Webhooks**  
  - Receive notifications pushed to your webhook endpoint(s) rather than polling for enrollment updates.
- **Build or Customize Enrollment Forms**  
  - Use Texture’s programmatic form generation or embed sign-up fields in your own UI.
- **Contact Us**  
  - If you need additional support or want a Program added to our catalog, reach out here via our [Customer Portal](https://texture.atlassian.net/servicedesk/customer/portal/2)