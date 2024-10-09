let count = 0;

function increase() {
    return ++count;
}

function decrease() {
    return --count;
}

export default {
    increase,
    decrease
}

/*// 导入模块
const fs = require('fs');

// 导出模块
module.exports = {
    sayHello: function() {
        console.log('Hello from CommonJS!');
    }
};*/
