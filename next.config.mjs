/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for optimized images
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'content-type', value: '.*text/html.*' }],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  optimizePackageImports: [
    '@radix-ui/react-accordion',
    '@radix-ui/react-dialog',
    '@radix-ui/react-popover',
    'lucide-react',
  ],
  experimental: {
    optimizeServerIslands: true,
  },
  webpack: (config, { isServer }) => {
    // Only modify splitChunks if it's an object (not false/boolean)
    if (config.optimization.splitChunks && typeof config.optimization.splitChunks === 'object') {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        lucide: {
          test: /[\\/]node_modules[\\/]lucide-react/,
          name: 'lucide',
          priority: 10,
          reuseExistingChunk: true,
          minChunks: 1,
        },
        radix: {
          test: /[\\/]node_modules[\\/]@radix-ui/,
          name: 'radix',
          priority: 10,
          reuseExistingChunk: true,
        },
        ui: {
          test: /[\\/]components[\\/]ui/,
          name: 'ui-chunk',
          priority: 5,
          minSize: 20000,
        },
      }
    }
    return config
  },
}

export default nextConfig
