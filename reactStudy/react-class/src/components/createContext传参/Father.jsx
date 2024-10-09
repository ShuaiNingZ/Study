import React, {Component} from "react";
import Son from "./Son.jsx";

class Father extends Component {
    render() {
        return <div>
            <h2>Father 组件</h2>
            <Son></Son>
        </div>
    }
}

export default Father;