/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  },
  output: "standalone",
  reactStrictMode: false,

  webpack: (config, { dev, isServer }) => {
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true
    }

    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }

    return config;
  },

  experimental: {
    optimizeFonts: true,
    optimizePackageImports: ['@lucide-react', 'redux']
  },
  
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000
    }
  }
};

export default nextConfig;
