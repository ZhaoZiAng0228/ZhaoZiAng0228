'use strict';

// 动态路由

const Controller = require('egg').Controller;

class RouteController extends Controller {
    // 获取动态路由数据接口
    async setRoute() {
        const { ctx } = this;
        const list = await this.app.mysql.select('list');
        const secondlist = await this.app.mysql.select('secondlist');

        ctx.body = {
            code: 200,
            list,
            secondlist
        }
    }
}


module.exports = RouteController;