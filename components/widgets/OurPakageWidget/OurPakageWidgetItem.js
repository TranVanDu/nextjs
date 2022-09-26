import React, { Component } from 'react';
import Router from 'next/router';
import { StarFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import Truncate from 'react-truncate';


class OurPakageItem extends Component {


    setTitle(title) {
        if (title && title.length) {
            return (
                <Truncate lines={2}>{title}</Truncate>
            )
        }
        return "";
    }

    redirectToDetail = (item) => () => {
        Router.push({ pathname: "/tour_detail/[alias]/[id]", query: { alias: item.alias, id: item.id } }, `/tour_detail/${item.alias}/${item.id}`)
    }

    render() {
        const item = this.props.data;
        return (
            <React.Fragment>
                <div className="things-todo" style={{ cursor: "pointer" }} onClick={this.redirectToDetail(item)}>
                    <img src={item.thumb} alt={item.title} width="100%" />
                    <div className="things-content">
                        <div className="deal-title">{this.setTitle(item.title)}</div>
                        <Row className="deals-price">
                            <Col sm={12}>
                                <span>From <span className="price">${item.min_price}</span></span>
                            </Col>
                            <Col sm={12} className="text-right">
                                <div className="details">
                                    Details
                                        </div>
                            </Col>
                        </Row>
                    </div>
                    {item.featured ?
                    <div className="best-package" onClick={this.redirectToDetail(item)}>
                        <StarFilled className="star" />
                        <span className="best-text">Best Package</span>
                    </div>
                    : null}
                </div>
                
            </React.Fragment>
        );
    }
}

export default OurPakageItem;

