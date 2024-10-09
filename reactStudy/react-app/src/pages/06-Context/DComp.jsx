import {userInfoContext} from "./userInfoContext";

function DComp() {
    return (<>
        <h1>DComp 组件</h1>
        <userInfoContext.Consumer>
            {
                ({state, dispatch}) => {
                    console.log(state)
                    return (
                        <>
                            <h2>DComp Consumer count: {state.count}</h2>
                            <button onClick={() => {
                                dispatch({
                                    type: 'increment', payload: {
                                        n: 100
                                    }
                                })
                            }}>count ++
                            </button>
                        </>
                    )
                }
            }
        </userInfoContext.Consumer>
    </>)
}

export default DComp;
