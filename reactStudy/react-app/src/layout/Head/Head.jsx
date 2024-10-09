import React, {Component} from "react";
import AntSelect from "./antSelect";

class Head extends Component {
    render() {
        return (
            <div>
                <h2>head 组件</h2>
                <h3>通过 rcc + tab 快捷键生成 react 模板</h3>
                <AntSelect></AntSelect>
            </div>
        )
    }
}

export default Head;