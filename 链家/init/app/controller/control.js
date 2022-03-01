// 审核管理
const Controller = require("egg").Controller;

class ControlController extends Controller {
  // 获取数据
  async getControlList() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;

    const { pageSize, pageIndex, type, prov, city, district, val } = ctx.query;
    console.log(val);
    let res = null;
    if (type === "全部") {
      res = await ctx.model.Control.findAll();
    } else {
      res = await ctx.model.Control.findAll({ where: { state: type } });
    }
    if (prov || city || district || val) {
      res = await ctx.model.Control.findAll({
        where: {
          // [Op.or]: [{ prov: prov }, { city: city }, { district: district }],
          [Op.and]: [
            {
              title: {
                [Op.like]: `%${val}%`,
              },
            },
            { prov: prov },
            { city: city },
            { district: district },
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
  // 删除数据
  async delControlList() {
    const { ctx } = this;
    const { id } = ctx.query;
    const data = await ctx.model.Control.findByPk(id);
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
  async editControlList() {
    const { ctx } = this;
    const { editData } = ctx.request.body;
    await ctx.model.Control.update(
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
}

module.exports = ControlController;
