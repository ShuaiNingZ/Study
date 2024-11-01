const path = require('path');

module.exports = {
    host: '127.0.0.1',
    root: process.cwd(),
    port: 3000,
    keyPath: path.join(process.cwd(), '/auth'),
    pubKeyPath: path.join(process.cwd(), '/auth/public.cer'),
    priKeyPath: path.join(process.cwd(), '/auth/private.cer'),
    // 充当数据库
    userPath: path.join(process.cwd(), '/user/user.json'),
}
