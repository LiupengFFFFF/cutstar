/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/cutstar" : undefined,
  assetPrefix: isGitHubPages ? "/cutstar/" : undefined,
};

export default nextConfig;
