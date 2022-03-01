// const Controller = require("egg").Controller;
// const room = "default_room";

// class ChatController extends Controller {
//   async index() {
//     const { app, socket, logger, helper } = this.ctx;
//     const id = socket.id;
//     // 根据id给指定连接发送消息
//     const nsp = app.io.of("/");
//     const message = this.ctx.args[0] || {};
//     console.log(message);
//     // console.log(this.args[0]);
//     nsp.sockets[id].emit("res", message);
//     // nsp.sockets[id].on("chat", (data) => {
//     //   console.log(data);
//     // });
//     // console.log(nsp.sockets[id]);

//     // 指定房间连接信息列表
//     nsp.adapter.clients([room], (err, clients) => {
//       console.log(JSON.stringify(clients));
//     });
//     // this.ctx.app.io.on("sed", async (data) => {
//     //   console.log("----------data", data);
//     // });
//     //  给指定房间的每个人发送消息
//     this.ctx.app.io
//       .of("/")
//       .to(room)
//       .emit("online", this.ctx.socket.id + "上线了");
//     // 断开连接
//     // this.ctx.socket.disconnect();
//   }
// }
// module.exports = ChatController;
// app/io/controller/chat.js
// 将收到的消息发送给客户端

"use strict";

const Controller = require("egg").Controller;
const room = "default_room";

class ChatController extends Controller {
  async index() {
    const { app, socket, logger, helper } = this.ctx;
    const id = socket.id;
    const nsp = app.io.of("/homeOne");
    const message = this.ctx.args[0] || {};

    // console.log(this.ctx.args);
    // 根据id给指定连接发送消息
    // nsp.sockets[id].emit("res", message);
    // 指定房间连接信息列表
    nsp.adapter.clients([room], (err, clients) => {
      // console.log(JSON.stringify(clients));
    });
    message.time = +new Date();
    //  给指定房间的每个人发送消息
    nsp.to(room).emit("res", message);
    // this.ctx.app.io
    //   .of("/")
    //   .to(room)
    //   .emit("online", this.ctx.socket.id + "上线了");
    // 断开连接
    // this.ctx.socket.disconnect();
  }
}
module.exports = ChatController;

// module.exports = (app) => {
//   return function* () {
//     const self = this;

//     console.log(self.id, "selfselfselfselfself");
//     const message = this.args[0];
//     console.log("chat 控制器打印", message);
//     // this.socket.emit("res", message);
//     this.server.sockets.emit("res", message);
//   };
// };
