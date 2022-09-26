import React, { useState } from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import { login } from '../../redux/actions/auth';
import ConfirmResetPassword from './ConfirmResetPassword';
import { NotiError } from '../NotificationElement/NotiError';
import { useDispatch } from 'react-redux';
import LoginWithFacebook from './LoginWithFacebook';
import { withTranslation, Link, Router } from '../../i18n';
import LoginWithGoogle from './LoginWithGoogle';
import LoginWithApple from './LoginWithApple';

function LoginWithMail(props) {
    const { t } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [resetPass, setResetPass] = useState(false);
    const [form] = Form.useForm();
    var { next, keepStaying } = props;

    const handleSubmit = values => {
        setLoading(true);
        var data = {
            email: values.email,
            password: values.password,
        }
        dispatch(login({ data, option: { type: "email" } }, "client/auth/login")).then(res => {
            setLoading(false)
            if (keepStaying) {
              props.loginSuccess()
            }
            else {
                if (next) {
                    let query = { ...next };
                    delete query.nextpathname; delete query.nextaspath;
                    next.nextaspath ? Router.push({ pathname: next.nextpathname, query: { ...query } }, next.nextaspath) : Router.push({ pathname: next.nextpathname, query: { ...query } });

                }
                else Router.push('/');
            }
        })
            .catch(err => {
                NotiError(t('login_error'), t('err_try_again'));
                setLoading(false)
            })
    };

    return (
        <React.Fragment>
            <Form onFinish={handleSubmit} className="login-form" form={form}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: t('email_not_valid'),
                        },
                        {
                            required: true,
                            message: t('email_required'),
                        },
                    ]}
                    normalize={value => value.trim()}
                >
                    <Input placeholder={t('email_address')} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('password_required'),
                        }
                    ]}
                >
                    <Input.Password placeholder={t("password")} />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="ct-btn-login">{t('login')}</Button>
                    <div style={{ textAlign: "center" }}>
                        <a className="login-form-forgot" onClick={() => setResetPass(true)}>{t('forgot_password')}?</a>
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className="diff-login"><span>{t('or')}</span></div>
                    <Row gutter={[10, 10]}>
                        <Col span={8}>
                            <LoginWithFacebook
                                next={props.next}
                                keepStaying={props.keepStaying}
                                loginSuccess={props.loginSuccess}
                            />
                        </Col>
                        <Col span={8}>
                            <LoginWithGoogle
                                next={props.next}
                                keepStaying={props.keepStaying}
                                loginSuccess={props.loginSuccess}
                            />
                        </Col>
                        <Col span={8}>
                            <LoginWithApple
                                next={props.next}
                                keepStaying={props.keepStaying}
                                loginSuccess={props.loginSuccess}
                            />
                        </Col>
                    </Row>
                </Form.Item>
                <div>
                    <span>{t('no_account_yet')}<a onClick={() => Router.push({ pathname: "/registration", query: { ...next } })}>{t('registration')}</a> {t('now')}!</span>
                </div>
            </Form>

            <ConfirmResetPassword
                visible={resetPass}
                handleCancel={() => setResetPass(false)}
                email={form.getFieldValue('email')}
            ></ConfirmResetPassword>
        </React.Fragment>
    );
}


export default withTranslation("auth")(LoginWithMail);