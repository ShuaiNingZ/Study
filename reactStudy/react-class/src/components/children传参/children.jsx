import React, {Component} from "react";

class UserChildren extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1>children 字段传参</h1>
            <h2>{this.props.children}</h2>
        </div>
    }
}

export default UserChildren;