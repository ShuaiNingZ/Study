import React, {Component} from "react";

import Father from "../components/createContext传参/Father.jsx";

import {loginContext} from "./loginContext.js";

const Login = class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'grandFather 数据'
        }
    }

    updateMsg = (data) => {
        this.setState({
            msg: data
        })
    }

    render() {
        return <loginContext.Provider value={{
            msg: this.state.msg,
            updateMsg: this.updateMsg
        }}>
            <div>
                登录页面 Login
                <Father></Father>
            </div>
        </loginContext.Provider>
    }
}

export default Login;