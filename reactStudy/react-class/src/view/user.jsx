import React, {Component} from 'react';
import UserChildren from "../components/children传参/children.jsx";

class User extends Component {
    render() {
        return <div>
            用户页面 user
            <UserChildren>
                <div>方式一</div>
            </UserChildren>
            <UserChildren children={<div>方式二</div>}></UserChildren>
        </div>
    }
}

export default User;