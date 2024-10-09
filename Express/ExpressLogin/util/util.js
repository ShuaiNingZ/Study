// 用于加密令牌
const NodeRSA = require('node-rsa');
const path = require('path');
const fs = require('fs').promises;
const cerPath = path.join(process.cwd(), './auth');

// console.log(encrypt('你好123321'));
console.log(decrypt('ZLcIpwsL72q+szQjccLo9RW4bQh1zuDwN0iyJM4NVnhORWK+7+xzTHt4z7KW1ay2oCcwebRGkS2jZMNlEfBY0w=='))

// 创建秘钥
function generateKeys() {
    // 实例化 NodeRSA, b 秘钥位数 bit 越大越安全 一般在 256 - 4096 之间, 常用 512, 1024
    const newKey = new NodeRSA({b: 512});

    // 设置秘钥模式
    newKey.setOptions({encryptionScheme: 'pkcs1'});

    // 设置公钥
    let public_key = newKey.exportKey('pkcs8-public');
    // MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKmUcmKdNLUsCzillCT9TjDj+O36Ia/4MqjBfDlwyqMgh7QHazLd8Lag0Qi05iZQCpopEpwTeGaOGcv7+O752m8CAwEAAQ==

    // 设置私钥
    let private_key = newKey.exportKey('pkcs8-private');
    // MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEA4OibLPjSYuImus8c8B7oOzDJfAW4RYo0DlhD1x+6aI4YwO/s98GRc7pLHSUXwBlJVU6jaiilB2K+7d4zIW+fcQIDAQABAkAED07VxfwOOuTWFG0CTJyGjP/mFDhaUP9VjvRSiskToAxZ49H6k4twNZokLuu6GuEP7N4XknnfIr9tnG/rL38NAiEA9mKCKsFjNOpkvzLS158e5qMnjeF0PI9N2xJsPbY/iTMCIQDpr4qRb9FEIvf8fT4lEsftqpgKZwo48f8gzddVzELcywIhAJyTHYVuQE1wZ3XaJoNAa7LGHGzdybByoVeG7aKKHvZhAiEA21DfiL1btknnWbUlVN/6eSipBuJLqsQbwGrPVPueKN8CIQDYMDO2GyLzWdxhU6Ig/d041KZMaEJUFStTiQOW03gaaA==

    // console.log('公钥', public_key);
    // console.log('私钥', private_key);

    // 写入公钥 私钥 cer 文件
    fs.writeFileSync(path.join(cerPath, 'private.cer'), private_key);
    fs.writeFileSync(path.join(cerPath, 'public.cer'), public_key);
}

async function encrypt(plain) {
    // 读取秘钥 公钥
    let public_key = await fs.readFile(path.join(cerPath, 'public.cer'), 'utf8');
    const nodersa = new NodeRSA(public_key);

    // 设置秘钥 scheme
    nodersa.setOptions({encryptionScheme: 'pkcs1'});

    // 调用加密方法 plain 是需要加密的明文 加密生成的格式
    const encrypted = nodersa.encrypt(plain, 'base64');
    return encrypted
}

async function decrypt(cipher) {
    // 获取私钥
    let private_key = await fs.readFile(path.join(cerPath, 'private.cer'), 'utf8');

    // 私钥实例化 NodeRSA
    let prikey = new NodeRSA(private_key);

    // 设置 模式 scheme pkcs1
    prikey.setOptions({encryptionScheme: 'pkcs1'});

    // decrypt(解密密文, 解密后格式)
    return prikey.decrypt(cipher, 'utf8');
}

module.exports = {
    encrypt,
    decrypt
}
