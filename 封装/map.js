/*
 * @Author: your name
 * @Date: 2022-03-07 10:11:14
 * @LastEditTime: 2022-08-21 16:19:56
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \新建文件夹 (2)\ZhaoZiAng0228\封装\map.ts
 */


const map = (arr, callback) => {
    if (!Array.isArray(arr) || arr.length === 0 || typeof callback !== 'function') {
        return [];
    } else {
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            res.push(callback(arr[i], i, arr));
        }
        return res;
    }
};