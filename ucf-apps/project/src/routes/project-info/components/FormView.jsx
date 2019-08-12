import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
const FormItem = Form.FormItem;
import './index.less';
import FormSplitHeader from 'components/FormSplitHeader'

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            open:true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    mainForm = [
        {}

    ]


    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let { formObj } = this.props;
        return (
            <div className='form'>
                <FormSplitHeader title={'主表信息'} />
                <Form>
                    <Collapse in={this.state.open}>
                        <div>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            会议期数
                                        </Label>
                                        <FormControl
                                            {
                                            ...getFieldProps('meetingnper', {
                                                initialValue: '',
                                                rules: [{
                                                    required: true,
                                                }],
                                            })
                                            }
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                            <FormItem>
                                <Button shape="border" className="reset">取消</Button>
                                <Button colors="primary" className="login" onClick={this.submit}>提交</Button>
                            </FormItem>                                        
                            </Row>
                        </div>
                    </Collapse>
                </Form>
            </div>

        );
    }
}

export default Form.createForm()(FormView);