import { useHref, useLocation } from 'react-router-dom'

function RouterHooksComp() {
    // 接收路由对象及参数
    const location = useLocation();
    console.log(location);

    return (
        <>
            <h1>RouterHooks num: {location.state?.num}</h1>
        </>
    )
}

export default RouterHooksComp;