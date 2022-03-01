"use strict";
const Controller = require("egg").Controller;
class classifyAdmin extends Controller {
    async get_classify() {
        const { ctx } = this;
        const results = await this.app.mysql.query(`select * from classify order by id desc`);
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
            msg: '获取分类成功'
        }
    }
    async add_classify() {
        const { ctx } = this;
        const { content } = ctx.request.body;
        await this.app.mysql.insert('classify', content);
        ctx.body = {
            statu: 200,
            msg: '添加成功'
        }
    }
    async edit_classify() {
        const { ctx } = this;
        const { content } = ctx.request.body;
        await this.app.mysql.update('classify', content);
        ctx.body = {
            statu: 200,
            msg: '编辑成功'
        }
    }
    async del_classify() {
        const { ctx } = this;
        const { id } = ctx.query;
        await this.app.mysql.delete('classify', { id });
        ctx.body = {
            statu: 200,
            msg: '删除成功'
        }
    }
    async num_classify() {
        const { ctx } = this;
        const { id } = ctx.query;
        await this.app.mysql.delete('classify', { id });
        ctx.body = {
            statu: 200,
            msg: '删除成功'
        }
    }
}
module.exports = classifyAdmin