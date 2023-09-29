/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UPLOAD_ENV: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDNAME_ENV: process.env.CLOUDINARY_CLOUDNAME,
  },
};

module.exports = nextConfig;
