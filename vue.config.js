module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: "/forutonamanagement/",
  devServer: {
    proxy: {
      "/forutonaManagerApiServer": {
        target: "http://127.0.0.1:8443/",
        changeOrigin: true,
        pathRewrite: {
          "^/forutonaManagerApiServer": "",
        },
      },
    },
  },

}