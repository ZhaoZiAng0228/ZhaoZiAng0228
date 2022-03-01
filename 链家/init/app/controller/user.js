"use strict";

const Controller = require("egg").Controller;

const fs = require("fs");
const path = require("path");
const sendToWormhole = require("stream-wormhole");
// 密码加密
const getPass = require("../../utils/md5");
// token生成
const jwt = require("jsonwebtoken");
//在后台保存验证码的值

const client_id =
  "24836ab6506bc32a98a1fdd3e34299e5e063a303911c5c6f353ed84859a41b3b";
const client_secret =
  "cd0f80d067ec40cc75fa31c8abfe2fd999dd9ab724f2f2add90e9aaad0b0da58";
const redirect_uri = "http://localhost:7001/api/oauth";

const axios = require("axios");
let isyzm = "";
class UserController extends Controller {
  //码云第三方登录
  async oauth() {
    const { ctx } = this;
    // 前端跳转到 码云携带回来的临时身份id
    const code = ctx.request.query.code;
    console.log("authorization code:", code);

    // 1. gitee码云的获取token的接口
    const tokenResponse = await axios({
      method: "post",
      url: `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}`,
      headers: {
        accept: "application/json",
      },
    });

    console.log(tokenResponse.data, "tokenResponse-----------");
    const scope = tokenResponse.data.scope;
    const accessToken = tokenResponse.data.access_token; // 访问token
    console.log(`access token: ${accessToken}`);

    // 2. 请求用户信息接口
    const result = await axios({
      method: "get",
      url: `https://gitee.com/api/v5/user?access_token=${accessToken}`,
      headers: {
        accept: "application/json",
        // Authorization: `token ${accessToken}`
      },
    });
    console.log(result.data, "用户信息");

    const name = result.data.login;
    const avatar = result.data.avatar_url;

    ctx.response.redirect(
      `http://localhost:3000/basicLayouts/my?token=${accessToken}&name=${name}&avatar=${avatar}&scope=${scope}`
    );
  }

  //更新头像
  async userimg() {
    const { ctx } = this;
    // egg getFileStream 方法自动创建文件可读流
    const stream = await ctx.getFileStream();
    //
    // console.log("stream=====", 'http://' + ctx.host + `/public/img/${filename}`)
    // 创建文件写入路径
    const write = () =>
      new Promise((resolve, reject) => {
        // 获取文件名
        const filename =
          Math.random().toString(36).substr(2) +
          new Date().getTime() +
          stream.filename;
        //图片地址
        // console.log("stream=====", 'http://' + ctx.host + `/public/img/${filename}`)
        // 存储地址
        const target = path.join("./app/public", `img/${filename}`);
        // 创建可写流
        const fileStrem = fs.createWriteStream(target);
        // 建立管道
        stream.pipe(fileStrem);
        // 监听错误
        let errFlag = false;
        fileStrem.on("error", (err) => {
          errFlag = true;
          sendToWormhole(stream);
          fileStrem.destroy();
          reject(new Respone(500, err));
        });
        // 上传完成回写图片地址
        fileStrem.on("finish", () => {
          if (errFlag) return;
          // resolve(new Respone(200, '上传成功', { url: 'http://' + ctx.host + `/public/img/${filename}` }));
          resolve({
            code: 200,
            msg: "上传成功",
            url: "http://" + ctx.host + `/public/img/${filename}`,
          });
        });
      });
    let result;
    try {
      result = await write();
      //判断是否完成上传完成回写图片地址
      if (result) {
        console.log("result===========", result);
        //更新数据库对应用户的头像
        const res = await ctx.model.User.update(
          {
            headerimg: result.url,
          },
          {
            where: {
              id: 1,
            },
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
    ctx.body = result;
  }
  //获取验证码
  async yzm() {
    const { ctx } = this;
    const yzm = Math.random().toString(16).slice(2, 6).toLocaleUpperCase();
    isyzm = yzm;
    ctx.body = {
      code: 1,
      yzm,
    };
  }
  //用户注册
  async register() {
    // /api/users/register
    const { ctx } = this;
    const { username, password, yzm } = ctx.request.body;
    console.log(yzm, isyzm);
    //判断验证码是否一致
    if (yzm === isyzm) {
      const findone = await ctx.model.User.findOne({ where: { username } });

      console.log("findone======", findone);
      //用户存在
      if (findone) {
        ctx.body = {
          code: 500,
          msg: "账号已存在",
        };

        return;
      } else {
        // 用户不存在可以注册
        const user = await ctx.model.User.create({
          username,
          password: getPass(password),
          tel: "13424126655",
        });

        let token = jwt.sign({ ...user }, "lianjia", { expiresIn: "1h" });

        ctx.body = {
          code: 200,
          msg: "注册成功",
          user,
          token,
        };

        return;
      }
    } else {
      ctx.body = {
        code: 500,
        msg: "验证码输入有误,请重新输入",
      };
    }
  }
  //用户登录

  async login() {
    // /api/users/register
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    //判断验证码是否一致

    console.log(username, password, "2222222222", ctx.model.User);

    const findone = await ctx.model.User.findOne({ where: { username } });
    // const all = await ctx.model.Distirct.findAll();

    // console.log(findone, "2222222222")
    //用户存在
    if (findone) {
      //密码正确
      if (findone.password === getPass(password)) {
        let token = jwt.sign({ ...findone }, "lianjia", { expiresIn: "24h" });
        ctx.body = {
          code: 200,
          msg: "登录成功",
          token,
          // all
        };
        return;
      } else {
        ctx.body = {
          code: 500,
          msg: "密码有误",
        };
        return;
      }
    } else {
      ctx.body = {
        code: 500,
        msg: "用户不存在",
      };

      return;
    }
  }

  //获取用户信息
  async getuser() {
    const { ctx } = this;

    const { authorization } = ctx.request.header;

    try {
      let err = jwt.verify(authorization, "lianjia");
    } catch {
      ctx.body = {
        code: 500,
        msg: "登录过期，请重新登录",
      };

      return;
    }

    const {
      dataValues: { id },
    } = jwt.verify(authorization, "lianjia");

    const findone = await ctx.model.User.findOne({ where: { id } });

    // const findall = await ctx.model.District.findAll();

    if (findone) {
      ctx.body = {
        code: 200,
        user: findone,
      };
      return;
    }

    ctx.body = {
      code: 500,
      msg: "未登录",
    };
  }
}

module.exports = UserController;

// /api/users/upload
