/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output:{
    globalObject: 'this',
  }
}

module.exports = nextConfig
