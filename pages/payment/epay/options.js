import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { withTranslation, Router } from '../../../i18n';
import { Card, Divider, List, Spin, Button, message, Result, Form } from 'antd';
import axios from 'axios';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import appConfig from '../../../config';
import { AppLayout } from '../../../layout';
// actions
import { getOrderDetailByOrderNumber, processFreeOrder } from '../../../requests/order';
import { triggerPusher } from '../../../requests/pusher';
import OfflinePaymentModal from '../../../components/OfflinePaymentModal';

const PaymentOptions = (props) => {
    var { t } = props;
    const router = useRouter();
    const config = useSelector(state => state.config);
    const [order, setOrder] = useState(null);
    const [payType, setPayType] = useState(null);
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [freeOrder, setFreeOrder] = useState(false);
    const [errorConfirmFreeOrder, setErrorConfirmFreeOrder] = useState(false);
    const [loadingWhenGoBack, setLoadingWhenGoBack] = useState(false);
    const [visibleOfflineModal, setVisibleOfflineModal] = useState(false);

    useEffect(() => {
        async function getData() {
            let order = await getOrderDetailByOrderNumber(router.query.orderNumber);
            setOrder(order);
            if (order.total == 0) {
                setFreeOrder(true);
                try {
                    await processFreeOrder(order.id);
                } catch (error) {
                    setErrorConfirmFreeOrder(true);
                }
            }
            setLoading(false);
        }
        getData();
    }, []);

    const redirect = async (url) => {
        setLoadingWhenGoBack(true);
        try {
            await triggerPusher(
                `order_${order.order_number}`,
                'order_payment_success',
                {
                    orderId: order.id,
                    orderNumber: order.order_number,
                    type: order.type
                }
            );

            /** Delay more time if open in mobile because it is used in webview (mobile app) */
            let waitingTime = 0;
            if (window.innerWidth < 1080) waitingTime = 1000;
            setTimeout(() => {
                setLoadingWhenGoBack(false);
                Router.push(url);
            }, waitingTime);
        } catch (err) {
            console.log(err);
        }
    }

    const choosePayType = (code) => {
        setPayType(code);
    }

    const submit = () => {
        if (payType) {
            if (payType == 'OF') {
                setVisibleOfflineModal(true);
            } else {
                if (window.innerWidth < 1080) setLoadingPayment(true);
                window.openPayment(1, config.epay_domain);
            }
            
        } else {
            message.error(t('choose_payment_option_alert'));
        }
    }

    const data = [
        {
            title: t('international_card'),
            icon: require('../../../public/static/images/gold-mastercard.png'),
            code: 'IC'
        },
        {
            title: t('domestic_card'),
            icon: require('../../../public/static/images/atm-card.png'),
            code: 'DC'
        },
        {
            title: t('e_wallet'),
            icon: require('../../../public/static/images/e-wallet.png'),
            code: 'EW'
        },
        {
            title: t('offline_payment'),
            icon: require('../../../public/static/images/netbanking.png'),
            code: 'OF'
        },
    ];

    if (loading) {
        return (
            <AppLayout
                title={t('payment')}
            >
                <div className="container">
                    <div className="text-center mt-4">
                        <Spin size="large" />
                        <div className="mt-4">{t('loading')}</div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    if (!order) {
        return (
            <AppLayout
                title={t('payment')}
            >
                <div className="container">
                    <Result
                        status="error"
                        title={t('order_is_not_existed')}
                        extra={[
                            <Button type="primary" key="console" onClick={() => Router.push('/')}>{t('go_back_home')}</Button>
                        ]}
                    />
                </div>
            </AppLayout>

        )
    }

    var merId = config.epay_merchant_id;
    const encodeKey = config.epay_encode_key;
    var timeStamp = moment().format('YYYYMMDDHHmmss');
    var merTrxId = `MERTRXID${timeStamp}_${Math.floor(Math.random() + 1000)}`;
    var orderId = order.order_number;
    var token = CryptoJS.SHA256(`${timeStamp}${merTrxId}${merId}${order.total}${encodeKey}`);

    const formData = [
        { name: 'merId', value: merId, required: true },
        { name: 'currency', value: 'VND', required: true },
        { name: 'amount', value: order.total, required: true },
        { name: 'invoiceNo', value: orderId, required: true },
        { name: 'goodsNm', value: `Don hang ${orderId}`, required: true },
        { name: 'callBackUrl', value: config.epay_callback_url },
        { name: 'notiUrl', value: appConfig.API_URL + '/payment' },
        { name: 'reqDomain', value: config.epay_domain },
        { name: 'vat', value: 0 },
        { name: 'notax', value: 0 },
        { name: 'fee', value: 0 },
        { name: 'userFee', value: 0 },
        { name: 'goodsAmount', value: order.total },
        { name: 'windowType', value: window.innerWidth >= 1080 ? 0 : 1 },
        { name: 'description', value: `Thanh toan don hang: ${orderId}` },
        { name: 'merchantToken', value: token },
        { name: 'userLanguage', value: 'VN' },
        { name: 'timeStamp', value: timeStamp },
        { name: 'merTrxId', value: merTrxId },
        { name: 'windowColor', value: '#F37F28' },
        { name: 'userIP', value: ip },
        { name: 'userId', value: 'user-test' },
        // pay option
        { name: 'payType', value: payType },
        { name: 'payOption', value: payType == 'IC' ? 'PAY_AND_CREATE_TOKEN' : 'PAY_WITH_RETURNED_TOKEN' },
        { name: 'bankCode', value: '' }
    ];

    return (
        <AppLayout
            title={t('payment')}
            headChildren={
                <React.Fragment>
                    {/* Epay */}
                    <script defer src="https://pg.megapay.vn/pg_was/js/payment/layer/paymentClient.js"></script>
                    <link href="https://pg.megapay.vn/pg_was/css/payment/layer/paymentClient.css" rel="stylesheet"></link>
                </React.Fragment>
            }
        >
            <div className="gray-background">
                <div className="container">
                    {
                        freeOrder ? (
                            <div className="d-flex justify-content-center">
                                {
                                    errorConfirmFreeOrder ? (
                                        <Result
                                            status="error"
                                            className="pt-0"
                                            title={t('payment_error')}
                                            subTitle={`${t('order_id')}: ${order.order_number}. ${t('payment_error_description')}.`}
                                            extra={loadingWhenGoBack ? [
                                                <div>
                                                    <Spin size="large" />
                                                    <div className="mt-4">{t('loading')}</div>
                                                </div>
                                            ] : [
                                                    <Button type="primary" key="console" onClick={() => {
                                                        if (order.type == "STAY") redirect('/user/bookings?activeTab=stay');
                                                        else
                                                            if (order.type == "CAR") redirect('/user/bookings?activeTab=transport');
                                                            else redirect('/user/bookings?activeTab=flight');
                                                    }}>{t('view_order_detail')}</Button>
                                                ]
                                            }
                                        />
                                    ) : (
                                            <Result
                                                icon={<img src={require("../../../public/static/images/booking_result.png")} style={{ width: '80%' }} />}
                                                status="success"
                                                className="pt-0"
                                                title={t('payment_success')}
                                                subTitle={`${t('order_id')}: ${order.order_number}. ${t('payment_success_description')}.`}
                                                extra={loadingWhenGoBack ? [
                                                    <div>
                                                        <Spin size="large" />
                                                        <div className="mt-4">{t('loading')}</div>
                                                    </div>
                                                ] : [
                                                        <Button type="primary" key="console" onClick={() => {
                                                            if (order.type == "STAY") redirect('/user/bookings?activeTab=stay');
                                                            else
                                                                if (order.type == "CAR") redirect('/user/bookings?activeTab=transport');
                                                                else redirect('/user/bookings?activeTab=flight');
                                                        }}>{t('view_order_detail')}</Button>
                                                    ]
                                                }
                                            />
                                        )
                                }
                            </div>
                        ) : (
                                <React.Fragment>
                                    {
                                        order.pay_status == 'PAYMENT_PENDING' || !order.pay_status ? (
                                            <div className="d-flex justify-content-center mt-4 mb-4">
                                                <Card bordered className="payment-options">
                                                    <div >
                                                        <div className="text-center">
                                                            <h2>{t('choose_payment_option')}</h2>
                                                        </div>
                                                        <Divider />
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={data}
                                                            renderItem={item => (
                                                                <List.Item onClick={() => choosePayType(item.code)} className={`payment-option ${item.code == payType ? 'payment-option-selected' : ''}`}>
                                                                    <List.Item.Meta
                                                                        avatar={<img className="payment-option-icon" src={item.icon} />}
                                                                        title={<a href="#"><h5 className="mb-0">{item.title}</h5></a>}
                                                                        className="align-items-center"
                                                                    />
                                                                </List.Item>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        <Form name="megapayForm" id="megapayForm" method="POST" onFinish={() => submit()}>
                                                            {
                                                                formData.map((item, index) => (
                                                                    <input type="hidden" id={item.name} value={item.value} name={item.name} required key={index} />
                                                                ))
                                                            }
                                                            <div className="text-center">
                                                                <Button loading={loadingPayment} size="large" className="mt-4" htmlType="submit" type="primary">{t('continue')}</Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </Card>
                                            </div>
                                        ) : (
                                                <Result
                                                    status="error"
                                                    title={t('payment_error')}
                                                    extra={[
                                                        <Button type="primary" key="console" onClick={() => Router.push('/')}>{t('go_back_home')}</Button>
                                                    ]}
                                                />
                                            )
                                    }
                                </React.Fragment>
                            )
                    }
                </div>
                <OfflinePaymentModal 
                    order={order}
                    visible={visibleOfflineModal}
                    onShowResult={() => setFreeOrder(true)}
                    onCancel={() => setVisibleOfflineModal(false)}
                />
            </div>
        </AppLayout>
    )
}

export default withTranslation('payment')(PaymentOptions);