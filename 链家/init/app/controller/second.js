"use strict";

const Controller = require("egg").Controller;

let hquyu = null;

let cachelist = [];
let cachelist2 = [];
let cachelist3 = [];
let room1 = [];
let room2 = [];
let room3 = [];

class SecondController extends Controller {
  async getsconed() {
    const { ctx, app } = this;

    const { first, er, san } = ctx.request.body;
    // console.log(first, er, san)

    console.log(ctx.model.Secondhouse);

    if (san === "区域") {
      hquyu = san;
      const arr = await ctx.model.Secondhouse.findAll({
        where: { quyu: first },
      });
      cachelist = arr;
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    } else {
      hquyu = san;
      const arr = await ctx.model.Secondhouse.findAll({
        where: { ditie: first },
      });
      cachelist = arr;
      ctx.body = {
        code: 1,
        arr,
      };

      return;
    }
  }
  async getsconeddetail() {
    const { ctx, app } = this;

    const { id } = ctx.request.body;
    // const findone = await ctx.model.User.findOne({ where: { username } });

    const obj = await ctx.model.Secondhouse.findOne({ where: { id } });

    ctx.body = {
      code: 1,
      obj,
    };
  }
  // 请求第一次数据
  async getsconedfirst() {
    const { ctx, app } = this;
    const query = { limit: 100, offset: 0 };
    const arr = await ctx.model.Secondhouse.findAll(query);
    ctx.body = {
      code: 1,
      arr,
    };
  }

  // /api/secondprice
  // 根据价格筛选数据
  async getsconedprice() {
    const { ctx, app } = this;
    //最高价 最低价 价格区间范围

    // 200以下 1 200-300 2  300-400 3  400-500 4   500-800 5 800-1000 6 1000以上7
    const { bottomPrice, peakPrice, priceBetween } = ctx.request.body;
    // const query = { limit: 2, offset: 0 };
    // const arr = await ctx.model.Secondhouse.findAll(query)
    const query = { limit: 3000, offset: 0 };
    const prices = await ctx.model.Secondhouse.findAll(query);
    //是否选取区域数据
    let newarr = [];
    if (cachelist.length) {
      cachelist.forEach((item) => {
        priceBetween.forEach((i) => {
          if (i === "1" && Number(item.jiage) < 200) {
            newarr.push(item);
          } else if (
            i === "2" &&
            Number(item.jiage) >= 200 &&
            Number(item.jiage) <= 300
          ) {
            newarr.push(item);
          } else if (
            i === "3" &&
            Number(item.jiage) >= 300 &&
            Number(item.jiage) <= 400
          ) {
            newarr.push(item);
          } else if (
            i === "4" &&
            Number(item.jiage) >= 400 &&
            Number(item.jiage) <= 500
          ) {
            newarr.push(item);
          } else if (
            i === "5" &&
            Number(item.jiage) >= 500 &&
            Number(item.jiage) <= 800
          ) {
            newarr.push(item);
          } else if (
            i === "6" &&
            Number(item.jiage) >= 800 &&
            Number(item.jiage) <= 1000
          ) {
            newarr.push(item);
          } else if (i === "7" && Number(item.jiage) > 1000) {
            newarr.push(item);
          }
        });
      });
      if (bottomPrice && peakPrice) {
        newarr = [];
        cachelist.map((item) => {
          if (Number(peakPrice) >= Number(item.jiage) >= Number(bottomPrice)) {
            newarr.push(item);
          }
        });
      }
      //二次筛选后的cachelist
      cachelist = newarr;
      cachelist2 = [];
      ctx.body = {
        code: 1,
        newarr,
      };
      return;
    } else {
      //无选取区域数据时、
      // //重新赋值
      let newprices = prices;
      newprices.forEach((item) => {
        priceBetween.forEach((i) => {
          if (i === "1" && Number(item.jiage) < 200) {
            newarr.push(item);
          } else if (
            i === "2" &&
            Number(item.jiage) >= 200 &&
            Number(item.jiage) <= 300
          ) {
            newarr.push(item);
          } else if (
            i === "3" &&
            Number(item.jiage) >= 300 &&
            Number(item.jiage) <= 400
          ) {
            newarr.push(item);
          } else if (
            i === "4" &&
            Number(item.jiage) >= 400 &&
            Number(item.jiage) <= 500
          ) {
            newarr.push(item);
          } else if (
            i === "5" &&
            Number(item.jiage) >= 500 &&
            Number(item.jiage) <= 800
          ) {
            newarr.push(item);
          } else if (
            i === "6" &&
            Number(item.jiage) >= 800 &&
            Number(item.jiage) <= 1000
          ) {
            newarr.push(item);
          } else if (i === "7" && Number(item.jiage) > 1000) {
            newarr.push(item);
          }
        });
      });
      if (bottomPrice && peakPrice) {
        newarr = [];
        newprices.map((item) => {
          if (Number(peakPrice) >= Number(item.jiage) >= Number(bottomPrice)) {
            newarr.push(item);
          }
        });
      }
      // 无选择区域选择的二次数据
      cachelist2 = newarr;
      cachelist = [];
      ctx.body = {
        code: 1,
        newarr,
        // prices
      };
      return;
    }
  }

  async getsconedroom() {
    const { ctx, app } = this;
    const { houseType } = ctx.request.body;
    const query = { limit: 3000, offset: 0 };
    const rooms = await ctx.model.Secondhouse.findAll(query);
    let newarr = [];
    if (houseType) {
      if (cachelist.length) {
        cachelist.forEach((item) => {
          houseType.forEach((i) => {
            if (i === "一室" && item.fangxing === "一室") {
              newarr.push(item);
            } else if (i === "二室" && item.fangxing === "二室") {
              newarr.push(item);
            } else if (i === "三室" && item.fangxing === "三室") {
              newarr.push(item);
            } else if (i === "四室" && item.fangxing === "四室") {
              newarr.push(item);
            } else if (i === "五室" && item.fangxing === "五室") {
              newarr.push(item);
            } else if (i === "五室以上" && item.fangxing === "五室以上") {
              newarr.push(item);
            }
          });
        });
        room1 = newarr;
        ctx.body = {
          code: 1,
          newarr,
        };
        return;
      } else if (cachelist2.length) {
        cachelist2.forEach((item) => {
          houseType.forEach((i) => {
            if (i === "一室" && item.fangxing === "一室") {
              newarr.push(item);
            } else if (i === "二室" && item.fangxing === "二室") {
              newarr.push(item);
            } else if (i === "三室" && item.fangxing === "三室") {
              newarr.push(item);
            } else if (i === "四室" && item.fangxing === "四室") {
              newarr.push(item);
            } else if (i === "五室" && item.fangxing === "五室") {
              newarr.push(item);
            } else if (i === "五室以上" && item.fangxing === "五室以上") {
              newarr.push(item);
            }
          });
        });

        room2 = newarr;
        ctx.body = {
          code: 1,
          newarr,
        };
        return;
      } else {
        let newrooms = rooms;

        newrooms.forEach((item) => {
          houseType.forEach((i) => {
            if (i === "一室" && item.fangxing === "一室") {
              newarr.push(item);
            } else if (i === "二室" && item.fangxing === "二室") {
              newarr.push(item);
            } else if (i === "三室" && item.fangxing === "三室") {
              newarr.push(item);
            } else if (i === "四室" && item.fangxing === "四室") {
              newarr.push(item);
            } else if (i === "五室" && item.fangxing === "五室") {
              newarr.push(item);
            } else if (i === "五室以上" && item.fangxing === "五室以上") {
              newarr.push(item);
            }
          });
        });

        room3 = newarr;
        ctx.body = {
          code: 1,
          newarr,
        };
        return;
      }
    }
    ctx.body = {
      code: -1,
    };
  }

  async getsconedmore() {
    const { ctx, app } = this;
    const {
      housingFeature,
      orientation,
      decoration,
      use,
      elevator,
      ownership,
      type,
    } = ctx.request.body;
    const Op = app.Sequelize.Op;
    console.log(
      housingFeature,
      orientation,
      decoration,
      use,
      elevator,
      ownership,
      type
    );

    let hf = [];
    let ot = [];
    let dt = [];
    let us = [];
    let el = [];
    let os = [];
    let tp = [];

    if (housingFeature) {
      hf = housingFeature.map((item) => {
        return { ts: item };
      });
      console.log(hf);
    }

    if (orientation) {
      ot = orientation.map((item) => {
        return { cx: item };
      });
    }
    if (decoration) {
      dt = decoration.map((item) => {
        return { zx: item };
      });
    }
    if (use) {
      us = use.map((item) => {
        return { yt: item };
      });
    }
    if (elevator) {
      el = elevator.map((item) => {
        return { dt: item };
      });
    }
    if (ownership) {
      os = ownership.map((item) => {
        return { qs: item };
      });
    }
    if (type) {
      tp = type.map((item) => {
        return { lx: item };
      });
    }
    const query = {
      // limit: 100,
      // offset: 0,
      where: {
        [Op.and]: [
          {
            [Op.or]: hf,
          },
          {
            [Op.or]: ot,
          },
          {
            [Op.or]: dt,
          },
          {
            [Op.or]: us,
          },
          {
            [Op.or]: el,
          },
          {
            [Op.or]: os,
          },
          {
            [Op.or]: tp,
          },
        ],
      },
    };

    const arr = await ctx.model.Secondhouse.findAll(query);
    ctx.body = {
      code: 1,
      arr,
    };
  }

  async getsconedsearch() {
    const { ctx, app } = this;

    const { val } = ctx.request.body;
    const Op = app.Sequelize.Op;
    // const findone = await ctx.model.User.findOne({ where: { username } });
    console.log(val);
    // [Op.substring]: 'hat'      // LIKE '%hat%'

    const query = {
      limit: 100,
      offset: 0,
      where: {
        [Op.or]: {
          ditie: {
            [Op.substring]: val,
          },
          xq: {
            [Op.substring]: val,
          },
        },
      },
    };
    const arr = await ctx.model.Secondhouse.findAll(query);
    ctx.body = {
      code: 1,
      arr,
    };
  }

  // 后台获取二手房数据
  async getManagerSecondHouse() {
    const { ctx, app } = this;
    const query = { limit: 1000, offset: 0 };
    const prices = await ctx.model.Secondhouse.findAll(query);
    // console.log();
    ctx.body = {
      code: 1,
      prices,
    };
  }
  // 更改二手房数据
  async changeSecondHouse() {
    const { ctx, app } = this;
    const { id, yt, name, jiage } = ctx.request.body;
    const res = await ctx.model.Secondhouse.findByPk(id);
    if (!res) {
      ctx.body = {
        code: 404,
        msg: "修改失败",
      };
      return;
    }
    await res.update({ name, yt, jiage });
    ctx.body = {
      code: 1,
      msg: "修改成功",
    };
  }
  // 删除二手房数据
  async deleteSecondHouse() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const res = await ctx.model.Secondhouse.findByPk(id);
    if (!res) {
      ctx.body = {
        code: 404,
        msg: "删除失败",
      };
      return;
    }
    await res.destroy();
    ctx.body = {
      code: 1,
      msg: "删除成功!",
    };
  }
  // 二手房数据筛选
  async searchSecondHouse() {
    const { ctx, app } = this;
    const { yt, quyu, fangxing } = ctx.request.body;
    const query = { where: { yt, quyu, fangxing } };
    const res = await ctx.model.Secondhouse.findAll(query);
    ctx.body = {
      code: 1,
      msg: "修改成功",
      data: res,
    };
  }
  // 二手房新增
  async addSecondHouse() {
    const { ctx, app } = this;
    const { newObj } = ctx.request.body;
    await ctx.model.Secondhouse.create({ ...newObj });
    ctx.body = {
      code: 1,
      msg: "添加成功",
    };
  }
}

module.exports = SecondController;
