import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  home: [
    {
      type: "category",
      label: "Overview",
      collapsed: false,
      items: ["overview/welcome", "overview/use-cases"],
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/getting-started",
        "getting-started/quickstart",
        "getting-started/signing-up",
      ],
    },
    {
      type: "category",
      label: "Platform Concepts",
      collapsed: false,
      items: [
        "platform-concepts/overview",
        "platform-concepts/network",
        "platform-concepts/sources",
        "platform-concepts/sites",
        "platform-concepts/contacts",
        "platform-concepts/leads",
        "platform-concepts/devices",
        "platform-concepts/signals",
        "platform-concepts/apps",
        "platform-concepts/programs",
        "platform-concepts/standards",
        "platform-concepts/virtual-power-plants",
        "platform-concepts/workspaces",
        "platform-concepts/metrics",
        "platform-concepts/schedules",
        "platform-concepts/commands/commands",
        {
          type: "doc",
          id: "platform-concepts/commands/batch-commands",
          className: "hidden",
        },
        {
          type: "doc",
          id: "platform-concepts/commands/grid-services",
          className: "hidden",
        },
        "platform-concepts/destinations/destinations",
        {
          type: "doc",
          id: "platform-concepts/destinations/webhooks",
          className: "hidden",
        },
        {
          type: "doc",
          id: "platform-concepts/destinations/email",
          className: "hidden",
        },
        {
          type: "doc",
          id: "platform-concepts/destinations/sms",
          className: "hidden",
        },
        {
          type: "doc",
          id: "platform-concepts/destinations/kafka",
          className: "hidden",
        },
        {
          type: "doc",
          id: "platform-concepts/destinations/event-types",
          className: "hidden",
        },
      ],
    },

    {
      type: "category",
      label: "Integrations",
      collapsed: false,
      items: [
        "integrations/overview",
        "integrations/devices",
        "integrations/texture-connect",
        "integrations/scoped-key",
        "integrations/migration",
        "integrations/manufacturers/supported-manufacturers",
        {
          type: "doc",
          id: "integrations/manufacturers/alfa-romeo",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/audi",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/bmw",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/cadillac",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/chargepoint",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/chevrolet",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/chrysler",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/citroen",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/cupra",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/daikin",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/ds",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/ecobee",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/eg4-electronics",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/emporia",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/enelx",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/enphase",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/fiat",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/ford",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/franklinwh",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/generac",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/google-nest",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/honeywell",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/hyundai",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/jaguar",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/jeep",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/kia",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/land-rover",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/lexus",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/lincoln",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/manufacturers",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/mercedes-benz",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/mini",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/nissan",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/opel",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/peugeot",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/porsche",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/renault",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/rivian",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/savant-power",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/savant",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/sensibo",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/skoda",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/solaredge",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/solark",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/sonnen",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/tesla",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/texture-os",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/toyota",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/vauxhall",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/volkswagen",
          className: "hidden",
        },
        {
          type: "doc",
          id: "integrations/manufacturers/volvo",
          className: "hidden",
        },
      ],
    },

    {
      type: "category",
      label: "Programs & Enrollments",
      collapsed: false,
      items: [{ type: "autogenerated", dirName: "programs-enrollments" }],
    },

    {
      type: "category",
      label: "API",
      collapsed: false,
      items: [{ type: "autogenerated", dirName: "api" }],
    },
    {
      type: "category",
      label: "Support",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Blog",
          href: "https://www.texturehq.com/blog",
        },
        { type: "autogenerated", dirName: "support" },
      ],
    },
  ],
};

export default sidebars;
