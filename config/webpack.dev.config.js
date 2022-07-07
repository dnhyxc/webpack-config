const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");
module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(less)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // css 模块化配置
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // css 模块化配置
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: "9102",
  },
});
