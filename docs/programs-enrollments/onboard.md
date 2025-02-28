---
sidebar_position: 5
---

# Texture Onboard

## Overview

Texture Onboard is a streamlined enrollment solution that enables organizations to easily collect customer information and process program enrollments through Texture-hosted enrollment forms. These forms are optimized for conversion, mobile-friendly, and designed to simplify the enrollment process for both organizations and their customers.

## Key Features

- **Ready-to-use Enrollment Forms**: Texture-hosted forms that are immediately available when a Program Instance is activated
- **Mobile-optimized Experience**: Forms are fully responsive and designed for both desktop and mobile users
- **Conversion-optimized Design**: Drawing from e-commerce best practices to maximize completion rates
- **Minimal Customer Input**: Collects only essential information, with Texture handling additional processing
- **Automated Background Intelligence**: Enriches customer-provided data with utility mapping, geocoding, and more
- **Seamless Integration**: Handles downstream enrollment with partners like Tesla Grid Services or Leap

## How It Works

When you create a Program Instance in Texture, you can easily enable the Onboard enrollment form by flipping a switch in the Texture Dashboard. This automatically creates a hosted enrollment form at a unique URL:

```
onboard.texturehq.com/programs/:programInstanceSlug
```

This is why each Program Instance requires a globally unique `programInstanceSlug` - it serves as the URL identifier for the enrollment form.

### Enrollment Process Flow

1. **Form Activation**: Organization enables the enrollment form for a Program Instance
2. **Customer Acquisition**: Organization shares the enrollment URL with customers via email, text, or other channels
3. **Customer Completion**: Customer fills out the minimal required information
4. **Background Processing**: Texture automatically enhances submitted data:
   - Geocodes addresses
   - Maps to utility service territories
   - Identifies eligible devices
   - Processes eligibility criteria
5. **Downstream Integration**: If needed, Texture handles communication with partner systems (Tesla Grid Services, Leap, etc.)
6. **Status Updates**: Enrollment status is automatically updated when responses from partners are received

## Benefits

### For Organizations

- **Quick Setup**: No development work required to create enrollment forms
- **Higher Conversion**: Professionally designed forms optimized for completion
- **Reduced Data Collection**: Texture handles background processing to minimize customer friction
- **Automatic Integrations**: Built-in connections to downstream services
- **Status Tracking**: Real-time visibility into enrollment progress

### For Customers

- **Simple Experience**: Mobile-friendly forms that collect only necessary information
- **Streamlined Process**: No redundant data entry or complex steps
- **Quick Completion**: Optimized for fast, frictionless enrollment

## Real-world Example

For a battery rebate program, the enrollment experience might look like:

1. Customer receives a link to `onboard.texturehq.com/programs/battery-rebate-program-2023`
2. Customer enters their name, email, and address
3. Texture automatically:
   - Geocodes the address
   - Identifies the customer's utility provider
   - Determines eligibility based on service territory
4. If eligibility requirements are met, Texture initiates any necessary downstream enrollments
5. Customer and organization receive status updates as the enrollment progresses

## Implementation Details

The enrollment form is highly customizable while maintaining a consistent, user-friendly experience. When setting up a Program Instance, you can configure:

- Branding elements (logo, colors)
- Required fields
- Custom terms and conditions
- Success/failure messaging
- Redirect URLs

## Technical Architecture

The Onboard system uses a dedicated application (`onboard.texturehq.com`) that:

1. Reads Program Instance configuration from the Texture API
2. Dynamically generates enrollment forms based on program requirements
3. Validates and processes customer submissions
4. Interacts with backend systems for data enrichment
5. Manages the enrollment lifecycle

## Getting Started

To enable the Texture Onboard enrollment form for your Program Instance:

1. Start with either a public Program from the catalog or work with Texture to create a private Program for your organization
2. Create a Program Instance with a unique, descriptive slug
3. Enable the enrollment form toggle in the Texture Dashboard
4. Customize the form appearance and fields as needed
5. Share the generated enrollment URL with your customers

No additional development work is required - Texture handles the entire enrollment form creation and hosting process. The Onboard forms work with both public and private Programs, allowing you to create custom enrollment experiences regardless of program type.

## Best Practices

- **Use Descriptive Slugs**: Create clear, memorable slugs for your Program Instances
- **Limit Required Fields**: Ask only for essential information to improve conversion rates
- **Test the Form**: Go through the enrollment process yourself before sharing with customers
- **Provide Clear Context**: When sharing enrollment links, include clear information about the program
- **Monitor Enrollments**: Regularly check enrollment status and address any issues promptly