---
id: jaguar
title: Jaguar
sidebar_position: 3
---


<div className="manufacturer-hero-card">
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div className="manufacturer-details-section">
      <div className="manufacturer-logo-container">
        <div className="manufacturer-logo-wrapper">
          <img 
        src="https://device.cms.texture.energy/logo/Jaguar.svg" 
        alt="Jaguar logo" 
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
          <span className="status-tag status-tag--production">Production Ready</span>
        </div>
        
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Grid Services</span>
          <span className="manufacturer-detail-value">N/A</span>
        </div>
        
        
        <div className="manufacturer-detail-row device-types-row">
          <span className="manufacturer-detail-label">Supported Device Types</span>
          <span className="manufacturer-detail-value device-types-value">Electric Vehicles</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div className="manufacturer-about-section">
      <h3 className="manufacturer-about-title">About Jaguar</h3>
      
      <p className="manufacturer-about-description">Jaguar manufactures luxury electric vehicles and charging systems including the I-PACE electric SUV with advanced battery technology and energy management features. The British manufacturer, part of Jaguar Land Rover, produces premium battery electric vehicles and charging infrastructure. Their systems integrate smart charging capabilities and energy recovery technology for high-end residential and commercial applications.</p>
    </div>
  </div>
</div>

<style jsx>{`
  .manufacturer-hero-card {
    background: var(--ifm-card-background-color);
    border: 1px solid #9ca3af;
    border-radius: 12px;
    margin-bottom: 32px;
  }

  .manufacturer-hero-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: stretch;
  }

  .manufacturer-details-section {
    border-right: 1px solid #d1d5db;
    background: #f8fcff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .manufacturer-logo-container {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    padding: 24px 24px 0 24px;
  }

  .manufacturer-logo-wrapper {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    flex-shrink: 0;
    width: 200px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .manufacturer-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.9;
  }

  .manufacturer-logo-placeholder {
    width: 160px;
    height: 80px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #6b7280;
  }

  .manufacturer-details-grid {
    display: grid;
    gap: 12px;
    padding: 0 24px 24px 24px;
  }

  .manufacturer-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .manufacturer-detail-row:last-child {
    border-bottom: none;
  }

  .manufacturer-detail-label {
    font-weight: 500;
    color: #6b7280;
    font-size: 14px;
  }

  .manufacturer-detail-value {
    font-weight: 600;
    color: #1f2937;
    font-size: 14px;
  }

  .manufacturer-website-link {
    color: #444ae1;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: text-decoration 0.2s ease;
  }

  .manufacturer-website-link:hover {
    text-decoration: underline;
  }

  .device-types-row {
    align-items: flex-start;
    padding: 16px 0;
  }

  .device-types-value {
    text-align: right;
    max-width: 60%;
    line-height: 1.4;
    word-wrap: break-word;
    hyphens: auto;
  }

  .manufacturer-about-section {
    padding: 48px 32px 32px 16px;
  }

  .manufacturer-about-title {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }

  .manufacturer-about-description {
    margin: 0 0 20px 0;
    font-size: 18px;
    line-height: 1.6;
    color: #4b5563;
  }

  /* Mobile responsive - stack columns */
  @media (max-width: 768px) {
    .manufacturer-hero-desktop {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .manufacturer-details-section {
      border-right: none;
      border-bottom: 1px solid #d1d5db;
      margin-bottom: 16px;
    }
  }

  /* Dark mode styles */
  [data-theme="dark"] .manufacturer-hero-card {
    background: #2d2d2d !important;
    border-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-details-section {
    background: #1f1f2e !important;
    border-right-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-logo-wrapper {
    background: #ffffff !important;
    border-color: #e5e7eb !important;
  }

  [data-theme="dark"] .manufacturer-detail-label {
    color: #d1d5db !important;
  }

  [data-theme="dark"] .manufacturer-detail-value {
    color: #ffffff !important;
  }

  [data-theme="dark"] .manufacturer-website-link {
    color: #b4b9ff !important;
  }

  [data-theme="dark"] .manufacturer-about-title {
    color: #ffffff !important;
  }

  [data-theme="dark"] .manufacturer-about-description {
    color: #d1d5db !important;
  }

  [data-theme="dark"] .manufacturer-detail-row {
    border-bottom-color: #4b5563 !important;
  }

  [data-theme="dark"] .manufacturer-logo-placeholder {
    background: linear-gradient(135deg, #374151 0%, #4b5563 100%) !important;
    color: #d1d5db !important;
  }

  /* Status tag styles */
  .status-tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-tag--production {
    background-color: #ecfdf5;
    color: #065f46;
  }

  .status-tag--development {
    background-color: #fffbeb;
    color: #92400e;
  }

  .status-tag--planned {
    background-color: #f5f3ff;
    color: #5b21b6;
  }

  .status-tag--blocked {
    background-color: #fef2f2;
    color: #991b1b;
  }

  /* Dark mode status tag styles */
  [data-theme="dark"] .status-tag--production {
    background-color: #064e3b;
    color: #6ee7b7;
  }

  [data-theme="dark"] .status-tag--development {
    background-color: #78350f;
    color: #fbbf24;
  }

  [data-theme="dark"] .status-tag--planned {
    background-color: #4c1d95;
    color: #c4b5fd;
  }

  [data-theme="dark"] .status-tag--blocked {
    background-color: #7f1d1d;
    color: #fca5a5;
  }
`}</style>





