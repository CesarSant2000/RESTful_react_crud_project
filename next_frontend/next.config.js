/** @type {{images: {remotePatterns: [{protocol: string, port: string, host: string, pathname: string}]}, reactStrictMode: boolean}} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        pathname: '/***/**/*',
        hostname: 'img.icons8.com',
      },
    ]
  }
}

module.exports = nextConfig
