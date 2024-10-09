import React, {Component, createRef} from 'react';
import IInput from "../components/input.jsx";
import ListItem from "../components/listItem.jsx";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputRef: createRef(),
            activeVal: {},
            defaultInpVal: '4545666',
            listArr: [
                {
                    id: 1,
                    name: '哈哈哈'
                }
            ]
        }
    }

    inputNewAdd = data => {
        this.state.listArr.push(data);
        this.setState({
            listArr: this.state.listArr
        })
        this.state.inputRef.current.clearInp()
    };

    clickName = data => {
        this.setState({
            activeVal: data
        })
        this.state.inputRef.current.fillInp(data)
    }

    changeInpVal = data => {
        const listArr = this.state.listArr;
        const i = listArr.findIndex(item => item.id === data.id);
        listArr.splice(i, 1, data);
        this.setState({
            listArr: listArr
        })
        this.state.inputRef.current.clearInp()
    }

    removeListItem = info => {
        const listArr = this.state.listArr;
        const i = listArr.findIndex(item => item.id === info.id);
        listArr.splice(i, 1);
        this.setState({
            listArr: listArr
        })
    }

    render() {
        return <div>
            {this.state.listArr.map(item => {
                return <ListItem
                    info={item}
                    key={item.id}
                    activeVal={this.state.activeVal}
                    clickName={this.clickName}
                    removeListItem={this.removeListItem}
                ></ListItem>
            })}
            <IInput ref={this.state.inputRef}
                    defaultInpVal={this.state.defaultInpVal}
                    inputNewAdd={this.inputNewAdd}
                    changeInpVal={this.changeInpVal}
            ></IInput>
        </div>
    }
}

export default Home;