const webpack = require("webpack");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],
  },

  publicPath: process.env.NODE_ENV === 'production'
      ? "/forutonamanagement/" :
      "/",
  devServer: {
    historyApiFallback: true,
    https: true,
    proxy: {
      "/forutonamanagermentbtest": {
        target: "https://localhost:8443/forutonamanagermentbtest",
        changeOrigin: true,
        pathRewrite: {
          "^/forutonamanagermentbtest": "",
        },
      },
    },
  },

}