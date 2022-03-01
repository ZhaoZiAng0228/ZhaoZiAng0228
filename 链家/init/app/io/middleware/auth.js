const room = "default_room";

module.exports = () => {
  let obj = {};
  return async (ctx, next) => {
    // console.log(ctx);
    // 权限校验通过
    // ctx.socket.emit("online", "auth success 权限校验通过");
    // 上线通知
    ctx.socket.on("online", (data) => {
      obj = data;
    });

    // 加入房间
    ctx.socket.join(room);
    ctx.socket.to(room).emit("state", obj);
    // console.log(ctx.socket.to(room));
    // console.log(room);
    // 放行
    await next();
  };
};
