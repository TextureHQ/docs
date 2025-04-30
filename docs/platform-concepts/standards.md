---
sidebar_position: 12
---

# Standards

Texture supports industry-standard protocols for device communication and demand response, enabling seamless integration with a wide range of energy systems and market participants.

## Supported Standards

### IEEE 2030.5

**IEEE 2030.5** (formerly known as Smart Energy Profile 2.0) is a communication protocol for energy management that enables utilities, service providers, and customers to exchange information about energy usage and coordinate control of devices on the smart grid.

Key features of IEEE 2030.5:
- **Secure Communications**: Implements robust security mechanisms for device communication
- **Device Discovery**: Enables automatic device discovery and registration
- **Demand Response**: Supports demand response event messaging and participation
- **Distributed Energy Resources (DER)**: Provides capabilities for managing solar, storage, and other DERs
- **Metering**: Allows exchange of energy usage data

Texture supports IEEE 2030.5 specifically for device telemetry and control operations. This enables you to monitor and manage compatible devices through a standardized protocol while leveraging Texture's platform capabilities for analytics, automation, and integration.

### OpenADR 3.0

**OpenADR** (Open Automated Demand Response) is a standardized way for electricity providers and system operators to communicate demand response signals with each other and with their customers using a common language.

OpenADR 3.0 builds upon earlier versions with:
- **Enhanced Security**: Improved authentication and encryption mechanisms
- **Increased Flexibility**: More granular control and reporting capabilities
- **Broader Application**: Support for diverse grid services beyond traditional demand response
- **Improved Performance**: Optimized for higher volume and frequency of messages

Texture supports OpenADR 3.0 for controlling demand response participation, allowing you to seamlessly integrate with utility programs and grid services while maintaining visibility and control through the Texture platform.

## Implementation Notes

- We currently do not support OpenADR 2.x versions, though we welcome feedback if you have specific requirements for these older protocol versions.
- Implementation of these standards typically requires a bespoke setup depending on the specific devices being controlled and the systems they interface with.
- Our team works directly with customers to configure and validate the appropriate integration approach for each use case.
- Both standards can be used simultaneously within the same deployment for different aspects of your energy management strategy.

## Getting Started with Standards

If you're interested in leveraging IEEE 2030.5 or OpenADR 3.0 capabilities within your Texture implementation, please use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team. We'll work with you to understand your requirements and design an appropriate implementation plan.