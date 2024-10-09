import {useState} from 'react'

function useCountState(n = 0) {
    let [count, setCount] = useState(n);

    const handlePlus = e => {
        setCount(++count)
    }

    const handleMinus = e => {
        // 参数是上一次状态参数
        setCount(prevState => {
            return --prevState
        })
    }
    return [count, setCount, handlePlus, handleMinus]
}

export default useCountState