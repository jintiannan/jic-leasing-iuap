/**
*
* @title 结合切换事件的 Step
* @description 点击next，Step的流程跟进
*
*/
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form,Icon, Label, Col, Row, FormControl } from 'tinper-bee';
import {actions} from 'mirrorx';
const FormItem = Form.FormItem;

import './index.less';
 
const Steps = Step.Steps;

class AddFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      // showModal: false,
      modalDropup: true,
      modalSize: ''
    };
    this.close = this.close.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeDropup = this.changeDropup.bind(this);

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

    next() {
      const current = this.state.current + 1;
      this.setState({ current });
    }
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }

    alertDone() {
      Message.create({content: '完成', color: 'successlight'});
  
    }
    close() {
      actions.projectApprovalNew.updateState({showModal : false});
    }

  changeDropup(state) {
      this.setState({
          modalDropup: state
      });
  }
  changeSize(size) {
    this.setState({
        modalSize: size
    });
  }

  render() {
    const { current } = this.state;

    return (
      <div>
       
        <Modal
                    className="demo4-modal"
                    show={ this.props.showModal }
                    backdrop="static" //关闭遮罩事件
                    size="xlg" //大号模态框
                    onHide={ this.close }>
                    <Modal.Header closeButton>
                        <Modal.Title > { this.props.addTitle } </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >

        <Steps current={current}>
          {this.props.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        
        <div className="steps-content">
          {this.props.steps[this.state.current].content}
        </div>
        <div className="steps-action">
          {
            this.state.current > 0
            &&
            <Button bordered style={{ marginRight: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
          {
            this.state.current < this.props.steps.length - 1
            &&
            <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === this.props.steps.length - 1
            &&
            <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.alertDone()}>完成</Button>
          }{
            <Button colors="secondary" onClick={ () => this.close() }> 关闭 </Button>
          }
        </div>

                    </Modal.Body>
                    {/* <Modal.Footer>
                        
                    </Modal.Footer> */}
                </Modal>
      </div>
    );
  }
}
export default Form.createForm()(AddFormView);