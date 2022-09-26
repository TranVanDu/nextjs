import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Alert, Descriptions, Form, Upload, Row, Col } from 'antd';
import moment from 'moment';
import { withTranslation, Link } from '../../i18n';
import { UploadOutlined } from '@ant-design/icons';
import { priceInVn } from '../../helpers/helpers';
// request
import { uploadProofOfPayment } from '../../requests/order';
import { useSelector } from 'react-redux';

const OfflinePaymentModal = (props) => {
    var { t, order, visible, onCancel, onShowResult } = props;
    const [loading, setLoading] = useState(false);
    const config = useSelector(state => state.config)

    const onSubmit = async (values) => {
        setLoading(true);

        try {
            let formData = new FormData();
            formData.append('file', values.proof.file.originFileObj);
    
            await uploadProofOfPayment(order.id, formData);
            setLoading(false);
            onCancel();
            onShowResult();
        } catch (error) {
            console.log(error)
            Modal.error({
                title: t('upload_error'),
                content: t('upload_error_description')
            });
            setLoading(false);
        }
        
    }

    return (
        <Modal
            className="offline-payment-modal"
            visible={visible}
            footer={null}
            onCancel={() => onCancel()}
        >
            <Row gutter={0}>
                <Col md={14} sm={24} xs={24} className="p-4 offline-payment-instruction">
                    <Typography.Title level={4}>{t('offline_payment_instruction')}</Typography.Title>
                    <div>{t('offline_payment_note')}</div>
                    <div>{t('offline_payment_description')}</div>
                    <div className="bank-information">
                        <Descriptions title={config.bank_name} column={1}>
                            <Descriptions.Item label={t('bank_account_name')}>{config.bank_account_name}</Descriptions.Item>
                            <Descriptions.Item label={t('bank_account_number')}>{config.bank_account_number}</Descriptions.Item>
                            <Descriptions.Item label={t('content')}>{t('pay_for_order')}: {order.order_number}</Descriptions.Item>
                            <Descriptions.Item label={t('money_amount')}>{priceInVn(order.total)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
                <Col md={10} sm={24} xs={24} className="p-4">
                    <Typography.Title level={4}>{t('upload_payment_proof')}</Typography.Title>
                    <Form
                        layout="vertical"
                        onFinish={(values) => onSubmit(values)}
                    >
                        <Form.Item name="proof" label={t('upload_payment_proof_description')}>
                            <Upload
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>{t('submit')}</Button>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

OfflinePaymentModal.propTypes = {
}

OfflinePaymentModal.defaultProps = {
}

export default withTranslation('payment')(OfflinePaymentModal);