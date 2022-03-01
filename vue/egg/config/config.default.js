/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    //   io: {
    //     init: {}, // passed to engine.io
    //     namespace: {
    //         "/homeOne": {
    //             connectionMiddleware: ["auth"],
    //             packetMiddleware: ["filter"],
    //         },
    //     },
    // },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634039458760_1901';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    'mysql': {
      client: {
        // host
        host: 'localhost',
        // 端口号 /*  */
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'ZhaoZiAng..0228',
        // 数据库名
        database: 'server',
      },
    },
    security: { //关闭防火墙
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      // domainWhiteList: ['http://localhost:8080']
    },
    'egg-validate': {
      convert: true
    }
  };


  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE'
  };

  // config.jwt = { secret: "zhouyou" };

  return {
    ...config,
    ...userConfig,
  };
};
