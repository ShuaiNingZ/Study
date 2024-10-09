import React, {Component} from 'react';
import {useParams} from "react-router-dom";

/*class UserCustom extends Component {
    params = useParams();

    render() {
        return (
            <div>
                <h2>自定义: {this.params.teamId}</h2>
            </div>
        );
    }
}

export default UserCustom;*/


const UserCustom = () => {
    let params = useParams();

    return (
        <div>
            <h2>自定义: {params.teamId}</h2>;
        </div>
    );
}

export default UserCustom;
