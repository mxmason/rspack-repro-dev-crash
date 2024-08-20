import path from 'node:path';
import { fileURLToPath } from 'node:url';

import rspack from '@rspack/core';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error('Unknown bundler');
}

const outputPath = isRunningWebpack
  ? path.resolve(__dirname, 'webpack-dist')
  : path.resolve(__dirname, 'rspack-dist');

const HtmlPlugin = isRunningWebpack
  ? HtmlWebpackPlugin
  : rspack.HtmlRspackPlugin;
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  devServer: {
    static: {
      directory: outputPath,
      publicPath: '/',
    },
  },
  devtool: false,
  entry: {
    main: './src/index',
  },
  output: {
    path: outputPath,
    clean: true,
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],
  experiments: {
    css: true,
  },
};

export default config;
