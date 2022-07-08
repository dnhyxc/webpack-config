const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");
module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(css)$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      /**
       * 该 less-loader 使用 exclude 排除 node_modules 中的组件库，只针对自己的代码开启 css 模块化
       */
      {
        test: /\.(less)$/,
        exclude: [/node_modules/],
        use: [
          "style-loader",
          // 配置less模块化导入
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.less$/,
        include: [/node_modules/],
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                modifyVars: {
                  "primary-color": "#1DA57A",
                  "link-color": "#1DA57A",
                  "border-radius-base": "2px",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: [/node_modules/],
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
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: "9102",
  },
});
