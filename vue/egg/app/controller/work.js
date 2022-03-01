'use strict';

// 工作台页面 接口

const Controller = require('egg').Controller;


class WorkController extends Controller {

    /* 获取所有文章数据 */
    async workAll() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`SELECT * FROM allessay ORDER BY id DESC`);
        let allList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            allList,
        }
    }
}


module.exports = WorkController;