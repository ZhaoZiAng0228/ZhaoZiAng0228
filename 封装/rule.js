/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-21 16:15:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-23 14:58:15
 * @FilePath: /project/ZhaoZiAng0228/封装/rule.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 校验昵称为2-9位中文
const validateName = (name) => {
    const reg = /^[\u4e00-\u9fa5]{2,9}$/;
    return reg.test(name);
};

// 校验手机号
const validateMobile = (mobile) => {
    const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
    return reg.test(mobile);
};

// 校验6到18位大小写字母数字下划线组成的密码
const validatePassword = (password) => {
    const reg = /^[a-zA-Z0-9_]{6,18}$/;
    return reg.test(password);
};

// 校验身份证号
const validateCardId = (cardId) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(cardId);
};

// 时间转换
// 2022-08-21T08:41:07.127Z     转北京时

function format(time, format) {
    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i; };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}