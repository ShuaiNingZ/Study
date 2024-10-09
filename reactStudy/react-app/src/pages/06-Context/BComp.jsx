import {userInfoContext} from "./userInfoContext";

function BComp() {

    return (<>
        <h1>BComp 组件</h1>
        <userInfoContext.Consumer>
            {
                ({name, age}) => {
                    return (
                        <>
                            <h3>Consumer</h3>
                            <h4>name: {name}</h4>
                            <h4>age: {age}</h4>
                        </>
                    )
                }
            }
        </userInfoContext.Consumer>
    </>)
}

export default BComp;
