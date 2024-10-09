import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import DComp from "./DComp";

import {userInfoContext} from "./userInfoContext";

function CComp() {
    const {userInfo, dispatch} = useContext(userInfoContext);

    return (<>
        <h1>CComp 组件</h1>
        <button onClick={() => {
            dispatch({
                type: 'decrement', payload: {
                    n: 100
                }
            })
        }}>count --
        </button>
        <NavLink to='/'>Home</NavLink>
        <hr/>
        <DComp></DComp>
    </>)
}

export default CComp;
