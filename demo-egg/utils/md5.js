const crypto = require("crypto")

const md5 = (content)=>{
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

const getPas = (password)=>{
    let str = `pas=${password}&secret=zza`
    return md5(str)
}

module.exports = getPas