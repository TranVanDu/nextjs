import React from 'react';
import { Row, Card, Divider, Col, Button, Tag } from 'antd';
import { withTranslation, Router } from '../../i18n';
import moment from 'moment';
import _ from 'lodash';
import OrderStatus from '../OrderStatus';
import { useSelector } from 'react-redux';
import { priceInVn } from '../../helpers/helpers';


const TransportOrderItem = (props) => {
    var { t, order, onClickReview } = props;
    const configRd = useSelector(state => state.config);
    var styleCancel = '';
    if (order.status == "ORDER_CANCELLED" || order.status == "ORDER_EXPIRED") styleCancel = "card-cancel";
    var { price_info } = order;
    if (price_info) price_info = JSON.parse(price_info);
    return (

        <Card
            className={`card-oder-list-trans mb-4 ${styleCancel}`}
        >
            <Row style={{ cursor: "pointer" }} onClick={() => Router.push(`/orders/transport/[id]`, `/orders/transport/${order.id}`)}>
                <Col span={20}>
                    <div className="title-list mb-2">
                        {t('airport_transfer')} - {order.airport_title} ({order.route_type == 1 ? t('airport_pickup') : t('airport_dropoff')})
                            </div>
                    <div className="oder-trans-content-wrapper">
                        <p>{t('from')} : {order.route_type == 1 ? order.airport_title : order.sub_address}</p>
                        <p>{t('to')} : {order.route_type == 1 ? order.sub_address : order.airport_title}</p>
                        <p>{t('date')} &amp; {t('time_pickup')} : {moment(order.depart).format("DD/MM/YYYY HH:mm")} ({t('local_time')})</p>
                        <p>{order.vehicle_title} · {order.qty} {t('passenger')}</p>
                        <p class="oder-trans-price">{priceInVn(price_info && price_info.payment ? price_info.payment : order.total)}</p>
                    </div>
                </Col>
                <Col span={4}>
                    <img className="oder-trans-img" src={`${configRd.url_asset_root}${order.vehicle_image}`} />
                </Col>
            </Row>
            {
                order.status == 'ORDER_COMPLETED' ? (
                    <React.Fragment>
                        {
                            order.is_reviewed ? (
                                <Tag color="orange" className="mr-1">{t('reviewed')}</Tag>
                            ) : (
                                    <Button type="link" className="p-0" size="small" onClick={() => onClickReview()}>{t('leave_your_review')}</Button>
                                )
                        }
                    </React.Fragment>
                ) : null
            }
            <Divider className="mt-2 mb-2" />
            <Row align="top" justify="space-between">
                <div>
                    <div><span>{t('order_created_at')}: </span><span className="flight-date">{moment(order.created_at).format('dd, lll')}</span></div>
                </div>
                <div>
                    <OrderStatus
                        order={order}
                        countdown={1}
                    />
                </div>
            </Row>
        </Card>
    )
}

export default withTranslation('transport')(TransportOrderItem);