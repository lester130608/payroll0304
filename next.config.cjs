const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@/lib'] = path.join(__dirname, 'lib');
    config.resolve.alias['@/components'] = path.join(__dirname, 'components');
    config.resolve.alias['@/pages'] = path.join(__dirname, 'pages');
    config.resolve.alias['@/styles'] = path.join(__dirname, 'styles');
    return config;
  },
  experimental: {
    turbo: true,
  },
};