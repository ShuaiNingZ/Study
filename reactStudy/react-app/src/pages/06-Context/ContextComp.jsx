import {useState, useReducer} from 'react'
import {userInfoContext} from "./userInfoContext";
/**
 * context 设计目的是为共享那些被认为对于一个组件树而言是'全局'的数据
 *      类似于前端 Vue 中的 provide、inject
 * context 使用场景, 通过组件树提供了一个传递数据的方法, 从而避免了在每一个层级组件中手动的传递 props 属性
 * createContext
 *      该方法提供 2 个组件 Provider  Consumer
 *      const {Provider, Consumer} = React.createContext(defaultValue)
 * Provider
 *      该组件向组件树提供状态
 *      该组件接收一个 value 属性, 传递给后代组件
 * Consumer
 *      此组件订阅 context 改变
 *          当 context 发生改变, 即 Provider 的值发生改变时, 作为 Provider 后代的所有 Consumers 都会重新渲染
 *      接收一个函数作为子节点, 该函数接收当前 context 的值 并返回一个 react 节点
 *          传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性
 *          如果 context 没有 provider, 那么 value 参数将是 createContext() 的 defaultValue
 * useContext
 *      使用效果类似于  Consumer, 配合 Provider 使用
 *      接收一个 Context 类型的参数, 返回 Provider 中的 value 属性的值
 */
import AComp from "./AComp";
import {init, initState, reducer} from '../05-useReducer/useMiniStore'
import CComp from "./CComp";


function ContextComp() {
    const [userInfo, setUserInfo] = useState({
        name: 'dream',
        age: 18
    })

    const [state, dispatch] = useReducer(reducer, initState, init);

    return (<>
        <h1>ContextComp 组件</h1>
        <button onClick={() => {
            setUserInfo({
                ...userInfo,
                age: userInfo.age + 1
            })
        }}>change age: {userInfo.age}
        </button>
        <userInfoContext.Provider value={{...userInfo, setUserInfo}}>
            <AComp></AComp>
        </userInfoContext.Provider>

        <userInfoContext.Provider value={{state, dispatch}}>
            <CComp></CComp>
        </userInfoContext.Provider>
    </>)
}

export default ContextComp;
