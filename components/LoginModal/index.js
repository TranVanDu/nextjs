import React, { Component } from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import LoginWithMail from '../../components/login/LoginWithMail';
import LoginWithPhone from '../../components/login/LoginWithPhone';
import { i18n, withTranslation, Link } from '../../i18n';

const { TabPane } = Tabs;

function LoginModal(props) {

    const { t } = props;

    return (
        <div className="login-content">
            <Tabs defaultActiveKey="1" centered={true}>
                <TabPane
                    tab={<span><MailOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('email_address')}</span></span>}
                    key="1"
                >
                    <LoginWithMail keepStaying={true} loginSuccess={props.loginSuccess}></LoginWithMail>
                </TabPane>
                <TabPane
                    tab={<span><PhoneOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('phone_number')}</span></span>}
                    key="2"
                >
                    <LoginWithPhone keepStaying={true} loginSuccess={props.loginSuccess}></LoginWithPhone>
                </TabPane>
            </Tabs>
            <div className="mt-3">
                <small>{t('signin_agree_description')} <a href="/blog/dieu-khoan-su-dung/">{t('term_of_use')}</a> {t('and')} <a href="/blog/chinh-sach-bao-mat/">{t('privacy_policy')}</a> {t('of_2stay')}</small>
            </div>
        </div>
    );
}



export default withTranslation("common")(LoginModal);