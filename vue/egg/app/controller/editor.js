'use strict';

// 编辑器页面 接口

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const pump = require('pump')
let editorImg = null

class EditorController extends Controller {
    // 编辑器上传文件接口
    async addEditorKnow() {
        const { ctx } = this;
        // 1.获取由前端传来的文件信息
        const stream = await ctx.getFileStream();
        // 2。生成随机的文件名称  toLocaleLowerCase:将大写字母转换为小写字母
        const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase()
        // 3,创建文件的保存地址
        const target = path.join('app/public/static', filename)
        // 4,生成一个文件流
        const writeStream = fs.createWriteStream(target);
        // 5,将文件信息通过流,流入文件地址中
        await pump(stream, writeStream)
        // 6. 获取图片的服务器地址
        const imgUrl = ctx.origin + '/public/static/' + filename
        editorImg = imgUrl
        ctx.body = {
            code: 200,
        }
    }

    /* 编辑器新增文章功能 */
    async add() {
        const { ctx } = this;
        const { allEditList } = ctx.request.body;
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
        if (!editorImg) {
            await this.app.mysql.insert('allessay', {
                ...allEditList,
                recommend: 'false',
            });
        } else {
            await this.app.mysql.insert('allessay', {
                ...allEditList,
                recommend: 'false',
                img: editorImg,
            });
            editorImg = null
        }
        ctx.body = {
            code: 200,
            message: '发布成功'
        }
    }
    /* 编辑器修改文章回显 */
    async echo() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const echoList = await this.app.mysql.get('allessay', { id: id });
        ctx.body = {
            code: 200,
            echoList
        }
    }
    /* 编辑器修改文章功能 */
    async changeEditor() {
        const { ctx } = this;
        const { allEditList } = ctx.request.body;
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

        if (!editorImg) {
            const row = {
                ...allEditList,
                tag: allEditList.tag.join()
            };
            await this.app.mysql.update('allessay', row);
        } else {
            const row = {
                ...allEditList,
                tag: allEditList.tag.join(),
                img: editorImg
            };
            await this.app.mysql.update('allessay', row);
            editorImg = null
        }
        ctx.body = {
            code: 200,
            message: '编辑成功'
        }
    }
    /* 编辑器新增页面功能 */
    async addPage() {
        const { ctx } = this;
        const { pageEditList } = ctx.request.body;
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
        await this.app.mysql.insert('page', {
            ...pageEditList,
        });
        ctx.body = {
            code: 200,
            message: '发布页面成功'
        }
    }
    /* 编辑器修改文章回显 */
    async echoPage() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const echoPageList = await this.app.mysql.get('page', { id: id });
        ctx.body = {
            code: 200,
            echoPageList
        }
    }
    /* 编辑器编辑页面功能 */
    async changePageEditor() {
        const { ctx } = this;
        const { pageEditList } = ctx.request.body;
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
            ...pageEditList
        };
        await this.app.mysql.update('page', row);
        ctx.body = {
            code: 200,
            message: '编辑成功'
        }
    }

    /* 编辑器编辑页面获取分类和标签 */
    async getClassTag() {
        const { ctx } = this;
        const classifys = await this.app.mysql.select('classify');
        const tags = await this.app.mysql.select('label');
        ctx.body = {
            code: 200,
            classifys,
            tags,
        }
    }
}


module.exports = EditorController;