import {
    HOME,
    LOGIN,
    USER
} from "./routesCom.js";

const routes = [
    {
        title: '首页',
        path: '/home',
        component: HOME
    },
    {
        title: '登录',
        path: '/login',
        component: LOGIN
    },
    {
        title: '用户',
        path: '/user',
        component: USER
    }
]

export default routes;