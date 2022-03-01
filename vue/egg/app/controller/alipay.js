"use strict";
// 买家账号:auhlbq0441@sandbox.com
const Controller = require("egg").Controller;
const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;
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

class AliPayController extends Controller {
    async getAlipay() {
        const { ctx } = this;
        const { detailMoney } = ctx.query
        let alipayMoney = JSON.parse(detailMoney)
        const formData = new AlipayFormData();
        formData.setMethod("get");
        formData.addField("appId", "2021000118638710"); //基本信息APPID
        formData.addField('notifyUrl', 'http://10.3.225.34:8080/detail/' + detailMoney.id)
        formData.addField('returnUrl', 'http://10.3.225.34:8080/detail/' + detailMoney.id)
        formData.addField("charset", "utf-8");
        formData.addField("signType", "RSA2");
        formData.addField("bizContent", {
            outTradeNo: alipayMoney.indent, // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
            productCode: "FAST_INSTANT_TRADE_PAY", // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
            totalAmount: alipayMoney.money, // 【必选】订单总金额，精确到小数点后两位
            subject: alipayMoney.title, // 【必选】 订单标题
            body: alipayMoney.text, // 【可选】订单描述
        });
        // console.log("formData:===============", formData);
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
}
module.exports = AliPayController;
