import path from 'path';

const nextConfig = {
  webpack(config) {
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      '@/': path.resolve(process.cwd(), 'client') + '/',
    });
    return config;
  },
  // add any other Next config keys you need below
};

export default nextConfig;
