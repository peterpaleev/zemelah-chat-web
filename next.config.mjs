/** @type {import('next').NextConfig} */
import fs from "fs";
import withLlamaIndex from "llamaindex/next";
import webpack from "./webpack.config.mjs";

// Wrap config loading in try-catch
let nextConfig;
try {
  nextConfig = JSON.parse(fs.readFileSync("./next.config.json", "utf-8"));
} catch (error) {
  console.error("Error reading next.config.json:", error);
  nextConfig = {};
}

// Add basePath and output configuration for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
  nextConfig.basePath = `/${repo}`;
  nextConfig.assetPrefix = `/${repo}/`;
}

// Ensure these settings are applied after withLlamaIndex
const config = withLlamaIndex(nextConfig);

// Override with static export settings
config.output = 'export';
config.images = {
  unoptimized: true,
};
config.webpack = webpack;

export default config;
