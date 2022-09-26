import React from 'react';
import { withTranslation } from '../../i18n';
import { Button, Modal } from 'antd';


function ModalContactInfo(props) {
    var { t, order, visible, hideModal } = props;

    if (!order) return null;
    var { supplier } = order;
    return (
        <Modal
            title={t('contact_host')}
            centered
            visible={visible}
            onOk={() => hideModal}
            onCancel={hideModal}
            footer={[
                <Button type="primary" onClick={hideModal}>
                    {t('close')}
                </Button>
            ]}
        >
            <p><span className="text-bold mr-2">{t('name')}: </span> <span>{supplier ? supplier.company : ''}</span></p>
            <p><span className="text-bold mr-2">{t('phone')}: </span> <span>{supplier ?  `${supplier.phone_code}${supplier.mobile}` : ''}</span></p>
            <p><span className="text-bold mr-2">Email: </span> <span>{supplier ? supplier.email : ''}</span></p>
        </Modal>
    )
}

export default withTranslation('order')(ModalContactInfo);