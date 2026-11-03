/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' }
    ]
  }
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [{ source: '/admin', destination: 'https://backend-formhaus.vercel.app/admin', permanent: false }];
  }
};
