import { useState, useCallback, memo } from 'react';

/**
 * useCallback
 * 缓存函数的 hooks
 * 相当于 useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
 */
const s = new Set();

const Child = memo(({ onChange }) => {
    console.log('Child 组件渲染');
    return (
        <>
            <h3>Child 组件</h3>
            <input type="text" onChange={onChange} />
        </>
    )
})

function UseCallbackComp() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // 会触发子组件重新渲染
    // 不用 useCallBack 每次渲染都会重新定义一个该方法
    /* const handleChange = (e) => {
        setText(e.target.value)
    } */

    // 用了 useCallBack 之后不在定义该方法
    const handleChange = useCallback((e) => {
        console.log('Callback 执行');
        setText(e.target.value)
    }, [])

    s.add(handleChange);
    console.log(s);
    console.dir(UseCallbackComp);

    return (
        <>
            <h1>useCallbackComp 组件</h1>
            <h3>count: {count}</h3>
            <h3>text: {text}</h3>
            <button onClick={() => {
                setCount(count + 1)
            }}>++</button>
            <br />
            <hr />
            <Child onChange={handleChange} />
        </>
    )
}

export default UseCallbackComp;