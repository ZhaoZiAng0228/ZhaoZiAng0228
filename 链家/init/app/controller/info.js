'use strict';

const Controller = require('egg').Controller;

class InfoController extends Controller {
    //获取资讯筛选搜索
    async getInfodate() {
        const { ctx, app } = this
        const Op = app.Sequelize.Op
        const { search, status } = ctx.query
        console.log(ctx.query);
        if (search) {
            const data = await ctx.model.Info.findAll({
                where: { tit: { [Op.substring]: search } }
            })
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        } else if (status) {
            const data = await ctx.model.Info.findAll({ where: { status: +status } })
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        } else {
            const data = await ctx.model.Info.findAll()
            ctx.body = {
                code: 1,
                length: data.length,
                data: data
            }
        }
    }
    //删除
    async delInfodate() {
        const { ctx } = this
        const { id } = ctx.query
        console.log(id);
        await ctx.model.Info.destroy({ where: { id: id } })
        const data = await ctx.model.Info.findAll()
        ctx.body = {
            code: 1,
            length: data.length,
            data: data
        }
    }
    //改变状态
    async alterinfodata() {
        const { ctx } = this
        const { id, status } = ctx.request.body
        if (status === 1) {
            await ctx.model.Info.update({ status: 0 }, { where: { id } })
        } else {
            await ctx.model.Info.update({ status: 1 }, { where: { id } })
        }
        ctx.body = {
            code: 1
        }
    }
    //添加
    async addinfodata() {
        const { ctx } = this
        const { info } = ctx.request.body
        await ctx.model.Info.create({ ...info })
        ctx.body = {
            code: 1
        }
    }
    //编辑
    async editinfodata() {
        const { ctx } = this
        const { info } = ctx.request.body
        await ctx.model.Info.update({ ...info }, { where: { id: info.id } })
        ctx.body = {
            code: 1
        }
    }
}

module.exports = InfoController;
