---
id: chargepoint
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# ChargePoint


<div className="manufacturer-hero-card">
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div className="manufacturer-details-section">
      <div className="manufacturer-logo-container">
        <div className="manufacturer-logo-wrapper">
          <img 
        src="https://device.cms.texture.energy/logo/ChargePoint%20Icon.png" 
        alt="ChargePoint logo" 
        className="manufacturer-logo"
      />
        </div>
      </div>
      
      <div className="manufacturer-details-grid">
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Type</span>
          <span className="manufacturer-detail-value">Energy Device Manufacturer</span>
        </div>
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Status</span>
          <span className="status-tag status-tag--planned">Planned</span>
        </div>
        
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Grid Services</span>
          <span className="manufacturer-detail-value">N/A</span>
        </div>
        
        
        <div className="manufacturer-detail-row device-types-row">
          <span className="manufacturer-detail-label">Supported Device Types</span>
          <span className="manufacturer-detail-value device-types-value">EV Chargers</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div className="manufacturer-about-section">
      <h3 className="manufacturer-about-title">About ChargePoint</h3>
      
      <p className="manufacturer-about-description">ChargePoint operates one of the world's largest networks of electric vehicle charging stations and energy management software platforms. The company provides Level 2 and DC fast charging hardware, cloud-based energy management systems, and smart grid integration solutions. Their charging infrastructure serves residential, commercial, workplace, and fleet applications across multiple energy market segments globally.</p>
    </div>
  </div>
</div>
