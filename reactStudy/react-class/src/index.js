import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from "./App.jsx";

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);

/*// 随机取10个数 相加等于999
function random(min, max) {
    return parseInt(Math.random() * (max - min) + min)
}

function result(n, total, min, max) {
    let sum = 0;
    let arr = [];
    for (let i = 0; i < n - 1; i++) {
        arr[i] = random(min, max);
        sum += arr[i];
        if (n - 2 === i) {
            arr[i + 1] = total - sum;
        }
    }
    return arr
}

console.log(result(10, 999, 0, 100));*/