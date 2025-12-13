---
id: enphase
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Enphase


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



<div dangerouslySetInnerHTML={{ __html: `<p>Enphase is a leading provider of microinverter-based solar and storage systems, known for its modular architecture, high reliability, and comprehensive energy management platform. Unlike traditional string inverter setups, Enphase systems optimize power at the panel level, improving performance and offering granular visibility into each component. Their ecosystem includes solar microinverters, IQ Batteries, EV chargers, and the Enlighten monitoring platform — enabling end-to-end control for homes and businesses.</p><p>Texture supports both the <strong>Monitoring API</strong> and <strong>Grid Services API</strong> for Enphase devices. Our integration provides access to device-level telemetry and control functions across solar and storage assets. We’ve enabled customers to leverage Enphase systems in a variety of grid-interactive use cases, with particularly strong adoption in <strong>energy arbitrage scenarios within the ERCOT market</strong>, where battery cycling against real-time pricing delivers measurable ROI.</p><p>By integrating directly with Enphase, Texture helps utilities, aggregators, and software platforms monitor asset performance, participate in programs, and coordinate dispatch across distributed fleets — without relying on reverse-engineered or unsupported methods.</p><p><strong>Common Use Cases</strong></p><ul class="bullet"><li value=1><strong>Energy Arbitrage</strong> (especially in ERCOT)</li><li value=2><strong>Virtual Power Plants (VPPs)</strong></li><li value=3><strong>Demand Response (DR)</strong></li><li value=4><strong>Home Energy Management</strong></li><li value=5><strong>DER Aggregation & Orchestration</strong></li><li value=6><strong>Program Eligibility Screening</strong></li><li value=7><strong>Performance Monitoring & Alerting</strong></li></ul>` }} />


<div dangerouslySetInnerHTML={{ __html: `<h2>Overview<a href="http://localhost:3000/docs/sources/oem/enphase/#overview">​</a></h2><p>We are using the <a href="https://developer-v4.enphase.com/" rel="noopener noreferrer">Enphase API v4</a> to connect to Enphase accounts.</p><p>For this connection, a typical OAuth flow is used to authenticate the user and obtain consent to access their Enphase account and thus devices.</p><h2>Device Updates<a href="http://localhost:3000/docs/sources/oem/enphase/#device-updates">​</a></h2><p>One quirk with Enphase systems is that they don't always seem to update their data in real-time or on a regular cadence.</p><p>Our <a href="/platform-concepts/devices#polling">platform polls</a> the Enphase API every 15 minutes for new data, but the Enphase system may not be reporting any new data yet. When we do receive new data, we will update the device(s) in Texture with the new data and backfill any missing data since the last reported data point for the associated Enphase device(s).</p><h2>Battery Commands<a href="http://localhost:3000/docs/sources/oem/enphase/#battery-commands">​</a></h2><p>If you are using our <a href="/platform-concepts/commands#set-operating-mode">set operating mode command</a> with Enphase batteries, there is one main thing to be aware of.</p><p>There is a limitation with the Enphase API where we currently don't have a way to manipulate or adjust the battery system's tariff or rate settings. This means that while you may want to export energy to the grid during a specific time of day, for example, the battery system's tariff settings may not align with this.</p><p>In the scenario above, where you want to export to the grid during potentially non-peak hours. While the battery may not align and export to the grid, we will set it up such that it at least discharges the battery to cover home loads until the target reserve level is reached. Curtailing more expensive grid power usage still during this time.</p><p>If you enroll your users in our grid services program, we can control the battery system to optimize for grid services. See the <a href="http://localhost:3000/docs/sources/oem/enphase/#enphase-grid-services">Enphase Grid Services</a> section below for more information.</p><h2>Enphase Grid Services<a href="http://localhost:3000/docs/sources/oem/enphase/#enphase-grid-services">​</a></h2><p>In cases where your organization needs or desires features like off-peak grid export, we can work with you to allow enabling your customers to enroll their Enphase systems in one of our grid services programs.</p><p>Once enabled for your organization, you can start to send your customers your unique enphase authorization link to enroll their Enphase system(s).</p><h3>How to enroll your customers in a grid services program<a href="http://localhost:3000/docs/sources/oem/enphase/#how-to-enroll-your-customers-in-a-grid-services-program">​</a></h3><p>The basic process for your customer's to enroll in a grid services program is as follows:</p><ol class="number"><li value=1>Your customer first goes through the connect flow as normal, connecting their Enphase account to Texture.</li><li value=2>Send them an authorization link to enroll in one of our grid services programs.</li></ol><p>You can chain these flows together as described above, by constructing a connect link with the <code>redirectUrl</code> set to the enphase grid services authorization link. Then the <code>redirectUrl</code> query parameter in the enphase grid services authorization link can be set to a final redirect url to navigate to after the customer completes the grid services enrollment.</p><blockquote><p><strong>Note:</strong> After the customer completes step 1 you will still be able to monitor and send commands to their Enphase system(s). The grid services program will only start to take effect once the customer has enrolled and allows more advanced control of the battery system.</p></blockquote><h3>How to find your organization's authorization url<a href="http://localhost:3000/docs/sources/oem/enphase/#how-to-find-your-organizations-authorization-url">​</a></h3><p>The base enphase authorization link for your organization will look like this:</p><p><code>https://enphase.connect.texturehq.com/<organization-token></code><br></p><p>You can find your organization's unique url (if enabled) programmatically by making a <code>GET</code> request to our <a href="/api">organization endpoint with a valid API key</a>.</p><p>The response will contain your organization's base enphase authorization link, if enabled, under the <code>oemSpecifics.enphase.gridServicesAuthorizationUrl</code> path in the response.</p><h3>Query Parameters<a href="http://localhost:3000/docs/sources/oem/enphase/#query-parameters">​</a></h3><p>The following table details the query parameters that can be used with the enphase authorization link.</p><p>NameRequired?DescriptionprogramSlugyesUnique identifier for the Enphase Grid Services program to enroll the user in. Typically, a state code for states where we have available programs.referenceIdyesUnique identifier in your system to tie to the user enrolling in Grid Services. This should ideally be the same id utilized during the Texture Connect flow.clientNamenoAllows adjusting the name that is displayed on the intro screen of the Enphase Grid Services enrollment flow. If not provided, it will fall back/use your organization's name.redirectUrlnoAllows you to set a redirect url to navigate to when the user clicks "Continue" after completing their Enphase Grid Services enrollment.</p><h3>Programs<a href="http://localhost:3000/docs/sources/oem/enphase/#programs">​</a></h3><p>Enphase Grid Services programs are per state, and we currently have programs available in the following states:</p><p>Program StateProgram SlugCaliforniaCATexasTX</p><blockquote><p><strong>Note:</strong> If there is a mismatch between the state of the Enphase system and the state of the grid services program, the system will not be able to enroll in the program.</p></blockquote><h3>Examples<a href="http://localhost:3000/docs/sources/oem/enphase/#examples">​</a></h3><p>Let's say your organization's token is <code>my-org-token</code> and you want to enroll a customer in the California grid services program. The authorization link would look like this:</p><p><a href="https://enphase.connect.texturehq.com/my-org-token?programSlug=CA"><code>https://enphase.connect.texturehq.com/my-org-token?programSlug=CA</code></a><br></p><p>If you also wanted to adjust the name displayed on the intro screen to be <code>My Company</code>, the authorization link would look like this:</p><p><a href="https://enphase.connect.texturehq.com/my-org-token?programSlug=CA&clientName=My%20Company"><code>https://enphase.connect.texturehq.com/my-org-token?programSlug=CA&clientName=My%20Company</code></a><br></p><h3>Battery Commands<a href="http://localhost:3000/docs/sources/oem/enphase/#battery-commands-1">​</a></h3><p>Once a customer's Enphase system is enrolled in a grid services program, we will be able to control the battery system to optimize for grid services. This means that we will be able to control the battery system to export to the grid during off-peak hours, for example.</p><p>There are some caveats or things to be aware of:</p><ul class="bullet"><li value=1>Commands won't take effect for at least 1 minute after they are sent.</li><li value=2>Commands at maximum will last up to 4 hours.</li><li value=3>If the target reserve level is reached before the command expires, the battery system will return to its operation mode before the command was sent.</li><li value=4>The lowest target reserve level that can be set is 10%.</li></ul>` }} />
