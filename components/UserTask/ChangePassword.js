import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Typography, Input, Button, Form, Col, Row, message } from 'antd';
import { getErrCheckPassword } from '../../helpers/password_validator';
import { ModalSuccess } from '../../components/NotificationElement/ModalSuccess';
import { withTranslation } from '../../i18n';
import { requestChangePassword } from '../../requests/auth';

const { Content } = Layout;
const { Title } = Typography;

function ChangePassword(props) {
    const [loading, setLoading] = useState(false);
    const [confirmDirty, setConfirmDirty] = useState(false);
    const { t } = props;
    const [form] = Form.useForm();
    const user = useSelector(state => state.auth.user);

    const handleSubmit = values => {
        var data = {
            old_password: values.old_password || '',
            new_password: values.new_password
        }
        setLoading(true);
        requestChangePassword(data).then(res => {
            setLoading(false);
            ModalSuccess(t('change_password_success'), t('change_password_success_content'), () => { window.location.href = "/login" })
        })
            .catch(err => {
                setLoading(false);
                message.error(t('update_fail'))
            })

    };

    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setConfirmDirty(confirmDirty || !!value);
    }


    const compareToFirstPassword = (rule, value) => {
        if (value && value !== form.getFieldValue('new_password')) {
            return Promise.reject(t('two_passwords_that_you_enter_is_inconsistent'));
        } else {
            if (value) {
                if (getErrCheckPassword(value)) {
                    return Promise.reject(t(getErrCheckPassword(value)));
                }
                else return Promise.resolve();
            }
            return Promise.resolve();
        }
    };

    const validateToNextPassword = (rule, value) => {
        if (value && form.getFieldValue('confirm_password') && value !== form.getFieldValue('confirm_password')) {
            return Promise.reject(t('two_passwords_that_you_enter_is_inconsistent'));
        }
        if (value) {
            if (getErrCheckPassword(value)) {
                return Promise.reject(t(getErrCheckPassword(value)));
            }
            else return Promise.resolve();
        }
        return Promise.resolve();
    };


    return (
        <Content>
            <div className="db-content pdtop-20">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('change_password')}</Title>
                        <p className="title-desc-my-db">{t('password_rule')}</p>
                    </div>
                    <Row>
                        <Col md={16} xs={24} sm={24}>
                            <Form onFinish={handleSubmit} form={form} layout="vertical" onFinishFailed={({ values, errorFields, outOfDate }) => console.log("aa fail", { values, errorFields, outOfDate })}>
                                {
                                    user && user.password ? (
                                        <Form.Item
                                            name="old_password"
                                            label={t('current_password')}
                                            rules={[
                                                { required: true, message: t('current_password_required') },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder={t('current_password')}
                                            />
                                        </Form.Item>
                                    ) : (
                                        <Form.Item
                                            name="old_password"
                                            className="d-none"
                                        >
                                            <Input.Password
                                                placeholder={t('current_password')}
                                            />
                                        </Form.Item>
                                    )
                                }
                                <Form.Item
                                    name="new_password"
                                    label={t('new_password')}
                                    rules={[
                                        { required: true, message: t('new_password_required') },
                                        {
                                            validator: validateToNextPassword,
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={t('new_password')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmpass"
                                    label={t('confirm_password')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('confirm_password_required'),
                                        },
                                        {
                                            validator: compareToFirstPassword,
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={t("confirm_password")} onBlur={handleConfirmBlur}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ borderRadius: "3px" }} loading={loading}>{t('save')}</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </Content>
    )
}


export default withTranslation('user_task')(ChangePassword);