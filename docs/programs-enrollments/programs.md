---
sidebar_position: 2
---

# Programs

## Overview

Programs are utility, energy provider, or incentive programs related to energy management. They represent specific offerings that organizations provide to their customers, such as rebate programs, grid services programs, or demand response programs. The Programs feature provides a framework for defining, managing, and tracking customer participation in energy-related initiatives.

## Core Concepts

### What is a Program?

A program is a defined offering that represents a specific energy-related initiative. Programs exist in a hierarchical structure:

1. **Program** (top level): The base definition of the program offering
2. **Program Instance** (middle level): An organization-specific instance of a program within a workspace
3. **Enrollment** (bottom level): Individual customer participation in a specific Program Instance

### Program Types

Programs can represent various energy-related initiatives:

- Demand response programs
- Grid services programs
- Rebate programs
- Energy efficiency programs
- Virtual power plant (VPP) programs
- Time-of-use rate programs

### Program Visibility

Programs can be classified by their visibility:

- **Public Programs**: Available to all Texture customers to create instances. Examples include state-run programs like DSGS (California Demand Side Grid Support) that any organization can participate in. Public programs are visible in the program catalog and can be instantiated by any organization through the API or Dashboard.

- **Private Programs**: Specific to a particular customer and only visible to them. These are typically custom programs created for specific organizations like utilities or DERMS providers. Private programs are only accessible to the organizations they were created for and don't appear in the general program catalog.

Texture can help create private programs tailored to specific organizational needs while ensuring they remain visible only to the intended customer.

### Program States

Programs can be:

- **Active**: Currently available for enrollment
- **Inactive**: Not currently accepting new enrollments

## Data Model

### Program

The base program definition contains:

```typescript
interface Program {
  id: string;               // Unique identifier
  slug: string;             // Machine-readable identifier (e.g., "nyc-battery-program-2025")
  name: string;             // Human-readable name (e.g., "NYC Battery Program 2025")
  description: string;      // Description of the program
  states: string[];         // US states where program is available (e.g., ["NY", "NJ"])
  active: boolean;          // Whether program is currently active
  visibility: string;       // "public" or "private"
  year: number | null;      // Program year (e.g., 2025)
  endTime?: Date;           // When the program ends
}
```

### Program Instance

A specific instance of a program within an organization's workspace:

```typescript
interface ProgramInstance {
  id: string;                   // Unique identifier
  slug: string;                 // Machine-readable identifier
  program: Program;             // Reference to parent program
  title: string;                // Title of this specific instance
  description: string;          // Description specific to this instance
  eligibilityCriteria: string;  // Requirements to participate
  programTerms: string;         // Legal terms for participation
  organizationId: string;       // Organization that created this instance
  workspaceId: string;          // Workspace containing this instance
  customFields?: Record<string, any>; // Additional custom data fields
  logoUrl?: string;             // Program logo image URL
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Program Lifecycle

Programs typically follow this lifecycle:

1. **Creation**: System administrators define base programs
2. **Instantiation**: Organizations create workspace-specific instances of programs
3. **Enrollment**: Customers enroll in program instances
4. **Management**: Organizations track and manage enrollments
5. **Completion/Termination**: Programs end or are deactivated

## API Access

Programs can be accessed and managed through REST API endpoints.

### REST API Endpoints

#### Programs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/programs` | GET | List all available programs |
| `/programs` | POST | Create a new program |
| `/programs/{programSlug}` | GET | Get a specific program |

#### Program Instances

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/programInstances` | GET | List all program instances |
| `/programInstances` | POST | Create a new program instance |
| `/programInstances/{instanceId}` | GET | Get a specific program instance |
| `/programInstances/{instanceId}/enrollments` | GET | List enrollments for a program instance |
| `/programInstances/{instanceId}/enrollments` | POST | Create enrollment for a program instance |

## Authentication & Authorization

All program endpoints require authentication with either:
- An API key
- A scoped key with appropriate permissions

Access to programs is restricted based on:
- Workspace/organization membership
- User role permissions
- Program state (active/inactive)

## Related Concepts

### Enrollments

Enrollments represent customer participation in a program. Key aspects:

- Link customers to specific program instances
- Track eligibility status
- Maintain customer contact information
- Store program-specific metadata
- Record participation history

For more details on enrollments, see the [Enrollments documentation](./enrollments.md).

### Program Instances

Program Instances allow organizations to customize and deploy programs for their specific needs. For more information, see the [Program Instances documentation](./program-instances.md).

### Eligibility

Programs define eligibility criteria:

- Geographic restrictions (states)
- Device ownership requirements
- Energy usage patterns
- Customer characteristics

Eligibility is checked during the enrollment process and stored as part of the enrollment record.

## Implementation Details

The Program feature is implemented across different layers:

- **Domain Layer**: Core business logic, database interactions, and data validation
- **API Layer**: REST endpoints with OpenAPI documentation

## Usage Examples

### Retrieving Available Programs

```typescript
// Example GET request to /programs
// Returns all programs available to the organization (both public programs and private programs for this organization)
```

### Creating a Private Program

```typescript
// Example POST request to /programs (requires admin permissions)
const privateProgram = {
  name: "Utility XYZ Battery Peak Shaving Program",
  slug: "utility-xyz-battery-peak-shaving",
  description: "Custom battery peak shaving program for Utility XYZ customers",
  states: ["CA"],
  active: true,
  visibility: "private",
  organizationId: "org_123456",
  year: 2025
};
```

### Creating a Program Instance

```typescript
// Example POST request to /programInstances
const programInstanceData = {
  programSlug: "nyc-battery-program-2025",
  title: "NYC Battery Program 2025 - ConEd Customers",
  description: "Battery rebate program for ConEd customers in NYC",
  eligibilityCriteria: "Must have a residential battery system installed after January 1, 2025",
  programTerms: "Participants agree to allow utility control during peak events",
  logoUrl: "https://example.com/program-logo.png"
};
```

### Filtering Programs by State

```typescript
// Example GET request to /programs?state=NY
// Returns all programs available in New York state
```

### Viewing Only Public Programs

```typescript
// Example GET request to /programs?visibility=public
// Returns only public programs available to all organizations
```

## Common Use Cases

### Utility Demand Response Programs

- Set up a demand response program for peak load management
- Define criteria for customer participation
- Track enrollments and participation rates
- Manage customer communication during events

### Custom Private Utility Programs

- Work with Texture to create a private program visible only to your organization
- Design custom eligibility requirements specific to your service territory
- Create a white-labeled enrollment experience for your customers
- Track enrollments and participation specific to your program

### Rebate Programs

- Define rebate amounts and qualifying criteria
- Process customer applications
- Track rebate status through approval workflow
- Report on program effectiveness

### Energy Efficiency Programs

- Set up energy efficiency program parameters
- Define measurement and verification processes
- Track customer participation and savings
- Report on program outcomes