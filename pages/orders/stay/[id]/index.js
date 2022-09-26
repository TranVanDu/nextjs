import React, { useState, useEffect } from 'react';
import { i18n, withTranslation, Router } from '../../../../i18n';
import { useRouter } from 'next/router'
import { AppLayout } from '../../../../layout';
import { Card, Divider, Modal, Row, Col, Typography, Descriptions, Skeleton, Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { generateAirline, convertTime, convertClassOfFlightBooking, priceInVn } from '../../../../helpers/helpers';
import moment from 'moment';
import OrderStatus from '../../../../components/OrderStatus';
// requests
import { detailBooking, exportReceipt } from '../../../../requests/stay';
import { cancelBooking, getPolicyCancel } from '../../../../requests/order';
import { LoadingOutlined, ExclamationCircleOutlined, EnvironmentOutlined, UsergroupAddOutlined, FilePdfOutlined } from '@ant-design/icons';
import Responsive, { useMediaQuery } from "react-responsive";
import { PRIMARY_COLOR } from '../../../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { confirm } = Modal;
const { Title } = Typography;

const StayOrderDetail = (props) => {
    const { t } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [disableCancel, setDisableCancel] = useState(true);
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 })
    const user = useSelector(state => state.auth.user);
    let lang = user ? user.lang : 'VI';

    useEffect(() => {
        async function getData() {
            var order = await detailBooking(router.query.id);
            if (order) {
                setOrder(order);
                setLoading(false);
            }
        }
        getData();
        getPolicyCancel(router.query.id).then(res => {
            setDisableCancel(!res.status)
        })
    }, []);

    const onNavigateDetail = (id) => {
        Router.push({
            pathname: `/stay/${id}`, query: {
                checkin: null,
                checkout: null,
                guest: 1,
                children: 0
            }
        }, undefined, { shallow: true });
    }

    const handleCancelBooking = () => {
        if (!loadingCancel) {
            setLoadingCancel(true);
            getPolicyCancel(router.query.id).then(response => {
                setLoadingCancel(false);
                if (response.status === 1) {
                    // can cancel booking
                    if (order && order.status == "ORDER_CONFIRMED") {
                        confirm({
                            title: t('cancel_policy'),
                            icon: <ExclamationCircleOutlined />,
                            content: `Bạn sẽ được hoàn ${priceInVn(response.amount)} theo chính sách huỷ phòng của chủ căn hộ. Bạn chắc chắn muốn huỷ đơn hàng này?`,
                            onOk() {
                                cancelBooking(router.query.id).then(res => {
                                    setLoadingCancel(true);
                                    detailBooking(router.query.id).then(res => {
                                        setOrder(res);
                                        setLoadingCancel(false);
                                    })
                                });
                            },
                            onCancel() {
                                // console.log('Cancel');
                            },
                        });
                    }
                    else {
                        confirm({
                            title: t('cancel_policy'),
                            icon: <ExclamationCircleOutlined />,
                            content: t('confirm_cancel_booking'),
                            onOk() {
                                cancelBooking(router.query.id).then(res => {
                                    setLoadingCancel(true);
                                    detailBooking(router.query.id).then(res => {
                                        setOrder(res);
                                        setLoadingCancel(false);
                                    })
                                });
                            },
                            onCancel() {
                                // console.log('Cancel');
                            },
                        });
                    }
                }
                else {
                    // can not cancel booking
                    Modal.warning({
                        title: t('cancel_policy'),
                        content: t('cannot_cancel_booking'),
                    });
                }
            })
        }
    }

    return (
        <AppLayout
            title={t('stay_order_detail')}
        >
            <div className="gray-background">
                <div className="container">
                    {
                        loading ? (
                            <Card className="mb-4">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Card>
                        ) : (<React.Fragment>
                            <Card className="mb-4">
                                <Row align="middle" justify="space-between">
                                    <div>
                                        <Title level={4}>{t('order')}: #{order.order_number}</Title>
                                        <div>
                                            <span className="mr-2">{t('order_created_at')}:</span><span>{moment(order.created_at).format('dd, lll')}</span>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            {!disableCancel && order && order.status !== 'ORDER_CANCELLED' && <span className="pointer text-xs text-color-primary" onClick={handleCancelBooking}>{t('cancel_booking')}</span>}
                                            {loadingCancel && <span className="ml-2"><LoadingOutlined /></span>}
                                        </div>
                                    </div>
                                    <div>
                                        <OrderStatus
                                            // status={order.status}
                                            // payStatus={order.pay_status}
                                            // createdAt={order.created_at}
                                            // orderNumber={order.order_number}
                                            order={order}
                                            size="large"
                                        />

                                    </div>
                                </Row>
                            </Card>


                            <Card>
                                <Row align="top" justify="space-between">
                                    <div >
                                        <Title level={5}>
                                            <span className="mr-2 pointer" onClick={() => { onNavigateDetail(order.object_id) }}>{order.room_title}</span>
                                        </Title>
                                        <div>
                                            <span style={{ display: "inline-flex" }}><EnvironmentOutlined style={{ fontSize: "14px" }} /></span>
                                            <span className="flight-date mr-2 ml-2">{order.room_type}</span>
                                            <span className="mr-2">|</span>
                                            <span className="mr-2">{`${order.room_home_number}, ${order.room_street}, ${order.room_location}`}</span>
                                            <span className="text-color-primary pointer ml-1" onClick={() => {
                                                window.open(`https://maps.google.com/?q=${order.room_latitude},${order.room_longitude}`, '_blank')
                                            }}>
                                                {t('see_on_mapp')}
                                            </span>
                                        </div>
                                        <div className="mt-1">
                                            <span style={{ display: "inline-flex" }}><UsergroupAddOutlined style={{ fontSize: "17px" }} /></span>
                                            <span className="flight-date mr-2 ml-2">{`${order.adults} ${t('adult')} ${order.children ? ` ${order.children}` : ''}`}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="d-block checkin_info_booking mb-2">{`${t('Checkin')}:  14:00 ${moment(order.depart).format('ddd, DD/MM/YYYY')}`}</span>
                                        <span className="d-block checkout_info_booking">{`${t('Checkout')}:  12:00 ${moment(order.return_date).format('ddd, DD/MM/YYYY')}`}</span>
                                    </div>
                                </Row>

                                <Title level={5} className="mt-2 d-block">
                                    {`${t('cancel_policy')}`}
                                </Title>
                                <div>
                                    {lang == "VI" ? order.room_cancel_policy : order.room_cancel_policy_en}
                                </div>
                                {order.notes && <React.Fragment>
                                    <Title level={5} className="mt-2 d-block">
                                        {`${t('note')}`}
                                    </Title>
                                    <div>
                                        {order.notes}
                                    </div></React.Fragment>}


                                <Row gutter={16} className="mt-4">
                                    <Col md={16} sm={24}>
                                        <Title level={4}>{t('booked_info')}</Title>
                                        <Card className="mb-4">
                                            {
                                                loading ? (
                                                    <Skeleton active paragraph={{ rows: 2 }} />
                                                ) : (
                                                    <Descriptions column={isDesktopOrLaptop ? 2 : 1}>
                                                        <Descriptions.Item label={t('name')}>{order.customer_info.name_id}</Descriptions.Item>
                                                        <Descriptions.Item label={t('phone')}>{order.customer_info.phone}</Descriptions.Item>
                                                        <Descriptions.Item label={t('Email')}>{order.customer_info.email}</Descriptions.Item>
                                                    </Descriptions>
                                                )
                                            }
                                        </Card>
                                        {order.is_transfer_booking &&
                                            <React.Fragment>
                                                <Title level={4}>{t('checkin_person_info')}</Title>
                                                <Card className="mb-4">
                                                    {
                                                        loading ? (
                                                            <Skeleton active paragraph={{ rows: 2 }} />
                                                        ) : (
                                                            <Descriptions column={isDesktopOrLaptop ? 2 : 1}>
                                                                <Descriptions.Item label={t('name')}>{order.passenger[0].name_id}</Descriptions.Item>
                                                                <Descriptions.Item label={t('phone')}>{order.passenger[0].mobile}</Descriptions.Item>
                                                                <Descriptions.Item label={t('Email')}>{order.passenger[0].email}</Descriptions.Item>
                                                            </Descriptions>
                                                        )
                                                    }
                                                </Card>
                                            </React.Fragment>}
                                        {order.status == 'ORDER_CONFIRMED' && <Title level={4}>{t('host_info')}</Title>}
                                        {
                                            loading ? (
                                                <div>
                                                    <Card className="mb-4">
                                                        <Skeleton active paragraph />
                                                    </Card>
                                                    <Card className="mb-4">
                                                        <Skeleton active paragraph />
                                                    </Card>
                                                </div>
                                            ) : (
                                                <div>
                                                    {
                                                        order.status == 'ORDER_CONFIRMED' && <Card className="mb-4">
                                                            <Descriptions column={2}>
                                                                <Descriptions.Item span={1} label={t('name')}>{order.host_firstname} {order.host_lastname}</Descriptions.Item>
                                                                <Descriptions.Item label={t('phone')}>{order.host_mobile}</Descriptions.Item>
                                                                <Descriptions.Item label={t('Email')}>{order.host_email}</Descriptions.Item>
                                                            </Descriptions>
                                                            <Button type="primary" onClick={() => {
                                                                Router.push({
                                                                    pathname: `/user/inbox`, query: {
                                                                    }
                                                                }, undefined, { shallow: true })
                                                            }}>{t('chat_inbox')}</Button>
                                                        </Card>
                                                    }
                                                </div>
                                            )
                                        }
                                    </Col>
                                    <Col md={8} sm={24} xs={24}>
                                        <Title level={4}>{t('stay_order_payment_info')}</Title>
                                        <Card>
                                            {
                                                loading ? (
                                                    <Skeleton active />
                                                ) : (
                                                    <div>
                                                        <Row align="middle" justify="space-between">
                                                            <div className="fl-order-payment-title">{`${t('Fee_hiring')}`}</div>
                                                            <div className="fl-order-payment-value">{`${priceInVn(order.price_info.raw_price)} /${order.duration} ${t('night')}`}</div>
                                                        </Row>
                                                        { order.price_info.cleaning_fee > 0 &&
                                                            <Row align="middle" justify="space-between">
                                                                <div className="fl-order-payment-title">{t('Cleaning_fee')}</div>
                                                                <div className="fl-order-payment-value">{priceInVn(order.price_info.cleaning_fee)}</div>
                                                            </Row>
                                                        }
                                                        {order.price_info.extra_fee > 0 &&
                                                            <Row align="middle" justify="space-between">
                                                                <div className="fl-order-payment-title">{t('extra_fee_m')}</div>
                                                                <div className="fl-order-payment-value">{priceInVn(order.price_info.extra_fee)}</div>
                                                            </Row>
                                                        }
                                                        {
                                                            order.price_info.promo > 0 &&
                                                            <Row align="middle" justify="space-between">
                                                                <div className="fl-order-payment-title">{t('Promo')}</div>
                                                                <div className="fl-order-payment-value">{priceInVn(order.price_info.promo)}</div>
                                                            </Row>
                                                        }
                                                        {
                                                            order.coupon_code ? (
                                                                <Row align="middle" justify="space-between">
                                                                    <div className="fl-order-payment-title">{t('coupon_code')} ({order.coupon_code})</div>
                                                                    <div className="fl-order-payment-value">- {priceInVn(order.coupon_amount)}</div>
                                                                </Row>
                                                            ) : null
                                                        }
                                                        <Divider className="mt-2 mb-2" />
                                                        <Row align="bottom" justify="space-between">
                                                            <div className="fl-order-payment-title">{t('Total')}</div>
                                                            <Title level={4} className="mb-0 fl-order-payment-value">{priceInVn(order.price_info.payment)}</Title>

                                                        </Row>
                                                        <div className="text-right">
                                                            {order.qty_room > 1 && <span className="ml-2"> {`(${order.qty_room} ${t('room')})`}</span>}
                                                        </div>
                                                        {  order.status == 'ORDER_CONFIRMED' && <Row className="mt-2 justify-content-end">
                                                            <FilePdfOutlined style={{ fontSize: "20px", color: PRIMARY_COLOR, marginRight: "5px" }} />
                                                            <span className="text-color-primary pointer" onClick={() => {

                                                                exportReceipt(router.query.id)

                                                            }}>{t('export_receipt')}</span>
                                                        </Row>}
                                                    </div>
                                                )
                                            }
                                        </Card>
                                    </Col>

                                    <Col md={8} sm={24} xs={24}>
                                        <Title level={4}>{t('support')}</Title>
                                        <span className="text-color-primary pointer" onClick={() => { window.open("https://2stay.vn/contact", "_blank") }}>{t('support_customer')}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </React.Fragment>
                        )}
                </div>
            </div>
        </AppLayout >
    )
}


export default withTranslation('stayList')(StayOrderDetail);