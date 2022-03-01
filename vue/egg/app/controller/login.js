'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
const getPassword = require('../../db.js')
const ClientID = '1c1095e2f3da4befe8a051644a7f7e84b8731d7f266da147dd9a3ff08cd39971';
const ClientSecret = 'a606de79640b2a27a1329008e884c15413a337b165ecda34f80006952b1ec032';
const redirectUri = 'http://10.3.225.34:8080/login';

class LoginController extends Controller {
  /* 登录功能 */
  async login() {
    const { ctx } = this;
    const { user } = ctx.request.body
    const login = await this.app.mysql.get('login', { name: user.name, password: getPassword(user.password) });
    if (login) {
      /* 当login存在时,code返回为200,并传给前端一个token值 */
      const token = jwt.sign({ ...login }, 'zhouyou', { expiresIn: '1h' })
      ctx.body = {
        code: 200,
        login,
        token,
        message: '登陆成功'
      }
    } else {
      /* 当login不存在时,code返回为404 */
      ctx.body = {
        code: 404,
        message: '账户名或密码输入错误,请重新输入'
      }
    }
  }
  /* 注册功能 */
  async sign() {
    const { ctx } = this;
    const { user } = ctx.request.body
    // console.log(user);
    const sign = await this.app.mysql.get('login', { name: user.name });
    if (!sign) {
      /* 当sign不存在时,将当前表单中的数据上传至数据库,形成新的数据 */
      await this.app.mysql.insert('login', { name: user.name, password: getPassword(user.password), date: user.date, role: '管理员', tion: 'false', email: '', img: 'https://mms0.baidu.com/it/u=412973890,2049211375&fm=15&gp=0.jpg&fmt=auto' });
    } else {
      /* 当sign存在时,code返回为404 */
      ctx.body = {
        code: 404,
        message: '账号已存在,请重新注册'
      }
      return
    }
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }
  // 第三方登录
  async ThirdPartyLogin() {
    const { ctx } = this;
    const { code } = ctx.request.body
    const data = await ctx.curl(`https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${ClientID}&redirect_uri=${redirectUri}&client_secret=${ClientSecret}`, {
      method: 'post',
      rejectUnauthorized: false,
      dataType: 'json'
    })

    const userList = await ctx.curl(`https://gitee.com/api/v5/user?access_token=${data.data.access_token}`, {
      method: 'get',
      rejectUnauthorized: false,
    })
    const thirdUser = JSON.parse(userList.data)
    if (userList.status === 200) {
      ctx.body = {
        status: 200,
        message: '登陆成功',
        thirdUser
      }
    } else {
      ctx.body = {
        status: 400,
        message: '授权失败',
      }
    }

  }
}

module.exports = LoginController;
