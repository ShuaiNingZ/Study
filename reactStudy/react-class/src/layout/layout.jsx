import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
// import routes from "../router/routes.js";
import {Button} from 'antd'
import {HOME, USER, LOGIN, LIFECYCLE, FATHERLIFECYCLE} from "../router/routesCom.js";

class Layout extends Component {
    clickHome = () => {
        this.props.history.push('/layout/home');
    }
    clickUser = () => {
        this.props.history.push('/layout/user');
    }
    clickLogin = () => {
        this.props.history.push('/layout/login');
    }
    lifecycle = () => {
        this.props.history.push('/layout/lifecycle');
    }
    fatherlifecycle = () => {
        this.props.history.push('/layout/fatherlifecycle');
    }

    render() {
        return <div>
            <Button
                type="primary"
                block
                onClick={this.clickHome}
            >
                首页
            </Button>
            <Button
                type="primary"
                block
                onClick={this.clickUser}
            >
                用户页面
            </Button>
            <Button
                type="primary"
                block
                onClick={this.clickLogin}
            >
                登录页面
            </Button>
            <Button
                type="primary"
                block
                onClick={this.lifecycle}
            >
                生命周期函数
            </Button>
            <Button
                type="primary"
                block
                onClick={this.fatherlifecycle}
            >
                父子生命周期函数
            </Button>
            <div>
                <Redirect from="/" to="/layout/home"></Redirect>
                {/*{routes.map((route, i) => {
                    document.title = route.title || '';
                    console.log(route)
                    return (<Route path={route.path}
                            component={route.component}
                        ></Route>)
                })}*/}
                <Route path="/layout/home"
                       component={HOME}
                ></Route>
                <Route path="/layout/user"
                       component={USER}
                ></Route>
                <Route path="/layout/login"
                       component={LOGIN}
                >
                </Route>
                <Route path="/layout/lifecycle"
                       component={LIFECYCLE}
                ></Route>
                <Route path="/layout/fatherlifecycle"
                       component={FATHERLIFECYCLE}
                ></Route>
            </div>
        </div>
    }

    /*render() {
        return <div>
            {routes.map((route, i) => {
                document.title = route.title || '';
                return (<Route exact={route.exact} path={route.path} component={route.component} key={i}></Route>)
            })}
        </div>
    }*/
}

export default Layout;