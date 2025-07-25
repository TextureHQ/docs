---
id: enphase
title: Enphase
sidebar_position: 3
---


<div className="manufacturer-hero-card">
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div className="manufacturer-details-section">
      <div className="manufacturer-logo-container">
        <div className="manufacturer-logo-wrapper">
          <img 
        src="https://device.cms.texture.energy/logo/Enphase.svg" 
        alt="Enphase logo" 
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
          <span className="manufacturer-detail-value">Supported</span>
        </div>
        
        
        <div className="manufacturer-detail-row">
          <span className="manufacturer-detail-label">Website</span>
          <a href="https://enphase.com/" target="_blank" rel="noopener noreferrer" className="manufacturer-website-link">
            Visit Website
          </a>
        </div>
        
        <div className="manufacturer-detail-row device-types-row">
          <span className="manufacturer-detail-label">Supported Device Types</span>
          <span className="manufacturer-detail-value device-types-value">Batteries, Solar Inverters</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div className="manufacturer-about-section">
      <h3 className="manufacturer-about-title">About Enphase</h3>
      
      <p className="manufacturer-about-description">Enphase Energy manufactures microinverters, battery storage systems, and solar energy management platforms for residential and commercial applications. The company produces smart solar inverters, home battery systems, and comprehensive energy monitoring software. Their systems optimize solar energy production and consumption while providing grid-interactive capabilities and backup power solutions for distributed energy applications.</p>
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

<div dangerouslySetInnerHTML={{ __html: `<p>Enphase is a leading provider of microinverter-based solar and storage systems, known for its modular architecture, high reliability, and comprehensive energy management platform. Unlike traditional string inverter setups, Enphase systems optimize power at the panel level, improving performance and offering granular visibility into each component. Their ecosystem includes solar microinverters, IQ Batteries, EV chargers, and the Enlighten monitoring platform — enabling end-to-end control for homes and businesses.</p><p>Texture supports both the <strong>Monitoring API</strong> and <strong>Grid Services API</strong> for Enphase devices. Our integration provides access to device-level telemetry and control functions across solar and storage assets. We’ve enabled customers to leverage Enphase systems in a variety of grid-interactive use cases, with particularly strong adoption in <strong>energy arbitrage scenarios within the ERCOT market</strong>, where battery cycling against real-time pricing delivers measurable ROI.</p><p>By integrating directly with Enphase, Texture helps utilities, aggregators, and software platforms monitor asset performance, participate in programs, and coordinate dispatch across distributed fleets — without relying on reverse-engineered or unsupported methods.</p><p><strong>Common Use Cases</strong></p><ul class="bullet"><li value=1><strong>Energy Arbitrage</strong> (especially in ERCOT)</li><li value=2><strong>Virtual Power Plants (VPPs)</strong></li><li value=3><strong>Demand Response (DR)</strong></li><li value=4><strong>Home Energy Management</strong></li><li value=5><strong>DER Aggregation & Orchestration</strong></li><li value=6><strong>Program Eligibility Screening</strong></li><li value=7><strong>Performance Monitoring & Alerting</strong></li></ul>` }} />


<div dangerouslySetInnerHTML={{ __html: `<h2>Overview<a href="http://localhost:3000/docs/sources/oem/enphase/#overview">​</a></h2><p>We are using the <a href="https://developer-v4.enphase.com/" rel="noopener noreferrer">Enphase API v4</a> to connect to Enphase accounts.</p><p>For this connection, a typical OAuth flow is used to authenticate the user and obtain consent to access their Enphase account and thus devices.</p><h2>Device Updates<a href="http://localhost:3000/docs/sources/oem/enphase/#device-updates">​</a></h2><p>One quirk with Enphase systems is that they don't always seem to update their data in real-time or on a regular cadence.</p><p>Our <a href="http://localhost:3000/docs/devices/polling">platform polls</a> the Enphase API every 15 minutes for new data, but the Enphase system may not be reporting any new data yet. When we do receive new data, we will update the device(s) in Texture with the new data and backfill any missing data since the last reported data point for the associated Enphase device(s).</p><h2>Battery Commands<a href="http://localhost:3000/docs/sources/oem/enphase/#battery-commands">​</a></h2><p>If you are using our <a href="http://localhost:3000/docs/commands#set-operating-mode">set operating mode command</a> with Enphase batteries, there is one main thing to be aware of.</p><p>There is a limitation with the Enphase API where we currently don't have a way to manipulate or adjust the battery system's tariff or rate settings. This means that while you may want to export energy to the grid during a specific time of day, for example, the battery system's tariff settings may not align with this.</p><p>In the scenario above, where you want to export to the grid during potentially non-peak hours. While the battery may not align and export to the grid, we will set it up such that it at least discharges the battery to cover home loads until the target reserve level is reached. Curtailing more expensive grid power usage still during this time.</p><p>If you enroll your users in our grid services program, we can control the battery system to optimize for grid services. See the <a href="http://localhost:3000/docs/sources/oem/enphase/#enphase-grid-services">Enphase Grid Services</a> section below for more information.</p><h2>Enphase Grid Services<a href="http://localhost:3000/docs/sources/oem/enphase/#enphase-grid-services">​</a></h2><p>In cases where your organization needs or desires features like off-peak grid export, we can work with you to allow enabling your customers to enroll their Enphase systems in one of our grid services programs.</p><p>Once enabled for your organization, you can start to send your customers your unique enphase authorization link to enroll their Enphase system(s).</p><h3>How to enroll your customers in a grid services program<a href="http://localhost:3000/docs/sources/oem/enphase/#how-to-enroll-your-customers-in-a-grid-services-program">​</a></h3><p>The basic process for your customer's to enroll in a grid services program is as follows:</p><ol class="number"><li value=1>Your customer first goes through the connect flow as normal, connecting their Enphase account to Texture.</li><li value=2>Send them an authorization link to enroll in one of our grid services programs.</li></ol><p>You can chain these flows together as described above, by constructing a connect link with the <code>redirectUrl</code> set to the enphase grid services authorization link. Then the <code>redirectUrl</code> query parameter in the enphase grid services authorization link can be set to a final redirect url to navigate to after the customer completes the grid services enrollment.</p><blockquote><p><strong>Note:</strong> After the customer completes step 1 you will still be able to monitor and send commands to their Enphase system(s). The grid services program will only start to take effect once the customer has enrolled and allows more advanced control of the battery system.</p></blockquote><h3>How to find your organization's authorization url<a href="http://localhost:3000/docs/sources/oem/enphase/#how-to-find-your-organizations-authorization-url">​</a></h3><p>The base enphase authorization link for your organization will look like this:</p><p><code>https://enphase.connect.texturehq.com/<organization-token></code><br></p><p>You can find your organization's unique url (if enabled) programmatically by making a <code>GET</code> request to our <a href="http://localhost:3000/api">organization endpoint with a valid API key</a>.</p><p>The response will contain your organization's base enphase authorization link, if enabled, under the <code>oemSpecifics.enphase.gridServicesAuthorizationUrl</code> path in the response.</p><h3>Query Parameters<a href="http://localhost:3000/docs/sources/oem/enphase/#query-parameters">​</a></h3><p>The following table details the query parameters that can be used with the enphase authorization link.</p><p>NameRequired?DescriptionprogramSlugyesUnique identifier for the Enphase Grid Services program to enroll the user in. Typically, a state code for states where we have available programs.referenceIdyesUnique identifier in your system to tie to the user enrolling in Grid Services. This should ideally be the same id utilized during the Texture Connect flow.clientNamenoAllows adjusting the name that is displayed on the intro screen of the Enphase Grid Services enrollment flow. If not provided, it will fall back/use your organization's name.redirectUrlnoAllows you to set a redirect url to navigate to when the user clicks "Continue" after completing their Enphase Grid Services enrollment.</p><h3>Programs<a href="http://localhost:3000/docs/sources/oem/enphase/#programs">​</a></h3><p>Enphase Grid Services programs are per state, and we currently have programs available in the following states:</p><p>Program StateProgram SlugCaliforniaCATexasTX</p><blockquote><p><strong>Note:</strong> If there is a mismatch between the state of the Enphase system and the state of the grid services program, the system will not be able to enroll in the program.</p></blockquote><h3>Examples<a href="http://localhost:3000/docs/sources/oem/enphase/#examples">​</a></h3><p>Let's say your organization's token is <code>my-org-token</code> and you want to enroll a customer in the California grid services program. The authorization link would look like this:</p><p><a href="https://enphase.connect.texturehq.com/my-org-token?programSlug=CA"><code>https://enphase.connect.texturehq.com/my-org-token?programSlug=CA</code></a><br></p><p>If you also wanted to adjust the name displayed on the intro screen to be <code>My Company</code>, the authorization link would look like this:</p><p><a href="https://enphase.connect.texturehq.com/my-org-token?programSlug=CA&clientName=My%20Company"><code>https://enphase.connect.texturehq.com/my-org-token?programSlug=CA&clientName=My%20Company</code></a><br></p><h3>Battery Commands<a href="http://localhost:3000/docs/sources/oem/enphase/#battery-commands-1">​</a></h3><p>Once a customer's Enphase system is enrolled in a grid services program, we will be able to control the battery system to optimize for grid services. This means that we will be able to control the battery system to export to the grid during off-peak hours, for example.</p><p>There are some caveats or things to be aware of:</p><ul class="bullet"><li value=1>Commands won't take effect for at least 1 minute after they are sent.</li><li value=2>Commands at maximum will last up to 4 hours.</li><li value=3>If the target reserve level is reached before the command expires, the battery system will return to its operation mode before the command was sent.</li><li value=4>The lowest target reserve level that can be set is 10%.</li></ul>` }} />


