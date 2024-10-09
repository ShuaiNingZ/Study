import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import UseStateComp from "./01-useState/UseStateComp";
import UseEffectComp from "./02-useEffect/UseEffectComp";
import UseRefComp from "./03-useRef/useRefComp";
import UseImperativeHandleComp from "./04-useImperativeHandle/useImperativeHandleComp";
import UseReducerComp from "./05-useReducer/UseReducerComp";
import ContextComp from "./06-Context/ContextComp";
import UseMemoComp from './07-useMemo/UseMemoComp';
import UseCallbackComp from './08-useCallback/UseCallbackComp';
import UseLayoutEffectComp from './09-useLayoutEffect/UseLayoutEffectComp';
import RouterHooksComp from './10-RouterHooks/RouterHooksComp';
// import Home from "Home";

export default function Home() {
    /**
     * useNavigate 执行返回一个跳转路由方法
     * const navigate = useNavigate();
     * navigate 是一个方法
     *      navigate('/');  表示 跳转路由并添加路由栈
     *      navigate('/', {replace: true});  表示 跳转路由并替换路由
     *      navigate('/', {state: {num: 123}});  表示 路由跳转传参
     *      navigate(-1);  表示 跳转到路由栈前一位
     */
    const navigate = useNavigate();

    return (<div className='home'>
        <header className="menu">
            <Link className='menu-item' to='/'>首页</Link>
            <Link className='menu-item' to='/UseState'>UseState</Link>
            <Link className='menu-item' to='/UseEffect'>UseEffect</Link>
            <Link className='menu-item' to='/UseRef'>UseRef</Link>
            <Link className='menu-item' to='/UseImperativeHandle'>UseImperativeHandle</Link>
            <Link className='menu-item' to='/UseReducer'>UseReducer</Link>
            <Link className='menu-item' to='/Context'>Context</Link>
            <Link className='menu-item' to='/UseMemo'>UseMemo</Link>
            <Link className='menu-item' to='/UseCallbackComp'>UseCallbackComp</Link>
            <Link className='menu-item' to='/UseLayoutEffect'>UseLayoutEffect</Link>
            <button onClick={() => {
                // 路由跳转并传参
                navigate('/RouterHooks', { state: { num: 123 } });
            }}>go to RouterHooksComp</button>
        </header>
        <main>
            <Routes>
                {/*<Route path='/' element={}></Route>*/}
                <Route path='/UseState' element={<UseStateComp />}></Route>
                <Route path='/UseEffect' element={<UseEffectComp />}></Route>
                <Route path='/UseRef' element={<UseRefComp />}></Route>
                <Route path='/UseImperativeHandle' element={<UseImperativeHandleComp />}></Route>
                <Route path='/UseReducer' element={<UseReducerComp />}></Route>
                <Route path='/Context' element={<ContextComp />}></Route>
                <Route path='/UseMemo' element={<UseMemoComp />}></Route>
                <Route path='/UseCallbackComp' element={<UseCallbackComp />}></Route>
                <Route path='/UseLayoutEffect' element={<UseLayoutEffectComp />}></Route>
                <Route path='/RouterHooks' element={<RouterHooksComp />}></Route>
            </Routes>
        </main>
    </div>)
}