/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    domains: ["res.cloudinary.com", "static.amayama.com", "www.amayama.com", "nissan-img.amayama.com"],
  },
};

module.exports = nextConfig;
