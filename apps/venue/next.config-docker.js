module.exports = {
  /*typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },*/
  eslint: {
    // NOTE: `eslint` will be used in Docker builds once Nx Executors can be used
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['newk.mo.cloudinary.net'],
    formats: ['image/webp'],
  },
  reactStrictMode: true,
  basePath: '/apps/venue',
  output: 'standalone',
};
