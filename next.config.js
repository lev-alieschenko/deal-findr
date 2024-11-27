/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['async_hooks'],
    runtime: 'experimental-edge',
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
