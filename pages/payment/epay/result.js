import React, { useState, useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { withTranslation, Router } from '../../../i18n';
import { Result, Button, Typography, Spin } from 'antd';
import { useRouter } from 'next/router';
import { AppLayout } from '../../../layout';
// requests
import { getOrderDetailByOrderNumber, verifyPaymentToken } from '../../../requests/order';
import { triggerPusher } from '../../../requests/pusher';

const { Paragraph, Text } = Typography;

const PaymentResult = (props) => {
    var { t } = props;
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadingWhenGoBack, setLoadingWhenGoBack] = useState(false);

    useEffect(() => {
        async function getData() {
            var order = await getOrderDetailByOrderNumber(router.query.invoiceNo);
            var response = await verifyPaymentToken(router.query);

            setOrder(order);
            if (response.success) {
                setLoading(false);
                setSuccess(response.success);
            } else {
                setLoading(false);
                setSuccess(response.success);
                setErrorCode(response.code);
                setErrorMessage(response.message);
            }
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

    return (
        <AppLayout
            title={t('payment_result')}
        >
            <div className="gray-background">
                <div className="container">
                    {
                        loading ? (
                            <div className="text-center mt-4">
                                <Spin size="large" />
                                <div className="mt-4">{t('order_is_being_processed')}</div>
                            </div>
                        ) : (
                                <div>
                                    {
                                        success ? (
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
                                        ) : (
                                                <Result
                                                    status="error"
                                                    title={t('payment_failed')}
                                                    subTitle={`${t('payment_failed_alert_1')}: ${order.order_number}. ${t('payment_failed_alert_2')}.`}
                                                    extra={[
                                                        <Button type="primary" key="console" onClick={() => redirect('/')}>{t('go_back_home')}</Button>
                                                    ]}
                                                >
                                                    <div className="desc">
                                                        <Paragraph>
                                                            <Text strong style={{ fontSize: 16, }} >{errorMessage}</Text>
                                                        </Paragraph>
                                                        <Paragraph>
                                                            <CloseCircleOutlined style={{ color: 'red' }} /> {t('error_code')}: {errorCode}
                                                        </Paragraph>
                                                    </div>
                                                </Result>
                                            )
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        </AppLayout>
    )
}

export default withTranslation('payment')(PaymentResult);