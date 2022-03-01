'use strict';

// 知识小册页面

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const pump = require('pump');
let knowleImg = null;

class KnowleController extends Controller {
    // 获取知识小册页面数据接口
    async setKnow() {
        const { ctx } = this;
        const { pageIndex, pageSize } = ctx.query
        const list = await this.app.mysql.query(`
        SELECT * FROM userimg ORDER BY id DESC
        `);
        let results = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
        const userKnowList = await this.app.mysql.select('userimg', { // 搜索 post 表
            where: { status: 'true' }, // WHERE 条件
            columns: ['*'], // 要查询的表字段
            orders: [['id', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
        ctx.body = {
            code: 200,
            results,
            list: userKnowList,
            total: list.length
        }
    }
    // 知识小册回显数据回接口
    async setKnowList() {
        const { ctx } = this;
        const { id } = ctx.request.body
        const post = await this.app.mysql.get('userimg', { id: id });
        ctx.body = {
            code: 200,
            post
        }
    }
    // 知识小册上传文件接口
    async addFileKnow() {
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
        knowleImg = imgUrl
        ctx.body = {
            code: 200,
        }
    }
    // 知识小册数据编辑接口
    async redactKnow() {
        const { ctx } = this;
        const { setKnowleList } = ctx.request.body
        if (!knowleImg) {
            const row = {
                ...setKnowleList
            };
            await this.app.mysql.update('userimg', row);
        } else {
            const row = {
                ...setKnowleList,
                img: knowleImg
            };
            await this.app.mysql.update('userimg', row);
            knowleImg = null
        }
        ctx.body = {
            code: 200,
            message: '编辑成功'
        }
    }

    // 知识小册数据新建接口
    async addKnowle() {
        const { ctx } = this;
        const { setKnowleList } = ctx.request.body
        let data = +new Date();
        if (!knowleImg) {
            await this.app.mysql.insert('userimg', {
                ...setKnowleList,
                date: new Date(parseInt(data)).toLocaleString()
            });
        } else {
            await this.app.mysql.insert('userimg', {
                ...setKnowleList,
                img: knowleImg,
                date: new Date(parseInt(data)).toLocaleString()
            });
            knowleImg = null
        }
        ctx.body = {
            code: 200,
            message: '新建成功'
        }
    }

    // 修改知识小册数据状态接口
    async setKnowleStatu() {
        const { ctx } = this;
        const { status, id } = ctx.request.body
        await this.app.mysql.query(`
        UPDATE userimg SET status = '${status}' WHERE id = ${id}
        `);
        ctx.body = {
            code: 200,
            message: '修改成功'
        }
    }

    // 删除知识小册数据接口
    async deleteKnow() {
        const { ctx } = this;
        const { item } = ctx.request.body
        let filePath = item.img.substring(21)
        fs.unlinkSync('app/' + filePath)
        await this.app.mysql.delete('userimg', { id: item.id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

    // 知识小册数据模糊搜索接口
    async searchKnowle() {
        const { ctx } = this;
        const { searchKnowle } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM userimg WHERE 
        page LIKE '%${searchKnowle.page}%' AND 
        status LIKE '%${searchKnowle.status}%' 
        `);
        ctx.body = {
            code: 200,
            result
        }
    }
    // 获取上传文件数据接口
    async setImgFile() {
        const { ctx } = this;
        const { pageImgIndex, pageImgSize } = ctx.query
        const list = await this.app.mysql.query(`
            SELECT * FROM images ORDER BY id DESC
            `);
        let results = list.slice((pageImgIndex - 1) * pageImgSize, pageImgIndex * pageImgSize)
        ctx.body = {
            code: 200,
            results,
            total: list.length
        }
    }
    // 上传图片 点击覆盖
    async coverImg() {
        const { ctx } = this;
        const { img } = ctx.request.body
        knowleImg = img
        ctx.body = {
            code: 200,
            knowleImg: img
        }
    }
    // 知识小册数据模糊搜索接口
    async searchImgKnowle() {
        const { ctx } = this;
        const { searchImgList } = ctx.request.body
        const result = await this.app.mysql.query(`
        SELECT * FROM images WHERE 
        img LIKE '%${searchImgList.page}%' AND 
        date LIKE '%${searchImgList.date}%' 
        `);
        ctx.body = {
            code: 200,
            result
        }
    }

    // 客户端知识小册详情接口
    async knowData() {
        const { ctx } = this;
        const { id } = ctx.query
        const newId = JSON.parse(id)
        const post = await this.app.mysql.get('userimg', { id: newId.id });
        ctx.body = {
            code: 200,
            post
        }
    }
}


module.exports = KnowleController;