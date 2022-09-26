import React, { useState, useEffect } from 'react';
import { i18n, withTranslation, Router } from '../../../../i18n';
import { useRouter } from 'next/router'
import { AppLayout } from '../../../../layout';
import { Card, Divider, Modal, Row, Col, Typography, Descriptions, Skeleton, Image, Timeline, Result } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
// requests

import { requestOrderDetailTransport } from '../../../../requests/transport';
import HeaderOrderDetail from '../../../../components/MyBooking/HeaderOrderDetail';
import { useSelector } from 'react-redux';
import { vehicleType } from '../../../../helpers/transport';
import ModalContactInfo from '../../../../components/MyBooking/ModalContactInfo';
import { useWindowSize } from '../../../../components/useWindowSize';
import { priceInVn } from '../../../../helpers/helpers';

const { Title } = Typography;

const TransportOrderDetail = (props) => {
    const { t } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [visibleContact, setVisibleContact] = useState(false);
    const [order, setOrder] = useState(null);
    const configRd = useSelector(state => state.config);
    var car_type = configRd && configRd.car_type ? configRd.car_type : [];

    const auth = useSelector(state => state.auth.user);

    const windowSize = useWindowSize();

    useEffect(() => {
        async function getData() {
            try {
                var order = await requestOrderDetailTransport(router.query.id);
                setOrder(order);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        if (auth)
            getData();
    }, [auth]);

    const onReload = async () => {
        try {
            var order = await requestOrderDetailTransport(router.query.id);
            setOrder(order);
        } catch (error) {
        }
    }

    var vehicle = order ? order.vehicle : null;
    var airport = order ? order.airport : null;
    var route = order ? order.route : null;
    var dropTime = null;
    var free_waiting = 0;
    if (route) {
        dropTime = moment(order.depart).add(route.duration, 'minute').format('DD/MM/YYYY HH:mm');
        const { free_waiting_time, free_waiting_time_i, free_waiting_time_return } = route;
        if (order && order.route_type == 1) free_waiting = Math.max(free_waiting_time, free_waiting_time_i);
        else free_waiting = free_waiting_time_return;
    }
    return (
        <AppLayout
            title={t('order_detail')}
        >
            <div className="gray-background">

                {
                    loading ? (
                        <div className="container">
                            <Card className="mb-4">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Card>
                            <Card className="mb-4">
                                <Skeleton active paragraph={{ rows: 3 }} />
                            </Card>
                            <Card className="mb-4">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Card>
                        </div>
                    ) :
                        order ?
                            (
                                <div className="container">
                                    <HeaderOrderDetail
                                        order={order}
                                        onReload={onReload}
                                        width={windowSize.width}
                                    />
                                    {vehicle ?
                                        <Card className="mb-4">
                                            <Title level={4}>{t("order_detail")}</Title>
                                            <Divider />
                                            {windowSize.width < 1024 ? (
                                                <>
                                                    <div className="d-flex mb-4">
                                                        {vehicle.image && vehicle.image.length ?
                                                            <div style={{ marginRight: "20px" }}>
                                                                <Image
                                                                    width={70}
                                                                    src={vehicle.image && vehicle.image.length ? configRd.url_asset_root + vehicle.image[0] : ""}
                                                                    alt="image"
                                                                />
                                                            </div>
                                                            : null}
                                                        <div style={{ width: "100%" }}>
                                                            <div style={{ fontSize: "14px", fontWeight: "bold" }}>{order.route_type == 1 ? t("airport_pickup") : t("airport_dropoff")}{" - "}{vehicle.title}  ({vehicleType(vehicle.type, car_type)})</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {airport ?
                                                            <div>
                                                                {order.route_type == 1 ?
                                                                    <Timeline>
                                                                        <Timeline.Item color="green">{airport.title}</Timeline.Item>
                                                                        <Timeline.Item>{order.sub_address} ({order.address})</Timeline.Item>
                                                                    </Timeline>
                                                                    :
                                                                    <Timeline>
                                                                        <Timeline.Item color="green">{order.sub_address} ({order.address})</Timeline.Item>
                                                                        <Timeline.Item>{airport.title}</Timeline.Item>
                                                                    </Timeline>
                                                                }
                                                            </div>
                                                            : null}
                                                        <div style={{

                                                        }}>
                                                            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                                                                {t("transfer_info")}
                                                            </div>
                                                            {order.route_type == 1 ?
                                                                <div style={{ alignItems: "center", marginBottom: "0px" }}>
                                                                    <Timeline>
                                                                        <Timeline.Item color="green">
                                                                            <span style={{ color: "rgb(102,102,102)" }}>{moment(order.depart).format("DD/MM/YYYY HH:mm")}</span>
                                                                            &nbsp;
                                                                    {t("pickup")}
                                                                        </Timeline.Item>
                                                                        <Timeline.Item dot={<FontAwesomeIcon color="rgb(146,155,171)" style={{ fontSize: "12px" }} icon={["fas", "clock"]} />}>
                                                                            {t("duration")}&nbsp;
                                                                    {route ? route.duration : "0"}&nbsp;
                                                                    {t("minus")}
                                                                        </Timeline.Item>
                                                                        <Timeline.Item>
                                                                            <span style={{ color: "rgb(102,102,102)" }}>{dropTime}</span>
                                                                            &nbsp;
                                                                    {t("dropoff")}
                                                                        </Timeline.Item>
                                                                    </Timeline>
                                                                </div>
                                                                :
                                                                <div style={{ alignItems: "center", marginBottom: "0px" }}>
                                                                    <Timeline>
                                                                        <Timeline.Item color="green">
                                                                            <span style={{ color: "rgb(102,102,102)" }}>{moment(order.depart).format("DD/MM/YYYY HH:mm")}</span>
                                                                            &nbsp;
                                                                    {t("pickup")}
                                                                        </Timeline.Item>
                                                                        <Timeline.Item dot={<FontAwesomeIcon color="rgb(146,155,171)" style={{ fontSize: "12px" }} icon={["fas", "clock"]} />}>
                                                                            {t("duration")}&nbsp;
                                                                    {route ? route.duration : "0"}&nbsp;
                                                                    {t("minus")}
                                                                        </Timeline.Item>
                                                                        <Timeline.Item>
                                                                            <span style={{ color: "rgb(102,102,102)" }}>{dropTime}</span>
                                                                            &nbsp;
                                                                    {t("dropoff")}
                                                                        </Timeline.Item>
                                                                    </Timeline>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div style={{

                                                        }}>
                                                            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                                                                {t("route_info")}
                                                            </div>
                                                            <div style={{ alignItems: "center", marginBottom: "10px" }}>
                                                                <span style={{ fontSize: "14px", marginRight: "10px" }}><FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "user-tie"]} /> {order.qty}</span>
                                                                <span style={{ fontSize: "14px" }}><FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "suitcase-rolling"]} /> {t("max")} {vehicle.luggage} </span>
                                                            </div>
                                                            {free_waiting ?
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <span style={{ fontSize: "14px" }}>
                                                                        <FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "clock"]} />&nbsp;
                                                                {t("free")}&nbsp;{free_waiting}&nbsp;{t("minus")}&nbsp;{t("waiting_time")}
                                                                    </span>

                                                                </div>
                                                                : null}
                                                            {route ?
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <span style={{ fontSize: "14px" }}>
                                                                        <FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "times-circle"]} />&nbsp;
                                                                {t("free_cancellation")}&nbsp;{route.cancel_hour_policy}&nbsp;{t("hour")}&nbsp;{t("before_your_pick_up_time")}
                                                                    </span>
                                                                </div>
                                                                : null}

                                                            {route && route.route_services && route.route_services.length ? (
                                                                <>
                                                                    <div style={{ marginBottom: "10px" }}>
                                                                        <span style={{ fontSize: "14px", color: "#999" }}>{t('include_service')}</span>
                                                                    </div>
                                                                    {
                                                                        route.route_services.map(item => (
                                                                            <div key={item.id} style={{ marginBottom: "10px" }}>
                                                                                <span style={{ fontSize: "14px" }}>
                                                                                    {item.title}
                                                                                </span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </>
                                                            )

                                                                : null
                                                            }
                                                            {route && route.price_add_holiday ? (
                                                                <div className="include-service">
                                                                    <p>{t("surcharge")} {priceInVn(route.price_add_holiday)} {t("during_holidays")}</p>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <Divider />
                                                        <div>
                                                            <p>{t('service_provice_by')} <span>{route.company_name}</span> </p>
                                                            {
                                                                !(order.status == "ORDER_PENDING" || order.status == "ORDER_EXPIRED") ?
                                                                    <div>
                                                                        <span className="view-contact-detail" onClick={() => setVisibleContact(true)}>{t('see_contact_detail')}</span>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                </>)
                                                : (
                                                    <div className="d-flex" >
                                                        {vehicle.image && vehicle.image.length ?
                                                            <div style={{ marginRight: "20px" }}>
                                                                <Image
                                                                    width={150}
                                                                    src={vehicle.image && vehicle.image.length ? configRd.url_asset_root + vehicle.image[0] : ""}
                                                                    alt="image"
                                                                />
                                                            </div>
                                                            : null}
                                                        <div style={{ width: "100%" }}>
                                                            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>{order.route_type == 1 ? t("airport_pickup") : t("airport_dropoff")}{" - "}{vehicle.title}  ({vehicleType(vehicle.type, car_type)})</div>
                                                            {airport ?
                                                                <div>
                                                                    {order.route_type == 1 ?
                                                                        <Timeline>
                                                                            <Timeline.Item color="green">{airport.title}</Timeline.Item>
                                                                            <Timeline.Item>{order.sub_address}</Timeline.Item>
                                                                        </Timeline>
                                                                        :
                                                                        <Timeline>
                                                                            <Timeline.Item color="green">{order.sub_address}</Timeline.Item>
                                                                            <Timeline.Item>{airport.title}</Timeline.Item>
                                                                        </Timeline>
                                                                    }
                                                                </div>
                                                                : null}
                                                            <div style={{

                                                            }}>
                                                                <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                                                                    {t("transfer_info")}
                                                                </div>
                                                                {order.route_type == 1 ?
                                                                    <div style={{ alignItems: "center", marginBottom: "0px" }}>
                                                                        <Timeline>
                                                                            <Timeline.Item color="green">
                                                                                <span style={{ color: "rgb(102,102,102)" }}>{moment(order.depart).format("DD/MM/YYYY HH:mm")}</span>
                                                                                &nbsp;
                                                                    {t("pickup")}
                                                                            </Timeline.Item>
                                                                            <Timeline.Item dot={<FontAwesomeIcon color="rgb(146,155,171)" style={{ fontSize: "12px" }} icon={["fas", "clock"]} />}>
                                                                                {t("duration")}&nbsp;
                                                                    {route ? route.duration : "0"}&nbsp;
                                                                    {t("minus")}
                                                                            </Timeline.Item>
                                                                            <Timeline.Item>
                                                                                <span style={{ color: "rgb(102,102,102)" }}>{dropTime}</span>
                                                                                &nbsp;
                                                                    {t("dropoff")}
                                                                            </Timeline.Item>
                                                                        </Timeline>
                                                                    </div>
                                                                    :
                                                                    <div style={{ alignItems: "center", marginBottom: "0px" }}>
                                                                        <Timeline>
                                                                            <Timeline.Item color="green">
                                                                                <span style={{ color: "rgb(102,102,102)" }}>{moment(order.depart).format("DD/MM/YYYY HH:mm")}</span>
                                                                                &nbsp;
                                                                    {t("pickup")}
                                                                            </Timeline.Item>
                                                                            <Timeline.Item dot={<FontAwesomeIcon color="rgb(146,155,171)" style={{ fontSize: "12px" }} icon={["fas", "clock"]} />}>
                                                                                {t("duration")}&nbsp;
                                                                    {route ? route.duration : "0"}&nbsp;
                                                                    {t("minus")}
                                                                            </Timeline.Item>
                                                                            <Timeline.Item>
                                                                                <span style={{ color: "rgb(102,102,102)" }}>{dropTime}</span>
                                                                                &nbsp;
                                                                    {t("dropoff")}
                                                                            </Timeline.Item>
                                                                        </Timeline>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div style={{

                                                            }}>
                                                                <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                                                                    {t("route_info")}
                                                                </div>
                                                                <div style={{ alignItems: "center", marginBottom: "10px" }}>
                                                                    <span style={{ fontSize: "14px", marginRight: "10px" }}><FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "user-tie"]} /> {order.qty}</span>
                                                                    <span style={{ fontSize: "14px" }}><FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "suitcase-rolling"]} /> {t("max")} {vehicle.luggage} </span>
                                                                </div>
                                                                {free_waiting ?
                                                                    <div style={{ marginBottom: "10px" }}>
                                                                        <span style={{ fontSize: "14px" }}>
                                                                            <FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "clock"]} />&nbsp;
                                                                {t("free")}&nbsp;{free_waiting}&nbsp;{t("minus")}&nbsp;{t("waiting_time")}
                                                                        </span>

                                                                    </div>
                                                                    : null}
                                                                {route ?
                                                                    <div style={{ marginBottom: "10px" }}>
                                                                        <span style={{ fontSize: "14px" }}>
                                                                            <FontAwesomeIcon color="rgb(146,155,171)" icon={["fas", "times-circle"]} />&nbsp;
                                                                {t("free_cancellation")}&nbsp;{route.cancel_hour_policy}&nbsp;{t("hour")}&nbsp;{t("before_your_pick_up_time")}
                                                                        </span>
                                                                    </div>
                                                                    : null}

                                                                {route && route.route_services && route.route_services.length ? (
                                                                    <>
                                                                        <div style={{ marginBottom: "10px" }}>
                                                                            <span style={{ fontSize: "14px", color: "#999" }}>{t('include_service')}</span>
                                                                        </div>
                                                                        {
                                                                            route.route_services.map(item => (
                                                                                <div key={item.id} style={{ marginBottom: "10px" }}>
                                                                                    <span style={{ fontSize: "14px" }}>
                                                                                        {item.title}
                                                                                    </span>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </>
                                                                )

                                                                    : null
                                                                }
                                                                {route && route.price_add_holiday ? (
                                                                    <div className="include-service">
                                                                        <p>{t("surcharge")} {priceInVn(route.price_add_holiday)} {t("during_holidays")}</p>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <Divider />
                                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                                <div align="start" justify="center" style={{ width: "100%" }}>
                                                                    <span>{t('service_provice_by')} <span>{route.company_name}</span> </span>
                                                                </div>
                                                                {
                                                                    !(order.status == "ORDER_PENDING" || order.status == "ORDER_EXPIRED") ?
                                                                        <div align="end" style={{ width: "100%" }}>
                                                                            <span className="view-contact-detail" onClick={() => setVisibleContact(true)}>{t('see_contact_detail')}</span>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                        </Card>
                                        : null}
                                    <Card className="mb-4">
                                        <Title level={4}>{t('order_info')}</Title>
                                        <Divider />
                                        <Row gutter={[10, 10]}>
                                            <Col xs={24} sm={24} md={12}>{t('order_number')}: {order.order_number}</Col>
                                            <Col xs={24} sm={24} md={12}>{t('order_date')}: {order.created_at}</Col>
                                            {order.payment_date ? <Col xs={24} sm={24} md={12}>{t('payment_date')}: {order.payment_date}</Col> : null}
                                        </Row>
                                    </Card>
                                    <ModalContactInfo
                                        order={order}
                                        visible={visibleContact}
                                        hideModal={() => setVisibleContact(false)}
                                    />
                                </div>
                            )
                            :
                            (
                                <Result
                                    status={t("warning")}
                                    title={t('warning_order_detail_content')}
                                />
                            )
                }
            </div>
        </AppLayout>
    )
}


export default withTranslation('transport')(TransportOrderDetail);