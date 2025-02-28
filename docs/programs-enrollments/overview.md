---
sidebar_position: 1
---

# Overview

## Introduction

The Programs and Enrollments system provides a flexible framework for managing energy-related initiatives and customer participation. This system enables organizations to create, customize, and manage various types of programs such as demand response, rebates, grid services, and more, while tracking customer enrollments throughout their lifecycle.

## System Architecture

The Programs and Enrollments system follows a hierarchical structure:

1. **[Programs](./programs.md)**: Top-level definitions of energy-related initiatives
2. **[Program Instances](./program-instances.md)**: Organization-specific implementations of programs
3. **[Enrollments](./enrollments.md)**: Individual customer participation records

This architecture allows for maximum flexibility while maintaining clear relationships between different components.

## Key Components

### Programs

[Programs](./programs.md) represent the base definitions of energy-related initiatives. They define:

- General program information (name, description)
- Geographic availability
- Program type and category
- Basic eligibility requirements
- Visibility (public or private)

Programs serve as templates that organizations can instantiate for their specific needs. Programs can be public (available to all Texture customers) or private (tailored to specific organizations and only visible to them).

### Program Instances

[Program Instances](./program-instances.md) are organization-specific implementations of programs. They allow organizations to:

- Customize program branding and messaging
- Define specific eligibility criteria
- Configure enrollment forms and workflows
- Set program-specific terms and conditions
- Manage program lifecycle (start/end dates)

Each organization can create multiple instances of the same program, tailored to different customer segments or regions.

### Enrollments

[Enrollments](./enrollments.md) track individual customer participation in program instances. They:

- Connect customers to specific program instances
- Track eligibility and participation status
- Store customer contact and location information
- Maintain program-specific metadata
- Record the enrollment lifecycle from application to completion

### Texture Onboard

[Texture Onboard](./onboard.md) provides a ready-to-use enrollment solution that:

- Creates hosted enrollment forms automatically for Program Instances
- Provides a mobile-optimized, conversion-focused customer experience
- Minimizes required customer input with automated background processing
- Streamlines downstream integration with partners
- Requires zero development work to implement

## Common Workflows

### Program Creation and Management

1. System administrators define base programs
2. Organizations create customized program instances
3. Organizations configure enrollment forms and eligibility rules
4. Organizations activate program instances for customer enrollment

### Customer Enrollment Process

1. Customers discover available programs
2. Customers apply for enrollment (via forms or API)
3. System evaluates eligibility (synchronous and asynchronous checks)
4. Enrollment status updates through a defined workflow
5. Organizations manage and track customer participation

### Using Texture Onboard

1. Organization creates a Program Instance with a unique slug
2. Organization enables Texture Onboard in the dashboard
3. Organization shares the enrollment URL with potential customers
4. Customers complete the mobile-optimized enrollment form
5. Texture automatically processes data and evaluates eligibility
6. Texture integrates with downstream partners as needed
7. Enrollment status is updated in real-time

## Integration Points

The Programs and Enrollments system integrates with:

- **Customer Management**: To access and update customer information
- **Device Management**: To verify device ownership and capabilities
- **Notification Systems**: To communicate enrollment status changes
- **External Systems**: Via webhooks for real-time updates

## Getting Started

To begin working with Programs and Enrollments:

1. Review the [Programs documentation](./programs.md) to understand available program types
2. Learn how to create and manage [Program Instances](./program-instances.md) for your organization
3. Explore the [Enrollments API](./enrollments.md) to manage customer participation
4. Learn how to use [Texture Onboard](./onboard.md) for zero-code enrollment forms

## API Access

All components of the Programs and Enrollments system are accessible via REST API endpoints. See the individual documentation pages for specific endpoint details:

- [Programs API](./programs.md#api-access)
- [Program Instances API](./program-instances.md#api-access)
- [Enrollments API](./enrollments.md#api-access)