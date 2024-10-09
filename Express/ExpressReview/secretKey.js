const NodeRSA = require('node-rsa');
const path = require('path');
const fs = require('fs');

const authPath = path.join(process.cwd(), '/auth');

// 创建秘钥
function createSecretKey() {
    const key = new NodeRSA({b: 2048});

    // 设置秘钥模式
    key.setOptions({encryptionScheme: 'pkcs1'});

    // 设置公钥
    const publicKey = key.exportKey('pkcs1-public')

    // 设置私钥
    const privateKey = key.exportKey('pkcs1-private')

    fs.writeFileSync(path.join(authPath, '/public.cer'), publicKey);
    fs.writeFileSync(path.join(authPath, '/private.cer'), privateKey);
}

createSecretKey()

// 加密
function encrypt(plain) {
    let publicKey = fs.readFileSync(path.join(authPath, '/public.cer'), 'utf8');

    const nodeRsa = new NodeRSA(publicKey)

    nodeRsa.setOptions({
        encryptionScheme: 'pkcs1'
    })

    return nodeRsa.encrypt(plain, 'base64')
}

// 解密
function decrypt(cipher) {
    let privateKey = fs.readFileSync(path.join(authPath, '/private.cer'), 'utf8');

    const nodeRsa = new NodeRSA(privateKey)

    nodeRsa.setOptions({
        encryptionScheme: 'pkcs1'
    })

    return nodeRsa.encrypt(data, 'utf8')
}

module.exports = {
    encrypt,
    decrypt
}
