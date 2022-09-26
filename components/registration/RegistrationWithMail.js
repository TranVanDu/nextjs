import React, { useState } from 'react';
import { Input, Button, Row, Col, Form } from 'antd';
import { login } from '../../redux/actions/auth';
import { getCookie } from '../../helpers/cookie';
import { getErrCheckPassword } from '../../helpers/password_validator';
import { NotiError } from '../NotificationElement/NotiError';
import { withTranslation, Link, Router } from '../../i18n';
import { useDispatch } from 'react-redux';
import LoginWithApple from '../login/LoginWithApple';
import LoginWithGoogle from '../login/LoginWithGoogle';
import LoginWithFacebook from '../login/LoginWithFacebook';
import { requestCheckExistMail } from '../../requests/auth';



function RegistrationWithMail(props) {

    const [loadingMail, setLoadingMail] = useState(false);
    const { t } = props;
    const dispatch = useDispatch();
    var { next, keepStaying } = props;

    const checkingPassword = (rule, value, callback) => {
        if (value) {
            if (getErrCheckPassword(value)) {
                return Promise.reject(t(getErrCheckPassword(value)));
            }
            else {
                return Promise.resolve();
            }
        }
        else return Promise.resolve();
    };

    const checkmail = (rule, value, callback) => {
        if (value) {
            requestCheckExistMail(value.toString().trim()).then(res => {
                return Promise.resolve();
            })
                .catch(err => {
                    // console.log(err)
                    return Promise.reject(t('email_exist'));
                })
        }
        return Promise.resolve();
    };


    const handleSubmit = values => {
        // console.log(values);
        setLoadingMail(true);
        var data = {
            email: values.email,
            password: values.password,
        }
        let invitation_code = getCookie("invitation_code");
        if (invitation_code) data.invite_code = invitation_code;
        dispatch(login({ data, option: { type: "email" } }, "client/auth/register")).then(async res => {
            setLoadingMail(false);
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
                // console.log(err);
                NotiError(t('signup_error'), err.data.msg);
                setLoadingMail(false);
            })

    };


    return (
        <Form onFinish={handleSubmit} className="login-form">
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
                    {
                        validator: checkmail,
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
                    },
                    {
                        validator: checkingPassword,
                    },
                ]}
            >
                <Input.Password placeholder={t("password")} />
            </Form.Item>
            <Form.Item>
                <Button loading={loadingMail} type="primary" htmlType="submit" className="ct-btn-login">{t('register')}</Button>
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
                <span>{t('already_have_a_2stay_account')}&nbsp;<a onClick={() => Router.push({ pathname: "/login", query: { ...next } })} >{t('login')}</a>&nbsp;{t('now')}!</span>
            </div>
        </Form>
    );
}


export default withTranslation("auth")(RegistrationWithMail);