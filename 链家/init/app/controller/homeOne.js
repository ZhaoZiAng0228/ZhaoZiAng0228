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
