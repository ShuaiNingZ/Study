// 初始状态
const initState = {
    count: 520,
    msg: '初始状态'
}

function init(){
    // 改变状态代码
    return {
        count: initState.count,
        msg: initState.msg
    }
}

// 修改初始状态
function reducer(state, action) {
    const {type, payload} = action;
    switch (type) {
        case 'increment':
            return {
                ...state,
                count: state.count + payload.n
            }
        case 'decrement':
            return {
                ...state,
                count: state.count - payload.n
            }
        case 'reset':
            /*return {
                ...state,
                ...initState
            }*/
            return init()
        default:
            throw new Error()
    }
}

export {
    initState,
    init,
    reducer
}