const createNextIntlPlugin = require('next-intl/plugin');
const { withContentlayer } = require('next-contentlayer2');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'contentlayer/generated': 'contentlayer2/generated',
      'contentlayer/client': 'contentlayer2/client',
      react: 'react/index.js',
      'react-dom': 'react-dom/index.js',
      'react-dom/server': 'react-dom/server.js'
    }
  }
};

module.exports = withContentlayer(withNextIntl(nextConfig));
