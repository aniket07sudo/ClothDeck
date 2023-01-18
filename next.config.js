/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      // test: /\.svg$/,
      // use: ["@svgr/webpack"],
      // test: /\.svg$/i,
      // use: ['@svgr/webpack'],
      // use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      test: /\.svg$/i,
      // issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_MONGO_URL: "mongodb+srv://aniket_cool:aniket1234@cluster0.uzxdnvy.mongodb.net/?retryWrites=true&w=majority",
    NEXT_PUBLIC_SECRET: 'hellopassword'
  },
  images: {
    domains: ['images.unsplash.com','images.pexels.com','cdn4.iconfinder.com','plus.unsplash.com','assets.myntassets.com']
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
