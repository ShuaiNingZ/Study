import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom'
import {Button} from 'antd';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }

    getNum = () => {
        this.setState({
            num: 1
        })
    }

    componentDidMount() {
        this.getNum()
    }

    render() {
        return (
            <div>
                <h2>这是新闻 news 页面 {this.state.num}</h2>
            </div>
        );
    }
}

export default News;