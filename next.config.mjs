/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", 'myconstbucket.s3.eu-west-3.amazonaws.com'], 
  },
};

export default nextConfig;
