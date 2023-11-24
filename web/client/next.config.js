/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "qr.heimanbotz.workers.dev",
      },
    ],
  },
}

module.exports = nextConfig
