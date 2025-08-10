---
id: overview
title: Integrations Overview
sidebar_label: Overview
---

# Integrations Overview

import { Subtitle } from '@components/Subtitle';
import { LockKey, Buildings, Lightning, GearSix, Handshake, LinkSimple, MapPin, ShieldCheck } from '@phosphor-icons/react';
import Link from '@docusaurus/Link';
import { DynamicCounts } from '@site/src/components/DynamicCounts';

<Subtitle>Connect energy devices and systems through official partnerships and proven protocols</Subtitle>

  <div className="integration-callout">
    <div className="callout-content">
      <div className="callout-header">
        <h3 className="callout-title">The Most Comprehensive Energy Integration Platform</h3>
      </div>
      <p className="callout-text">
        Connect any energy device, system, or application through official OEM partnerships and enterprise-grade APIs. From individual consumer devices to utility-scale fleets, Texture provides the infrastructure to build, manage, and scale energy solutions at any level.
      </p>
    </div>
  </div>

  ## Integration Categories

  Connect energy devices and build applications that put your energy data to work. From individual consumer devices to utility-scale fleets, Texture provides the structured system for real-time coordination.

  <div className="featured-integrations">
    <Link className="featured-card-link" to="/integrations/manufacturers/devices-and-oems">
      <div className="featured-card oems-card">
        <div className="featured-card-header">
          <h3>Devices & OEMs</h3>
          <div className="featured-card-subtitle">Connect energy devices from leading manufacturers through official partnerships</div>
        </div>
        <div className="featured-card-content">
                      <div className="featured-icons">
              <img src="/img/integrations/integrations-overview-devices-and-oems.svg" alt="Devices & OEMs" className="featured-icon-svg" />
              <div className="featured-icon-more">
                <DynamicCounts type="manufacturers" />
              </div>
            </div>
          <p>Connect batteries, EVs, chargers, inverters, and thermostats through official OEM partnerships and secure APIs.</p>
          <div className="featured-card__footer">
            <span className="featured-card__link">Explore Devices & OEMs →</span>
          </div>
        </div>
      </div>
    </Link>

    <Link className="featured-card-link" to="/platform-concepts/apps">
      <div className="featured-card apps-card">
                <div className="featured-card-header">
          <h3>Apps</h3>
          <div className="featured-card-subtitle">Extend platform capabilities through third-party integrations</div>
        </div>
        <div className="featured-card-content">
          <div className="featured-icons">
            <img src="/img/integrations/integrations-overview-apps.svg" alt="Apps" className="featured-icon-svg" />
            <div className="featured-icon-more">
              <DynamicCounts type="apps" />
            </div>
          </div>
          <p>Integrate with Salesforce, weather data, and emissions tracking to expand functionality and create a unified energy data view.</p>
          <div className="featured-card__footer">
            <span className="featured-card__link">Explore Apps →</span>
          </div>
        </div>
      </div>
    </Link>
    </div>

  ## Key Differentiators

  Built for what today's energy operations demand. Texture is where energy data becomes action through structured coordination across assets, teams, and partners.

<div className="differentiators">
  <div className="differentiator">
    <div className="differentiator-icon partnership-icon">
      <Handshake size={20} weight="duotone" />
    </div>
    <div className="differentiator-content">
      <h4>Official Partnerships</h4>
      <p>All device integrations built on direct OEM partnerships, not reverse engineering</p>
    </div>
  </div>
  
  <div className="differentiator">
    <div className="differentiator-icon connection-icon">
      <LinkSimple size={20} weight="duotone" />
    </div>
    <div className="differentiator-content">
      <h4>Multiple Connection Methods</h4>
      <p>OAuth flows for consumers, direct APIs for fleets, standards for utilities</p>
    </div>
  </div>
  
  <div className="differentiator">
    <div className="differentiator-icon location-icon">
      <MapPin size={20} weight="duotone" />
    </div>
    <div className="differentiator-content">
      <h4>Automatic Data Resolution</h4>
      <p>Devices automatically linked to Sites and Contacts through reverse geocoding</p>
    </div>
  </div>
  
  <div className="differentiator">
    <div className="differentiator-icon security-icon">
      <ShieldCheck size={20} weight="duotone" />
    </div>
    <div className="differentiator-content">
      <h4>Secure Access</h4>
      <p><a href="/integrations/scoped-key">Scoped Keys</a> provide user-specific API access without backend requirements</p>
    </div>
  </div>
</div>

## Quick Start Guide

  <div className="quick-start">
    <div className="start-option">
      <h4>Individual customers connecting devices</h4>
      <a href="/integrations/texture-connect" className="start-button">Get Started with Texture Connect</a>
    </div>

    <div className="start-option">
      <h4>Bulk device onboarding or fleet management</h4>
      <a href="/integrations/manufacturers/devices-and-oems" className="start-button">Explore Devices & OEMs</a>
    </div>

    <div className="start-option">
      <h4>Utility or grid operator integration</h4>
      <a href="/integrations/standards" className="start-button">Learn About Industry Standards</a>
    </div>

    <div className="start-option">
      <h4>Migrating existing integrations</h4>
      <a href="/integrations/migration" className="start-button">Migration Support</a>
    </div>
  </div>

 ********