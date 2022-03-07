/*
 * @Author: your name
 * @Date: 2022-03-07 09:56:27
 * @LastEditTime: 2022-03-07 10:00:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \新建文件夹 (2)\ZhaoZiAng0228\封装\debounce.ts
 */


// 防抖

// 例如input输入时 只有在手离开键盘两秒后才执行，而不是每次输入离开键盘都会执行

// 思路：设置一个timer定时器 并把他存储起来不会被回收 每当多次调用时则清除上一个timer 重新开始计时 时间达到才执行回调
// 解决方法 闭包存储timer
const debunceTs = (delay: number, callback: Function) => {
    let timer: any
    return function (val: any) {
        clearTimeout(timer as never)
        timer = setTimeout(() => {
            callback(val)
        }, delay)
    }
}