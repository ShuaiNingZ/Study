import useCountState from "../01-useState/useCountState";
import {useRef, createRef} from 'react'

/**
 * 用于操作 dom
 * createRef 使用方法和 useRef 一致, 返回一个 ref 对象, 对象下面有一个 current 属性指向被引用对象的实例
 *      useRef 每次都会返回相同的引用
 *      createRef 每次渲染都会返回一个新的引用
 */

function UseRefComp() {
    const [count, setCount, handlePlus, handleMinus] = useCountState();

    // 每次都会返回相同的引用
    const refObj = useRef();
    console.log(refObj);
    // 每次渲染都会返回一个新的引用
    const createRefObj = createRef();
    console.log(createRefObj);

    if (!refObj.current) {
        refObj.current = count;
    }

    if (!createRefObj.current) {
        createRefObj.current = count;
    }

    return (
        <>
            <h1>UseRefComp 组件 count: {count}</h1>
            <p>
                <b>
                    {
                        // 该值不变化, 表示相同引用
                        refObj.current
                    }
                </b>
            </p>
            <p>
                <b>
                    {
                        // 该值变化, 表示每次渲染都会取一个新的引用
                        createRefObj.current
                    }
                </b>
            </p>
            <button onClick={handlePlus}>count ++</button>
            <button onClick={handleMinus}>count --</button>
            <hr/>
            <TestRef></TestRef>
        </>
    )
}

function TestRef() {
    const [count, setCount, handlePlus, handleMinus] = useCountState(10);
    const refObj = useRef();
    refObj.current = count;

    // 先点击 handleAlert 函数执行, 再点击 count 值变化的函数执行, 发现 alert 出的是 count 变化之前的数据
    // 闭包特性, 每次渲染, 此函数都有一个自己的 count
    const handleAlert = () => {
        setTimeout(() => {
            alert('current count' + count)
        }, 3000)
    }

    // 可以使用 useRef 来实现得到 实时最新的状态, 可以解决特定场景闭包所带来的问题
    const handleAlert1 = () => {
        setTimeout(() => {
            alert('current count' + refObj.current)
        }, 3000)
    }

    return (
        <>
            <p>
                <b>count1: {count}</b>
            </p>
            <button onClick={handlePlus}>count ++</button>
            <button onClick={handleMinus}>count --</button>
            <button onClick={handleAlert}>show Alert</button>
            <button onClick={handleAlert1}>show Alert 1</button>
        </>
    )
}

export default UseRefComp;