import React, {Component} from 'react';
import {Input, Button} from 'antd'

class IInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueId: '',
            value: ''
        }
    }

    inputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    inputNewAdd = (e) => {
        if (this.state.value && !this.state.valueId) {
            this.props.inputNewAdd({
                id: Math.random(),
                name: this.state.value
            })
        }
    }

    changeInpVal = (e) => {
        if (this.state.value && this.state.valueId) {
            this.props.changeInpVal({
                id: this.state.valueId,
                name: this.state.value
            })
        }
    }

    fillInp = (data) => {
        this.setState({
            valueId: data.id,
            value: data.name
        })
    }

    clearInp = () => {
        this.setState({
            valueId: '',
            value: ''
        })
    }

    componentDidMount() {
        this.state.value = this.props.defaultInpVal
    }

    render() {
        // this.setState({
        //     value: this.props.defaultInpVal
        // })
        return <div>
            <Input value={this.state.value} onChange={this.inputChange}></Input>
            <Button type='primary'
                    onClick={this.inputNewAdd}
            >新增</Button>
            <Button type='primary'
                    onClick={this.changeInpVal}
            >修改</Button>
        </div>
    }
}

export default IInput;