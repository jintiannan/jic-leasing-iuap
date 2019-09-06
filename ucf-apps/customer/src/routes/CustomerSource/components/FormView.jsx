import React, {Component} from 'react';
import {
    Form,
    Icon,
    Button,
    Label,
    Switch,
    Checkbox,
    DatePicker,
    Radio,
    Select,
    Col,
    Row,
    FormControl,
    Collapse
} from 'tinper-bee';
import {actions} from 'mirrorx';
import {SelectField} from 'components/RowField/SelectField'


import './index.less';

class FormView extends Component {
    constructor(props) {
        super(props);

    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //绑定子组件
    onFromRef = (ref) => {
        this.child = ref;
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Form.createForm()(FormView);
