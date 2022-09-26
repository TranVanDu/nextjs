import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, List, Input, Divider } from 'antd';
import { withTranslation, Link } from '../i18n';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subscribeNews } from '../requests/stay';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AppFooter = (props) => {
    var { t } = props;

    const footerFirstBlockContent = [
        { url: 'https://2stay.vn/blog/ve-chung-toi/', label: t('about_us') },
        { url: 'https://2stay.vn/blog/', label: t('blog') },
        { url: 'https://2stay.vn/blog/co-hoi-nghe-nghiep/', label: t('career_opportunities') },
    ];
    const footerSecondBlockContent = [
        { url: 'https://2stay.vn/blog/dieu-khoan-su-dung/', label: t('term_of_use') },
        { url: 'https://2stay.vn/blog/chinh-sach-bao-mat/', label: t('privacy_policy') },
        { url: 'https://2stay.vn/blog/quy-dinh/', label: t('regulations') },
    ];
    const footerThirdBlockContent = [
        { url: 'https://2stay.vn/blog/doi-tac-lien-ket/', label: t('affiliate_partner') },
        { url: 'https://2stay.vn/blog/hop-tac-voi-chung-toi/', label: t('cooperate_with_us') },
    ];
    const footerFourthBlockContent = [
        { url: 'https://2stay.vn/blog/phan-hoi/', label: t('feedback') },
        { url: '/contact', label: t('contact') },
    ];
    const socialElements = [
        { url: 'https://www.facebook.com/2Stay-103520545126329', icon: require('../public/static/images/facebook.png'), color: '#fff' },
        { url: 'https://www.youtube.com/channel/UCMXmIlB4LeURLjURGHX7uWQ', icon: require('../public/static/images/youtube.png'), color: '#fff' },
        { url: 'https://www.instagram.com/2stayvn/', icon: require('../public/static/images/instagram.png'), color: '#fff' },
        { url: 'https://twitter.com/2Stay2Stay', icon: require('../public/static/images/twitter.png'), color: '#fff' },
    ];

    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [sending, setSending] = useState(false);

    return (
        <div id="app_footer">
            <div className="container mb-4">
                <div className="logo">
                    <img src={require('../public/static/images/logo_hpl.png')} />
                    <img src={require('../public/static/images/logo_dark.png')} />
                </div>
                <div className="mt-2">
                    <div>
                        <Title level={4} className="footer--company_name">{t('company_name')}</Title>
                    </div>
                    {/* <div className="mt-2">
                        <div>{t('company_address')}</div>
                        <div>{t('company_description')}</div>
                    </div> */}
                </div>
                <div className="mt-4">
                    <Row>
                        <Col md={4} xs={24}>
                            <Title level={5}>{t('about_us')}</Title>
                            <List
                                dataSource={footerFirstBlockContent}
                                renderItem={item => (
                                    <div>
                                        <Link href={item.url}>{item.label}</Link>
                                    </div>
                                )}>
                            </List>
                        </Col>
                        <Col md={6} xs={24} className="mt-3 mt-md-0">
                            <Title level={5}>{t('term_of_use')}</Title>
                            <List
                                dataSource={footerSecondBlockContent}
                                renderItem={item => (
                                    <div>
                                        <Link href={item.url}>{item.label}</Link>
                                    </div>
                                )}>
                            </List>
                        </Col>
                        <Col md={4} xs={24} className="mt-3 mt-md-0">
                            <Title level={5}>{t('partner')}</Title>
                            <List
                                dataSource={footerThirdBlockContent}
                                renderItem={item => (
                                    <div>
                                        <Link href={item.url}>{item.label}</Link>
                                    </div>
                                )}>
                            </List>
                        </Col>
                        <Col md={4} xs={24} className="mt-3 mt-md-0">
                            <Title level={5}>{t('contact')}</Title>
                            <List
                                dataSource={footerFourthBlockContent}
                                renderItem={item => (
                                    <div>
                                        <Link href={item.url}>{item.label}</Link>
                                    </div>
                                )}>
                            </List>
                            <div className="mt-2">
                                {
                                    socialElements.map((item, index) => (
                                        <Link href={item.url} key={index}>
                                            <span>
                                                {/* <FontAwesomeIcon icon={item.icon} className="footer-icon" color={item.color} /> */}
                                                <img src={item.icon} className="footer-icon"/>
                                            </span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Col>

                        <Col md={6} xs={24} className="mt-3 mt-md-0">
                            <div >
                                <div className="text-center"><span><span className="text-bold text-xs">Du lịch thông minh! </span> Đăng ký nhận tin để lên kế hoạch cho kỳ nghỉ tới ngay từ bây giờ.</span></div>
                            </div>

                            <Row gutter={5} className="mt-2">
                                <Col span={16}>
                                    <Input placeholder={t('your_email')} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" onClick={(e) => {
                                        e.preventDefault();
                                        setSending(true);
                                        subscribeNews(email).then(res => {
                                            setIsSent(true);
                                            setSending(false);
                                        })
                                    }} disabled={sending} loading={sending}>{t('register')}</Button>
                                </Col>
                            </Row>
                            {isSent && <p className="text-center"><CheckCircleOutlined style={{ display: "inline-flex" }} /> <span>{t('subscribe_success')}</span></p>}

                        </Col>
                    </Row>
                </div>
                {/* <hr /> */}
            </div>
            <div id="app_footer--second">
                <div className="container text-center">
                    <p>{t('copyright')}</p>
                    <p>{t('copyright_1')}</p>
                    <p>{t('address')}</p>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('footer')(AppFooter);