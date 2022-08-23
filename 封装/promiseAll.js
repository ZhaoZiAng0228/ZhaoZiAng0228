/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-10 11:09:32
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-10 11:09:35
 * @FilePath: /project/ZhaoZiAng0228/封装/promiseAll.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


// 封装 Promise.all方法
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let result = []; // 存放返回值
        let counter = 0; // 计数器，用于判断异步完成
        function processData(key, value) {
            result[key] = value;
            // 每成功一次计数器就会加1，直到所有都成功的时候会与values长度一致，则认定为都成功了，所以能避免异步问题
            if (++counter === values.length) {
                resolve(result);
            }
        }
        // 遍历 数组中的每一项，判断传入的是否是promise
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            // 如果是promise则调用获取data值，然后再处理data
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject);
            } else {
                // 如果不是promise，传入的是普通值，则直接返回
                processData(i, current);
            }
        }
    });
};
