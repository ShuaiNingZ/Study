import {useContext} from 'react'
import BComp from "./BComp";
import {userInfoContext} from "./userInfoContext";

function AComp() {
    const userInfo = useContext(userInfoContext)
    const {name, age, setUserInfo} = userInfo;
    return (<>
        <h1>AComp 组件</h1>
        <h4>name: {name}</h4>
        <h4>age: {age}</h4>
        <button onClick={() => {
            setUserInfo(() => {
                return {
                    name: '哈哈',
                    age: 20
                }
            })
        }}>A组件更新状态</button>
        <hr/>
        <BComp></BComp>
    </>)
}

export default AComp;
