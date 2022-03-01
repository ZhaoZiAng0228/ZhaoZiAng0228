'use strict';

// 访问统计 接口

const Controller = require('egg').Controller;


class VisitController extends Controller {

    /* 获取访问统计数据 */
    async getVisit() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM visit ORDER BY id DESC
        `);
        let visitList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            visitList,
            total: list.length
        }
    }
    /* 访问统计数据删除 */
    async deleteVisit() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('visit', { id: id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 访问统计数据批量删除 */
    async allDeleteVisit() {
        const { ctx } = this;
        const { visitList } = ctx.request.body
        await visitList.map(async item => {
            await this.app.mysql.query(`DELETE FROM visit WHERE id = '${item.id}'`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 访问统计数据搜索 */
    async searchVisit() {
        const { ctx } = this;
        const { AllForm } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM visit WHERE 
        ip LIKE '%${AllForm.ip}%' AND 
        userAgent LIKE '%${AllForm.userAgent}%' AND 
        url LIKE '%${AllForm.url}%' AND 
        address LIKE '%${AllForm.address}%' AND 
        browser LIKE '%${AllForm.browser}%' AND 
        os LIKE '%${AllForm.os}%' AND 
        device LIKE '%${AllForm.device}%' AND 
        engine LIKE '%${AllForm.engine}%'
        `);
        ctx.body = {
            code: 200,
            message: '操作成功',
            result
        }
    }
}


module.exports = VisitController;