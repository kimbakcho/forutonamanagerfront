
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? "/forutonamanagement/" :
      "/",
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/forutonamanagermentb": {
        target: "http://127.0.0.1:8443/",
        changeOrigin: true,
        pathRewrite: {
          "^/forutonamanagermentb": "",
        },
      },
    },
  },

}