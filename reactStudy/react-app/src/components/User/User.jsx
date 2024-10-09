import React, {Component} from 'react';
import {Link} from "react-router-dom";

class User extends Component {
    render() {
        return (
            <div>
                <h2>这是 user 用户页面</h2>
                <Link to='/user/user1'>User1</Link>
                <Link to='/user/2'>User2</Link>
                <Link to='/user/3'>User3</Link>
            </div>
        );
    }
}

export default User;