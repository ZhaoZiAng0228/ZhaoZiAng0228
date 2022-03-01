"use strict";

const Controller = require("egg").Controller;

const fs = require("fs");
const path = require("path");
// 密码加密
const getPass = require("../../utils/md5");
// token生成
const jwt = require("jsonwebtoken");
const moment = require("moment");
const axios = require("axios");
// SDK
const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;
console.log("AlipaySDK:", AlipaySDK);
const { payConfig } = require("../../config/index");
const alipaySdk = new AlipaySDK({
  appId: payConfig.appId, // 你自己的沙箱环境的appId
  privateKey: payConfig.privateKey, // 私钥
  signType: "RSA2", // 签名类型
  alipayPublicKey: payConfig.alipayPublicKey, // 支付宝公钥（不是应用公钥）
  gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
  timeout: 5000, // 网关超时时间
  camelcase: true, // 是否把网关返回的下划线 key 转换为驼峰写法
});

// 第三方登录
const client_id =
  "0c1d5109ab8eaf666838b3edbed4d30ba8d207d267d10d81930fd85b617ce492";
const client_secret =
  "2212f0dbd3cb4862074e52ee880cff8335047471d4f48c60339ba2c3df35ac5b";
const redirect_uri = "http://localhost:7001/oauth/redirect";
class ManageruserController extends Controller {
  //用户注册
  async registers() {
    // /api/manager/register
    const { ctx } = this;
    const { email, name, role, password } = ctx.request.body;
    const findone = await ctx.model.Manager.findOne({ where: { email } });
    console.log(findone);
    //用户存在
    if (findone) {
      ctx.body = {
        code: 500,
        msg: "账号已存在",
      };

      return;
    } else {
      // 用户不存在可以注册
      const user = await ctx.model.Manager.create({
        name,
        email,
        role,
        password: getPass(password),
        tel: "18549840812",
        headerimg:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fq_70%2Fimages03%2F20200714%2F9d51dc15266d42d993cf3e062f0f7bfc.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637477253&t=3aa6c5daa46f23a689a2cc1439e62e6e",
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
  }
  //用户登录

  async login() {
    // /api/manager/login
    const { ctx } = this;
    const { email, password } = ctx.request.body;

    //判断验证码是否一致

    const findone = await ctx.model.Manager.findOne({
      where: { email },
    });
    // const all = await ctx.model.Distirct.findAll();

    //用户存在
    if (findone) {
      //密码正确
      if (findone.password === getPass(password)) {
        let token = jwt.sign({ ...findone }, "lianjia", { expiresIn: "1h" });
        ctx.body = {
          code: 200,
          msg: "登录成功",
          token,
          data: findone,
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
  // 支付
  async aliPay() {
    const { ctx } = this;
    const { price } = ctx.query;
    console.log(price);
    const formData = new AlipayFormData();

    formData.setMethod("get");
    formData.addField("appId", "2021000118638550");
    formData.addField("charset", "utf-8");
    formData.addField("signType", "RSA2");
    formData.addField("bizContent", {
      outTradeNo: +new Date(), // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
      productCode: "FAST_INSTANT_TRADE_PAY", // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: price, // 【必选】订单总金额，精确到小数点后两位
      subject: "test", // 【必选】 订单标题
      body: "test", // 【可选】订单描述
    });
    console.log("formData:===============", formData);
    /**
     * exec对应参数：
     * method（调用支付宝api）
     * params（api请求的参数（包含“公共请求参数”和“业务参数”））
     * options（validateSign，formData，log）
     *
     * 统一下单支付 exec
     */
    ctx.body = await alipaySdk.exec("alipay.trade.page.pay", {}, { formData });
  }
  // 第三方登录
  async thirdLogin() {
    const { ctx } = this;
    const code = ctx.query.code;
    // gitee码云的获取token接口
    const tokenResponse = await axios({
      method: "post",
      url: `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}`,
      headers: {
        accept: "application/json",
      },
    });

    const accessToken = tokenResponse.data.access_token; // 访问token
    const result = await axios({
      method: "get",
      url: `https://gitee.com/api/v5/user?access_token=${accessToken}`,
      headers: {
        accept: "application/json",
      },
    });

    const name = result.data.login;
    const avatar = result.data.avatar_url;
    ctx.response.redirect(
      `http://localhost:8080/HouseResource?token=${accessToken}&name=${name}&avatar=${avatar}`
    );
  }
}

module.exports = ManageruserController;
