import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Divider, Form, Input, DatePicker } from 'antd';
import { withTranslation } from '../../i18n';

const FlightContactForm = (props) => {
    var { t, ref } = props;

    return (
        <Card className="mb-2">
            <Row gutter={16}>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('first_name')} name="contact_firstName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('last_name')} name="contact_lastName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('phone')} name="contact_phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('email')} name="contact_email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label={t('order_note')} name="notes" rules={[{ required: false }]}>
                <Input.TextArea />
            </Form.Item>
        </Card>
    )
}

export default withTranslation('flight')(FlightContactForm);