import React, { useState, useEffect } from 'react';
import { i18n, withTranslation, Router } from '../../../../i18n';
import { useRouter } from 'next/router'
import { AppLayout } from '../../../../layout';
import { Card, Divider, Modal, Row, Col, Typography, Descriptions, Skeleton, Tag } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { generateAirline, convertTime, convertClassOfFlightBooking, priceInVn } from '../../../../helpers/helpers';
import moment from 'moment';
import OrderStatus from '../../../../components/OrderStatus';
// requests
import { getFlightOrderDetail } from '../../../../requests/order';

const { Title } = Typography;

const FlightOrderDetail = (props) => {
    const { t } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [flights, setFlights] = useState([]);
    const [departurePnr, setDeparturePnr] = useState(null);
    const [returnPnr, setReturnPnr] = useState(null);

    useEffect(() => {
        async function getData() {
            var order = await getFlightOrderDetail(router.query.id);
            if (order) {
                let flights = [];
                let flightInfo = JSON.parse(order.flight_info);
                flights.push(flightInfo.departure);
                if (flightInfo.return) flights.push(flightInfo.return);

                setOrder(order);
                setFlights(flights);
                if (flightInfo.departurePnrCode) setDeparturePnr(flightInfo.departurePnrCode);
                if (flightInfo.returnPnrCode) setReturnPnr(flightInfo.returnPnrCode);
                setLoading(false);
            }
        }

        getData();
    }, []);

    return (
        <AppLayout
            title={t('flight_order_detail')}
        >
            <div className="gray-background">
                <div className="container">
                    {
                        loading ? (
                            <Card className="mb-4">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Card>
                        ) : (
                            <Card className="mb-4">
                                <Row align="middle" justify="space-between">
                                    <div>
                                        <Title level={4}>{t('order')}: #{order.order_number}</Title>
                                        <div>
                                            <span className="mr-2">{t('order_created_at')}:</span><span>{moment(order.created_at).format('dd, lll')}</span>
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
                                        {
                                            order.status == 'ORDER_CONFIRMED' || order.status == 'ORDER_COMPLETED' ? (
                                                <React.Fragment>
                                                    {
                                                        order.flight_issue_ticket_status ? (
                                                            <React.Fragment>
                                                                {
                                                                    parseInt(order.flight_issue_ticket_status) == 1 ? (
                                                                        <Tag color="success" className="mr-0">{t('e_ticket_issue_success')}</Tag>
                                                                    ) : (
                                                                        <Tag color="error" className="mr-0">{t('e_ticket_issue_failed')}</Tag>
                                                                    )
                                                                }
                                                            </React.Fragment>
                                                        ) : (
                                                            <Tag color="warning" className="mr-0">{t('e_ticket_issue_pending')}</Tag>
                                                        )
                                                    }
                                                </React.Fragment>
                                            ) : null
                                        }
                                    </div>
                                </Row>
                            </Card>
                        )
                    }
                    <Card>
                        <div className="order-flights">
                            {
                                flights.map((flight, index) => {
                                    let airline = generateAirline(flight.AirlineCode);
                                    let flightClass = convertClassOfFlightBooking(flight.Class);
                                    let pnrCode = index == 0 ? departurePnr : returnPnr;

                                    return (
                                        <div key={index}>
                                            <Row gutter={16} align="middle">
                                                <Col md={6} sm={24} xs={24}>
                                                    <div className="selected-flight-property-title">{index == 0 ? t('departure') : t('return')}</div>
                                                    <div className="flight-date">{moment(flight.StartDate).format('dddd, ll')}</div>
                                                </Col>
                                                <Col md={8} sm={24} xs={24}>
                                                    <Row align="middle">
                                                        <img className="lf-air-logo mr-3" src={airline.logo} />
                                                        <div>
                                                            <div className="selected-flight-property-title">{airline.name}</div>
                                                            <div>{flightClass}</div>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col md={6} sm={16} xs={16}>
                                                    <Row align="middle" justify="space-between">
                                                        <div className="text-center">
                                                            <div className="selected-flight-property-title">{moment(flight.StartDate).format('HH:mm')}</div>
                                                            <div>{flight.StartPoint}</div>
                                                        </div>
                                                        <div className="selected-flight-icon-divider">
                                                            <Divider>
                                                                <FontAwesomeIcon icon={faPlane} size="sm" />
                                                            </Divider>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="selected-flight-property-title">{moment(flight.EndDate).format('HH:mm')}</div>
                                                            <div>{flight.EndPoint}</div>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col md={4} sm={8} xs={8}>
                                                    <div className="text-right">
                                                        <div className="selected-flight-property-title">{convertTime(flight.Duration)}</div>
                                                        <div>{flight.ListSegment.length == 1 ? t('direct_flight') : `${flight.ListSegment.length} ${t('stops')}`}</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {
                                                pnrCode && parseInt(order.flight_issue_ticket_status) == 1 && ['ORDER_PENDING_PAYMENT', 'ORDER_PENDING', 'ORDER_EXPIRED'].indexOf(order.status) < 0 ? (
                                                    <div>
                                                        <span className="selected-flight-property-title mr-1">{t('pnr_code')}:</span><span><Tag color="orange">{pnrCode}</Tag></span>
                                                    </div>
                                                ) : null
                                            }

                                            <Divider />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Row gutter={16}>
                            <Col lg={16} md={24} sm={24} xs={24} >
                                <Title level={4}>{t('flight_order_contact_info')}</Title>
                                <Card className="mb-4">
                                    {
                                        loading ? (
                                            <Skeleton active paragraph={{ rows: 2 }} />
                                        ) : (
                                            <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
                                                <Descriptions.Item span={2} label={t('name')}>{order.customer.firstname} {order.customer.lastname}</Descriptions.Item>
                                                <Descriptions.Item label={t('phone')}>{order.customer.mobile}</Descriptions.Item>
                                                <Descriptions.Item label={t('email')}>{order.customer.email}</Descriptions.Item>
                                                <Descriptions.Item label={t('order_note')}>{order.note}</Descriptions.Item>
                                            </Descriptions>
                                        )
                                    }
                                </Card>
                                <Title level={4}>{t('flight_order_passengers')}</Title>
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
                                                order.passengers.map((passenger, index) => {
                                                    let passengerType = t('adult');
                                                    if (passenger.passenger_type == 'PASSENGER_CHILDREN') passengerType = t('children');
                                                    else if (passenger.passenger_type == 'PASSENGER_INFANT') passengerType = t('infant');

                                                    return (
                                                        <Card className="mb-4" key={index}>
                                                            <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
                                                                <Descriptions.Item span={2} label={t('name')}>{passenger.firstname} {passenger.lastname}</Descriptions.Item>
                                                                <Descriptions.Item label={t('phone')}>{passenger.mobile}</Descriptions.Item>
                                                                <Descriptions.Item label={t('gender')}>{passenger.gender == '1' ? t('male') : t('female')}</Descriptions.Item>
                                                                <Descriptions.Item label={t('birthday')}>{moment(passenger.birthday).format('DD/MM/YYYY')}</Descriptions.Item>
                                                                <Descriptions.Item label={t('passenger_type')}>{passengerType}</Descriptions.Item>
                                                            </Descriptions>
                                                        </Card>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </Col>
                            <Col lg={8} md={24} sm={24} xs={24}>
                                <Title level={4}>{t('flight_order_payment')}</Title>
                                <Card>
                                    {
                                        loading ? (
                                            <Skeleton active />
                                        ) : (
                                            <div>
                                                <Row align="middle" justify="space-between">
                                                    <div className="fl-order-payment-title">{t('fare_price')}</div>
                                                    <div className="fl-order-payment-value">{priceInVn(order.subtotal)}</div>
                                                </Row>
                                                <Row align="middle" justify="space-between">
                                                    <div className="fl-order-payment-title">{t('fee_and_tax')}</div>
                                                    <div className="fl-order-payment-value">{t('included')}</div>
                                                </Row>
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
                                                    <div className="fl-order-payment-title">{t('total')}</div>
                                                    <Title level={4} className="mb-0 fl-order-payment-value">{priceInVn(order.total)}</Title>
                                                </Row>
                                            </div>
                                        )
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}


export default withTranslation('flight')(FlightOrderDetail);