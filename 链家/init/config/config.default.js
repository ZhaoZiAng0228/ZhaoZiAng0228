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
        io: {
            init: {}, // passed to engine.io
            namespace: {
                "/homeOne": {
                    connectionMiddleware: ["auth"],
                    packetMiddleware: ["filter"],
                },
            },
        },
    };


    config.sequelize = {
        dialect: 'mysql',
        host: '47.101.32.167',
        port: 3306,
        database: 'findhouse',
        "username": "findHouse",
        "password": "hss",
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1634020270094_5110';

    // add your middleware config here
    config.middleware = [];


    config.multipart = {
        mode: "file"
    }
    config.oss = {

            client: {
                accessKeyId: "LTAI5tNPPbJpARy6hQt4vWMa",
                accessKeySecret: "dLWGclyUvFrjEp2AcuYUULYVcZGNK6",
                bucket: "hss1bucket",
                endpoint: "oss-cn-shanghai.aliyuncs.com",
                timeout: "60s"
            }
        }
        // add your user config here
    const userConfig = {
        // myAppName: 'egg',


        security: {
            csrf: {
                // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
                // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
                enable: false
            },
            domainWhiteList: ['*']
        },
        'cors': {
            origin: '*',
            allowMethods: 'GET,PUT,POST,DELETE',

        },
        "validatePlugin": {
            resultHandle: 'return', // 可选 return 和 throw，默认 return
        }
    };

    return {
        ...config,
        ...userConfig,
    };
};