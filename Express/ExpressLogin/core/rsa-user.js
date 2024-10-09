const {encrypt, decrypt} = require('../util/util');
const fs = require('fs').promises;
const path = require('path');
const cerPath = path.join(process.cwd(), './auth');
const pubKeyPath = path.join(cerPath, '/public.cer')

module.exports = {
    async vertifyPwd(pwd) {
        return await decrypt(pwd)
    },
    async getPubKey() {
        return await fs.readFile(pubKeyPath, 'utf8')
    }
}
