'use strict';

// 页面管理 接口

const Controller = require('egg').Controller;


class PageController extends Controller {

    /* 获取页面管理数据 */
    async getPage() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM page ORDER BY id DESC
        `);
        let pageList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            pageList,
            total: list.length
        }
    }

    /* 修改页面管理数据状态 */
    async typePage() {
        const { ctx } = this;
        const { type, id } = ctx.request.body
        const row = {
            id: id,
            statu: type
        };
        await this.app.mysql.update('page', row);
        ctx.body = {
            code: 200,
            message: '修改状态成功'
        }
    }
    /* 页面管理数据删除 */
    async deletePage() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('page', { id: id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 页面管理数据批量删除 */
    async allDeletePage() {
        const { ctx } = this;
        const { pageList } = ctx.request.body
        await pageList.map(async item => {
            await this.app.mysql.query(`DELETE FROM page WHERE id = '${item.id}'`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 页面管理数据批量修改 */
    async PageOff() {
        const { ctx } = this;
        const { pageList, type } = ctx.request.body
        await pageList.map(async item => {
            await this.app.mysql.query(` UPDATE page SET
            statu = CASE id
                WHEN ${item.id} THEN '${type}'
            END
        WHERE id IN (${item.id})`);
        })
        ctx.body = {
            code: 200,
            message: '修改状态成功'
        }
    }

    /* 页面管理搜索 */
    async searchPage() {
        const { ctx } = this;
        const { searchPageList } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM page WHERE 
        name LIKE '%${searchPageList.name}%' AND 
        url LIKE '%${searchPageList.url}%' AND 
        statu LIKE '%${searchPageList.statu}%' 
        `);
        ctx.body = {
            code: 200,
            message: '搜索成功',
            result
        }
    }
}


module.exports = PageController;