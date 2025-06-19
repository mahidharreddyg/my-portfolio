/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

// Add this to verify config is loaded
console.log('Next.js config loaded with reactStrictMode:', nextConfig.reactStrictMode);

export default nextConfig
