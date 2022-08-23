/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-11 13:52:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-11 13:55:02
 * @FilePath: /project/ZhaoZiAng0228/封装/publish.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
发布订阅模式
*/
let salesOffices = {};  // 定义发布者
salesOffices.clientList = []; // 给发布者增加缓存列表
salesOffices.listen = function (key, fn) { // 增加订阅者
    if (!this.clientList[key]) { // 如果还米有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
};
salesOffices.trigger = function () { // 发布消息
    const key = Array.prototype.shift.call(arguments);  // 取出消息类型
    const fns = this.clientList[key]; // 取出改消息对应的回调函数集合
    if (!fns || fns.length === 0) { // 如果没有订阅过消息，则返回
        return false;
    }
    for (var i = 0; i < fns.length; i++) {
        fns[i].apply(this, arguments);
    }
};

salesOffices.listen('squareMeter88', function (price) {
    console.log('价格:', price);
});

salesOffices.listen('squareMeter110', function (price) {
    console.log('价格:', price);
});

salesOffices.trigger('squareMeter88', 88);
salesOffices.trigger('squareMeter110', 110);