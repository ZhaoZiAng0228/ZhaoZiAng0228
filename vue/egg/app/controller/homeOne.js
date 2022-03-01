// 'use strict';

// // 访问统计 接口

// const Controller = require('egg').Controller;
// const WebSocket = require('ws')
// const ws = new WebSocket.Server({
//     port: 9000
// })

// class WebSocketController extends Controller {

//     /* 获取访问统计数据 */
//     async getWeb() {
//         const { ctx } = this;
//         let scokets = [];// 记录用户的 记录socket
//         ws.on('connection', (socket) => {
//             // 讲客户端每次发送的消息 记录下来
//             scokets.push(socket);
//             socket.on('message', (msg) => {
//                 // 判断当前的socket 是否存在scokets数组中
//                 scokets.forEach(item => {
//                     if (item !== socket) {
//                         // 客户端发送来的消息通知
//                         item.send(msg);
//                     }

//                 })
//             })
//         })
//         ctx.body = {
//             code: 200,
//             visitList,
//             total: list.length
//         }
//     }
// }


// module.exports = WebSocketController;




// 聊天
const Controller = require("egg").Controller;

class HomeOneController extends Controller {
    async index() {
        const { app, query } = this.ctx;
        // 给谁发, socket连接的id
        const id = query.id;
        const nsp = app.io.of("/homeOne");
        if (nsp.sockets[id]) {
            // 通过id给指定socket连接发送消息
            nsp.sockets[id].emit("res", message);
        }
        this.ctx.body = "发送成功";
    }
}

module.exports = HomeOneController;
