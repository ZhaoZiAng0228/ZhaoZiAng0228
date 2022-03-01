'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    'egg-cors': {
        enable: true,
        package: 'egg-cors'

    },
    "egg-validate": {
        enable: true,
        package: "egg-validate"
    },
    "oss": {
        enable: true,
        package: "egg-oss"
    },
    "io": {
        enable: true,
        package: "egg-socket.io",
    },


};