/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000', // Adjust according to your API port
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  