'use strict';

// 文件管理页面

const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')
const pump = require('pump')


class FileController extends Controller {
    /* 获取所有文章数据 */
    async setLoad() {
        const { ctx } = this;
        let data = +new Date();
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

        await this.app.mysql.insert('images', { img: imgUrl, date: new Date(parseInt(data)).toLocaleString() });
        ctx.body = {
            code: 200,
        }
    }
    // 获取文件管理页面数据接口
    async setFile() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM images ORDER BY id DESC
        `);
        let results = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        ctx.body = {
            code: 200,
            results,
            total: list.length
        }
    }
    /* 文件管理页面搜索功能 */
    async fileSearch() {
        const { ctx } = this;
        const { fileSearch } = ctx.request.body

        const results = await this.app.mysql.query(`
        SELECT * FROM images WHERE img LIKE '%${fileSearch.img}%' AND img LIKE '%${fileSearch.type}%'`)
        ctx.body = {
            code: 200,
            message: '操作成功',
            results
        }
    }

    /* 文件管理页面侧边栏数据 */
    async detailFiles() {
        const { ctx } = this;
        const { id } = ctx.request.body
        const post = await this.app.mysql.get('images', { id: id });
        ctx.body = {
            code: 200,
            post
        }
    }
    /* 文件管理页面删除 */
    async deleteFiles() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('images', {
            id: id,
        });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

}


module.exports = FileController;