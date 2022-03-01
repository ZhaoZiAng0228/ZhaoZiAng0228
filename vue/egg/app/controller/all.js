'use strict';

// 所有文章页面 接口

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')


class AllController extends Controller {

    /* 获取所有文章数据 */
    async all() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`SELECT * FROM allessay ORDER BY id DESC`);
        let allList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        const userAllList = await this.app.mysql.select('allessay', { // 搜索 post 表
            where: { tion: 'true' }, // WHERE 条件
            columns: ['*'], // 要查询的表字段
            orders: [['id', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
        let readList = userAllList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            allList,
            list: userAllList,
            readList,
            lists: userAllList.length,
            total: list.length
        }
    }
    /* 更改首焦推荐 */
    async setRecomment() {
        const { ctx } = this;
        const { type, id } = ctx.request.body
        let { authorization } = ctx.request.header
        try {
            // 鉴权
            // 有权限就执行这一步
            jwt.verify(authorization, 'zhouyou')
        } catch (err) {
            // 没有权限就执行这一步
            ctx.body = {
                code: 500,
                message: '没有权限',
                err
            }
            return
        }
        const row = {
            id: id,
            recommend: type
        };
        await this.app.mysql.update('allessay', row);
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }

    /* 删除点击的文章接口 */
    async deleteEditor() {
        const { ctx } = this;
        const { id } = ctx.query;
        let { authorization } = ctx.request.header
        try {
            // 鉴权
            // 有权限就执行这一步
            jwt.verify(authorization, 'zhouyou')
        } catch (err) {
            // 没有权限就执行这一步
            ctx.body = {
                code: 500,
                message: '没有权限',
                err
            }
            return
        }
        await this.app.mysql.delete('allessay', {
            id: id,
        });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

    /* 所有文章的模糊搜索功能接口 */
    async allSearch() {
        const { ctx } = this;
        const { searchLine } = ctx.request.body;
        const results = await this.app.mysql.query(`
        SELECT * FROM allessay WHERE
        title LIKE '%${searchLine.title}%'  
        `)
        ctx.body = {
            code: 200,
            results
        }
    }

    /* 所有文章的批量删除功能接口 */
    async allDeleteAll() {
        const { ctx } = this;
        const { allLists } = ctx.request.body;
        await allLists.map(async item => {
            await this.app.mysql.query(`DELETE FROM allessay WHERE id = ${item.id}`);
        })
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

    /* 批量发布所有文章 */
    async allTion() {
        const { ctx } = this;
        const { tion, judge } = ctx.request.body
        let { authorization } = ctx.request.header
        try {
            // 鉴权
            // 有权限就执行这一步
            jwt.verify(authorization, 'zhouyou')
        } catch (err) {
            // 没有权限就执行这一步
            ctx.body = {
                code: 500,
                message: '没有权限',
                err
            }
            return
        }
        await tion.map(async item => {
            await this.app.mysql.query(` UPDATE allessay SET
            tion = CASE id
                WHEN ${item.id} THEN '${judge}'
            END
        WHERE id IN (${item.id})`);
        })
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }
    /* 批量首焦推荐所有文章 */
    async allRecommend() {
        const { ctx } = this;
        const { recommend, judge } = ctx.request.body
        let { authorization } = ctx.request.header
        try {
            // 鉴权
            // 有权限就执行这一步
            jwt.verify(authorization, 'zhouyou')
        } catch (err) {
            // 没有权限就执行这一步
            ctx.body = {
                code: 500,
                message: '没有权限',
                err
            }
            return
        }
        await recommend.map(async item => {
            await this.app.mysql.query(` UPDATE allessay SET
            recommend = CASE id
                WHEN ${item.id} THEN '${judge}'
            END
        WHERE id IN (${item.id})`);
        })
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }

    /* 客户端所有文章详情页功能接口 */
    async getDetails() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const details = await this.app.mysql.get('allessay', { id: id });
        const detailMessage = await this.app.mysql.select('message', { // 搜索 post 表
            where: { article: id, statu: 'true' }, // WHERE 条件
            columns: ['*'], // 要查询的表字段
            orders: [['id', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
        ctx.body = {
            code: 200,
            details,
            detailMessage
        }
    }

    //客户端所有文章详情页点赞和取消点赞功能接口
    async give() {
        const { ctx } = this;
        const { user } = ctx.request.body
        //当前文章
        const post = await this.app.mysql.get('allessay', { id: user.articleId });
        //获取当前文章已点赞用户id（转为数组）
        let arr = JSON.parse(post.userLoveId)
        //判断当前用户是否已经点击过了
        let is = arr.includes(user.userId)
        if (is) {
            //删除当前用户id
            arr.splice(arr.indexOf(user.userId), 1)
            arr = JSON.stringify(arr)
            //喜欢数量减一
            await this.app.mysql.update('allessay', { id: user.articleId, love: +post.love - 1, userLoveId: arr }); // 更新 posts 表中的记录
            ctx.body = {
                statu: 200,
                msg: '取消点赞成功'
            };
        } else {
            //添加用户id
            arr.push(user.userId)
            arr = JSON.stringify(arr)
            //喜欢数量+1
            await this.app.mysql.update('allessay', { id: user.articleId, love: +post.love + 1, userLoveId: arr }); // 更新 posts 表中的记录
            ctx.body = {
                statu: 200,
                msg: '点赞成功'
            };
        }
    }

    /* 客户端所有文章详情页评论功能接口 */
    async allMessage() {
        const { ctx } = this;
        const { messageList } = ctx.request.body;
        let data = +new Date();
        await this.app.mysql.insert('message', {
            ...messageList,
            statu: 'false',
            date: new Date(parseInt(data)).toLocaleString()
        });
        if (messageList.maxParent) {
            await this.app.mysql.update('message', {
                id: messageList.maxParent,
                isChildren: true
            });
        }
        ctx.body = {
            code: 200,
        }
    }

}


module.exports = AllController;