import React, { Component } from 'react';
import { Col, Row } from 'tinper-bee';
import './index.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        const {title } = this.props;
        return (
            <Row className={'title'}>
                <Col xs={12}>
                    <span className="main-title">
                        {title}
                    </span>
                </Col>
            </Row>
        )
    }
}
export default Header;
