import React, {Component} from 'react';
import {Button} from 'antd'

import ListItemStyle from './listItem.m.less'

console.log(ListItemStyle)

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    clickName = () => {
        if (this.props.activeVal === this.props.info) {
            this.props.clickName({id: '', name: ''})
        } else {
            this.props.clickName(this.props.info)
        }
    }

    removeListItem = () => {
        this.props.removeListItem(this.props.info)
    }

    componentDidMount() {

    }

    render() {
        return <div className={ListItemStyle.ListItem}>
            <div
                className={[ListItemStyle.itemName, this.props.activeVal === this.props.info ? ListItemStyle.active : ''].join(' ')}
                onClick={this.clickName}
            >
                {this.props.info.name}
            </div>
            <div className={ListItemStyle.itemBtn}>
                <Button type='primary'
                        onClick={this.removeListItem}
                >删除</Button>
            </div>
        </div>
    }
}

export default ListItem;