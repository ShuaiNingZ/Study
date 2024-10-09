import { useEffect, useLayoutEffect, useState } from 'react';

function UseLayoutEffectComp() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        console.log('useEffect');
    })

    /**
     * useLayoutEffect
     * 相当于 同步版的 useEffect
     * 如果 DOM 操作, 可以放在此 hook 里面
     * useEffect 是在渲染是异步执行的, 并且要等到浏览器将所有变化渲染到屏幕后才会被执行
     */
    useLayoutEffect(() => {
        const title = document.querySelector('#title');
        const tWidth = title.getBoundingClientRect().width;
        console.log('useLayoutEffect', tWidth);
        if (width !== tWidth) {
            setWidth(tWidth);
        }
    })

    return (
        <>
            <h1 id='title'>UseLayoutEffect 组件</h1>
            <h3><u>{width}</u></h3>
        </>
    )
}

export default UseLayoutEffectComp;