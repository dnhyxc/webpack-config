const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    // 设置打包出来的 js 文件放置在 js 目录下
    filename: 'js/[name]-bundle-[contenthash:6].js',
    path: path.resolve(__dirname, '../dist'),
    // 防止刷新页面后出现页面丢失报错！GET http://localhost:9000/home/js/bundle.js net::ERR_ABORTED 404 (Not Found)
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/images',
          limit: 8192,
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * HtmlWebpackPlugin 配置说明：
     *  template：基于我们自己定义的 html 文件为模板生成 html 文件
     *  filename：打包之后的 html 文件名字
     *  inject：将 js 文件注入到 body 最底部
     *  minify：压缩 html 文件时的配置
     *   - removeComments：去除注释
     */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
      },
    }),
    new ESLintPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.scss'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  // 解决警告：You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
  // performance: {
  //   hints: "warning",
  //   //入口起点的最大体积
  //   maxEntrypointSize: 50000000,
  //   //生成文件的最大体积
  //   maxAssetSize: 30000000,
  //   //只给出 js 文件的性能提示
  //   assetFilter: function (assetFilename) {
  //     return assetFilename.endsWith(".js");
  //   },
  // },
};
