import React, { useState, useEffect } from 'react';
import { Row, Card, Divider, Modal, Button, Tag } from 'antd';
import { withTranslation, Router } from '../../i18n';
import { Typography } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { priceInVn } from '../../helpers/helpers';
import OrderStatus from '../OrderStatus';
import { detailBooking } from '../../requests/stay';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StayOrderItem = (props) => {
    var { t, order, onClickReview } = props;
    const [showHostInfo, setShowHostInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState(null);
    const [isReviewed, setIsReviewed] = useState(false);

    useEffect(() => {
        setIsReviewed(order.is_reviewed);
    }, [order])

    const onGetDetail = () => {
        if (detail == null) {
            setLoading(true);
            detailBooking(order.id).then(data => {
                setDetail(data);
                setShowHostInfo(true);
                setLoading(false);
            })
        }
        else {
            setShowHostInfo(true);
        }
    }

    return (
        <Card className={`mb-4 hover-highlight ${order.status == "ORDER_CANCELLED" || order.status == "ORDER_EXPIRED" ? 'card-cancel' : ''}`}>
            <Modal
                title={t('contact_host')}
                centered
                visible={showHostInfo}
                onOk={() => { setShowHostInfo(false) }}
                onCancel={() => { setShowHostInfo(false) }}
                footer={[
                    <Button type="primary" onClick={() => setShowHostInfo(false)}>
                        {t('close')}
                    </Button>
                ]}
            >
                <p><span className="text-bold mr-2">{t('name')}: </span> <span>{detail ? `${detail.host_firstname} ${detail.host_lastname}` : ''}</span></p>
                <p><span className="text-bold mr-2">{t('phone')}: </span> <span>{detail ? detail.host_mobile : ''}</span></p>
                <p><span className="text-bold mr-2">Email: </span> <span>{detail ? detail.host_email : ''}</span></p>
            </Modal>
            <Row
                align="top"
                justify="space-between"
                className="pointer"
                onClick={() => Router.push({ pathname: `/orders/stay/${order.id}`, query: {} }, undefined, { shallow: true })}
            >
                <div>
                    <Title level={5}>
                        <span className="mr-2">{order.room_title}</span>
                    </Title>
                    <div>
                        <span className="flight-date mr-2">{order.room_type}</span>
                        <span className="mr-2">|</span>
                        <span className="mr-2">{order.room_location}</span>
                    </div>
                </div>
                <div>
                    <span className="d-block checkin_info_booking mb-2">{`${t('Checkin')}:  ${moment(order.depart).format('ddd, DD/MM/YYYY')}`}</span>
                    <span className="d-block checkout_info_booking">{`${t('Checkout')}:  ${moment(order.return_date).format('ddd, DD/MM/YYYY')}`}</span>
                </div>
            </Row>
            <Row align="top" justify="space-between" className="mt-4">
                <div>
                    <div><span>{t('order_number')}: </span><b>{order.order_number}</b></div>
                    {order.status == "ORDER_CONFIRMED" && <div className="mt-2">
                        <span className="text-color-primary pointer" onClick={onGetDetail}>{t('host_info')}</span>
                        {loading && <span className="ml-2"><LoadingOutlined /></span>}
                    </div>}
                </div>
                <div>
                    <Title level={5} className="mb-0 ">{priceInVn(order.price_info.payment)}</Title>
                    {parseInt(order.qty_room) > 1 && <span className="ml-2"> {`(${order.qty_room} ${t('room')})`} </span>}
                </div>
            </Row>
            <div>
                {
                    order.status == 'ORDER_COMPLETED' ? (
                        <React.Fragment>
                            {
                                isReviewed ? (
                                    <Tag color="orange" className="mr-1">{t('reviewed')}</Tag>
                                ) : (
                                    <Button type="link" className="p-0" size="small" onClick={() => onClickReview()}>{t('review')}</Button>
                                )
                            }
                        </React.Fragment>
                    ) : null
                }
            </div>
            <Divider className="mt-2 mb-2" />
            <Row align="middle" justify="space-between">
                <div>
                    <div><span>{t('order_created_at')}: </span><span className="flight-date">{moment(order.created_at).format('dd, lll')}</span></div>
                </div>
                <div>
                    <OrderStatus
                        order={order}
                    />
                </div>
            </Row>
        </Card>
    )
}

export default withTranslation('stayList')(StayOrderItem);