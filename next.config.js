/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    customKey: "my-value",
    BACKEND_URL: "https://simplifyaio-c8a308f0f77b.herokuapp.com",
  },
  images:{
    domains: ['cdn.discordapp.com','media.discordapp.net','media.tenor.com'],
  }
}

module.exports = nextConfig
