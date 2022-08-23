/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-21 15:47:10
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-21 16:16:30
 * @FilePath: /project/ZhaoZiAng0228/封装/deepClone.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 对象深拷贝
function deepClone(obj) {
    // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    const objClone = Array.isArray(obj) ? [] : {};
    // 进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
};