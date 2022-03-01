/*
 * @Author: your name
 * @Date: 2021-11-03 15:55:25
 * @LastEditTime: 2021-11-04 20:03:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg_ payments/app/controller/email.js
 */
'use strict';

const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');
// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.qq.com',
    port: 587,
    auth: {
        user: 'aishangzhaoziang@qq.com', //刚才注册的邮箱账号
        pass: 'gxjqdvcygjnfbfhi'  //邮箱的授权码，不是注册时的密码
    }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
class PushEmailController extends Controller {
    async pushEmail() {
        const { ctx } = this;
        const { pushEmail } = ctx.request.body
        console.log(pushEmail);

        const outEmail = function (mail) {
            transporter.sendMail(mail, function (error, info) {
                if (error) {
                    return console.log(error);
                }
            });
        }

        // 创建一个邮件对象
        var mail = {
            // 发件人
            from: `${pushEmail.user.name} <${pushEmail.user.email}>`,
            // 主题
            subject: pushEmail.title,
            // 收件人
            to: 'aishangzhaoziang@qq.com',
            // 邮件内容，HTML格式
            text: pushEmail.text.substr(0, 100) //接收激活请求的链接
        };
        let data = +new Date();
        try {
            await outEmail(mail);
            await this.app.mysql.insert('email', { addresser: pushEmail.user.name, recipients: '江东', theme: pushEmail.title, date: new Date(parseInt(data)).toLocaleString() });
            ctx.body = {
                code: 200,
                mag: '已推送到“aishangzhaoziang@qq.com”用户'
            };
        } catch (e) {
            ctx.body = e;
        }
    }
}
module.exports = PushEmailController;
