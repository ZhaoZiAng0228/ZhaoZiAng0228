'use strict';

// 用户管理页面

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')


class UserController extends Controller {

    /* 获取用户管理页面数据 */
    async user() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM login ORDER BY id DESC
        `);
        let userList = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            userList,
            message: '操作成功',
            total: list.length
        }
    }
    /* 更改用户管理页面状态 */
    async tion() {
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
        const row = {
            ...tion,
            tion: judge
        };
        await this.app.mysql.update('login', row);
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }

    /* 批量更改用户管理页面状态 */
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
            await this.app.mysql.query(` UPDATE login SET
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
    /* 更改用户管理页面角色权限接口 */
    async role() {
        const { ctx } = this;
        const { role, judge } = ctx.request.body
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
        console.log(role);
        const row = {
            ...role,
            role: judge
        };
        await this.app.mysql.update('login', row);
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }
    /* 批量更改用户管理页面状态 */
    async allRole() {
        const { ctx } = this;
        const { role, judge } = ctx.request.body
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
        await role.map(async item => {
            await this.app.mysql.query(` UPDATE login SET
            role = CASE id
                WHEN ${item.id} THEN '${judge}'
            END
        WHERE id IN (${item.id})`);
        })
        ctx.body = {
            code: 200,
            message: '操作成功'
        }
    }
    /* 用户管理页面搜索功能 */
    async userSearch() {
        const { ctx } = this;
        const { searchLine } = ctx.request.body
        if (searchLine.tion) {
            if (searchLine.tion === '锁定') {
                searchLine.tion = 'true'
            } else {
                searchLine.tion = 'false'
            }
        }
        const results = await this.app.mysql.query(`
    SELECT * FROM login WHERE
    name LIKE '%${searchLine.name}%' AND 
    email LIKE '%${searchLine.email}%' AND
    role LIKE '%${searchLine.role}%' AND 
    tion LIKE '%${searchLine.tion}%'  
    `)
        ctx.body = {
            code: 200,
            message: '操作成功',
            results
        }
    }

}


module.exports = UserController;