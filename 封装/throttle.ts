/*
 * @Author: your name
 * @Date: 2022-03-07 10:01:07
 * @LastEditTime: 2022-03-07 10:01:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \新建文件夹 (2)\ZhaoZiAng0228\封装\throttle.ts
 */



// 节流


// 节流就是在限定的时间内 无论多少次触发只会执行一次 
// 例如点击提交某个表单 无论2秒内点击多少次都只会提交一次

const throttleTs = (callback: Function, wait: number): any => {
    let timer
    // 闭包保存timer
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                callback()
                timer = null
            }, wait)
        }
    }
}