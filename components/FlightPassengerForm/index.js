import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Divider, Form, Input, DatePicker } from 'antd';
import { withTranslation } from '../../i18n';
import moment from 'moment';
import BaseSelect from '../../components/BaseSelect';

const FlightPassengerForm = (props) => {
    var { t, title, name, index } = props;

    const disableDate = (date) => {
        if (name == 'adults') return moment(date) >= moment().subtract('12', 'years');
        else if (name == 'childrens') return moment(date) < moment().subtract('12', 'years') || moment(date) >= moment().subtract('2', 'years');
        else return moment(date) < moment().subtract('2', 'years'); 
    }

    const renderExtraFooter = () => {
        if (name == 'adults') return `${t('choose_date_before')} ${moment().subtract('12', 'years').format('DD/MM/YYYY')}` ;
        else if (name == 'childrens') return `${t('choose_date_between')} ${moment().subtract('2', 'years').format('DD/MM/YYYY')} ${t('and')} ${moment().subtract('12', 'years').format('DD/MM/YYYY')}`;
        else return `${t('choose_date_after')} ${moment().subtract('2', 'years').format('DD/MM/YYYY')}`; 
    }

    return (
        <Card className="mb-2" title={title}>
            <Row gutter={16}>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('first_name')} name={`${name}[${index}]['first_name']`} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('last_name')} name={`${name}[${index}]['last_name']`} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('gender')} name={`${name}[${index}]['gender']`} rules={[{ required: true }]}>
                        <BaseSelect
                            options={[
                                { title: t('male'), id: 1 },
                                { title: t('female'), id: 0 },
                            ]}
                            defaultText={t('choose_gender')}
                        />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label={t('birthday')} name={`${name}[${index}]['birthday']`} rules={[{ required: name != 'adults' }]}>
                        <DatePicker style={{ width: '100%' }} disabledDate={disableDate} renderExtraFooter={renderExtraFooter} showToday={false} />
                    </Form.Item>
                </Col>
            </Row>
            {
                name == 'adults' ? (
                    <Row gutter={16}>
                        <Col md={12} sm={24} xs={24}>
                            <Form.Item label={t('phone')} name={`${name}[${index}]['phone']`} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                        </Col>
                    </Row>
                ) : null
            }
        </Card>
    )
}

export default withTranslation('flight')(FlightPassengerForm);