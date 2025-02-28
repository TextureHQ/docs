# Enrollments

## Overview

Enrollments represent a user's participation in a specific program instance within the platform. They track a customer's eligibility and participation status in a particular program, allowing organizations to manage participants, track enrollment status, and maintain enrollment-related data.

## Core Concepts

### What is an Enrollment?

An enrollment is a record that connects a customer to a specific [program instance](./programs.md). It contains:

- Customer identification information
- Program participation details
- Eligibility status
- Contact and location information
- Tracking metadata

### Enrollment Statuses

Enrollments follow a defined workflow with these statuses:

| Status | Description |
|--------|-------------|
| `candidate` | Initial state for potential enrollees; customer has been identified as a potential program participant but not yet evaluated |
| `eligible` | Customer meets all program requirements and can proceed with enrollment |
| `ineligible` | Customer does not meet program requirements due to location, device ownership, or other criteria |
| `submitted` | Customer has completed enrollment application and it's awaiting review |
| `approved` | Enrollment has been reviewed and accepted into the program |
| `rejected` | Enrollment has been reviewed and denied program participation |
| `unenrolled` | Customer was previously enrolled but has voluntarily or involuntarily exited the program |

### Enrollment Status Flow

The typical progression of an enrollment follows this path:

1. **Candidate** → Initial state when a potential participant is identified
2. **Eligibility Check** → System or manual evaluation of program requirements
   - If requirements met → **Eligible**
   - If requirements not met → **Ineligible** (process stops)
3. **Eligible** → Customer completes enrollment process → **Submitted**
4. **Submitted** → Program administrator review
   - If approved → **Approved** (active participation begins)
   - If rejected → **Rejected** (process stops)
5. **Approved** → If customer leaves program → **Unenrolled**

### Eligibility Reasons

The `eligibilityReason` field provides context for the current status:

- For **Eligible** status: May include qualifying factors like "Has solar installation" or "In service territory"
- For **Ineligible** status: Explains disqualifying factors like "Outside service area" or "Incompatible equipment"
- For **Rejected** status: May include reasons like "Failed verification" or "Incomplete information"

### Identification Types

Enrollments can be created using four different identification methods:

- **leadId**: For new leads with an existing lead ID
- **customerId**: For existing customers 
- **enrollmentId**: For updating existing enrollments, often to re-enroll in a program the following year
- **customerInfo**: For new enrollments with customer details (name, email, etc.)

We require one of these identification methods and each identification method alters the information we need. For example if you are supplying a `customerId` you do not need to send us first/last/email because those are required fields on the Customer and so we already have those.

Providing `customerInfo` basically means you are providing all identifiable information in this request.

## Data Model

An Enrollment record contains:

```typescript
interface Enrollment {
  id: string;                      // Unique identifier
  identificationType: string;      // Type of ID (leadId, customerId, etc.)
  programInstanceId: string;       // Associated program instance ID
  address?: Address;               // Customer's address
  phone?: string;                  // Contact phone number
  manufacturerSlugs?: string[];    // Associated device manufacturers
  metadata?: Record<string, any>;  // Arbitrary data for program needs
  serialNumber?: string;           // Device serial number
  referenceId?: string;            // External reference ID
  referenceDescription?: string;   // Description for the reference
  tags?: string[];                 // Categorization tags
  enrollmentStartDate?: Date;      // Start date if approved
  eligibilityStatus: string;       // Current status
  eligibilityReason?: string;      // Explanation of status
  leadId?: string;                 // Lead ID if applicable
  customerId?: string;             // Customer ID if applicable
  enrollmentId?: string;           // Enrollment ID if applicable
  firstName?: string;              // Customer's first name
  lastName?: string;               // Customer's last name
  email?: string;                  // Customer's email
}
```

## Status Transition Rules

The following business rules govern enrollment status transitions:

1. Only **Eligible** enrollments can be moved to **Submitted**
2. Only **Submitted** enrollments can be **Approved** or **Rejected**
3. Only **Approved** enrollments can be **Unenrolled**
4. **Rejected** and **Ineligible** are terminal states (unless enrollment criteria change)
5. Status changes may trigger notifications to customers and program administrators

## API Access

Enrollments can be accessed and managed through both REST API and GraphQL endpoints.

### REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/enrollments/{enrollmentId}` | GET | Retrieve a specific enrollment |
| `/enrollments/{enrollmentId}` | DELETE | Delete an enrollment |
| `/programInstances/{instanceId}/enrollments` | GET | List enrollments for a program instance |
| `/programInstances/{instanceId}/enrollments` | POST | Create enrollment for a program instance |

## Authentication & Authorization

All enrollment endpoints require authentication with either:
- An API key
- A scoped key with appropriate permissions

Access is restricted to enrollments within the authenticated user's workspace.

## Related Concepts

Enrollments are part of a hierarchical relationship:

1. **Program**: Top-level concept representing a general program offering (e.g., a utility rebate program)
2. **ProgramInstance**: A program instance within a specific workspace (organization context). See [Program Instances](./program-instances.md) for more details.
3. **Enrollment**: A customer's participation in a specific Program Instance

## Implementation Details

The Enrollment feature is implemented across different layers:

- **Domain Layer**: Core business logic, database interactions, and data validation
- **API Layer**: REST endpoints with OpenAPI documentation
- **GraphQL Layer**: Federated graph queries and mutations

## Usage Examples

### Program Instance ID

The `programInstanceId` (shown as `cllgn0u4r000008l7eazybfbo` in the examples below) is a unique identifier for a specific program instance. This ID is crucial as it:

- Links enrollments to their parent program instance
- Serves as a required parameter in API requests
- Enables filtering and organization of enrollments by program
- Maintains the hierarchical relationship between programs and enrollments

Program Instance IDs are generated as CUIDs (Collision-resistant Unique Identifiers) when a program instance is created, ensuring uniqueness across the platform.

For more information on Program Instances, including how to create them, see the [Program Instances documentation](./program-instances.md).

### Creating an Enrollment

To create an Enrollment, you must first have created a [Program Instance](./program-instances.md).

Then once you have that Program Instance you can enroll a customer as follows:

```typescript
// Example POST request to /programInstances/cllgn0u4r000008l7eazybfbo/enrollments
const enrollmentData = {
  identificationType: "customerInfo",
  firstName: "Suzie",
  lastName: "Homeowner",
  email: "suzie.homeowner@example.com",
  phone: "+1234567890",
  address: {
    streetOne: "123 Main St",
    streetTwo: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA"
  },
  manufacturerSlugs: ["tesla", "enphase"],
  serialNumber: "1234567890",
  referenceId: "1234567890",
  referenceDescription: "Tesla Grid Services id.",
  tags: ["tag1", "tag2"]
};
```

### Retrieving Enrollments

```typescript
// Example GET request to /programInstances/cllgn0u4r000008l7eazybfbo/enrollments
// Returns paginated list of enrollments for the program instance

// Sample response:
{
  "data": [
    {
      "id": "cllgn0u4r000008l7eazybfbo",
      "leadId": "cllgn0u4r000008l7eazybfbo",
      "customerId": "cllgn0u4r000008l7eazybfbo",
      "firstName": "Suzie",
      "lastName": "Homeowner",
      "email": "suzie.homeowner@example.com",
      "phone": "+1234567890",
      "manufacturerSlugs": [
        "tesla",
        "enphase"
      ],
      "meta": {
        "property1": null,
        "property2": null
      },
      "serialNumber": "1234567890",
      "referenceId": "1234567890",
      "referenceDescription": "Tesla Grid Services id.",
      "programInstanceId": "cllgn0u4r000008l7eazybfbo",
      "enrollmentStartDate": "2025-01-01T00:00:00Z",
      "tags": [
        "tag1",
        "tag2"
      ],
      "address": {
        "streetOne": "123 Main St",
        "streetTwo": "Apt 4B",
        "city": "New York",
        "state": "NY",
        "postalCode": "10001",
        "country": "USA"
      },
      "eligibility": {
        "status": "candidate",
        "reason": "The customer is already enrolled in another program.",
        "programInstanceId": "cllgn0u4r000008l7eazybfbo"
      }
    }
  ],
  "page": 0,
  "perPage": 0,
  "totalItems": 0,
  "totalPages": 0
}
```

## Event System

The platform tracks enrollment lifecycle events:
- `enrollment.created` - When a new enrollment is created
- `enrollment.updated` - When an enrollment's status or data changes
- `enrollment.status_changed` - When an enrollment moves to a new status

These events can be used by other systems to react to enrollment changes.

## Common Use Cases

### Program Eligibility Screening
- Bulk import of **Candidate** enrollments
- Automated evaluation to **Eligible** or **Ineligible**
- Notification to eligible customers

### Customer Self-Enrollment
- Customer completes enrollment form
- Status set to **Submitted**
- Program administrator reviews and sets to **Approved** or **Rejected**

### Program Exit Processing
- Change status to **Unenrolled**
- Update metadata with exit reason
- Trigger any program exit workflows