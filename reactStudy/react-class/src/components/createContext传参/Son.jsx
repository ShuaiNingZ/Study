import React, {Component} from "react";

import {loginContext} from "../../view/loginContext.js";

class Son extends Component {
    static contextType = loginContext

    constructor(props) {
        super(props);
        this.state = {}
    }

    clickMsg = () => {
        this.context.updateMsg('修改 grandFather')
    }

    componentDidMount() {
        /*this.context.setState({
            msg: '修改 grandFather'
        })*/
    }

    render() {
        return <div>
            <h3>Son 组件</h3>
            <h4 onClick={this.clickMsg}>{this.context.msg}</h4>
        </div>
    }

    /*render() {
        return <loginContext.Consumer>
            {
                value => {
                    return <div>
                        <h3>Son 组件</h3>
                        <h4>{value}</h4>
                    </div>
                }
            }
        </loginContext.Consumer>
    }*/
}

export default Son;