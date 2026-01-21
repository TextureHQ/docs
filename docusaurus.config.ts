import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { ProvidePlugin } from "webpack";
import path from "path";

const gtag = process.env.GOOGLE_ANALYTICS_TAG
  ? {
      gtag: {
        trackingID: process.env.GOOGLE_ANALYTICS_TAG,
        anonymizeIP: false,
      },
    }
  : {};

const config: Config = {
  title: "Texture Documentation",
  tagline:
    "Explore our guides, examples, and API reference to begin building on the Texture platform",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.texturehq.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  scripts: [
    // Add Vercel Analytics script
    {
      src: "/analytics.js",
      async: true,
    },
  ].filter(Boolean),

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    API_BASE_URL: process.env.API_BASE_URL,
    POSTHOG_KEY: process.env.REACT_APP_PUBLIC_POSTHOG_KEY,
    POSTHOG_HOST: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  },

  plugins: [
    path.resolve(__dirname, "src/plugins/posthog-plugin"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/overview/welcome",
            from: "/",
          },
          {
            to: "/integrations/manufacturers",
            from: "/docs/devices-1",
          },
          {
            to: "/integrations/manufacturers",
            from: "/docs/connections/supported-devices",
          },
          {
            to: "/integrations/manufacturers",
            from: "/docs/sources/supported-devices",
          },
          {
            to: "/platform-concepts/devices#polling",
            from: "/docs/platform-concepts/polling",
          },
        ],
      },
    ],
    "docusaurus-plugin-sass",
    // Add custom webpack config to make @stoplight/elements work
    () => ({
      name: "custom-webpack-config",
      configureWebpack: () => {
        return {
          module: {
            rules: [
              {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false,
                },
              },
            ],
          },
          plugins: [
            new ProvidePlugin({
              process: require.resolve("process/browser"),
            }),
          ],
          resolve: {
            alias: {
              "@components": path.resolve(__dirname, "src/components"),
            },
            fallback: {
              buffer: require.resolve("buffer"),
              stream: false,
              path: false,
              process: false,
            },
          },
        };
      },
    }),
  ],

  organizationName: "texturehq",
  projectName: "docs",

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Add the following lines for the "Edit" functionality
          editUrl: "https://github.com/texturehq/docs/tree/main/",
          editLocalizedFiles: true,
          routeBasePath: "/",
          path: "docs",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/main.css",
        },
        ...gtag,
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    algolia: {
      appId: "TS0KK5KXLO",
      apiKey: "99a70acfc3fd6c2941528e464a175820",
      indexName: "texturehq",
      contextualSearch: false,
    },
    image: "img/texture-social-card.png",
    navbar: {
      logo: {
        alt: "Texture Docs Logo",
        src: "img/docs-logo.svg",
        srcDark: "img/docs-logo__dark.svg",
        href: "/overview/welcome",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "home",
          position: "left",
          label: "Docs",
        },
        { to: "/api", label: "API Reference", position: "left" },
        {
          href: "https://app.texturehq.com",
          label: "Dashboard",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Join our Slack Community",
              href: "https://join.slack.com/t/texture-community/shared_invite/zt-2ho02ds2o-pBNH1ZGcopxgIY3BgKcKzg",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/texturehq",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Status",
              href: "https://status.texturehq.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/texturehq/examples",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Texture Corp. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["http", "json", "bash"],
    },
    mermaid: {
      theme: { light: "base", dark: "base" },
      options: {
        fontFamily: "inherit",
        themeVariables: {
          padding: 20,
          // Light mode - subtle, elegant palette
          primaryColor: "#f8fafc",
          primaryTextColor: "#374151",
          primaryBorderColor: "#e5e7eb",
          secondaryColor: "#f1f5f9",
          secondaryTextColor: "#6b7280",
          secondaryBorderColor: "#d1d5db",
          tertiaryColor: "#ffffff",
          tertiaryTextColor: "#4b5563",
          tertiaryBorderColor: "#f3f4f6",
          lineColor: "#d1d5db",
          textColor: "#374151",
          background: "#ffffff",
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
