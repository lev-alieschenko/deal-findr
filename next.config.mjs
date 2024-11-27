/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['async_hooks'],
  },
};

export default nextConfig;
