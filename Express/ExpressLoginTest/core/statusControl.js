const STATUS_MAP = {
    userTtC: {
        'USER_ADD': '4010',
        'USER_DR': '4016',
        'USER_NOF': '4012',
        'USER_FOND': '4013',
        'USER_INN': '4020',
        'USER_FERR': '4099'
    },
    userCtM: {
        '4010': '用户注册成功',
        '4016': '用户已存在',
        '4012': '用户不存在',
        '4013': '用户查询成功',
        '4020': '用户登录成功',
        '4099': '用户查询错误'
    }
}

module.exports = {
    getUserStatusMsg(tag) {
        if (!tag) {
            return false
        }
        let statusCode = userTtC[tag];
        let errMsg = userCtM[statusCode];
        return {
            statusCode,
            errMsg,
            tag
        }
    }
}

/**
 * statusCode   4001
 * statusTag    'USER_INN'
 * errMsg       "用户注册成功"
 *
 */
