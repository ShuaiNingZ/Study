import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {LAYOUT} from "./routesCom.js";

const RoutersConfig = () => {
    return (<BrowserRouter>
        <Switch>
            <Route path="/" component={LAYOUT}></Route>
            {/*{routes.map((route, i) => {
                    document.title = route.title || '';
                    return (<Route exact={route.exact} path={route.path} component={route.component} key={i}></Route>)
                })}*/}
        </Switch>
    </BrowserRouter>)
}

export default RoutersConfig