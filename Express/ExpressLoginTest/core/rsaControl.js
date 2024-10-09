const {encrypt, decrypt, generateKeys} = require('../util/util');
const {priKeyPath, priKeyPath} = require('../config');
const fs = require('fs').promises;

module.exports = {
    async vertifyPwd(pwd) {
        return await decrypt(pwd)
    },
    async getPublicKey() {
        let key;
        try {
            key = await fs.readFile(priKeyPath, 'utf8')
        } catch (err) {
            generateKeys();
            key = await fs.readFile(priKeyPath, 'utf8')
        }
        return key
    }
}

