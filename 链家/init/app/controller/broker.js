// 经纪人
const Controller = require("egg").Controller;

class BrokerController extends Controller {
  // 获取数据
  async getBrokerList() {
    const { ctx, app } = this;
    const { pageSize, pageIndex, state, info } = ctx.query;
    const Op = app.Sequelize.Op;
    let res = null;
    if (state) {
      res = await ctx.model.Broker.findAll({
        where: {
          state: state,
        },
      });
    } else {
      res = await ctx.model.Broker.findAll({
        where: {
          [Op.or]: [
            { state: state },
            { name: { [Op.substring]: info } },
            { tel: { [Op.substring]: info } },
          ],
        },
      });
    }

    const arr = res.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    this.ctx.body = {
      code: 1,
      data: arr,
      total: res.length,
    };
  }
  // 添加数据
  async addBrokerList() {
    const { ctx } = this;
    const { addData } = ctx.request.body;
    await ctx.model.Broker.create({ ...addData, state: "在职" });
    this.ctx.body = {
      code: 1,
      message: "数据添加成功",
    };
  }
  // 删除数据
  async delBrokerList() {
    const { ctx } = this;
    const { id } = ctx.query;

    const data = await ctx.model.Broker.findByPk(id);
    if (!data) {
      ctx.status = 404;
      return;
    }
    await data.destroy();
    this.ctx.body = {
      code: 1,
      message: "删除成功",
    };
  }
  // 编辑数据
  async editBrokerList() {
    const { ctx } = this;
    const { editData } = ctx.request.body;
    await ctx.model.Broker.update(
      {
        ...editData,
      },
      {
        where: {
          id: editData.id,
        },
      }
    );

    this.ctx.body = {
      code: 1,
      message: "操作成功",
    };
  }
  // 搜索数据
  async searchBrokerList() {
    const { ctx, app } = this;
    const { searchData } = ctx.request.body;
    const Op = app.Sequelize.Op;
    if (searchData.state) {
      const res = await ctx.model.Broker.findAll({
        where: {
          state: searchData.state,
        },
      });
      console.log("state", res.length);

      this.ctx.body = {
        code: 1,
        // message: "数据搜索成功",
      };
    } else {
      const res = await ctx.model.Broker.findAll({
        where: {
          [Op.or]: [
            { state: searchData.state },
            { name: { [Op.substring]: searchData.info } },
            { tel: { [Op.substring]: searchData.info } },
          ],
        },
      });
      console.log("name", res.length);
      this.ctx.body = {
        code: 1,
        // message: "数据搜索成功",
      };
    }
  }
}

module.exports = BrokerController;
