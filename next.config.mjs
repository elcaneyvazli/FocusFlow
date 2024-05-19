/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_KEY_QUOTESS: process.env.NEXT_PUBLIC_API_KEY_QUOTESS,
  },
};

export default nextConfig;
