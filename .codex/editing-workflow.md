# Editing Workflow

<Subtitle>How to review, revise, and improve Texture documentation</Subtitle>

## Overview

When editing existing docs, act as a senior product editor. Focus on:
- **Clarity:** Is the information easy to understand?
- **Structure:** Does the page flow logically?
- **Completeness:** Are key details or context missing?
- **Consistency:** Does it match our style and terminology?

---

## Review Checklist

Use this checklist when reviewing a page:

### 1. Title & Subtitle
- [ ] Title is clear and describes the page content
- [ ] Subtitle adds context or explains the "why"

### 2. Structure
- [ ] Page uses a logical flow (intro → how it works → examples → next steps)
- [ ] Headers are descriptive and hierarchical (H2 → H3)
- [ ] Sections are 3–5 paragraphs max before a new header

### 3. Clarity
- [ ] Sentences are under 20 words
- [ ] Active voice is used
- [ ] Jargon is defined or removed
- [ ] Examples are concrete and realistic

### 4. Terminology
- [ ] Terms match the [terminology guide](/docs/.codex/terminology.md)
- [ ] No synonyms for core terms (e.g., "device" not "asset")
- [ ] Technical terms are used precisely

### 5. Voice & Tone
- [ ] Writing is confident, not hedging
- [ ] No filler words ("simply," "easily," "just")
- [ ] No marketing verbs ("empower," "leverage")

### 6. Code & Examples
- [ ] Code examples are runnable and realistic
- [ ] API endpoints are current and correct
- [ ] Scopes and parameters are accurate

### 7. Callouts
- [ ] Tips, cautions, and notes are used appropriately
- [ ] Callouts add value, not filler

### 8. Links
- [ ] Related pages are linked at the end
- [ ] Internal links use relative paths
- [ ] No broken links

---

## Common Issues & Fixes

### Issue: Wordy or repetitive intro

**Before:**
> "In this guide, we're going to walk you through the process of setting up a webhook. Webhooks are a powerful feature that allow you to easily receive notifications when events happen in the Texture platform."

**After:**
> "Webhooks let you receive real-time event notifications from Texture. This guide shows you how to configure and test a webhook endpoint."

---

### Issue: Vague headers

**Before:**
> ## Getting Started

**After:**
> ## Create Your First Webhook

---

### Issue: Passive voice

**Before:**
> "An alert is sent when the device goes offline."

**After:**
> "Texture sends an alert when the device goes offline."

---

### Issue: Missing context

**Before:**
> "Send a POST request to create a device."

**After:**
> "Send a POST request to `/v1/devices` with a `devices:write` scoped key."

---

### Issue: Inconsistent terminology

**Before:**
> "Connect your assets to start tracking data."

**After:**
> "Connect your devices to start tracking telemetry."

---

### Issue: Filler language

**Before:**
> "Simply add the API key to your request to easily authenticate."

**After:**
> "Add the API key to your request header to authenticate."

---

## Before/After Examples

### Example 1: Concept Page

**Before:**
> ## Overview
> The device object is a really important part of the Texture platform. It represents a physical asset like a battery or thermostat. Devices can do a lot of things, like report data and respond to commands.

**After:**
> ## Overview
> A device represents a physical asset connected to Texture, such as a battery, inverter, or thermostat. Devices report telemetry and respond to commands.

---

### Example 2: Guide Intro

**Before:**
> ## Introduction
> In this guide, we'll show you how to enroll devices into programs. Programs are an important feature for managing demand response and VPP operations. By following these steps, you'll be able to easily enroll your devices.

**After:**
> ## Overview
> Enroll devices into programs to manage demand response and VPP participation. This guide walks through enrollment setup and validation.

---

### Example 3: API Reference

**Before:**
> ## Get Devices
> This endpoint lets you get a list of devices. You can use filters to narrow down the results.

**After:**
> ## Get Devices
> Retrieve a list of devices in your workspace.
>
> **Endpoint:** `GET /v1/devices`  
> **Scope required:** `devices:read`
>
> ### Query Parameters
> - `status` (string) – Filter by device status: `online`, `offline`
> - `workspace_id` (string) – Filter by workspace

---

## Editing Modes

### Mode 1: Quick Polish

For small fixes:
- Remove filler words
- Fix passive voice
- Correct terminology
- Add missing links

### Mode 2: Structural Rewrite

For pages that need reorganization:
- Identify the core message
- Break into logical sections
- Add headers and callouts
- Move or remove tangential info

### Mode 3: Content Audit

For comprehensive review:
- Check against content patterns
- Verify technical accuracy
- Add missing examples or context
- Ensure consistency with related pages

---

## Feedback Format

When suggesting edits, use this format:

```markdown
### [Section Name]

**Issue:** [What's wrong]

**Before:**
> [Original text]

**After:**
> [Revised text]

**Why:** [Explanation]
```

---

## Key Questions to Ask

When reviewing a page, ask:
1. **Who is this for?** Does it match the audience?
2. **What's the goal?** Is it clear what the reader should do or learn?
3. **Why does this matter?** Is the context or use case explained?
4. **How does it work?** Is the logic or flow clear?
5. **What's missing?** Are there gaps in scope, examples, or architecture?

---

## Resources

- [Docs Guidelines](./docs-guidelines.md)
- [Tone & Voice](./tone-and-voice.md)
- [Terminology](./terminology.md)
- [Content Patterns](./content-patterns.md)

