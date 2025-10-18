/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      "@/": require('path').resolve(__dirname, "client") + "/"
    });
    return config;
  },
};
