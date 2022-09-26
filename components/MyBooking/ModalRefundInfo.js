import React from 'react';
import { Divider, Typography, Modal } from 'antd';
import { withTranslation } from '../../i18n';
import { priceInVn } from '../../helpers/helpers';

const { Title } = Typography;

function ModalRefundInfo(props) {
    var { t, order, visible, hideModal } = props;

    if (!order) return null;
    return (
        <Modal
            visible={visible}
            onCancel={hideModal}
            footer={null}
        >
            <Title level={4}>{t('refund_info')}</Title>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "100%" }} align="start">
                    <p style={{ fontSize: "16px", fontWeight: "500" }} >{t('total_refund')}</p>
                </div>
                <div align="end" style={{ width: "100%" }}>
                    <p style={{ fontSize: "16px" }} >{priceInVn(order.refund_amount)}</p>
                </div>
            </div>
        </Modal>
    )
}

export default withTranslation('order')(ModalRefundInfo);