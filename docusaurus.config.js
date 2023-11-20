// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';

// module.exports = async function createConfigAsync() {
//   return {
//     presets: [
//       [
//         '@docusaurus/preset-classic',
//         {
//           docs: {
//             path: 'docs',
//             remarkPlugins: [(await import('remark-math')).default],
//             rehypePlugins: [(await import('rehype-katex')).default],
//           },
//         },
//       ],
//     ],
//     stylesheets: [
//       {
//         href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
//         type: 'text/css',
//         integrity:
//           'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
//         crossorigin: 'anonymous',
//       },
//     ],
//   };
// };

// export default {
//   presets: [
//     [
//       '@docusaurus/preset-classic',
//       {
//         docs: {
//           path: 'docs',
//           remarkPlugins: [remarkMath],
//           rehypePlugins: [rehypeKatex],
//         },
//       },
//     ],
//   ],
//   stylesheets: [
//     {
//       href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
//       type: 'text/css',
//       integrity:
//         'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
//       crossorigin: 'anonymous',
//     },
//   ],
// };

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HonorCode',
  tagline: 'Honoring the builders',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://honorcode.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'HonorCode', // Usually your GitHub org/user name.
  projectName: 'HonorCode', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Honor Code',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/HonorCodeDAO/honorcode',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              {
                label: 'X',
                href: 'https://twitter.com/recursivestakes',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/HonorCodeDAO/honorcode',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} HonorCode.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
