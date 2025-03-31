/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },

  images: {
    // Not sure why this was here before... It stops placeholder=blur from working
    unoptimized: false,
  },
}

module.exports = nextConfig
