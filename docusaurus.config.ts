import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { ProvidePlugin } from "webpack";

const gtag = process.env.GOOGLE_ANALYTICS_TAG
  ? { 
    gtag: {
      trackingID: process.env.GOOGLE_ANALYTICS_TAG, 
      anonymizeIP: false,
    }
  }
  : {};

const config: Config = {
  title: 'Texture Documentation',
  tagline: 'Explore our guides, examples, and API reference to begin building on the Texture platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.texturehq.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    API_BASE_URL: process.env.API_BASE_URL,
    POSTHOG_KEY: process.env.REACT_APP_PUBLIC_POSTHOG_KEY,
    POSTHOG_HOST: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/sources/supported-devices',
            from: '/docs/devices-1',
          },
          {
            to: '/docs/sources/supported-devices',
            from: '/docs/connections/supported-devices',
          },
          {
            to: '/docs/devices/polling',
            from: '/docs/platform-concepts/polling',
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

  organizationName: 'texturehq',
  projectName: 'docs',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Add the following lines for the "Edit" functionality
          editUrl: 'https://github.com/texturehq/docs/tree/main/',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        ...gtag,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: 'TS0KK5KXLO',
      apiKey: '99a70acfc3fd6c2941528e464a175820',
      indexName: 'texturehq',
      contextualSearch: false,
    },
    image: 'img/texture-social-card.png',
    navbar: {
      logo: {
        alt: 'Texture Docs Logo',
        src: 'img/docs-logo.svg',
        srcDark: 'img/docs-logo__dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'home',
          position: 'left',
          label: 'Docs',
        },
        { to: '/api', label: 'API Reference', position: 'left' },
        { to: '/docs/sources/supported-devices', label: 'Supported Devices', position: 'left' },
        {
          href: 'https://dashboard.texturehq.com',
          label: 'Dashboard',
          position: 'right',
        },
        {
          href: 'https://github.com/texturehq/examples',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Join our Slack Community',
              href: 'https://join.slack.com/t/texture-community/shared_invite/zt-2ho02ds2o-pBNH1ZGcopxgIY3BgKcKzg',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/texturehq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Status',
              href: 'https://status.texturehq.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/texturehq/examples',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Texture Corp. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;