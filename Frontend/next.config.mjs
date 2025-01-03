/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // API port
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000', // API port
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'http',
//           hostname: 'localhost',
//           port: '8000', // Adjust according to your API port
//           pathname: '/**',
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;
  


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8000', // Adjust according to your API port
//         pathname: '/**',
//       },
//     ],
//   },
//   experimental: {
//     appDir: true, // Enables the `/app` directory support
//   },
// };

// export default nextConfig;
