var webpack = require("webpack");
module.exports = {
  transpileDependencies: ["vuetify", "vuex-module-decorators"],
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      })
    ]
  },
  publicPath: "/forutonamanagement/",
  devServer: {
    proxy: {
      "/forutonamanagementbackend": {
        target: "http://127.0.0.1:8443/forutonamanagementbackend/",
        changeOrigin: true,
        pathRewrite: {
          "^/forutonamanagementbackend": ""
        }
      }
    }
  }
};
