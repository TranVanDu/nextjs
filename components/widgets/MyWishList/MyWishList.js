import React, { Component } from 'react';
import Link from 'next/link';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import Router from 'next/router';
import Truncate from 'react-truncate';


class MyWishList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            truncated: false
        };

        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    toggleLines(event) {
        event.preventDefault();

        this.setState({
            expanded: !this.state.expanded
        });
    }


    setTitle(title) {
        if (title && title.length) {
            return (
                <Truncate lines={2}>{title}</Truncate>
            )
        }
        return "";
    }
    redirectToDetail = (item) => () => {
        var { type } = item;
        if (type == 0) { return Router.push({ pathname: "/tour_detail/[alias]/[id]", query: { alias: item.alias, id: item.id } }, `/tour_detail/${item.alias}/${item.id}`); }
        if (type == 1) { return Router.push({ pathname: "/attraction/[alias]/[id]", query: { alias: item.alias, id: item.id } }, `/attraction/${item.alias}/${item.id}`); }
        if (type == 2) { return Router.push({ pathname: "/city_escape/[alias]/[id]", query: { alias: item.alias, id: item.id } }, `/city_escape/${item.alias}/${item.id}`); }
    }
    render() {
        const item = this.props.data;


        return (
            <React.Fragment>


                <div className="things-todo wishlist-best" style={{ cursor: "pointer" }} onClick={this.redirectToDetail(item)}>
                    <img src={item.thumb} alt={item.title} width="100%" />
                    <div className="things-content">
                        <div className="deal-title" title={item.title}>{this.setTitle(item.title)}</div>
                        <Row className="deals-price">
                            <Col span={12}>
                                <span>From <span className="price">${item.min_price ? item.min_price : item.price}</span></span>
                            </Col>
                            <Col span={12} className="text-right">
                                <Link href={ item.type === 0? `/tour_detail/${item.alias}/${item.id}`: item.type ===1 ?`/attraction/${item.alias}/${item.id}`:`/city_escape/${item.alias}/${item.id}`}>
                                    <a className="details">
                                        Details
                                        </a>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    {
                        item.featured ?
                            <React.Fragment>

                                <div className="best-package best-wishlist">
                                    <StarFilled className="star" />
                                    <span className="best-text">Best Package</span>
                                </div>

                            </React.Fragment>
                            : null
                    }
                </div>

                <div className="text-center">
                    <div className="wishlist-remove">
                        <a className="btn-remove-wishlist" onClick={() => this.props.delete(item.id)}>
                            <HeartFilled />
                            <span>Remove from Wishlist</span>
                        </a>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MyWishList;


