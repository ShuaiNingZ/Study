import {PlusOutlined} from '@ant-design/icons';
import {Divider, Input, Select, Space, Typography} from 'antd';
import React, {useState} from 'react';

const {Option} = Select;
let index = 0;

class AntSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: 'jack',
                    status: false
                },
                {
                    id: 2,
                    name: 'lucy',
                    status: false
                }
            ],
            name: '',
            selectVal: [],
            status: true,
            isRmove: false
        }
    }

    onNameFocus = (event) => {
        this.setState({
            status: false
        })
    }

    onNameBlur = (event) => {
        this.setState({
            status: true
        })
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    addItem = (e) => {
        e.preventDefault();
        this.setState({
            items: [...this.state.items, this.state.name || `New item ${index++}`],
            name: ''
        })
    };

    clickOption = (e) => {
        e.stopPropagation();
        console.log(e);
    }

    changeSelect = (val, options) => {
        console.log('changeSelect---------', val, options)
        this.state.items.forEach(item => {
            if (item.status) {

            } else {
                this.state.selectVal.push(item);
                /*this.setState({
                    selectVal: [...this.state.selectVal]
                });*/
            }
        })
        /*options.forEach(item => {
            console.log(item.status)
            if (item.status) {

            } else {
                this.state.selectVal.push(...val)
                this.setState({
                    selectVal: [...new Set(this.state.selectVal)]
                })
            }
        })*/
    }

    clearSelect = (val) => {
        console.log('clearSelect---------', val)
        this.setState({
            isRmove: true
        })
        if (this.state.status) {
            this.state.selectVal.filter(item => {
                console.log(val)
                return item !== val
            })
            this.setState({
                selectVal: this.state.selectVal.filter(item => item !== val)
            })
        }
    }

    render() {
        return (
            <div onMouseDown={(e) => {
                e.preventDefault();
                return false;
            }}>
                <Select
                    style={{
                        width: 300,
                    }}
                    value={this.state.selectVal}
                    onChange={this.changeSelect}
                    onDeselect={this.clearSelect}
                    mode="multiple"
                    placeholder="custom dropdown render"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider
                                style={{
                                    margin: '8px 0',
                                }}
                            />
                            <Space
                                align="center"
                                style={{
                                    padding: '0 8px 4px',
                                }}
                            >
                                <Input placeholder="Please enter item" value={this.state.name}
                                       onFocus={this.onNameFocus}
                                       onBlur={this.onNameBlur}
                                       onChange={this.onNameChange}/>
                                <Typography.Link
                                    onClick={this.addItem}
                                    style={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <PlusOutlined/> Add item
                                </Typography.Link>
                            </Space>
                        </>
                    )}
                >
                    {this.state.items.map((item) => (
                        <Option key={item.id} status={false} onClick={this.clickOption}>{item.name}</Option>
                    ))}
                </Select>
            </div>
        );
    }
}

export default AntSelect;