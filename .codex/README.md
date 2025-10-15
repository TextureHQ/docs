# Texture Documentation Codex

<Subtitle>Custom GPT context files for writing and editing Texture product documentation</Subtitle>

## Overview

This directory contains markdown context files that define how to write, structure, and edit documentation for the Texture platform. These files serve as reference material for AI assistants, documentation writers, and content editors.

---

## Files

### [docs-guidelines.md](./docs-guidelines.md)
**Core documentation framework**

Defines writing standards, page structure, doc types, platform context, and style benchmarks. Start here for an overview of the documentation system.

**Key sections:**
- Purpose and audience
- Voice and tone principles
- Page structure and modular sections
- Doc types (concept, guide, reference, system behavior)
- Platform context
- Writing principles

---

### [tone-and-voice.md](./tone-and-voice.md)
**Voice attributes and writing style**

Detailed guidance on Texture's confident, plainspoken, and technically precise writing style.

**Key sections:**
- Core principles
- Voice attributes (confident, plainspoken, structured, technical)
- Writing for scanning
- Active voice and sentence length
- Phrases to avoid
- Technical specificity
- Consistency guidelines

---

### [platform-architecture.md](./platform-architecture.md)
**Technical platform overview**

Comprehensive explanation of how Texture's core systems work together, including platform capabilities, layers, and objects.

**Key sections:**
- Platform capabilities (secure, event-driven, AI-native, real-time)
- Core platform layers (Integrations, Data Cloud, Device Cloud, Workflows)
- Platform objects (7 categories from infrastructure to commerce)
- Data flow
- Key design principles

---

### [terminology.md](./terminology.md)
**Standard terms and definitions**

Complete glossary of platform terms with usage guidelines and terms to avoid.

**Key sections:**
- Core platform terms (device, metrics, event, workflow, agent, command)
- Program and enrollment terms
- Technical terms (API key, webhook, connection, app)
- Data and reporting terms
- Access and security terms
- Commerce and financials terms
- Terms to avoid

---

### [content-patterns.md](./content-patterns.md)
**Reusable structures for common doc types**

Templates and examples for different documentation page types.

**Key sections:**
- Pattern 1: Concept page
- Pattern 2: Guide / how-to
- Pattern 3: Reference page
- Pattern 4: System behavior page
- Pattern 5: Workflow category page
- Pattern 6: Landing page
- Common sections (prerequisites, best practices, gotchas)
- Content callouts
- Code examples
- Agent and AI integration examples

---

### [editing-workflow.md](./editing-workflow.md)
**How to review and improve documentation**

Guidelines for acting as a senior product editor when reviewing existing docs.

**Key sections:**
- Review checklist (8-point inspection)
- Common issues and fixes
- Before/after examples
- Editing modes (quick polish, structural rewrite, content audit)
- Feedback format
- Key questions to ask

---

### [use-cases-and-segments.md](./use-cases-and-segments.md)
**Where Texture drives value and who uses it**

Reference for understanding primary use cases and target customer segments.

**Key sections:**
- 13 core use cases (asset fleet management, demand response, VPP operations, etc.)
- 13 target segments (utilities, coops, ISOs, OEMs, traders, etc.)
- Writing guidance per segment
- Workflow categories by use case

---

## How to Use These Files

### For Writing New Documentation

1. Review **docs-guidelines.md** for overall framework
2. Check **terminology.md** for correct term usage
3. Use **content-patterns.md** to select the right template
4. Reference **platform-architecture.md** for technical accuracy
5. Apply **tone-and-voice.md** principles throughout

### For Editing Existing Documentation

1. Use **editing-workflow.md** checklist to review pages
2. Verify terminology against **terminology.md**
3. Check structure against **content-patterns.md**
4. Ensure technical accuracy with **platform-architecture.md**
5. Apply **tone-and-voice.md** improvements

### For Understanding Context

1. Read **platform-architecture.md** to understand how Texture works
2. Review **use-cases-and-segments.md** to understand who uses Texture and why
3. Check **terminology.md** when encountering unfamiliar platform terms

---

## Key Principles

### Voice & Tone
- **Confident, not arrogant** – State what the system does without hedging
- **Plainspoken, not casual** – Use clear language, avoid buzzwords
- **Structured, not wordy** – Organize for scanning with headers and lists
- **Technical, not jargon-heavy** – Be precise without overwhelming readers

### Writing Approach
- Lead with what the system **does**, not what it **is**
- Replace adjectives with **verbs**
- Use active voice and short sentences
- Remove filler words like "simply," "easily," "just"

### Platform Truths to Embed
1. **AI-native intelligence** – Agents and automation are first-class capabilities
2. **Event-driven by default** – Changes trigger instant reactions
3. **Real-time coordination** – Low-latency operations enable immediate action
4. **Secure and auditable** – Every action is logged, scoped, and traceable
5. **Cross-organization collaboration** – Trusted data sharing across partners

---

## Updating These Files

These files should evolve as the platform and documentation standards change. When updating:

1. Keep terminology consistent across all files
2. Add examples to illustrate new concepts
3. Update the platform architecture when major features ship
4. Maintain the voice and tone standards
5. Update this README to reflect new files or major changes

---

## Quick Reference

### Preferred Verbs
coordinate, unify, monitor, control, automate, detect, share, sync, enforce, reconcile

### Terms to Always Use
- Device (not asset)
- Metrics (not telemetry/data)
- Workflow (not automation)
- Agent (not bot)
- Connection (not destination)
- Alert (for persistent issues)
- Event (for state changes)

### Style Benchmarks
- Stripe — concept-led structure
- OpenAI — clarity and modularity
- Databricks — system modeling
- LaunchDarkly — access and trust
- Temporal — workflow logic clarity
- Leap — energy-native precision

---

## Questions or Feedback

For questions about these guidelines or suggestions for improvements, contact the documentation team or open an issue in the docs repository.



