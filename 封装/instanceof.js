/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-12 09:52:09
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-12 09:52:21
 * @FilePath: /project/ZhaoZiAng0228/封装/instanceof.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE}
 */
function dataType(data) {
    if (typeof (data) == 'object') {
        if (data) {
            if (data instanceof Array) {
                return 'array';
            } else if (data instanceof Date) {
                return 'date';
            } else {
                return 'object';
            }
        } else {
            return 'null';
        }
    } else {
        return typeof (data);
    }
}

console.log(dataType(123));
console.log(dataType("abc"));
console.log(dataType(false));
console.log(dataType(undefined));
console.log(dataType(null));
console.log(dataType(Symbol()));
console.log(dataType({ name: '张三', age: 15 }));
console.log(dataType([1, 2, 3]));
console.log(dataType(function fn() { }));
console.log(dataType(new Date()));
