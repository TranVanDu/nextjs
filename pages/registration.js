import React, { Component, useEffect } from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import RegistrationWithMail from '../components/registration/RegistrationWithMail';
import RegistrationWithPhone from '../components/registration/RegistrationWithPhone';
import { AppLayout } from '../layout';
import { withTranslation, Router } from '../i18n';
import { useLoginToken } from '../components/login/useLoginToken';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;
function Registration(props) {
    const { user, loading } = useLoginToken();
    const router = useRouter();
    useEffect(() => {
        if (!loading) {
            if (user) {
                Router.push('/')
            }
        }
    }, [loading])

    const { query } = router;
    var next = query ? query.nextpathname ? query : null : null;

    const { t } = props;
    return (
        <AppLayout
            title={t('register')}
        >
            <div className="login">
                <div className="box-login">
                    <div className="login-content">
                        <h3 className="title-login">{t('register')}</h3>

                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={<span><MailOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('email_address')}</span></span>}
                                key="1"
                            >
                                <RegistrationWithMail next={next}></RegistrationWithMail>
                            </TabPane>
                            <TabPane
                                tab={<span><PhoneOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('phone_number')}</span></span>}
                                key="2"
                            >
                                <RegistrationWithPhone next={next}></RegistrationWithPhone>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                <div className="container text-center mb-4">
                    <small>{t('signin_agree_description')} <a href="/blog/dieu-khoan-su-dung/">{t('term_of_use')}</a> {t('and')} <a href="/blog/chinh-sach-bao-mat/">{t('privacy_policy')}</a> {t('of_2stay')}</small>
                </div>
            </div>
        </AppLayout>
    );
}
export default withTranslation("user_task")(Registration);