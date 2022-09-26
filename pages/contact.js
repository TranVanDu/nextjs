import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from '../i18n';
import { Button,Typography,Divider, Card, Row, Col,Menu, Dropdown  } from 'antd';
import { AppLayout } from '../layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt,faGlobe,faEnvelope,faPhoneAlt,faFax } from '@fortawesome/free-solid-svg-icons';

const { Title, Link } = Typography;

const Contact= (props) => {
    var { t } = props;
    const config = useSelector(state => state.config)

    return (
        <AppLayout>
            <div className="img-banner d-none d-md-block">
                <div className="img-contact">
                <img src={require('../public/static/images/team-building.jpg')} />
                </div>
                <span className="banner-name">Liên hệ</span>
            </div>
        <div className="container contact-page">
        
            <Title className="text-uppercase contact-title" level={3}>{t('Contact_title')}</Title>
            <Row>
                <Col xs={24} md={12} className="pr-60">
                        <Title level={4}>{t('company_name')}</Title>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"/><span>{t('company_address')}</span></p>
                        <p><FontAwesomeIcon icon={faPhoneAlt} className="mr-2"/><span>{t('company_phone')}: {config.contact_phone}</span></p>
                        <p><FontAwesomeIcon icon={faFax} className="mr-2"/><span>{t('company_hotline')}: {config.hotline}</span></p>
                        <p><FontAwesomeIcon icon={faEnvelope} className="mr-2"/><span>{t('company_email')}: {config.cs_email}</span></p>
                        <p><FontAwesomeIcon icon={faGlobe} className="mr-2"/><span>{t('company_web')}</span></p>

                </Col>
                <Col xs={24} md={12}>
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.51615797406!2d105.75495841424429!3d20.97193699509318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453058704bfeb%3A0x30c3fe30178cc13f!2zSGFpIFBoYXQgTGFuZCAtIEPDtG5nIHR5IEPhu5UgcGjhuqduIMSQ4bqndSB0xrAgdsOgIEtpbmggZG9hbmggQuG6pXQgxJHhu5luZyBz4bqjbiBI4bqjaSBQaMOhdA!5e0!3m2!1sen!2s!4v1613639003613!5m2!1sen!2s" width="600" height="300" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </Col>
            </Row>
        </div>            
        </AppLayout>
    )
}
export default withTranslation('common')(Contact);