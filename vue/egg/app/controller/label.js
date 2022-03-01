"use strict";
const Controller = require("egg").Controller;

class labelAdmin extends Controller {
    async get_label() {
        const { ctx } = this;
        const results = await this.app.mysql.query(`select * from label order by id desc`);
        const list = await this.app.mysql.select('allessay', { // 搜索 post 表
            where: { tion: 'true' }, // WHERE 条件
            columns: ['*'], // 要查询的表字段
            orders: [['id', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
        ctx.body = {
            statu: 200,
            data: results,
            list,
            msg: '获取标签成功'
        }
    }
    async add_label() {
        const { ctx } = this;
        const { content } = ctx.request.body;
        await this.app.mysql.insert('label', content);
        ctx.body = {
            statu: 200,
            msg: '添加成功'
        }
    }
    async edit_label() {
        const { ctx } = this;
        const { content } = ctx.request.body;
        await this.app.mysql.update('label', content);
        ctx.body = {
            statu: 200,
            msg: '编辑成功'
        }
    }
    async del_label() {
        const { ctx } = this;
        const { id } = ctx.query;
        await this.app.mysql.delete('label', { id });
        ctx.body = {
            statu: 200,
            msg: '删除成功'
        }
    }
}
module.exports = labelAdmin