const Controller = require('egg').Controller
const path = require('path')
const fs = require('fs')
const jwt = require("jsonwebtoken")
class UploadController extends Controller {
    /**
     * 1. npm i egg-oss
     *
     * 2. 配置 oss / config.default.js (1. 配置文件解析 2. 配置基本oss信息)
     *
     * ctx.oss.put
     *
     * ctx.oss.delete
     *
     * ctx.oss.get
     *
     */
    // 上传
    async upload() {
            const file = this.ctx.request.files[0]


            const { authorization } = this.ctx.request.header

            console.log(authorization)
            try {
                let err = jwt.verify(authorization, "lianjia")
            } catch {
                this.ctx.body = {
                    code: 500,
                    msg: "登录过期，请重新登录"
                }
                return
            }
            let user = jwt.verify(authorization, "lianjia")
            let pathName = '/1901A-egg-oss-imgs/' + Math.random() * 100 + path.extname(file.filename)
            const data = await this.ctx.oss.put(pathName, file.filepath)
            const { url, name } = data
            console.log(url, name)

            if (user.dataValues) {
                const createimg = await this.ctx.model.Img.create({ name, url, tel: user.dataValues.username })
            }
            this.ctx.body = {...data, code: 1 }

        }
        // 删除
    async delete() {
            // ctx.oss.delete('图片名字')
            // const {}
            const data = await this.ctx.oss.delete(
                "1901A-egg-oss-imgs/7.059707902413304.jpg"
            )
            this.ctx.body = data
        }
        // 下载
        // "1901A-egg-oss-imgs/31.112362226461943.jpg"
    async download() {
        const { filePath } = this.ctx.request.body

        let src = path.join(
            __dirname,
            `../public/img/${Math.random() * 100}_${path.extname(filePath)}`
        )
        const data = await this.ctx.oss.get(
            filePath,
            src
        )
        this.ctx.body = {...data, src }
    }
}

module.exports = UploadController