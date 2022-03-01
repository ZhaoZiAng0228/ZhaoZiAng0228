//计算时间差
export const filterTime = (time) => {
    //转为24小时格式方法
    function To(date) {
        if (date.includes("下午")) {
            //截取小时并加12（转换成24小时制）
            let h = +date.slice(date.indexOf("午") + 1, date.indexOf(':')) + 12;
            if (h == 24) {
                h = '00';
            }
            //分割数组
            let arr = date.split("下午");
            //进行拼接
            date = arr[0] + ' ' + h + arr[1].slice(arr[1].indexOf(':'));
        } else {
            date = date.replace(/(上午)/, " ");
        }
        return date;

    }
    //当前时间戳
    let toDay = +new Date();
    //文章发布时间戳
    let preDay = Date.parse(To(time));
    //时间差
    let gap = toDay - preDay;
    //天
    let day = parseInt(gap / 1000 / 60 / 60 / 24);
    //时
    let h = parseInt(gap / 1000 / 60 / 60);
    //分
    let m = parseInt(gap / 1000 / 60);
    if (day > 0) {
        return `大约${day}天前`;
    } else if (h > 0) {
        return `大约${h}小时前`;
    } else if (m > 0) {
        return `大约${m}分钟前`;
    } else {
        return `刚刚`
    }
};