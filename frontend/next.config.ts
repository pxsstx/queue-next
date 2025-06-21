/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other Next.js configurations
  experimental: {
    allowedDevOrigins: [
      'http://localhost:3000', // Assuming your dev server runs on localhost:3000
      'http://192.168.1.103:3000', // Or whatever port it's being accessed from
      // Add any other origins you expect to access your dev server during development
    ],
  },
};

export default nextConfig;