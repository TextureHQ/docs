---
sidebar_position: 3
---

# Program Instances

## Overview

Program Instances represent specific implementations of a general program offering within an organization's workspace. They allow organizations to customize and deploy standardized programs with their own branding, eligibility criteria, and configuration settings.

## Core Concepts

### What is a Program Instance?

A Program Instance is the concrete implementation of a [Program](./programs.md) within a specific organizational context. While a Program defines the general structure and purpose (e.g., "Battery Rebate Program"), a Program Instance represents a specific deployment with:

- Custom branding and naming
- Organization-specific eligibility rules
- Unique enrollment forms and fields
- Specific geographic or temporal boundaries
- Custom terms and conditions

Program Instances can be created from either public Programs (available to all Texture customers) or private Programs (visible only to specific organizations). This allows organizations to either leverage standardized industry programs or work with Texture to create custom programs tailored to their specific needs.

### Program Instance Lifecycle

Program Instances follow this general lifecycle:

1. **Creation**: An organization selects a Program from the catalog or creates a custom Program
2. **Configuration**: The organization customizes the Program Instance with branding, eligibility criteria, etc.
3. **Activation**: The Program Instance becomes available for enrollments
4. **Operation**: Customers enroll and participate in the Program Instance
5. **Deactivation**: When complete, the Program Instance may be archived or deactivated

## Data Model

A Program Instance record contains:

```typescript
interface ProgramInstance {
  id: string;                      // Unique identifier (CUID)
  programId: string;               // Reference to parent Program
  workspaceId: string;             // Organization workspace ID
  name: string;                    // Display name
  description?: string;            // Detailed description
  slug: string;                    // URL-friendly identifier
  logoUrl?: string;                // Branding image URL
  eligibilityCriteria?: object;    // Custom eligibility rules
  customTerms?: string;            // Organization-specific terms
  formConfig?: object;             // Enrollment form configuration
  startDate?: Date;                // Program start date
  endDate?: Date;                  // Program end date
  status: string;                  // active, inactive, archived
  metadata?: Record<string, any>;  // Custom fields
  createdAt: Date;                 // Creation timestamp
  updatedAt: Date;                 // Last update timestamp
}
```

## Program Instance ID

The `programInstanceId` (shown as `cllgn0u4r000008l7eazybfbo` in examples) is a unique identifier for a specific program instance. This ID is crucial as it:

- Links enrollments to their parent program instance
- Serves as a required parameter in API requests
- Enables filtering and organization of enrollments by program
- Maintains the hierarchical relationship between programs and enrollments

Program Instance IDs are generated as CUIDs (Collision-resistant Unique Identifiers) when a program instance is created, ensuring uniqueness across the platform.

## API Access

Program Instances can be managed through REST API endpoints.

### REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/programs/{programSlug}/instances` | POST | Create a new Program Instance |
| `/programInstances/{instanceId}` | GET | Retrieve a specific Program Instance |
| `/programInstances/{instanceId}` | PATCH | Update a Program Instance |
| `/programInstances/{instanceId}` | DELETE | Delete a Program Instance |
| `/programInstances` | GET | List Program Instances (with filtering) |

## Authentication & Authorization

All Program Instance endpoints require authentication with either:
- An API key
- A scoped key with appropriate permissions

Access is restricted to Program Instances within the authenticated user's workspace.

## Usage Examples

### Creating a Program Instance

```typescript
// Example POST request to /programs/battery-rebate/instances
const programInstanceData = {
  name: "NYC Battery Rebate Program 2023",
  description: "Battery rebate program for NYC residents",
  slug: "battery-rebate-nyc-2023",
  logoUrl: "https://example.com/logos/nyc-rebate.png",
  eligibilityCriteria: {
    regions: ["NY"],
    deviceTypes: ["battery"],
    minimumCapacity: 5.0
  },
  customTerms: "Participants must be NYC residents with proof of purchase...",
  startDate: "2023-01-01T00:00:00Z",
  endDate: "2023-12-31T23:59:59Z"
};
```

### Retrieving a Program Instance

```typescript
// Example GET request to /programInstances/cllgn0u4r000008l7eazybfbo
// Returns the program instance details

// Sample response:
{
  "id": "cllgn0u4r000008l7eazybfbo",
  "programId": "prog_battery_rebate",
  "workspaceId": "ws_123456",
  "name": "NYC Battery Rebate Program 2023",
  "description": "Battery rebate program for NYC residents",
  "slug": "battery-rebate-nyc-2023",
  "logoUrl": "https://example.com/logos/nyc-rebate.png",
  "eligibilityCriteria": {
    "regions": ["NY"],
    "deviceTypes": ["battery"],
    "minimumCapacity": 5.0
  },
  "customTerms": "Participants must be NYC residents with proof of purchase...",
  "startDate": "2023-01-01T00:00:00Z",
  "endDate": "2023-12-31T23:59:59Z",
  "status": "active",
  "createdAt": "2022-12-15T10:30:00Z",
  "updatedAt": "2022-12-15T10:30:00Z"
}
```

## Common Use Cases

### Program Customization
- Create multiple variants of the same base program for different regions
- Apply organization-specific branding and messaging
- Define custom eligibility rules for different customer segments

### Enrollment Management
- Generate enrollment forms specific to a Program Instance
- Track enrollments by Program Instance
- Analyze participation rates across different Program Instances

### Program Lifecycle Management
- Activate and deactivate Program Instances based on seasonal needs
- Archive completed Program Instances while maintaining historical data
- Iterate on Program Instance design based on performance metrics

## Related Concepts

Program Instances are part of a hierarchical relationship:

1. **Program**: Top-level concept representing a general program offering (e.g., a utility rebate program)
2. **Program Instance**: A program instance within a specific workspace (organization context)
3. **Enrollment**: A customer's participation in a specific Program Instance

For more information on how to create enrollments for a Program Instance, see the [Enrollments documentation](./enrollments.md). 