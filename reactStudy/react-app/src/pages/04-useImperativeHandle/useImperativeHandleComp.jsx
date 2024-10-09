import {useRef, useEffect, useState, forwardRef, useImperativeHandle} from 'react';

/**
 * useImperativeHandle
 * forwardRef
 *      官方建议是与 useImperativeHandle 搭配使用
 *      引用父组件的 ref 实例, 成为子组件的一个参数, 可以引用父组件的 ref 绑定到子组件自身的节点上
 *          它能将从父组件得到的 ref 和 props 传入给子组件, 由子组件来调用父组件传入的 ref
 *          传入的组件会接收到两个参数, 一个是父组件传递的 props, 另一个就是 ref 的引用
 *              参数是接受一个函数, 此函数有两个参数, 一个是父组件传送的 props, 另一个是 ref 的引用
 */

const InputComp = ({label, myref}) => {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value)
    }

    /**
     * useImperativeHandle 官方建议, 减少暴露给父组件的属性, 避免使用 ref 这样的命令式代码
     * 参数1: 父组件传过来的 ref
     * 参数2: 处理函数, 他的返回值就是传给父组件的方法和属性, 返回的是一个对象
     * 参数3: 依赖项, 表示只有依赖项中的值发生改变, 才会把最新的属性和方法传给父组件, 如果没有依赖项, 则表示只要子组件 render 触发都会把属性和方法传给父组件
     */
    useImperativeHandle(myref, () => {
        return {
            inputValue: value,
            setValue(value) {
                setValue(value)
            }
        }
    }, [])

    return (
        <>
            <b>label: {value}</b>
            <br/>
            <input type="text" ref={myref} value={value} onChange={handleChange}/>
        </>
    )
}

/**
 * forwardRef 会创建一个 React 组件, 该组件能够将其接收的 ref 属性转发给其组件树下的另外一个组件中,
 * 其目的就是希望可以在封装组件时, 外层组件可以通过 ref 直接控制内层组件或元素的行为
 */
const RefInput = forwardRef((props, ref) => {
    return <InputComp {...props} myref={ref}></InputComp>
})

function UseImperativeHandleComp() {
    const inputRef = useRef(null);

    return (
        <>
            <h1>UseImperativeHandleComp</h1>
            <RefInput value={'这是子组件的 value 值'} ref={inputRef}></RefInput>
            <button onClick={() => console.log(inputRef.current.setValue('哈哈'))}>点击获取子组件抛出数据</button>
        </>
    )
}

export default UseImperativeHandleComp;
