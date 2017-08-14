'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

process.env.NODE_ENV = 'development';

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const paths = require('./config/paths');
//webpack配置文件
const config = require('./config/webpack.config.dev');
//中间服务器的配置文件
const devServerConfig = require('./config/webpackDevServer.config');
const {port, host} = require('./config/express.server');


// Warn and crash if required files are missing
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
    const devServer = new webpackDevServer(compiler, serverConfig);

    //监听服务器端口
    devServer.listen(port,host, function () {
      console.log('Server listening at port %d', port);
      //打开浏览器
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
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
