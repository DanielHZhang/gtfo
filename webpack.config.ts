import path from 'path';
import webpack from 'webpack';
import ProgressPlugin from '@supersede/webpack-progress-plugin';
import {
  PORT,
  REACT_ENTRY_PATH,
  VENDOR_JSON_PATH,
  BUILD_URL,
  BUILD_OUTPUT_PATH,
} from './webpack.constants';

export const config: webpack.Configuration = {
  mode: 'development',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      path.join(process.cwd(), ...REACT_ENTRY_PATH),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(process.cwd(), ...BUILD_OUTPUT_PATH),
    publicPath: BUILD_URL,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|woff|woff2|eot|ttf|svg|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 50000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new ProgressPlugin({format: 'minimal'}),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.join(process.cwd(), ...VENDOR_JSON_PATH))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore moment locale modules
    // new BundleAnalyzerPlugin(),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
