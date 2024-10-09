const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');
const NO_AUTH_ROUTE = require('../plugins/NO_AUTH_ROUTE')

// 生成 JWT 令牌
const generateToken = (
    payload = {},
    options = {}
) => {
    return jwt.sign(
        {
            exp: Date.now() + 30 * 60 * 1000,
            ...payload
        },
        fs.readFileSync(path.join(process.cwd(), '/auth/private.cer'), 'utf8'),
        {
            algorithm: 'RS256',
            ...options
        }
    )
}

// 验证 JWT 令牌
const verifyToken = (token) => {
    try {
        return jwt.verify(
            token,
            fs.readFileSync(path.join(process.cwd(), '/auth/public.cer'), 'utf8'),
        )
    } catch (e) {
        return null
    }
}

// 解码 JWT 令牌
const decodeToken = (token) => {
    return jwt.decode(token);
}

// 认证 JWT 令牌中间件
const authTokenMiddleware = (req, res, next) => {
    try {
        const routeIndex = NO_AUTH_ROUTE.findIndex(item => item.url === req.url);
        if (~routeIndex && NO_AUTH_ROUTE[routeIndex].methods.includes(req.method)) {
            return next()
        }

        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                data: {
                    status: 403,
                    msg: '无权限访问'
                }
            })
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.send({
                data: {
                    status: 401,
                    msg: '无权访问'
                }
            })
        } else {
            req._id = decoded.userId;
            return next()
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
    authTokenMiddleware
}
