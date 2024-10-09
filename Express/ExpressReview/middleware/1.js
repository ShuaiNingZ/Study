module.exports = function (options) {
    return (req, res, next) => {
        console.log('中间件')
        next();
    }
}
