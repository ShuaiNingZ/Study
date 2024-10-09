// import {useState} from 'react'

import useCountState from "./useCountState";

/**
 * useState
 * 组件三大属性: state, props, ref
 *      state (状态即数据)
 *          来自组件内部状态
 *          状态有三种:
 *              组件本身的装填
 *              全局的状态 (redux)
 *              服务器的状态
 *      props 来自组件外部属性
 *      ref   表示组件内部的某个元素
 * 在函数组件里保存状态(数据)
 * 参数是任意类型的状态(数据)
 * 返回值是个数组
 *      数组的第 0 个成员是 '默认状态'
 *      数组的第 1 个成员是 '改变状态的函数'
 * 封装 '自定义 hooks', 复用状态
 */


function UseStateComp() {
    /*let [count, setCount] = useState(100);

    // 响应式状态改变, 会自动触发函数组件渲染
    const handlePlus = e => {
        setCount(++count)
    }

    const handleMinus = e => {
        // 参数是上一次状态参数
        setCount(prevState => {
            return --prevState
        })
    }*/

    const [count, setCount, handlePlus, handleMinus] = useCountState(100);

    return (<>
        <h1>UseStateComp组件 count: {count}</h1>
        <button onClick={handlePlus}>count ++</button>
        <button onClick={handleMinus}>count --</button>
    </>)
}

export default UseStateComp;