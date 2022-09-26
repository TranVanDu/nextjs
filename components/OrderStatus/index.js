import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tag, Divider, Button } from 'antd';
import moment from 'moment';
import { withTranslation, Link } from '../../i18n';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';

const OrderStatus = (props) => {
    var { t, order, size, showLinkPayment, align, countdown } = props;
    const [color, setColor] = useState('');
    const [showProof, setShowProof] = useState(false);
    const config = useSelector(state => state.config);

    useEffect(() => {
        let color;
        switch (order.status) {
            case 'ORDER_PENDING_PAYMENT': {
                color = '#F37F28';
                break;
            }
            case 'ORDER_PENDING': {
                color = '#F37F28';
                break;
            }
            case 'ORDER_CONFIRMED': {
                color = '#52c41a';
                break;
            }
            case 'ORDER_CANCELLATION_PENDING': {
                color = '#fadb14';
                break;
            }
            case 'ORDER_REJECTED': {
                color = '#cf1322';
                break;
            }
            case 'ORDER_CANCELLED': {
                color = '#cf1322';
                break;
            }
            case 'ORDER_COMPLETED': {
                color = '#52c41a';
                break;
            }
            case 'ORDER_EXPIRED': {
                color = '#cf1322';
                break;
            }
            default: break;
        }
        setColor(color);
    }, []);

    return (
        <div className={align == 'right' ? "text-right text-mobile-left" : "text-left"} >
            {
                order.status == 'ORDER_PENDING' ? (
                    <React.Fragment>
                        {
                            order.proof_of_payment ? (
                                <React.Fragment>
                                    {
                                        order.proof_approved_status ? (
                                            <Tag color={'#cf1322'} className="m-0">{t('proof_rejected')}</Tag>
                                        ) : (
                                            <Tag color={'#F37F28'} className="m-0">{t('pending_handle_proof')}</Tag>
                                        )
                                    }
                                    <div>
                                        <Button className="pr-0" size="small" type="link" onClick={() => setShowProof(true)}>{t('view_proof')}</Button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <Tag color={color} className="m-0">{t(order.status)}</Tag>
                            )
                        }
                    </React.Fragment>
                ) : (
                    <Tag color={color} className="m-0">{t(order.status)}</Tag>
                )
            }

            {size == 'large' ? <div className="mb-2"></div> : null}
            {
                (moment(order.created_at).add(24, 'hours') > moment()) && (order.pay_status == 'PAYMENT_PENDING' || !order.pay_status) && order.status == 'ORDER_PENDING' && showLinkPayment ? (
                    <div>
                        <div style={{ fontSize: size == 'small' ? 12 : 14 }}>
                            <span>{t('remaining_time_to_payment')}:</span>
                            <span className="ml-1 mr-1"><b><Countdown date={moment(order.created_at).add(countdown, 'hours')} /></b>.</span>
                            <Link href={`/payment/epay/options?orderNumber=${order.order_number}`}>{t('paid_now')}</Link>
                        </div>
                    </div>
                ) : null
            }

            <Modal
                visible={showProof}
                onCancel={() => setShowProof(false)}
                title={t('proof')}
                footer={null}
            >
                <img src={config.url_asset_root + order.proof_of_payment} width="100%" />
            </Modal>
        </div>

    )
}

OrderStatus.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    status: PropTypes.string,
    createdAt: PropTypes.string,
    orderNumber: PropTypes.string,
    payStatus: PropTypes.string
}

OrderStatus.defaultProps = {
    size: 'small',
    showLinkPayment: true,
    align: 'right',
    countdown: 24
}

export default withTranslation('order')(OrderStatus);