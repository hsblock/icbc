module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/': {
        target: 'http://211.67.21.65:8081',
        ws: true,
        changeOrigin: true,
      }
    }
  }
}