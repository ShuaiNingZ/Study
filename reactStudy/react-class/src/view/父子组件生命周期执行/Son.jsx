import React, {Component} from "react";

class Son extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.group(`%c Son 首次加载`, `color: #0a0`)
        console.log(`%c Son constructor`, `color: #f00`)
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`%c Son static getDerivedStateFromProps`, `color: #f00`)
        return ''
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`%c Son  getSnapshotBeforeUpdate`, `color: #f00`)
        return ''
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`%c Son shouldComponentUpdate`, `color: #f00`)
        return true
    }

    componentDidUpdate() {
        console.log(`%c Son componentDidUpdate`, `color: #f00`)
    }

    componentDidMount() {
        console.log(`%c Son componentDidMount`, `color: #f00`)
    }

    componentWillUnmount() {
        console.group(`%c Son 销毁阶段`, `color: #0a0`)
        console.log(`%c Son componentWillUnmount`, `color: #f00`)
    }

    render() {
        console.log(`%c Son render`, `color: #f00`)
        return <div>
            <h1>Son 组件</h1>
        </div>
    }
}

export default Son;
