---
id: texture-os
title: TextureOS
sidebar_position: 3
---

# TextureOS

<div style={{ textAlign: 'center', margin: '20px 0' }}>
  <img 
    src="https://device.cms.texture.energy/logo/Texture%20Vector%20Icon.svg" 
    alt="TextureOS logo" 
    style={{ maxWidth: '200px', maxHeight: '150px' }}
  />
</div>

**⚠️ IMPORTANT: TextureOS is NOT an actual device manufacturer. Texture does not manufacture any physical devices whatsoever. We are purely a software company.**

These are **virtual devices created by Texture for testing and development purposes**. They are not real devices that exist in the real world.

## What are Virtual Devices?

Virtual devices allow you to experience the full Texture platform functionality without needing physical hardware:

- ✅ View telemetry data 
- ✅ Run commands
- ✅ Test all platform features
- ✅ Everything you can do with real devices

## Important Limitations

**⚠️ The device data is entirely random and not representative of real device behavior.**

Virtual devices are **not useful** for testing scenarios where you expect realistic device responses, such as:
- Testing battery state changes after commands
- Expecting devices to switch from grid import to export
- Any testing that requires predictable or realistic telemetry patterns

The data is randomly generated and does not reflect actual device physics or behavior.

## Support Status

**Support Level**: ✅ Available for development and testing

**Grid Services Support**: ✅ Supported (with random data)

## Supported Virtual Device Types

Electric Vehicles, Smart Thermostats, EV Chargers, Solar Inverters, Batteries

## OAuth Flow Testing

Virtual devices are **excellent for testing the OAuth flow** and user onboarding via Texture's Hosted Onboarding experience.

**Cannot be used for testing:**
- Direct access onboarding (installer credentials, TPO credentials)
- Certain grid services that don't support OAuth

## Getting Started with Virtual Devices

Virtual devices are helpful for developers to explore the platform, but the user experience is not currently polished.

**Interested in adding virtual devices to your platform?** [Contact us](mailto:support@texture.energy) to discuss your use case and we can help you get started.



