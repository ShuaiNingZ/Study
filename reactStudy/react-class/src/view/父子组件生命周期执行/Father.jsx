import React, {Component} from "react";

import {Button} from 'antd';
import Son from "./Son.jsx";

class Father extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        console.group(`%c Father 首次加载`, `color: #0a0`)
        console.log(`%c Father constructor`, `color: #f00`)
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`%c Father static getDerivedStateFromProps`, `color: #f00`)
        return ''
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`%c Father  getSnapshotBeforeUpdate`, `color: #f00`)
        return ''
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`%c Father shouldComponentUpdate`, `color: #f00`)
        return true
    }

    componentDidUpdate() {
        console.log(`%c Father componentDidUpdate`, `color: #f00`)
    }

    componentDidMount() {
        console.log(`%c Father componentDidMount`, `color: #f00`)
    }

    componentWillUnmount() {
        console.group(`%c Father 销毁阶段`, `color: #0a0`)
        console.log(`%c Father componentWillUnmount`, `color: #f00`)
    }

    updateCount = () => {
        this.setState({
            count: ++this.state.count
        })
        console.group(`%c Father 更新阶段`, `color: #0a0`)
    }

    render() {
        console.log(`%c Father render`, `color: #f00`)
        return <div>
            <div id='Father'>
                <h1>Father 组件 Count: {this.state.count}</h1>
                <Son></Son>
                <Button onClick={this.updateCount}>更新</Button>
            </div>
        </div>
    }
}

export default Father;
