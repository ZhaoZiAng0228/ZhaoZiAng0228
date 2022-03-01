const crypto = require("crypto");


const md5 = (content) => {

    let md5 = crypto.createHash("md5");

    return md5.update(content).digest("hex")
};

const getpass = (password) => {


    let str = `password=${password}&secret='lianjia'`;

    return md5(str)
};

module.exports = getpass