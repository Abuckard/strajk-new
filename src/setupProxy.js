const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, 
    })
  );
};
