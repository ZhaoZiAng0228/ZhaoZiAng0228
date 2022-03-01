'use strict';

module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    'egg',
    'egg-scripts',
  ],
  devdep: [
    'egg-ci',
    'egg-bin',
    'egg-mock',
    'autod',
    'autod-egg',
    'eslint',
    'eslint-config-egg',
  ],
  exclude: [
    './test/fixtures',
    './dist',
  ],
};

//  //注册
//  async register() {
//   let { ctx } = this;
//   const { user, pass } = ctx.request.body
//   let msg = ctx.validate({ user: 'string', pass: 'string' }, ctx.request.body)
//   if (msg) {
//     ctx.body = {
//       code: 500,
//       msg: '参数类型错误',
//       err: msg[0].field + '类型错误'
//     }
//     return
//   }
//   const data = await this.app.mysql.insert('user', { user, pass: getPas(pass) })
//   if (!data) {
//     await this.app.mysql.insert('user', { user, pass: getPas(pass) })
//     ctx.body = {
//       code: 1,
//       message: '注册成功'
//     }
//     return
//   } else {
//     ctx.body = {
//       code: 500,
//       message: '已有账号'
//     }
//     return
//   }
// }

// //登录
// async login() {
//   let { ctx } = this
//   let { user, pass } = ctx.request.body
//   let userResult = await this.app.mysql.get('user', { user })
//   //判断当前用户是否存在
//   if (!userResult) {
//     ctx.body = {
//       code: 500,
//       message: '用户不存在'
//     }
//     return;
//   }
//   //判断密码是否不匹配
//   if (userResult.pass !== pass) {
//     ctx.body = {
//       code: 500,
//       message: '密码错误'
//     }
//     return;
//   }
//   let userInfo = { ...userResult }
//   let token = jwt.sign(userInfo, 'zza', { expiresIn: '1h' })
//   ctx.body = {
//     code: 1,
//     message: '登陆成功',
//     token
//   }
// }