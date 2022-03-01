'use strict';

// 评论管理 接口

const Controller = require('egg').Controller;


class CommentController extends Controller {

    /* 获取评论管理数据 */
    async getComment() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`SELECT * FROM message ORDER BY id DESC`);
        let commentList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            commentList,
            total: list.length
        }
    }

    /* 修改评论管理数据状态 */
    async typeComment() {
        const { ctx } = this;
        const { type, id } = ctx.request.body
        const row = {
            id: id,
            statu: type
        };
        await this.app.mysql.update('message', row);
        ctx.body = {
            code: 200,
            message: '修改状态成功'
        }
    }
    /* 评论管理数据删除 */
    async deleteComment() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('message', { id: id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 评论管理数据批量删除 */
    async allDeleteComment() {
        const { ctx } = this;
        const { commentList } = ctx.request.body
        await commentList.map(async item => {
            await this.app.mysql.query(`DELETE FROM message WHERE id = '${item.id}'`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    /* 评论管理数据批量修改 */
    async commentOff() {
        const { ctx } = this;
        const { commentList, type } = ctx.request.body
        await commentList.map(async item => {
            await this.app.mysql.query(` UPDATE message SET
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

    /* 评论管理页面回复功能 */
    async addComment() {
        const { ctx } = this;
        const { addCommentList } = ctx.request.body
        let data = +new Date();
        await this.app.mysql.insert('message', {
            ...addCommentList,
            htmlContent: addCommentList.htmlContent,
            date: new Date(parseInt(data)).toLocaleString()
        });
        ctx.body = {
            code: 200,
            message: '回复成功'
        }
    }

    /* 访问评论管理搜索 */
    async searchComment() {
        const { ctx } = this;
        const { searchCommentList } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM message WHERE 
        name LIKE '%${searchCommentList.username}%' AND 
        relation LIKE '%${searchCommentList.email}%' AND 
        statu LIKE '%${searchCommentList.statu}%' 
        `);
        ctx.body = {
            code: 200,
            message: '搜索成功',
            result
        }
    }
}


module.exports = CommentController;