/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    COPILOTKIT_API_KEY: process.env.COPILOTKIT_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/copilotkit/:path*',
        destination: 'http://localhost:8000/copilotkit/:path*',
      },
    ];
  },
};

module.exports = nextConfig;