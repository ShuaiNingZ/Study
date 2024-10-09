// import {lazy} from 'react';
// const HOME = lazy(() => import(/* webpackChunkName: "HOME" */"../view/home.jsx"));
// const HOME = "../view/home.jsx"
import LAYOUT from "../layout/layout.jsx";

import HOME from '../view/home.jsx'
import LOGIN from '../view/login.jsx'
import USER from "../view/user.jsx";
import LIFECYCLE from "../view/生命周期函数执行/Father.jsx";
import FATHERLIFECYCLE from "../view/父子组件生命周期执行/Father.jsx";

export {
    LAYOUT,
    HOME,
    LOGIN,
    USER,
    LIFECYCLE,
    FATHERLIFECYCLE
}