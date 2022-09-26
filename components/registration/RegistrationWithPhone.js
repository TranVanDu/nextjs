import React, { useState } from 'react';
import { Button, Spin, Form, Row, Col } from 'antd';
import { login } from '../../redux/actions/auth';
import Router from 'next/router';
import { getCookie } from '../../helpers/cookie';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import ReactCodeInput from 'react-verification-code-input';
import { firebase } from '../../firebase';
import { NotiError } from '../NotificationElement/NotiError';
import { withTranslation } from '../../i18n';
import { useDispatch } from 'react-redux';
import LoginWithFacebook from '../login/LoginWithFacebook';
import LoginWithGoogle from '../login/LoginWithGoogle';
import LoginWithApple from '../login/LoginWithApple';



function RegistrationWithPhone(props) {
    const { t } = props;
    const dispatch = useDispatch();
    const [loadingPhone, setLoadingPhone] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);
    const [loadingRePhone, setLoadingRePhone] = useState(false)
    const [i, setI] = useState(0);
    const [data, setData] = useState({
        phone: "",
        phoneSub: "+84",
        code: "",
        phone_code: ""
    })
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [disableSendCode, setDisableSendCode] = useState(true);
    const [hideCode, setHideCode] = useState(true)
    var { next, keepStaying } = props;

    const submitPhoneNumberAuth = () => {
        var phoneNumber = `+${data.phoneSub.toString()}`
        if (phoneNumber) {
            setLoadingPhone(true);
            setI(i => i + 1);
            var d = document.createElement("div");
            d.id = `recaptcha-container-${i}`;
            document.getElementById("recaptcha-container").appendChild(d);
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                `recaptcha-container-${i}`,
                {
                    size: "invisible",
                    callback: function (response) {
                        // console.log(response);
                        // this.submitPhoneNumberAuth();
                    }
                }
            );
            var appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                    window.confirmationResult = confirmationResult;
                    setHideCode(false);
                    setLoadingPhone(false);
                })
                .catch(function (error) {
                    // console.log(error);
                    NotiError(t('error_verify_phone_number'), error.message);
                    setLoadingPhone(false);
                    window.recaptchaVerifier.render().then(function (widgetId) {
                        grecaptcha.reset(widgetId);
                    })
                });
        }
    }

    const reSubmitPhoneNumberAuth = () => {
        var phoneNumber = `+${data.phoneSub.toString()}`
        if (phoneNumber) {
            setLoadingRePhone(true);
            setI(i => i + 1);
            var d = document.createElement("div");
            d.id = `recaptcha-container-${i}`;
            document.body.appendChild(d);
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                `recaptcha-container-${i}`,
                {
                    size: "invisible",
                    callback: function (response) {
                        // console.log(response);
                        // this.submitPhoneNumberAuth();
                    }
                }
            );
            var appVerifier = window.recaptchaVerifier;
            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                    window.confirmationResult = confirmationResult;
                    setHideCode(false);
                    setLoadingRePhone(false);
                })
                .catch(function (error) {
                    // console.log(error);
                    NotiError(t("error_verify_phone_number"), error.message);
                    setLoadingRePhone(false)
                    window.recaptchaVerifier.render().then(function (widgetId) {
                        grecaptcha.reset(widgetId);
                    })
                });
        }
    }

    const submitPhoneNumberAuthCode = (values) => {
        var code = data.code.toString();
        setLoadingCode(true);
        confirmationResult
            .confirm(code)
            .then(function (result) {
                var user = result.user;
                // console.log("user", user)
                var dataSubmit = {
                    mobile: data.phone,
                    phone_code: `+${data.phone_code}`,
                    firebase_id: user.uid
                }
                // console.log("dataSubmit", dataSubmit)
                let invitation_code = getCookie("invitation_code");
                if (invitation_code) dataSubmit.invite_code = invitation_code;
                dispatch(login({ data: dataSubmit, option: { type: "phone" } }, "client/auth/login")).then(res => {
                    setLoadingCode(false);
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
                        setLoadingCode(false);
                        // console.log(err)
                        NotiError(t('login_error'), err.message);
                    })
            })
            .catch(function (error) {
                // console.log(error);
                NotiError(t("error_verify_phone_number"), error.message);
                setLoadingCode(false);
            });
    }

    const onChangeCode = (v) => {
        setData(data => { return { ...data, code: v.toString() } });
        setDisableSubmit(v.toString().length < 6)
    }

    const onChangePhone = (phone, dataPhone) => {
        setData(data => {
            return {
                ...data,
                phone: phone.replace(/[^0-9]+/g, '').slice(dataPhone.dialCode.length),
                phoneSub: phone,
                countryCode: dataPhone.countryCode,
                phone_code: dataPhone.dialCode.toString()
            }
        });
        setDisableSendCode(phone.length < 4)
    }


    return (
        <Form onFinish={submitPhoneNumberAuthCode} className="login-form">
            <Form.Item className="ct-select-signup">
                <PhoneInput
                    disableSearchIcon={true}
                    enableSearch={true}
                    searchNotFound='No Results Found'
                    searchPlaceholder='Search'
                    country={'vn'}
                    value={data.phoneSub}
                    onChange={onChangePhone}
                    inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                    }}
                    autoFormat={false}
                    countryCodeEditable={false}
                    containerStyle={{ height: "32px" }}
                    inputStyle={{ height: "32px" }}
                    searchStyle={{}}
                />
            </Form.Item>
            {hideCode ?
                <Form.Item>
                    <Button type="primary"
                        htmlType="button"
                        loading={loadingPhone}
                        disabled={disableSendCode}
                        onClick={submitPhoneNumberAuth}
                        id="sign-in-button-recaptcha"
                        className="ct-verify"
                    >{t('send_verification_code')}</Button>
                    <div id="recaptcha-container"><div></div></div>
                </Form.Item>
                : null}

            {hideCode ? null :
                <Form.Item>
                    <p className="enter-code-send">{t('enter_the_code_sent_to')}&nbsp;{loadingRePhone ? <Spin></Spin> : <a style={{ color: "#38c860", marginLeft: "4px" }} onClick={reSubmitPhoneNumberAuth}>{t('resend')}</a>}</p>
                    <ReactCodeInput
                        fieldHeight={32}
                        fieldWidth={350 / 6}
                        onChange={onChangeCode}
                    />
                </Form.Item>
            }
            <Form.Item>

                <Button type="primary"
                    loading={loadingCode}
                    htmlType="submit"
                    disabled={disableSubmit}
                    className="ct-btn-login"
                >{t('register')}</Button>
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
                <span>{t('already_have_a_2stay_account')}&nbsp;<a onClick={() => Router.push({ pathname: "/login", query: { ...next } })}>{t('login')}</a>&nbsp;{t('now')}!</span>
            </div>
        </Form>
    );
}


export default withTranslation("auth")(RegistrationWithPhone);