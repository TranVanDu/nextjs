import React, { useState } from 'react';
import { Row, Col, Form, message, Select, Spin, Tooltip, Modal } from 'antd';
import { Layout, Typography, Input, Button } from 'antd';
import { i18n, withTranslation, Router } from '../../i18n';
import { updateUserInformation } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import dataCodeNumberPhone from "../share/dataCodeNumberPhone";
import BaseSelect from '../BaseSelect';
import { CheckCircleOutlined } from '@ant-design/icons';
import { requestVerifyMailProfile } from '../../requests/auth';
const { Content } = Layout;
const { Title } = Typography;
var dataPhone = dataCodeNumberPhone.map(item => {
    return {
        id: item.dial_code,
        title: `${item.name} (${item.dial_code})`
    }
})

function Setting(props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const { t } = props;

    const handleSubmit = values => {
        let { firstname, lastname, phone_code, mobile, email, lang } = values;
        if (user && (firstname != user.firstname || lastname != user.lastname || phone_code != user.phone_code || mobile != user.mobile || email != user.email || lang != user.lang)) {
            var submitData = { ...values, id: user.id };
            setLoading(true);
            dispatch(updateUserInformation(submitData)).then(res => {
                setLoading(false);
                message.success(t('update_success'));
            })
                .catch(err => {
                    setLoading(false);
                    message.error(t('update_fail'));
                })
        }
    };

    const verifyEmail = async () => {
        if (user) {
            setLoadingVerify(true);
            try {
                await requestVerifyMailProfile({ email: user.email });
                setLoadingVerify(false);
                Modal.success({
                    content: t('send_verify_email_success')
                });
            } catch (error) {
                setLoadingVerify(false);
                message.error(t('send_verify_email_fail'))
            }
        }
    }

    return (
        <Content>
            <div className="db-content pdtop-20">
                <div className="my-dashboard" style={{ marginBottom: '20px' }}>
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('account_information')}</Title>
                        <p className="title-desc-my-db">{t('account_infomation_sub_title')}</p>
                    </div>
                    {!user ?
                        <Spin>
                            <Form
                                className="form-infor-account"
                                onFinish={handleSubmit}
                                initialValues={user}
                            >
                                <p className="account-input-lable">{t('full_name')}</p>
                                <Row gutter={16}>
                                    <Col sm={12} xs={24}>
                                        <Form.Item
                                            name="firstname"
                                            rules={[{ required: true, message: t('first_name_required') }]}
                                        >
                                            <Input
                                                placeholder={t('first_name')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col sm={12} xs={24}>
                                        <Form.Item
                                            name="lastname"
                                            rules={[{ required: true, message: t('last_name_required') }]}
                                        >
                                            <Input
                                                placeholder={t('last_name')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <p className="account-input-lable">{t('phone_number')}</p>
                                <Row gutter={16}>
                                    <Col sm={8} xs={24}>
                                        <Form.Item
                                            name="phone_code"
                                            rules={[{ required: true, message: t('phone_code_required') }]}
                                        >
                                            <BaseSelect
                                                className="setting-select"
                                                options={dataPhone}
                                                defaultText={t('phone_code')}
                                                filterOption={(input, option) =>
                                                    option.props.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                                showSearch={true}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col sm={16} xs={24}>
                                        <Form.Item
                                            name="mobile"
                                            rules={[{ required: true, message: t('phone_number_requied') }]}
                                        >
                                            <Input
                                                placeholder={t("phone_number")}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <p className="account-input-lable">{t('email_address')}</p>
                                <Row gutter={16}>
                                    <Col sm={24} xs={24}>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: t('email_not_valid'),
                                                },
                                                { required: true, message: t('email_required') }

                                            ]}
                                            normalize={value => value.trim()}
                                        >
                                            <Input
                                                placeholder={t('email_address')} className="input-width-40"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <p className="account-input-lable">{t('lang')}</p>
                                <Row gutter={16}>
                                    <Col sm={24} xs={24}>
                                        <Form.Item
                                            name="lang"
                                        >
                                            <Select
                                                placeholder={t('lang')} className="input-width-40"
                                            >
                                                <Select.Option value="VI">Tiếng Việt</Select.Option>
                                                <Select.Option value="EN">English</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    style={{ borderRadius: "3px" }}
                                >{t('save')}</Button>
                            </Form>
                        </Spin>
                        :
                        <Form
                            className="form-infor-account"
                            onFinish={handleSubmit}
                            initialValues={user}
                        >
                            <p className="account-input-lable">{t('full_name')}</p>
                            <Row gutter={16}>
                                <Col sm={12} xs={24}>
                                    <Form.Item
                                        name="firstname"
                                        rules={[{ required: true, message: t('first_name_required') }]}
                                    >
                                        <Input
                                            placeholder={t('first_name')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col sm={12} xs={24}>
                                    <Form.Item
                                        name="lastname"
                                        rules={[{ required: true, message: t('last_name_required') }]}
                                    >
                                        <Input
                                            placeholder={t('last_name')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <p className="account-input-lable">{t('phone_number')}</p>
                            <Row gutter={16}>
                                <Col sm={8} xs={24}>
                                    <Form.Item
                                        name="phone_code"
                                        rules={[{ required: true, message: t('phone_code_required') }]}
                                    >
                                        <BaseSelect
                                            className="setting-select"
                                            options={dataPhone}
                                            defaultText={t('phone_code')}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                            showSearch={true}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col sm={16} xs={24}>
                                    <Form.Item
                                        name="mobile"
                                        rules={[{ required: true, message: t('phone_number_requied') }]}
                                    >
                                        <Input
                                            placeholder={t("phone_number")}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <p className="account-input-lable">{t('email_address')} {user && user.email_verified == 1 ? <Tooltip placement="top" title={t('email_verified')}><CheckCircleOutlined className="icon-verified" /></Tooltip> : null}</p>
                            <Row gutter={16}>
                                <Col sm={24} xs={24}>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: t('email_not_valid'),
                                            },
                                            { required: true, message: t('email_required') }

                                        ]}
                                        normalize={value => value.trim()}
                                    >
                                        <Input
                                            placeholder={t('email_address')} className="input-width-40"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <p className="account-input-lable">{t('lang')}</p>
                            <Row gutter={16}>
                                <Col sm={24} xs={24}>
                                    <Form.Item
                                        name="lang"
                                    >
                                        <Select
                                            placeholder={t('lang')} className="input-width-40"
                                        >
                                            <Select.Option value="VI">Tiếng Việt</Select.Option>
                                            <Select.Option value="EN">English</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ borderRadius: "3px" }}
                            >{t('save')}</Button>
                            {
                                user && user.email && user.email_verified == 0 ?
                                    <Button
                                        loading={loadingVerify}
                                        style={{ borderRadius: "3px", marginLeft: "20px" }}
                                        onClick={() => verifyEmail()}
                                    >{t('verify_email')}</Button>
                                    : null
                            }
                        </Form>
                    }
                </div>

            </div>
        </Content>
    )
}

export default withTranslation('user_task')(Setting);
