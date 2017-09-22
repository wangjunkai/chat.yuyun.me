'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

process.env.NODE_ENV = 'development';

const http = require('http');
const express = require('express');
const app = express();
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('./config/paths');
//webpack配置文件
const config = require('./config/webpack.config.dev');
//中间服务器的配置文件
const devServerConfig = require('./config/webpackDevServer.config');
const {port, host, apiPort} = require('./config/express.server');

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

//检测端口
choosePort(host, port)
  .then(port => {
    if (port == null) {
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, host, port);
    const compiler = createCompiler(webpack, config, appName, urls, false);
    //配置中间服务器
    const serverConfig = devServerConfig(urls.lanUrlForConfig);
    app.use(require("webpack-dev-middleware")(compiler, serverConfig));
    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log
    }));
    const wsProxy = proxy('/chat', {
      target: 'http://localhost:' + apiPort,
      changeOrigin: true,
      ws: true,
      logLevel: 'debug'
    });
    app.use(wsProxy);
    const server = http.createServer(app);
    server.listen(port, host, function () {
      console.log('Client Server listening at port %d', port);
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        server.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
