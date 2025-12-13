---
id: tesla
sidebar_position: 3
---

import { BackLink } from '@components/BackLink';

<BackLink to="/integrations/manufacturers/devices-and-oems" label="Devices & OEMs" />

# Tesla


<div className="manufacturer-hero-card">
  <div className="manufacturer-hero-desktop">
    {/* Left Column - Logo and Details */}
    <div className="manufacturer-details-section">
      <div className="manufacturer-logo-container">
        <div className="manufacturer-logo-wrapper">
          <img 
        src="https://device.cms.texture.energy/logo/Tesla.svg" 
        alt="Tesla logo" 
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
          <a href="https://www.tesla.com/" target="_blank" rel="noopener noreferrer" className="manufacturer-website-link">
            Visit Website
          </a>
        </div>
        
        <div className="manufacturer-detail-row device-types-row">
          <span className="manufacturer-detail-label">Supported Device Types</span>
          <span className="manufacturer-detail-value device-types-value">Batteries, EV Chargers, Electric Vehicles, Solar Inverters</span>
        </div>
      </div>
    </div>
    
    {/* Right Column - About Section */}
    <div className="manufacturer-about-section">
      <h3 className="manufacturer-about-title">About Tesla</h3>
      
      <p className="manufacturer-about-description">Tesla designs and manufactures electric vehicles, energy storage systems, and solar energy products for residential, commercial, and utility-scale applications. The company produces battery electric vehicles, home battery systems, solar panels, and charging infrastructure. Their integrated ecosystem includes vehicle-to-grid technology, energy management software, and comprehensive renewable energy solutions across multiple market segments.</p>
    </div>
  </div>
</div>



<div dangerouslySetInnerHTML={{ __html: `<p>Tesla Energy is one of the most recognized names in distributed energy, offering a vertically integrated ecosystem that includes Powerwall batteries, solar panels, EVs, and the Powerhub platform for grid services. Their systems are widely deployed across residential, commercial, and utility settings, and Tesla continues to expand its footprint through both retail and partner channels. The Tesla Energy ecosystem is unified through robust software platforms, enabling real-time monitoring and intelligent control across all assets.</p><p>Texture supports Tesla’s <strong>Fleet API</strong> and <strong>Grid Services API (Powerhub)</strong>. These integrations allow us to enroll and manage fleets of Tesla Powerwalls for grid programs, pull live and historical telemetry, and initiate control actions — all in a secure and standardized way. We’re working closely with Tesla to enable large-scale integrations for <strong>Co-ops, DERMS providers, and utility-aligned aggregators</strong>, helping them access and orchestrate behind-the-meter Tesla systems at scale.</p><p>These integrations unlock the ability to not only monitor and optimize performance, but also automate participation in grid services with minimal overhead — bridging the gap between distributed Tesla devices and centralized utility systems.</p><p><strong>Common Use Cases</strong></p><ul class="bullet"><li value=1><strong>Grid Services Participation</strong> (e.g., frequency response, load shifting)</li><li value=2><strong>Virtual Power Plants (VPPs)</strong></li><li value=3><strong>Co-op and CCA Program Integration</strong></li><li value=4><strong>DERMS Integration</strong></li><li value=5><strong>Performance Monitoring & Fleet Management</strong></li><li value=6><strong>Load Flexibility & Peak Shaving</strong></li><li value=7><strong>Resiliency Planning & Backup Power Coordination</strong></li></ul>` }} />


<div dangerouslySetInnerHTML={{ __html: `<h2>Overview<a href="http://localhost:3000/docs/sources/oem/tesla/#overview">​</a></h2><p>We are using the <a href="https://developer.tesla.com/docs/fleet-api" rel="noopener noreferrer">official Tesla FleetAPI</a> or their Powerhub to connect to Tesla accounts.</p><p>For Fleet API connections, a typical OAuth flow is used to authenticate the user and obtain consent to access their Tesla account and thus devices.</p><p>For Powerhub/Grid Services the flow is a bit more involved and custom, contact us for more details. As a result, the docs below pertain mostly to Fleet API and not Powerhub.</p><h2>Authorization<a href="http://localhost:3000/docs/sources/oem/tesla/#authorization">​</a></h2><p>In the majority of cases, if the user simply clicks "Select All" when connecting their Tesla account, the necessary authorization scopes will be granted.</p><p>However, in cases where the user wants to manually select the authorization scopes, the authorization scopes required would depend on the level of access you would like to have. Specifically what kind of device data you would like to access, vehicles vs. energy products (inverters, powerwalls, etc.).</p><h3>User flow<a href="http://localhost:3000/docs/sources/oem/tesla/#user-flow">​</a></h3><p>When authorizing the Tesla connection, the user will be prompted to select the authorization scopes they would like to grant to Texture.</p><p></p><blockquote><p><strong>Note</strong>: At minimum the user must grant the necessary scopes for reading data from the devices you would like to access. If you would like to execute commands on the devices, they must also grant the necessary scopes for that.</p></blockquote><p>The following sections contain images of the checkboxes required for various levels of access.</p><h4>Vehicles<a href="http://localhost:3000/docs/sources/oem/tesla/#vehicles">​</a></h4><p>Minimum required scopes for reading vehicle data:<br></p><p>Additional required scopes for executing commands on vehicles (<strong>at least one of these is required</strong>):<br></p><h4>Energy Products<a href="http://localhost:3000/docs/sources/oem/tesla/#energy-products">​</a></h4><p>Minimum required scopes for reading energy product data:<br></p><p>Additional required scopes for executing commands on energy products:<br></p><h3>Additional resources on authorization scopes<a href="http://localhost:3000/docs/sources/oem/tesla/#additional-resources-on-authorization-scopes">​</a></h3><p>For an overview on Tesla's authorization scopes, please refer to the <a href="https://developer.tesla.com/docs/fleet-api#authorization-scopes" rel="noopener noreferrer">official Tesla FleetAPI documentation</a>.</p><p>They additionally have an endpoint listing the authorization scopes required for various endpoints <a href="https://developer.tesla.com/docs/scopes.json" rel="noopener noreferrer">here</a>.</p><h3>Insufficent Scopes<a href="http://localhost:3000/docs/sources/oem/tesla/#insufficent-scopes">​</a></h3><p>If the user does not grant the necessary scopes, you will unfortunately either not be able to access their devices, or not be able to access all the data you would like to.</p><p>To rectify this situation, direct the user to update the access the Texture application has to their Tesla account. They can also revoke access their as well and then go through the Connect flow again, ensuring the necessary scopes are granted this time around.</p><p></p><ol class="number"><li value=1>Send the user to <a href="https://auth.tesla.com/user/revoke/consent?revoke_client_id=f8e24ca22654-4253-abfe-b738cdb57dad" rel="noopener noreferrer">update the access Texture has to their Tesla account</a></li><li value=2>They will be prompted to log in, and then can revoke or update access the Texture app has to their account</li><li value=3>Afterward, they must go through the Connect flow again to grant the necessary scopes or re-grant access to their account under the new scopes.</li></ol><h2>Battery Import/Export Limitations<a href="http://localhost:3000/docs/sources/oem/tesla/#battery-importexport-limitations">​</a></h2><p>Before you can successfully issue a discharge or charge command to a Tesla Powerwall via the Texture Platform to export or import energy to/from the grid, you must first ensure that the customer's Powerwall is configured to allow this.</p><p>Tesla provides detailed information about this in their <a href="https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings" rel="noopener noreferrer">Advanced Settings documentation</a>.</p><p>Some details from the above page are also captured in the following sections.</p><h3>Permission to Export<a href="http://localhost:3000/docs/sources/oem/tesla/#permission-to-export">​</a></h3><p>Details can be found at: <a href="https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#permission-to-export" rel="noopener noreferrer">https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#permission-to-export</a></p><p>In the Tesla App, the customer should be able to see and adjust the following option:<br></p><p>If this option is unavailable or can't be found, the customer should contact Tesla or their installer to enable this feature.</p><p>If it is available, ensure the customer has it enabled or set to "Yes" to allow exporting energy to the grid.</p><h3>Energy Export Preferences<a href="http://localhost:3000/docs/sources/oem/tesla/#energy-export-preferences">​</a></h3><p>Details can be found at: <a href="https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#energy-exports" rel="noopener noreferrer">https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#energy-exports</a></p><p>Assuming the user has permission to export enabled, they should also be able to see and adjust the following option:<br></p><p>If this option is unavailable or can't be found, the customer should contact Tesla or their installer to enable this feature.</p><p>If it is available, ensure the customer has it set to "Everything" to allow exporting the battery in addition to solar energy to the grid.</p><blockquote><p><strong>Note</strong>: When sending a discharge command to a battery with the <code>enableGridInteraction</code> flag set to true, we will attempt to adjust the export preferences to allow exporting the battery in addition to solar energy to the grid.</p></blockquote><h3>Grid Charging<a href="http://localhost:3000/docs/sources/oem/tesla/#grid-charging">​</a></h3><p>Details can be found at: <a href="https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#grid-charging" rel="noopener noreferrer">https://www.tesla.com/support/energy/powerwall/mobile-app/advanced-settings#grid-charging</a></p><p>In the Tesla App, the customer should be able to see and adjust the following option:<br></p><p>Even if the customer doesn't have this option enabled, the battery still will be capable of charging from the grid when it has low energy, assuming of course it is connected to the grid.</p><p>Solar will still be prioritized over grid charging in most cases when set to "Yes", unless there is a financial incentive to charge from the grid or there is insufficient solar energy available.</p><blockquote><p><strong>Note</strong>: When sending a charge command to a battery with the <code>enableGridInteraction</code> flag set to true, we will attempt to adjust the grid charging preferences to allow charging the battery from the grid.</p></blockquote><h2>Vehicle Command Execution<a href="http://localhost:3000/docs/sources/oem/tesla/#vehicle-command-execution">​</a></h2><p>The new Tesla FleetAPI has some additional requirements when it comes to executing commands on vehicles.</p><p>The user must first grant the scope in the above section to allow executing commands on their vehicles, but additionally must register a virtual key with their vehicle.</p><p>The basic process for this is as follows:</p><ol class="number"><li value=1>Open the Tesla app and select a vehicle</li><li value=2>Visit <a href="https://www.tesla.com/_ak/cdn.texturehq.com" rel="noopener noreferrer">https://www.tesla.com/_ak/cdn.texturehq.com</a> from their phone or desktop</li></ol><p>The user will then be prompted to add the key to their selected vehicle.</p><p>After adding the key, Texture can now send commands to the vehicle over the internet on your behalf.</p><h3>Troubleshooting<a href="http://localhost:3000/docs/sources/oem/tesla/#troubleshooting">​</a></h3><p>If you are attempting to execute one of the vehicle commands via our api, you may notice when querying for the status of the command, that you receive back a <code>reason</code> field indicating the following:</p><p><code>vehicle rejected request: your public key has not been paired with the vehicle</code><br></p><p>This indicates that the user has not yet paired our virtual key with their vehicle. The user must follow the steps in the previous section to pair the virtual key with their vehicle before Texture can send commands to it.</p>` }} />
