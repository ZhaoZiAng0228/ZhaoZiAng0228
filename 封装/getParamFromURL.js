funObj = (val) => {
    let strs = val.split('&'), obj = {};
    for (let i = 0; i < strs.length; i++) {
        obj[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
    console.log('obj==>', obj);
};

function getParamFromURL(url) {
    if (url.indexOf('#') !== -1) {
        // 一种#的前面有? ,一种#前面没?没参数
        if (url.indexOf('?') !== -1) {
            if (url.indexOf('#') > url.indexOf('?') && url.indexOf('?') != url.lastIndexOf('?')) {
                // #的前面有?
                let str = url.substr(url.indexOf('?') + 1, url.indexOf('#') + 1);
                let str2 = url.substr(url.lastIndexOf('?') + 1);
                console.log('str==>', str, 'str2==>', str2);
                funObj(str);
                funObj(str2);
            }
            if (url.indexOf('#') < url.indexOf('?')) {
                // #前面没?没参数
                let str = url.substr(url.indexOf('?') + 1);
                console.log(str);
                funObj(str);
            }
        }
    }
}