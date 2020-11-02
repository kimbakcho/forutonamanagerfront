
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