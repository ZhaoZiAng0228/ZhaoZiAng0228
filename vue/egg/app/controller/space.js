'use strict';

// 文件管理页面

const Controller = require('egg').Controller;
const getPassword = require('../../db.js')
const path = require('path')
const fs = require('fs')
const pump = require('pump')
let basicImg = null


class SpaceController extends Controller {
    /* 个人中心图片上传 */
    async imgUpData() {
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
        basicImg = imgUrl
        ctx.body = {
            code: 200,
        }
    }
    // 个人中心基本设置
    async upDataBasic() {
        const { ctx } = this;
        const { basicForm, user } = ctx.request.body
        if (!basicImg) {
            const row = {
                ...user,
                name: basicForm.name,
                email: basicForm.email,
                img: basicForm.img
            };
            await this.app.mysql.update('login', row);
        } else {
            const row = {
                ...user,
                name: basicForm.name,
                email: basicForm.email,
                img: basicImg
            };
            await this.app.mysql.update('login', row);
            basicImg = null
        }
        ctx.body = {
            code: 200,
            message: '保存成功'
        }
    }

    // 获取个人中心数据接口
    async setSpace() {
        const { ctx } = this;
        const allessay = await this.app.mysql.query(`SELECT * FROM allessay`);
        const classify = await this.app.mysql.query(`SELECT * FROM classify`);
        const label = await this.app.mysql.query(`SELECT * FROM label`);
        const images = await this.app.mysql.query(`SELECT * FROM images`);
        const message = await this.app.mysql.query(`SELECT * FROM message`);
        ctx.body = {
            code: 200,
            allessay: allessay.length,
            classify: classify.length,
            label: label.length,
            images: images.length,
            message: message.length,
        }
    }

    // 个人中心更新密码
    async upDataPass() {
        const { ctx } = this;
        const { user, newForm } = ctx.request.body
        const login = await this.app.mysql.get('login', { name: user.name, password: getPassword(newForm.oldPassword) });
        if (!login) {
            ctx.body = {
                code: 400,
                message: '原密码输入有误'
            }
            return
        } else {
            const row = {
                ...user,
                password: getPassword(newForm.password)
            };
            await this.app.mysql.update('login', row);
        }
        ctx.body = {
            code: 200,
            message: '更新成功'
        }
    }
}


module.exports = SpaceController;