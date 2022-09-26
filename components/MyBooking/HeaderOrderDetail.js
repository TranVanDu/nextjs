import React, { useState } from 'react';
import { Row, Card, Divider, Modal, Typography, Button, message } from 'antd';
import { withTranslation, Router } from '../../i18n';
import moment from 'moment';
import _ from 'lodash';
import { priceInVn } from '../../helpers/helpers';
import ModalPriceInfo from './ModalPriceInfo';
import Countdown from 'react-countdown';
import { requestCancelBookingTransport } from '../../requests/transport';
import ModalRefundInfo from './ModalRefundInfo';

const { Title } = Typography;

function HeaderOrderDetail(props) {
    var { t, order, onReload, width } = props;

    const [visible_price_info, set_visible_price_info] = useState(false);
    const [visible_refund_info, set_visible_refund_info] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    

    const reBook = () => {
        if (order && order.type) {
            if (order.type == 'STAY') {
                Router.push('/?task=stay');
            }
            else if (order.type == "CAR") {
                Router.push('/?task=transport');
            }
            else if (order.type == "FLIGHT") {
                Router.push('/?task=flight');
            }
        }
    }


    const confirm = () => {
        try {
            var cancel_hour_policy = order.route.cancel_hour_policy;
            var dateCancel = moment().add(cancel_hour_policy, "hours").valueOf();
            var contentText = <div>
                <p>{t('are_u_sure')}</p>
            </div>
            if (order.status == "ORDER_CONFIRMED") {
                contentText = <div>
                    <p>{t('are_u_sure')}</p>
                    <p>{t('cancel_not_refund')}</p>
                </div>
                if (dateCancel < moment(order.depart).valueOf()) {
                    contentText = <div>
                        <p>{t('are_u_sure')}</p>
                        <p>{t('cancel_refund')}&nbsp;{priceInVn(order.price_info && order.price_info.payment ? order.price_info.payment : order.total)}</p>
                    </div>
                }
            }

            Modal.confirm({
                title: t('cancel'),
                content: contentText,
                okText: t('cancel'),
                cancelText: t('close'),
                onOk: cancelBooking
            });
        } catch (error) {

        }

    }

    const infor = () => {
        Modal.info({
            title: t('cancel_success_title'),
            content: t('cancel_success'),
        });
    }

    const cancelBooking = async () => {
        try {
            setLoadingCancel(true);
            await requestCancelBookingTransport(order.id);
            setLoadingCancel(false);
            infor();
            onReload();
        } catch (error) {
            setLoadingCancel(false);
            message.error(t('cancel_error'))
        }
    }


    if (!order) return null;
    if (width < 768) return (
        <>
            <Card className="mb-4" >
                <div className="header-order-detail">
                    <Title style={{ marginTop: "12px" }} level={4}>{t(order.status)}</Title>
                    {
                        order.status == "ORDER_PENDING" ?
                            <p>
                                <span>{t('remaining_time_to_payment')}:</span>
                                <span className="ml-1 mr-1"><b><Countdown date={moment(order.created_at).add(24, 'hours')} /></b>.</span>
                            </p>
                            : null
                    }
                    <Divider />
                    <p className="text-price">
                        {priceInVn(order.price_info && order.price_info.payment ? order.price_info.payment : order.total)}
                        <span className="payment-detail" onClick={() => set_visible_price_info(true)}>{t('payment_detail')}</span>
                    </p>
                    {order.status == "ORDER_CANCELLED" ?
                        <Button onClick={() => set_visible_refund_info(true)} >{t('refund_info')}</Button>
                        :
                        order.status == "ORDER_PENDING" ?
                            <div>
                                <Button className="mr-2" loading={loadingCancel} onClick={confirm}>{t('cancel')}</Button>
                                <Button type="primary" onClick={() => Router.push(`/payment/epay/options?orderNumber=${order.order_number}`)}>{t('paid_now')}</Button>
                            </div>
                            :
                            order.status == "ORDER_CONFIRMED" ?
                                <Button loading={loadingCancel} onClick={confirm}>{t('cancel')}</Button>
                                :
                                <Button onClick={() => reBook()}>{t('re_book')}</Button>
                    }
                </div>
            </Card>
            <ModalPriceInfo
                order={order}
                visible={visible_price_info}
                hideModal={() => set_visible_price_info(false)}
            />
            <ModalRefundInfo
                order={order}
                visible={visible_refund_info}
                hideModal={() => set_visible_refund_info(false)}
            />
        </>
    )

    return (
        <>
            <Card className="mb-4" >
                <div className="header-order-detail">
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div align="start" justify="center" style={{ width: "100%" }}>
                            <Title style={{ marginTop: "12px" }} level={4}>{t(order.status)}</Title>
                            {
                                order.status == "ORDER_PENDING" ?
                                    <>
                                        <span>{t('remaining_time_to_payment')}:</span>
                                        <span className="ml-1 mr-1"><b><Countdown date={moment(order.created_at).add(1, 'hours')} /></b>.</span>
                                    </>
                                    : null
                            }
                        </div>
                        <div align="end" style={{ width: "100%" }}>
                            <p className="mb-5px text-order-number">{t('order_number')}: {order.order_number}</p>
                            <p className="mb-5px text-order-number">{t('order_date')}: {moment(order.created_at).format("dd, lll")}</p>
                        </div>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div style={{ width: "100%" }} align="start">
                            <p className="text-price">
                                {priceInVn(order.price_info && order.price_info.payment ? order.price_info.payment : order.total)}
                                <span className="payment-detail" onClick={() => set_visible_price_info(true)}>{t('payment_detail')}</span>
                            </p>
                        </div>
                        <div align="end" style={{ width: "100%" }}>
                            {order.status == "ORDER_CANCELLED" ?
                                <Button onClick={() => set_visible_refund_info(true)} >{t('refund_info')}</Button>
                                :
                                order.status == "ORDER_PENDING" ?
                                    <div>
                                        <Button className="mr-2" loading={loadingCancel} onClick={confirm}>{t('cancel')}</Button>
                                        <Button type="primary" onClick={() => Router.push(`/payment/epay/options?orderNumber=${order.order_number}`)}>{t('paid_now')}</Button>
                                    </div>
                                    :
                                    order.status == "ORDER_CONFIRMED" ?
                                        <Button loading={loadingCancel} onClick={confirm}>{t('cancel')}</Button>
                                        :
                                        <Button onClick={() => reBook()}>{t('re_book')}</Button>
                            }
                        </div>
                    </div>
                </div>
            </Card>
            <ModalPriceInfo
                order={order}
                visible={visible_price_info}
                hideModal={() => set_visible_price_info(false)}
            />
            <ModalRefundInfo
                order={order}
                visible={visible_refund_info}
                hideModal={() => set_visible_refund_info(false)}
            />
        </>
    )
}

export default withTranslation('order')(HeaderOrderDetail);