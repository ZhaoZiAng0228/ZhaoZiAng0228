"use strict";

const Controller = require("egg").Controller;

let isarea = "";
let isarea2 = "";

let zffs = "合租";
let btt = [0, 20000];
class RentController extends Controller {
  async getrent() {
    const { ctx, app } = this;

    const { first, er, san } = ctx.request.body;

    console.log(first, er, san);
    isarea = san;
    isarea2 = first;
    if (san === "区域") {
      const query = { limit: 100, offset: 0, where: { quyu: first } };
      const arr = await ctx.model.Renthouse.findAll(query);
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    } else {
      const query = { limit: 100, offset: 0, where: { ditie: first } };
      const arr = await ctx.model.Renthouse.findAll(query);
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    }
  }

  async getrentfirst() {
    const { ctx, app } = this;
    const query = { limit: 100, offset: 0 };
    const arr = await ctx.model.Renthouse.findAll(query);
    ctx.body = {
      code: 1,
      arr,
    };
  }
  async getrentfs() {
    const { ctx, app } = this;
    const { zf } = ctx.request.body;
    zffs = zf;
    if (isarea === "区域") {
      const query = { limit: 100, offset: 0, where: { quyu: isarea2, zf } };
      const arr = await ctx.model.Renthouse.findAll(query);
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    } else if (isarea === "地铁") {
      const query = { limit: 100, offset: 0, where: { ditie: isarea2, zf } };
      const arr = await ctx.model.Renthouse.findAll(query);
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    } else {
      const query = { limit: 100, offset: 0, where: { zf } };
      const arr = await ctx.model.Renthouse.findAll(query);
      ctx.body = {
        code: 1,
        arr,
      };
      return;
    }
  }
  async getrentprice() {
    const { ctx, app } = this;
    const { bottomPrice, peakPrice, bet, type } = ctx.request.body;
    const Op = app.Sequelize.Op;
    console.log(bottomPrice, peakPrice, bet, "=----------------------------");

    if (isarea === "区域") {
      //租金价格区间存在
      if (bottomPrice && peakPrice) {
        btt = [Number(bottomPrice), Number(peakPrice)];
        const query = {
          limit: 100,
          offset: 0,
          where: {
            quyu: isarea2,
            jiage: {
              [Op.between]: [Number(bottomPrice), Number(peakPrice)],
            },
          },
        };
        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      } else {
        //租金价格区间不存在

        if (bet === "<=1000") btt = [0, 1000];
        if (bet === "1000-1500元") btt = [1000, 1500];
        if (bet === "1500-2000元") btt = [1500, 2000];
        if (bet === "2000-3000元") btt = [2000, 3000];
        if (bet === "5000-8000元") btt = [5000, 8000];
        if (bet === ">=8000元") btt = [8000, 20000];
        const query = {
          limit: 100,
          offset: 0,
          where: {
            quyu: isarea2,
            jiage: {
              [Op.between]: btt,
            },
          },
        };

        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      }
    } else if (isarea === "地铁") {
      //租金价格区间存在
      if (bottomPrice && peakPrice) {
        btt = [Number(bottomPrice), Number(peakPrice)];
        const query = {
          limit: 100,
          offset: 0,
          where: {
            ditie: isarea2,
            jiage: {
              [Op.between]: [Number(bottomPrice), Number(peakPrice)],
            },
          },
        };
        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      } else {
        //租金价格区间不存在

        if (bet === "<=1000") btt = [0, 1000];
        if (bet === "1000-1500元") btt = [1000, 1500];
        if (bet === "1500-2000元") btt = [1500, 2000];
        if (bet === "2000-3000元") btt = [2000, 3000];
        if (bet === "5000-8000元") btt = [5000, 8000];
        if (bet === ">=8000元") btt = [8000, 20000];
        const query = {
          limit: 100,
          offset: 0,
          where: {
            ditie: isarea2,
            jiage: {
              [Op.between]: btt,
            },
          },
        };

        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      }
    } else {
      //租金价格区间存在
      if (bottomPrice && peakPrice) {
        btt = [Number(bottomPrice), Number(peakPrice)];

        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: [Number(bottomPrice), Number(peakPrice)],
            },
          },
        };
        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      } else {
        //租金价格区间不存在

        if (bet === "<=1000") btt = [0, 1000];
        if (bet === "1000-1500元") btt = [1000, 1500];
        if (bet === "1500-2000元") btt = [1500, 2000];
        if (bet === "2000-3000元") btt = [2000, 3000];
        if (bet === "5000-8000元") btt = [5000, 8000];
        if (bet === ">=8000元") btt = [8000, 20000];
        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: btt,
            },
          },
        };

        const arr = await ctx.model.Renthouse.findAll(query);
        ctx.body = {
          code: 1,
          arr,
        };
        return;
      }
    }
  }

  async getrentmore() {
    const { ctx, app } = this;
    const {
      houseType,
      orientation,
      brand,
      housePoint,
      rentTerm,
      floor,
      elevator,
    } = ctx.request.body;
    const Op = app.Sequelize.Op;

    if (
      !houseType ||
      !orientation ||
      !brand ||
      !housePoint ||
      !rentTerm ||
      !floor ||
      !elevator
    ) {
      ctx.body = {
        code: -1,
      };

      return;
    }
    console.log(
      houseType,
      orientation,
      brand,
      housePoint,
      rentTerm,
      floor,
      elevator
    );
    let ht = [];
    let ot = [];
    let bd = [];
    let hp = [];
    let rt = [];
    let fl = [];
    let el = [];
    if (houseType) {
      ht = houseType.map((item) => {
        return { fangxing: item };
      });
      console.log(ht);
    }

    if (orientation) {
      ot = orientation.map((item) => {
        return { cx: item };
      });
    }
    if (brand) {
      bd = brand.map((item) => {
        return { pp: item };
      });
    }
    if (housePoint) {
      hp = housePoint.map((item) => {
        return { ts: item };
      });
    }
    if (rentTerm) {
      rt = rentTerm.map((item) => {
        return { zq: item };
      });
    }
    if (floor) {
      fl = floor.map((item) => {
        return { lz: item };
      });
    }
    if (elevator) {
      el = elevator.map((item) => {
        return { dt: item };
      });
    }
    const query = {
      limit: 100,
      offset: 0,
      where: {
        [Op.and]: [
          {
            [Op.or]: ht,
          },
          {
            [Op.or]: ot,
          },
          {
            [Op.or]: bd,
          },
          {
            [Op.or]: hp,
          },
          {
            [Op.or]: rt,
          },
          {
            [Op.or]: fl,
          },
          {
            [Op.or]: el,
          },
        ],

        zf: zffs,
      },
    };

    const arr = await ctx.model.Renthouse.findAll(query);

    ctx.body = {
      code: 1,
      arr,
    };
  }
  async getrentsort() {
    const { ctx, app } = this;
    const { type, pay } = ctx.request.body;
    const Op = app.Sequelize.Op;

    console.log(pay, type);
    if (pay === "租房") {
      if (type === "价格(从高到低)") {
        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: btt,
            },
          },
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return b.jiage - a.jiage;
        });
        ctx.body = {
          code: 1,
          arr: newarr,
        };

        return;
      }

      if (type === "价格(从低到高)") {
        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: btt,
            },
          },
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return a.jiage - b.jiage;
        });
        ctx.body = {
          code: 1,
          arr: newarr,
        };

        return;
      }

      if (type === "面积(从小到大)") {
        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: btt,
            },
          },
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return a.mianji - b.mianji;
        });
        ctx.body = {
          code: 1,
          arr: newarr,
        };

        return;
      }
      if (type === "面积(从大到小)") {
        const query = {
          limit: 100,
          offset: 0,
          where: {
            jiage: {
              [Op.between]: btt,
            },
          },
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return b.mianji - a.mianji;
        });
        ctx.body = {
          code: 1,
          arr: newarr,
        };

        return;
      }

      if (type === "综合排序") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);

        ctx.body = {
          code: 1,
          arr,
        };

        return;
      }
    } else {
      if (type === "总价从高到低") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return b.jiage - a.jiage;
        });
        ctx.body = {
          code: 2,
          arr: newarr,
        };

        return;
      }

      if (type === "总价从低到高") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return a.jiage - b.jiage;
        });
        ctx.body = {
          code: 2,
          arr: newarr,
        };

        return;
      }

      if (type === "面积从大到小") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return b.mianji - a.mianji;
        });
        ctx.body = {
          code: 2,
          arr: newarr,
        };

        return;
      }

      if (type === "默认排序") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);

        ctx.body = {
          code: 2,
          arr,
        };

        return;
      }
      if (type === "面积从小到大") {
        const query = {
          limit: 100,
          offset: 0,
        };
        let arr = await ctx.model.Renthouse.findAll(query);
        let newarr = arr.sort((a, b) => {
          return a.mianji - b.mianji;
        });
        ctx.body = {
          code: 2,
          arr: newarr,
        };

        return;
      }
    }
  }

  // 获取后台租房数据
  async getrentAll() {
    const { ctx, app } = this;
    const query = { limit: 1000, offset: 0 };
    const data = await ctx.model.Renthouse.findAll(query);
    ctx.body = {
      code: 1,
      data,
    };
  }

  async getrentdetail() {
    const { ctx, app } = this;

    const { id } = ctx.request.body;
    // const findone = await ctx.model.User.findOne({ where: { username } });

    const obj = await ctx.model.Renthouse.findOne({ where: { id } });

    ctx.body = {
      code: 1,
      obj,
    };
  }

  async getrentsearch() {
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
    const arr = await ctx.model.Renthouse.findAll(query);
    ctx.body = {
      code: 1,
      arr,
    };
  }

  // 更改租房数据
  async changeRentHouse() {
    const { ctx, app } = this;
    const { id, fs, zq, jiage } = ctx.request.body;
    const res = await ctx.model.Renthouse.findByPk(id);
    if (!res) {
      ctx.body = {
        code: 404,
        msg: "修改失败",
      };
      return;
    }
    await res.update({ fs, zq, jiage });
    ctx.body = {
      code: 1,
      msg: "修改成功",
    };
  }
  // 删除租房数据
  async deleteRentHouse() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const res = await ctx.model.Renthouse.findByPk(id);
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
  // 租房数据筛选
  async searchRentHouse() {
    const { ctx, app } = this;
    const { fs, zq, jjr } = ctx.request.body;
    const query = { where: { fs, zq, jjr } };
    const res = await ctx.model.Renthouse.findAll(query);
    ctx.body = {
      code: 1,
      msg: "修改成功",
      data: res,
    };
  }
  // 租房新增
  async addRentHouse() {
    const { ctx, app } = this;
    const { newObj } = ctx.request.body;
    await ctx.model.Renthouse.create({ ...newObj });
    ctx.body = {
      code: 1,
      msg: "添加成功",
    };
  }
}

module.exports = RentController;
