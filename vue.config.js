
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? "/forutonamanagement/" :
      "/",
  devServer: {
    historyApiFallback: true,
    https: true,
    proxy: {
      "/forutonamanagermentb": {
        target: "https://localhost:8443/",
        changeOrigin: true,
        pathRewrite: {
          "^/forutonamanagermentb": "",
        },
      },
    },
  },

}