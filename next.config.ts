import type { NextConfig } from "next";

const repo = "ragav-portfolio";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,

  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
