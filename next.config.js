/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false, // Disable fs in the browser
        dns: false,
      };
      return config;
    },
  };