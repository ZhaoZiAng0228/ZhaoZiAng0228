'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  'egg-mysql': {
    enable: true,
    package: 'egg-mysql'
  },
  'egg-cors': {
    enable: true,
    package: 'egg-cors'
  },
  'egg-validate': {
    enable: true,
    package: 'egg-validate'
  },
  "io": {
    enable: true,
    package: "egg-socket.io",
  },
};
