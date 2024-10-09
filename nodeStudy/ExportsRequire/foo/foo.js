module.exports = {
    a: 1,
    b: 2
}
let x = 10;

exports.add = function () {
    x++;
    return function () {
        return x
    }
}