"use strict";

const Controller = require("egg").Controller;
const Citys = require("../public/city");
const Mock = require("mockjs");
const jwt = require("jsonwebtoken");
const AlipaySDK = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;
const { payConfig } = require("../config/index");
const alipaySdk = new AlipaySDK({
  appId: payConfig.appId, // 你自己的沙箱环境的appId
  privateKey: payConfig.privateKey, // 私钥
  signType: "RSA2", // 签名类型
  alipayPublicKey: payConfig.alipayPublicKey, // 支付宝公钥（不是应用公钥）
  gateway: "https://openapi.alipaydev.com/gateway.do", // 网关地址
  timeout: 5000, // 网关超时时间
  camelcase: true, // 是否把网关返回的下划线 key 转换为驼峰写法
});

//时间格式化
function tiemFormat(str) {
  const timeStamp = new Date(str + "");
  const date = new Date(timeStamp);
  const date_value =
    date.getFullYear() +
    "-" +
    ten(date.getMonth() + 1) +
    "-" +
    ten(date.getDate());
  return date_value;
}

// 小于10数字 前面加0
function ten(str) {
  return parseInt(str) < 10 ? "0" + str : str;
}

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;

    console.log(ctx.model);
    // const dats = Mock.mock({

    //     "secondhouses|10000": [{
    //         "name": "@ctitle(5,10)",
    //         "ditie|1": [
    //             '10号线(基隆路-虹桥火车站)',
    //             '15号线',
    //             '1B号线',
    //             '1号线',
    //             '2号线',
    //             '3号线',
    //             '4号线',
    //             '5号线',
    //             '5号线支线',
    //             '6号线',
    //             '7号线',
    //             '8号线',
    //             '9号线',
    //             '11号线(花桥-三林)',
    //             '12号线',
    //             '13号线',
    //             '16号线',
    //             '17号线',
    //             '浦江线',
    //             '金山铁路',
    //             '磁悬浮'
    //         ],
    //         "quyu|1": ['浦东',
    //             '闵行',
    //             '宝山',
    //             '徐汇',
    //             '普陀',
    //             '杨浦',
    //             '长宁',
    //             '松江',
    //             '嘉定',
    //             '黄浦',
    //             '静安',
    //             '虹口',
    //             '青浦',
    //             '奉贤',
    //             '金山',
    //             '崇明'
    //         ],
    //         "jiage|700-20000": 1,
    //         "fangxing|1": ["一居", "二居", "三居", "四居+"],
    //         "mianji|20-200": 1,
    //         "ts|1": ["近地铁", "领包入住", "精装修", "VR房源", "押一付一", "新上", "认证公寓", "随时看房", "业主自荐"],
    //         "cx|1": ["南北", "南", "东", "北", "西"],
    //         "ll|1-30": 1,
    //         "zx|1": ["精装房", "普通装修", "毛坯房"],
    //         "yt|1": ["普通住宅", "商业类", "别墅", "四合院", "车位", "其他"],
    //         "qs|1": ["商品房", "经适房", "公房", "其他"],
    //         "dt|1": ["有电梯", "无电梯"],
    //         "lx|1": ["塔楼", "板楼", "板塔结合"],
    //         "fs|1": ["月付", "季付", "年付"],
    //         "zf|1": ["合租", "整租"],
    //         "xq|1": ["兴泉小区", "阳曲小区", "地矿小区", "紫阳花苑", "真源小区", "民华小区", "金巷小区", "合阳小区", "高兴花园", "金藤苑", "艾南小区", ],
    //         "id": "@id",
    //         "jjr": "@cname",
    //         "pp|1": ["链家", "自如"],
    //         "lz|1": ["低楼层", "高楼层", "中楼层"],
    //         "zq|1": ["月租", "年租", "一个月起租", "1-3个月", "4-6个月"],
    //         "img|1": ["https://i02piccdn.sogoucdn.com/651149bea078d610", "https://file103.mafengwo.net/s9/M00/D0/97/wKgBs1dz--KABrtuAAC3AQ1sMFc93.jpeg?imageMogr2/thumbnail/%211070x804r/gravity/Center/crop/%211070x804/quality/90",
    //             "https://img4.cache.netease.com/photo/0025/2017-04-18/CI9ODQRG0BGT0025.jpg", "http://tgi1.jia.com/109/960/9960506.jpg", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190505%2Fe38e380ea1424f2eb69f00c25ffe9f6c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637059776&t=ccf644d452849c5351196008250a85f7",
    //             "https://img.mp.itc.cn/upload/20170316/f5f45de144e34253b9ae8087c8610c8c_th.jpg"
    //         ]

    //     }]
    // });

    // await dats.secondhouses.forEach((item) => {
    //     ctx.model.Renthouse.create({
    //         name: item.name,
    //         ditie: item.ditie,
    //         quyu: item.quyu,
    //         jiage: item.jiage,
    //         fangxing: item.fangxing,
    //         mianji: item.mianji,
    //         ts: item.ts,
    //         cx: item.cx,
    //         ll: item.ll,
    //         zx: item.zx,
    //         yt: item.yt,
    //         qs: item.qs,
    //         dt: item.dt,
    //         lx: item.lx,
    //         xq: item.xq,
    //         jjr: item.jjr,
    //         pp: item.pp,
    //         lz: item.lz,
    //         zq: item.zq,
    //         zf: item.zf,
    //         fs: item.fs,
    //         id: item._id,
    //         img: item.img,

    //     });
    // });

    ctx.body = {
      code: 1,
    };

    // ctx.model.User  User表
    // ctx.body = 'hi, egg';
  }

  async zhifubao() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
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
    let user = jwt.verify(authorization, "lianjia");

    // console.log("user========", user.dataValues)

    let One = await ctx.model.Renthouse.findOne({ where: { id } });

    let sui = Math.random().toString().slice(2, 9);
    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("appId", "2021000118639220");
    formData.addField("charset", "utf-8");
    formData.addField("signType", "RSA2");
    formData.addField("bizContent", {
      outTradeNo: `${One.dataValues.id + "_" + sui}`, // 【必选】商户订单号：64个字符内，包含数字，字母，下划线；需要保证在商户端不重复
      productCode: "FAST_INSTANT_TRADE_PAY", // 【必选】销售产品码，目前仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: `${One.dataValues.jiage}`, // 【必选】订单总金额，精确到小数点后两位
      subject: "支付定金", // 【必选】 订单标题
      body: `支付${One.dataValues.name}的定金`, // 【可选】订单描述
    });
    // console.log('formData:===============', formData)
    /**
     * exec对应参数：
     * method（调用支付宝api）
     * params（api请求的参数（包含“公共请求参数”和“业务参数”））
     * options（validateSign，formData，log）
     *
     * 统一下单支付 exec
     */

    // console.log(One.dataValues.id + "_" + sui)

    if (user.dataValues) {
      //往订单列表添加数据
      let create = await ctx.model.Order.create({
        date: tiemFormat(new Date()),
        serial: `${One.dataValues.id + "_" + sui}`,
        price: `${One.dataValues.jiage}`,
        type: "房屋出租",
        username: `支付${One.dataValues.name}的定金`,
        tel: user.dataValues.tel,
      });
    }

    ctx.body = await alipaySdk.exec("alipay.trade.page.pay", {}, { formData });
  }
}

module.exports = HomeController;
