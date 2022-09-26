import React, { Component, useEffect } from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import LoginWithMail from '../components/login/LoginWithMail';
import LoginWithPhone from '../components/login/LoginWithPhone';
import { withRouter } from 'next/router'
import { AppLayout } from '../layout';
import { i18n, withTranslation, Router } from '../i18n';
import { useRouter } from 'next/router'
import { useLoginToken } from '../components/login/useLoginToken';
const { TabPane } = Tabs;


function Login(props) {
    const { user, loading } = useLoginToken();
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (user) {
                Router.push('/')
            }
        }
    }, [loading])


    // query = {
    //     nextpathname,
    //     nextquery,
    //     nextaspath
    // }

    const { query } = router;
    console.log(query)
    var next = query ? query.nextpathname ? query : null : null;
    const { t } = props;


    return (
        <AppLayout
            title={t('login')}
        >
            <div className="login">
                <div className="box-login">
                    <div className="login-content">
                        <h3 className="title-login">{t('login')}</h3>

                        <Tabs defaultActiveKey="1" centered={true}>
                            <TabPane
                                tab={<span><MailOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('email_address')}</span></span>}
                                key="1"
                            >
                                <LoginWithMail next={next}></LoginWithMail>
                            </TabPane>
                            <TabPane
                                tab={<span><PhoneOutlined style={{ fontSize: "18px", marginRight: "5px" }} /><span>{t('phone_number')}</span></span>}
                                key="2"
                            >
                                <LoginWithPhone next={next}></LoginWithPhone>
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


export default withTranslation("user_task")(Login);