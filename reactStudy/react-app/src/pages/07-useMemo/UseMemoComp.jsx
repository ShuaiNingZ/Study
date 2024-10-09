import { useMemo, useState, memo } from 'react'

/**
 * 记忆组件
 * 缓存一个数据的 hooks
 * 会初始执行一次
 * 把 '创建' 函数和依赖项数组作为参数传入 useMemo, 他仅会在某个依赖项改变时才重新计算值
 *    这种优化有助于避免在每次都进行重新渲染
 * 传入 useMemo 的函数会在渲染期间执行
 *    请不要在这个函数内部执行与渲染无关的操作, 诸如副作用这类的操作属于 useEffect 的适用范畴, 而不是 useMemo.
 *    如果没有提供依赖项数组, useMemo 在每次渲染时都会计算新的值
 */

function UseMemoComp() {
    const [time, setTime] = useState(0);
    const [dateTime, setDateTime] = useState(0);

    return (
        <>
            <h2>UseMemoComp 组件 : time: {time} dateTime: {dateTime}</h2>
            <button onClick={() => setTime(new Date().toLocaleTimeString())}>setTime</button>
            <button onClick={() => setDateTime(new Date().getTime())}>setDateTime</button>
            <Child time={time}></Child>
        </>
    )
}

/**
 * 使用 memo 时, 不要使用插槽, 因为使用插槽之后 memo 作用就失效了
 */
const Child = memo(({ time, children }) => {
    console.log('Child 重新渲染');
    function getTime(time) {
        console.log('changeTime', time);
        return time;
    }
    // const getTimeV = getTime(time);
    const getTimeV = useMemo(() => getTime(time), [time])
    return (
        <>
            <h2>Child 组件 time: {getTimeV}</h2>
            {children}
        </>
    )
})

export default UseMemoComp;