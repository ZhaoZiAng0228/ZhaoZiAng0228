"use strict";

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = (app) => {
  const { router, controller, io } = app;
  // app.beforeStart(async() => {
  //     await app.model.sync({ alter: true }); //force false 为不覆盖 true会删除再创建; altertrue可以 添加或删除字段;
  // });
  router.get("/", controller.home.index);
  router.post("/api/pay-zhifubao", controller.home.zhifubao);
  //   //
  router.post("/api/users/register", controller.user.register);
  router.post("/api/users/login", controller.user.login);
  router.get("/yzm", controller.user.yzm);
  router.post("/api/users/upload", controller.user.userimg);
  router.post("/api/users/get", controller.user.getuser);
  //   //
  router.post("/api/second", controller.second.getsconed);
  router.post("/api/secondfirst", controller.second.getsconedfirst);
  router.post("/api/secondprice", controller.second.getsconedprice);
  router.post("/api/secondroom", controller.second.getsconedroom);
  router.post("/api/secondmore", controller.second.getsconedmore);
  router.post("/api/seconddetail", controller.second.getsconeddetail);
  router.post("/api/sconedsearch", controller.second.getsconedsearch);
  router.post("/api/manager/changeinfo", controller.second.changeSecondHouse);
  router.get("/api/manager/all", controller.second.getManagerSecondHouse);
  router.post("/api/manager/search", controller.second.searchSecondHouse);
  router.post("/api/manager/delete", controller.second.deleteSecondHouse);
  router.post("/api/manager/add", controller.second.addSecondHouse);
  //   //
  router.post("/api/rent", controller.rent.getrent);
  router.post("/api/rentfirst", controller.rent.getrentfirst);
  router.post("/api/rentfs", controller.rent.getrentfs);
  router.post("/api/rentprice", controller.rent.getrentprice);
  router.post("/api/rentmore", controller.rent.getrentmore);
  router.get("/api/manager/rent", controller.rent.getrentAll);
  router.post("/api/rentsort", controller.rent.getrentsort);
  router.post("/api/rentdetail", controller.rent.getrentdetail);
  router.post("/api/rentsearch", controller.rent.getrentsearch);
  router.post("/api/manager/rent/changeinfo", controller.rent.changeRentHouse);
  router.post("/api/manager/rent/delete", controller.rent.deleteRentHouse);
  router.post("/api/manager/rent/search", controller.rent.searchRentHouse);
  router.post("/api/manager/rent/add", controller.rent.addRentHouse);

  router.post("/api/manager/register", controller.manageruser.registers);
  router.post("/api/manager/login", controller.manageruser.login);
  router.get("/api/alipay", controller.manageruser.aliPay);

  //oss接口
  router.post("/oss/upload", controller.files.upload);
  router.delete("/oss/delete", controller.files.delete);
  router.post("/oss/download", controller.files.download);

  // 聊天
  router.get("/homeOne", controller.homeOne.index);
  io.of("/homeOne").route("chat", io.controller.chat.index);

  // broker
  router.get("/api/brokers", controller.broker.getBrokerList);
  router.put("/api/brokers", controller.broker.addBrokerList);
  router.delete("/api/brokers", controller.broker.delBrokerList);
  router.post("/api/brokers", controller.broker.editBrokerList);
  router.post("/api/search/brokers", controller.broker.searchBrokerList);

  // control
  router.get("/api/control", controller.control.getControlList);
  router.delete("/api/control", controller.control.delControlList);
  router.post("/api/control", controller.control.editControlList);
  //gy
  router.get("/api/orderdata", controller.order.getOrderdate); //获取订单
  router.delete("/api/orderdata", controller.order.delOrderdate); //删除订单
  router.get("/api/infodata", controller.info.getInfodate); //获取资讯
  router.delete("/api/infodata", controller.info.delInfodate); //删除资讯
  router.put("/api/infodata", controller.info.addinfodata); //添加资讯
  router.post("/api/infodata", controller.info.editinfodata); //编辑资讯
  router.post("/api/alterinfodata", controller.info.alterinfodata); //资讯状态

  // //第三方登录
  router.get("/api/oauth", controller.user.oauth);
  router.get("/oauth/redirect", controller.manageruser.thirdLogin);
};
