---
id: savant
title: ""
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/apps" label="Apps" />


<div className="app-hero-banner">
  <div className="app-hero-content">
    {/* App Logo and Title */}
    <div className="app-header-section">
      <div className="app-logo-container">
        <img 
        src="https://device.cms.texture.energy/logo/Savant%20Power.svg" 
        alt="Savant logo" 
        className="app-logo"
      />
      </div>
      <div className="app-title-section">
        <h1 className="app-title">Savant</h1>
        <div className="app-meta">
          <span className="app-category">Grid Services</span>
          <span className="status-tag status-tag--production">Production Ready</span>
        </div>
      </div>
    </div>
    
    {/* App Description */}
    <div className="app-description-section">
      <p className="app-description">Savant manufactures smart home automation systems, energy management platforms, and integrated control solutions for luxury residential applications. The company produces whole-home automation hardware, energy monitoring software, and smart grid integration systems. Their platforms control lighting, climate, security, and energy systems while optimizing consumption and integrating renewable energy sources for high-end residential markets.</p>
    </div>
    
    {/* Quick Actions */}
    <div className="app-actions-section">
      
      <div className="app-action-item">
        <a href="https://www.savant.com/" target="_blank" rel="noopener noreferrer" className="app-external-link">
          <span className="app-external-link-text">Visit Savant Website</span>
          <svg className="app-external-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
      
    </div>
  </div>
</div>

<style jsx>{`
  .app-hero-banner {
    background: linear-gradient(135deg, #f8fcff 0%, #f1f5f9 100%);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    margin-bottom: 32px;
    overflow: hidden;
  }

  .app-hero-content {
    padding: 32px;
  }

  .app-header-section {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
  }

  .app-logo-container {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  }

  .app-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 12px;
  }

  .app-logo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 600;
    color: #64748b;
  }

  .app-title-section {
    flex: 1;
  }

  .app-title {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
  }

  .app-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .app-category {
    background: #f1f5f9;
    color: #475569;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid #cbd5e1;
  }

  .app-description-section {
    margin-bottom: 24px;
  }

  .app-description {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
  }

  .app-actions-section {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .app-action-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
  }

  .app-action-label {
    color: #64748b;
    font-weight: 500;
  }

  .app-action-value {
    color: #1e293b;
    font-weight: 600;
  }

  .app-external-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #444ae1;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .app-external-link:hover {
    color: #3730a3;
    text-decoration: none;
  }

  .app-external-link-icon {
    transition: transform 0.2s ease;
  }

  .app-external-link:hover .app-external-link-icon {
    transform: translate(2px, -2px);
  }

  /* Mobile responsive */
  @media (max-width: var(--breakpoint-md)) {
    .app-hero-content {
      padding: 24px;
    }

    .app-header-section {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }

    .app-title {
      font-size: 24px;
    }

    .app-actions-section {
      flex-direction: column;
    }
  }

  /* Dark mode styles */
  [data-theme="dark"] .app-hero-banner {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
    border-color: #334155 !important;
  }

  [data-theme="dark"] .app-logo-container {
    background: #ffffff !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-title {
    color: #f8fafc !important;
  }

  [data-theme="dark"] .app-category {
    background: #334155 !important;
    color: #cbd5e1 !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-description {
    color: #cbd5e1 !important;
  }

  [data-theme="dark"] .app-action-item {
    background: #1e293b !important;
    border-color: #475569 !important;
  }

  [data-theme="dark"] .app-action-label {
    color: #94a3b8 !important;
  }

  [data-theme="dark"] .app-action-value {
    color: #f1f5f9 !important;
  }

  [data-theme="dark"] .app-external-link {
    color: #818cf8 !important;
  }

  [data-theme="dark"] .app-external-link:hover {
    color: #a5b4fc !important;
  }

  [data-theme="dark"] .app-logo-placeholder {
    background: linear-gradient(135deg, #334155 0%, #475569 100%) !important;
    color: #cbd5e1 !important;
  }

  /* Hide TOC content but preserve layout space */
  .table-of-contents__link {
    visibility: hidden !important;
  }
  
  .table-of-contents__left-border {
    visibility: hidden !important;
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


## Description

Savant integration unlocks circuit-level insight, adaptive Energy Modes, and remote control of storage, solar, and backup assets - fostering intelligent consumption, storm-ready resilience, and harmonious coordination with the grid.



## Configuration

This app requires the following configuration fields:


- **Client ID** (Text) - Required

- **Client Secret** (Secret) - Optional



