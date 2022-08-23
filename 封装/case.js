/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-10 11:18:30
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-14 20:03:20
 * @FilePath: /project/ZhaoZiAng0228/封装/case.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


console.log(1);

setTimeout(() => {
    new Promise((resolve, reject) => {
        console.log(2);//第一轮微任务同步执行
        resolve();
    }).then(() => {
        console.log(7);
        // }).then(() => {
        //     console.log(7);
        // }).catch(() => {
        //     console.log(8);
    });
}, 1000);

const start = new Date();
while (new Date() - start < 3000) { }

console.log(3);

setTimeout(() => {
    console.log(4);
}, 0);

setTimeout(() => {
    new Promise((resolve, reject) => {
        console.log(5);//第一轮微任务同步执行
        resolve();
    }).then(() => {
        console.log(6);
        // }).then(() => {
        //     console.log(7);
        // }).catch(() => {
        //     console.log(8);
    });
},0);

console.log(9);