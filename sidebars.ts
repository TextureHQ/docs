import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

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
      type: 'category',
      label: 'Home',
      collapsed: false,
      items: [
        'home/welcome',
        'home/getting-started',
        'home/quickstart',
        'home/use-cases',
        'home/signing-up'
      ],
    }, {
      type: 'category',
      label: 'Platform Concepts',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'platform-concepts' }],
    }, {
      type: 'category',
      label: 'Sources',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'sources' }]
    }, {
      type: 'category',
      label: 'Devices',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'devices' }]
    }, {
      type: 'category',
      label: 'Commands',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'commands' }],
    }, {
      type: 'category',
      label: 'Destinations',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'destinations' }],
    }, {
      type: 'category',
      label: 'Programs & Enrollments',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'programs-enrollments' }],
    }, {
      type: 'category',
      label: 'Signals',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'signals' }]
    }, {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'tutorials' }]
    }, {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'api' }]
    }, {
      type: 'category',
      label: 'Support',
      collapsed: false,
      items: [
        {
          type: 'link',
          label: 'Blog',
          href: 'https://www.texturehq.com/blog',
        },
        { type: 'autogenerated', dirName: 'support' },
      ],
    }
  ],
};

export default sidebars;
