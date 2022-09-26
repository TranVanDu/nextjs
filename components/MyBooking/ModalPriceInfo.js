import React from 'react';
import { Divider, Typography, Modal } from 'antd';
import { withTranslation } from '../../i18n';
import { priceInVn } from '../../helpers/helpers';

const { Title } = Typography;

function ModalPriceInfo(props) {
    var { t, order, visible, hideModal } = props;

    if (!order) return null;
    return (
        <Modal
            visible={visible}
            onCancel={hideModal}
            footer={null}
        >
            <Title level={4}>{t('payment_detail')}</Title>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "100%" }} align="start">
                    <p style={{ fontSize: "14px" }} >{t('t_total')}</p>
                </div>
                <div align="end" style={{ width: "100%" }}>
                    <p style={{ fontSize: "14px" }} >{priceInVn(order.price_info.base_price)}</p>
                </div>
            </div>
            {order && order.price_info && order.price_info.host_promo ?
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "100%" }} align="start">
                        <p style={{ fontSize: "14px" }} >{t('t_promo')}</p>
                    </div>
                    <div align="end" style={{ width: "100%" }}>
                        <p style={{ fontSize: "14px" }} >-{priceInVn(order.price_info.host_promo)}</p>
                    </div>
                </div>
                : null}
            {order && order.price_info && order.price_info.coupon_amount ?
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "100%" }} align="start">
                        <p style={{ fontSize: "14px" }} >{t('t_coupon')}</p>
                    </div>
                    <div align="end" style={{ width: "100%" }}>
                        <p style={{ fontSize: "14px" }} >-{priceInVn(order.price_info.coupon_amount)}</p>
                    </div>
                </div>
                : null}
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "100%" }} align="start">
                    <p style={{ fontSize: "16px", fontWeight: "500" }} >{t('total_pay')}</p>
                </div>
                <div align="end" style={{ width: "100%" }}>
                    <p style={{ fontSize: "16px" }} >{priceInVn(order.price_info.payment)}</p>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "100%" }} align="start">
                </div>
                <div align="end" style={{ width: "100%" }}>
                    <p style={{ fontSize: "14px", color: "#999" }} >{t('taxes_and_fees_included')}</p>
                </div>
            </div>

        </Modal>
    )
}

export default withTranslation('order')(ModalPriceInfo);