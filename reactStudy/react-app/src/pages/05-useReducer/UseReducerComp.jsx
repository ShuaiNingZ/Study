import {useReducer} from 'react'

/**
 * useReducer
 * 集中处理状态, 简易版 Redux
 * 唯一缺少的就是无法使用 redux 提供的中间件
 *      参数 1: 为一个 reducer 函数
 *      参数 2: reducer 的初始值
 *      参数 3: 为可选参数, 值为一个函数, 可以用来惰性提供初始状态
 */

import {init, initState, reducer} from "./useMiniStore";

function UseReducerComp() {
    const [state, dispatch] = useReducer(reducer, initState, init)
    console.log(state, dispatch)

    return (<>
        <h1>UseReducer</h1>
        <h3>count: {state.count}</h3>
        <button onClick={() => {
            dispatch({type: 'increment', payload: {n: 100}})
        }}>++
        </button>
        <button onClick={() => {
            dispatch({type: 'decrement', payload: {n: 100}})
        }}>--</button>
        <button onClick={() => {
            dispatch({type: 'reset', payload: initState})
        }}>重置状态</button>
    </>)
}

export default UseReducerComp;
