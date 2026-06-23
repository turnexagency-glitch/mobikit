/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'aeoyymwekjvtzgpctvqu.supabase.co' },
    ],
  },
}

module.exports = nextConfig
