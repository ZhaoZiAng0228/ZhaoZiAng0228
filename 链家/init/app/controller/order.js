'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    //获取搜索筛选
    async getOrderdate() {
        const { ctx, app } = this
        const Op = app.Sequelize.Op
        const { type, search } = ctx.query
        console.log(ctx.query);
        if (type) {
            const data = await ctx.model.Order.findAll({ where: { type: type } })
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        } else if (search) {
            const data = await ctx.model.Order.findAll({
                where: {
                    [Op.or]: [
                        { username: { [Op.substring]: search } },
                        { tel: { [Op.substring]: search } },
                        { serial: { [Op.substring]: search } }
                    ]
                }
            })
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        } else {
            const data = await ctx.model.Order.findAll()
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        }
    }
    //删除
    async delOrderdate() {
        const { ctx } = this
        const { _id } = ctx.query
        console.log(_id);
        await ctx.model.Order.destroy({ where: { id: _id } })
        const data = await ctx.model.Order.findAll()
        ctx.body = {
            code: 1,
            length: data.length,
            data: data
        }
    }
}

module.exports = OrderController;
