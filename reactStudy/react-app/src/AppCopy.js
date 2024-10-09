import './App.css';
import {
    Routes,
    Route,
    Link,
    NavLink
} from 'react-router-dom'

import Home from "./components/Home";
import News from "./components/News";
import User from "./components/User/User";
import User1 from "./components/User/User1";
import UserCustom from "./components/User/UserCustom";
import Not404 from "./components/Not404";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Link to='/'>Home</Link>
                <Link to='/news'>News</Link>
                <NavLink to='/news'>News</NavLink>
                <NavLink to='/user'>User</NavLink>
                <hr/>
                {/*可以让根组件 挂在不同的其他组件*/}
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/user'>
                        <Route path=':teamId' element={<UserCustom/>}></Route>
                        <Route path='user1' element={<User1/>}></Route>
                        <Route index element={<User/>}></Route>
                    </Route>
                    <Route path='*' element={<Not404/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
