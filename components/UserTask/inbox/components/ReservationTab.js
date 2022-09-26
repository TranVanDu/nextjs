import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import { LoadingOutlined, HomeOutlined, CarOutlined } from "@ant-design/icons";
import moment from 'moment';
import OrderStatus from '../../../OrderStatus';

function ReservationTab(props) {
    const { firstLoading, listBookingConversation, config, itemActive, setItemActive, t } = props;
    return (
        <React.Fragment>
            {firstLoading ?
                <Row align="center">
                    <LoadingOutlined />
                </Row>
                : <List
                    dataSource={listBookingConversation}
                    renderItem={item => {
                        let lastMessage = '';
                        if (item.last_message) {
                            if (item.last_message.content.length > 20) {
                                lastMessage = item.last_message.content.slice(0, 17) + '...';
                            }
                            else {
                                lastMessage = item.last_message.content;
                            }
                        }

                        let setDate = () => {
                            var last_message = item && item.last_message || ""
                            if (!last_message) return "";
                            let { created_at } = last_message;
                            if (!created_at) return "";
                            var m = moment.utc(created_at); // parse input as UTC
                            moment.updateLocale("en", {
                                relativeTime: {
                                    future: "in %s",
                                    past: "%s ago",
                                    s: "now",
                                    ss: "%ss",
                                    m: "a min",
                                    mm: "%dm",
                                    h: "1h",
                                    hh: "%dh",
                                    d: "a day",
                                    dd: "%dd",
                                    M: "month",
                                    MM: "%dM",
                                    y: "year",
                                    yy: "%dY"
                                }
                            })
                            if (m.clone().local().format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {

                                return m.clone().local().fromNow(true);
                            }
                            else return m.clone().local().format("DD/MM/YYYY, HH:mm")
                        }

                        return (
                            <Row className="revervation-list">
                                <Col xs={0} md={24} lg={24} sm={0}>
                                    <List.Item key={item.id} onClick={() => setItemActive(item)} className={itemActive && itemActive.id == item.id ? 'inbox-item-selected' : ''}>
                                        <List.Item.Meta
                                            className="pointer"
                                            avatar={
                                                <Avatar src={item.partner[0].partner_avatar ? `${config.url_asset_root}${item.partner[0].partner_avatar}` : `${config.url_asset_root}backup.png`} />
                                            }
                                            title={<div>
                                                <div className={itemActive && itemActive.id == item.id ? 'text-color-primary reservation-user' : 'reservation-user'}><div>{`${item.partner[0].partner_firstname} ${item.partner[0].partner_lastname}`}</div> 
                                                <div className="ml-1 d-flex align-self-center">{item.info.type == "STAY" ? <HomeOutlined /> : <CarOutlined />}</div></div>
                                                {item.info && <div className="reser-od-number"><span>{`${t("order_number")}: ${item.info.order_number}`}</span></div>}
                                                <OrderStatus 
                                                    // status={item.info.status}
                                                    // payStatus={item.info.pay_status}
                                                    // createdAt={item.info.created_at}
                                                    // orderNumber={item.info.order_number}
                                                    order={item}
                                                    align="left"
                                                    showLinkPayment={false}
                                                />
                                            </div>}
                                            description={<div>
                                                <div><span className="text-bold">{lastMessage}</span></div>
                                                <div className="text-right"> <i><span className="text-12 mr-2">{setDate()}</span></i></div>
                                            </div>}
                                        />

                                    </List.Item>
                                </Col>
                                <Col xs={24} md={0} lg={0} sm={24}>
                                    <List.Item key={item.id} onClick={() => setItemActive(item)} className={itemActive && itemActive.id == item.id ? 'inbox-item-selected pointer' : 'pointer'}>
                                        <Avatar src={item.partner[0].partner_avatar ? `${config.url_asset_root}${item.partner[0].partner_avatar}` : `${config.url_asset_root}backup.png`} size="large" />
                                        <div className={itemActive && itemActive.id == item.id ? 'text-color-primary mr-2 text-left' : 'mr-2 text-left'}>{`${item.partner[0].partner_firstname} ${item.partner[0].partner_lastname}`}</div>
                                        {item.info && <div><span>{`#${item.info.order_number}`}</span></div>}
                                    </List.Item>
                                </Col>
                            </Row>
                        )
                    }
                    }
                    pagination={{
                        pageSize: 6,
                        size: "small",
                    }}
                />}
        </React.Fragment>
    )
}

export default ReservationTab;