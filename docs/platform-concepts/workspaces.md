---
sidebar_position: 9
---

# Workspaces

import { Subtitle } from '@site/src/components/Subtitle';

<Subtitle>Isolated environments that group resources, roles, and API access within an Organization</Subtitle>

## What is a Workspace?

Workspaces are a way to organize your projects and their resources. Each workspace is its own encapsulated environment with its own [API keys](/api/keys), [Devices](devices), [Destinations](destinations), etc. This allows for the developer to have the flexibility they need to play, test, and integrate with the Texture Platform and API.

By default, Workspaces are shared with all Members of an Organization.

## Why Workspaces?

Workspaces help you build safely and confidently. They keep staging and production environments separate—so testing never impacts real infrastructure.

Each Workspace is fully isolated:

- **Devices** only exist in one Workspace
- **API keys** grant access to a single Workspace
- **Destinations, Commands, and telemetry** are scoped independently

This structure prevents cross-environment mistakes—like accidentally sending a command to a production Device from a test script.

:::caution
Devices cannot be moved between Workspaces. To migrate a Device, reconnect it in the new Workspace and delete it from the original.
:::

Workspaces let you:

- Spin up clean environments for testing or demos
- Safely collaborate across teams or roles
- Apply strict access control with scoped API tokens

This model supports a clean separation of responsibilities while giving developers room to play, prototype, and operate with confidence.

## Default Workspaces

When you create an Organization, you are automatically given two default Workspaces. We create one called `production` and another called `sandbox` for you. This helps you get started quickly and will accommodate most basic use cases out of the box.

## Creating a Workspace

To create a Workspace:

1. Open the Workspace dropdown in the top-left of the Dashboard
2. Click **Add Workspace**
3. Name your Workspace (names must be unique within the Organization)

You can also go to **Settings > Organization > Workspaces** and click **Create Workspace**.

:::tip
There's no limit to how many Workspaces you can create. Some teams create one per developer, others per environment or project.
:::

## Switching Workspaces

### How to switch Workspaces

- Use the dropdown in the top-left of the Dashboard
- Select any Workspace in your Organization

import changeWorkspaceImage from '/img/change-workspace.png'

<img src={changeWorkspaceImage} alt="Change Workspace" style={{ maxHeight: '300px' }} />

### When you switch Workspaces:

- Only resources scoped to that Workspace appear (e.g., Devices, API Keys)
- The context in the Dashboard updates automatically
- Your last-used Workspace is remembered across sessions

## Access and Permissions

- All Workspaces are visible to every Member of an Organization by default
- Only Admins can create, rename, or delete Workspaces
