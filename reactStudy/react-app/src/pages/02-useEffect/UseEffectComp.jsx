import {useEffect} from 'react'
import useCountState from '../01-useState/useCountState'

/**
 * useEffect 用于处理副作用
 * 相当于 类组件中 componentDidMount、componentDidUpdate、componentWillUnmount 的结合体
 * 用于解决问题:
 *      1. 函数组件没有生命周期
 *      2. 网络请求、DOM 操作、事件监听、订阅等业务逻辑耦合散乱再不同生命周期中
 * 副作用:
 *      副作用是函数式编程里面的概念
 *      比如页面跳转了, 组件也卸载了, 但是当前组件里的定时器还没执行, 你绑定的事件监听还没销毁, 订阅
 *      的 observable 还没有取消, 这些都算副作用, 你可以再返回函数中销毁这些副作用
 * 副作用的产生:
 *      DOM 操作
 *      数据异步请求
 *      组件更新
 * 采用闭包, 在组建函数内执行, 保存 state 状态和获取 props
 *      参数1:
 *          接收一个函数, 用来处理一些副作用
 *          如果此函数有返回值, 返回一个函数, 则在组建销毁或调用函数前调用, 相当于 componentWillUnmount
 *      参数2:
 *          有
 *              接收一个数组, 如果数组中的成员变化, 会触发参数 1 中的函数执行
 *              接口一个空数组, 相当于 componentDidMount
 *          无
 *              相当于组建的 componentDidUpdate
 * 整个页面渲染完才会调用的代码
 * 封装 useEffect, 复用副作用
 */

function UseEffectComp() {
    const [count, setCount, handlePlus, handleMinus] = useCountState(100);
    const [count1, setCount1, handlePlus1, handleMinus1] = useCountState(100);

    console.log('%c--UseEffectComp', 'color: #f582ae');

    // 情况1
    // 不传参, 监听所有变化, 相当于 componentDidMount、componentDidUpdate 都会触发
    // 由 情况2 可得: 首次挂载完成 (componentDidMount), 并未触发 return 函数,
    // 然后由 情况 1 可得: 再更新阶段 (componentDidUpdate), return 函数先执行, 然后执行 effect 内部代码
    /*useEffect(() => {
        // 情况 1 会无限触发, 不建议调请求
        console.log('%c1情况--useEffect', 'color: #00ebc7');

        const timer = setInterval(() => {
            console.log('%c--setInterval 执行', 'color: #00ebc7')
            setCount(count + 1)
        }, 1000)

        // return 相当于 componentWillUnmount 执行
        return () => {
            clearInterval(timer);
            console.log('%c--return 执行', 'color: #00ebc7')
        }
    })*/

    // 情况2
    // 参数为 [], 相当于在 componentDidMount 只触发一次
    useEffect(() => {
        // 向后端发送请求, 最好放在这里, 只执行一次
        console.log('%c2情况--useEffect1', 'color: #a786df');

        const timer = setInterval(() => {
            console.log('%c--setInterval1 执行', 'color: #a786df')
            setCount1(prevState => ++prevState)
        }, 1000)

        // return 相当于 componentWillUnmount 执行
        return () => {
            console.log('%c--return1 执行', 'color: #a786df')
            clearInterval(timer);
        }
    }, [])

    // 情况3
    // 参数为 [], 有几项监听几个值的变化, 并触发, 相当于 componentDidMount、componentDidUpdate 都会触发
    /*useEffect(() => {
        console.log('%c3情况--useEffect2', 'color: #ff6e6c');
    }, [count, count1])*/

    return (<>
        <h1>UseEffectComp组件 count: {count}</h1>
        <button onClick={handlePlus}>count ++</button>
        <button onClick={handleMinus}>count --</button>
        <h1>UseEffectComp组件 count1: {count1}</h1>
        <button onClick={handlePlus1}>count1 ++</button>
        <button onClick={handleMinus1}>count1 --</button>
    </>)
}

export default UseEffectComp;