import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
// import { getAll } from '../../../actions/widgets';
import OurPakageItem from './OurPakageWidgetItem';

class OurPakageWidget extends Component {

    static propTypes = {
        itemPerRow: PropTypes.number
    }

    static defaultProps = {
        itemPerRow: 4
    };

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        getAll("HOT_DEAL").then(res => this.setState({
            list: res.list
        }))
    }

    show(data) {
        if (data && data.length) {
            const col = Math.floor(24 / this.props.itemPerRow);
            return data.map(item => {
                return (
                    <Col sm={col} key={item.id}>
                        <OurPakageItem
                            data={item}
                        />
                    </Col>
                )
            })
        }
        else return null;
    }

    render() {
        return (
            <React.Fragment>
                {/* Our packages */}
                <Row gutter={[16, 16]}>
                    {this.show(this.state.list)}
                </Row>
            </React.Fragment>
        )
    }
}

export default OurPakageWidget;

