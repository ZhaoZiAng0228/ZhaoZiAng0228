'use strict';

// 工作台页面 接口

const Controller = require('egg').Controller;


class EmailController extends Controller {

    /* 获取所有文章数据 */
    async getEmail() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM email ORDER BY id DESC
        `);
        let emailList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            emailList,
            total: list.length
        }
    }
    /* 邮件管理数据删除 */
    async deleteEmail() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('email', { id: id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 邮件管理数据批量删除 */
    async allDeleteEmail() {
        const { ctx } = this;
        const { emailList } = ctx.request.body
        await emailList.map(async item => {
            await this.app.mysql.query(`DELETE FROM email WHERE id = ${item.id}`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

    /* 邮件管理页面搜索功能 */
    async searchEmail() {
        const { ctx } = this;
        const { searchEmail } = ctx.request.body

        const results = await this.app.mysql.query(`
    SELECT * FROM email WHERE
    addresser LIKE '%${searchEmail.addresser}%' AND 
    recipients LIKE '%${searchEmail.recipients}%' AND
    theme LIKE '%${searchEmail.theme}%'
    `)
        ctx.body = {
            code: 200,
            message: '操作成功',
            results
        }
    }
}


module.exports = EmailController;