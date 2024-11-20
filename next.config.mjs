/** @type {import('next').NextConfig} */
import fs from "fs";
import withLlamaIndex from "llamaindex/next";
import webpack from "./webpack.config.mjs";

const nextConfig = JSON.parse(fs.readFileSync("./next.config.json", "utf-8"));
nextConfig.webpack = webpack;

// Add basePath and output configuration for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  nextConfig.basePath = `/${repo}`
  nextConfig.assetPrefix = `/${repo}/`
}

nextConfig.output = 'export'  // Ensure static export
nextConfig.images = {
  unoptimized: true  // Required for static export
}

export default withLlamaIndex(nextConfig);
