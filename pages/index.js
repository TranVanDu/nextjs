import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Menu, Typography, Row, Col, Tabs, Modal } from 'antd';
import { withTranslation, Link, Router, i18n } from '../i18n';
import { AppLayout } from '../layout';
import { StaySearchBox, TransportSearchBox, FlightSearchBox } from '../components/HomeSearchBox';
import BackgroundSlider from 'react-background-slider';
// api requests
import { getHomepageWidgets } from '../requests/widget';
import { requestGetConfig } from '../requests/config';
// widget
import Banner from '../components/widgets/Banner';
import CheckinPlaces from '../components/widgets/CheckinPlaces';
import Promotions from '../components/widgets/Promotions';
import Blog from '../components/widgets/Blog';
import TipsForHost from '../components/widgets/TipsForHost';
import FeaturedHomestays from '../components/widgets/FeaturedHomestay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCar, faPlaneDeparture } from '@fortawesome/pro-regular-svg-icons';
import { useWindowSize } from '../components/useWindowSize';
import Popup from '../components/Popup';
import Video from '../components/widgets/Video';
import StayWidget from '../components/widgets/StayWidget';
import PartnerLogo from '../components/PartnerLogo';

const { Title } = Typography;
const { TabPane } = Tabs;

const Homepage = (props) => {
    var { t, config } = props;
    const [widgets, setWidgets] = useState([]);
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [banners, setBanners] = useState([]);
    const [popupImage, setPopupImage] = useState(null);
    const [partnerLogos, setPartnerLogos] = useState([]);
    const [searchBoxComponent, setSearchBoxComponent] = useState(null);
    const windowSize = useWindowSize();
    // const [enableLocation, setEnableLocation] = useState(true);
    // const [coords, setCoords] = useState({
    //     lat: null,
    //     lng: null
    // });
    const router = useRouter();
    var { task } = router.query;

    useEffect(() => {
        if (!task) {
            Router.push('/?task=stay', undefined, { shallow: true });
        }
        // navigator && navigator.geolocation.getCurrentPosition(position => {
        //     const { latitude, longitude } = position.coords;
        //     setCoords({ ...coords, lat: latitude, lng: longitude })
        // })

        var homepageBackgroundImages = config.homepage_background_images.map(item => config.url_asset_root + '1920x1080/' + item);
        var homepagePromotionBanners = config.homepage_promotion_banners.map(item => config.url_asset_root + '1080x180/' + item);
        var homepagePopupImages = config.homepage_popup_images.map(item => config.url_asset_root + item);
        var homepagePartnerLogos = config.homepage_partner_logos.map(item => config.url_asset_root + item);

        setBackgroundImages(homepageBackgroundImages);
        setBanners(homepagePromotionBanners);
        setPopupImage(homepagePopupImages[0]);
        setPartnerLogos(homepagePartnerLogos);
    }, []);

    useEffect(() => {
        setSearchBoxComponent(<StaySearchBox />);
        if (task == 'transport') setSearchBoxComponent(<TransportSearchBox />);
        else if (task == 'flight') setSearchBoxComponent(<FlightSearchBox />);
    }, [task]);

    useEffect(() => {
        getHomepageWidgets().then(data => {
            setWidgets(data);
        })
    }, []);

    // useEffect(() => {
    //     if (coords.lat != null && coords.lng != null) {
    //         setEnableLocation(true);
    //     }
    // }, [coords])

    const onNavigateDetail = (item) => {
        let query = router.query;
        Router.push({
            pathname: `/stay/${item.id}`, query: {
                checkin: query.checkin || null,
                checkout: query.checkout || null,
                guest: query.guest || 1,
                children: query.children || 0
            }
        }, undefined, { shallow: true });
    }

    return (
        <AppLayout
            headerProps={{
                className: 'home-header',
                background: 'transparent',
                mode: 'light',
                // children: (
                //     <Menu
                //         onClick={({ key }) => Router.push(`/?task=${key}`, undefined, { shallow: true })}
                //         selectedKeys={task ? task : "stay"}
                //         mode="horizontal"
                //         className="home-header-menu"
                //     >
                //         <Menu.Item key="stay">{t('stay')}</Menu.Item>
                //         <Menu.Item key="transport">{t('transport')}</Menu.Item>
                //         <Menu.Item key="flight">{t('flight')}</Menu.Item>
                //     </Menu>
                // )
            }}
            headChildren={
                <React.Fragment>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd-mobile/2.3.4/antd-mobile.css" />
                </React.Fragment>
            }
            title={config.title}
            keywords={config.keyword ? String(config.keyword).toString() : ''}
            ogTitle={config.title}
            ogDescription={config.description}
        >
            <div className="home-search-wrapper">

                <div className="home-search-box container">
                    {/* <Menu
                        onClick={({ key }) => Router.push(`/?task=${key}`, undefined, { shallow: true })}
                        selectedKeys={task ? task : "stay"}
                        mode="horizontal"
                        className="home-header-menu mb-3"
                    >
                        <Menu.Item key="stay">{t('stay')}</Menu.Item>
                        <Menu.Item key="transport">{t('transport')}</Menu.Item>
                        <Menu.Item key="flight">{t('flight')}</Menu.Item>
                    </Menu>
                    <Card>
                        {searchBoxComponent}
                    </Card> */}
                    <Card className="mt-4">
                        <Tabs centered={windowSize.width < 600} onChange={(key) => Router.push(`/?task=${key}`, undefined, { shallow: true })} className="home-search-tabs" activeKey={task}>
                            <TabPane tab={
                                <div className="home-search-tab">
                                    <FontAwesomeIcon icon={faBed} />
                                    <span className="home-search-tab--name">{t('stay')}</span>
                                </div>
                            }
                                key="stay"
                            >
                                <StaySearchBox />
                            </TabPane>
                            <TabPane
                                tab={
                                    <div className="home-search-tab">
                                        <FontAwesomeIcon icon={faCar} />
                                        <span className="home-search-tab--name">{t('transport')}</span>
                                    </div>
                                }
                                key="transport"
                            >
                                <TransportSearchBox />
                            </TabPane>
                            <TabPane
                                tab={
                                    <div className="home-search-tab">
                                        <FontAwesomeIcon icon={faPlaneDeparture} />
                                        <span className="home-search-tab--name">{t('flight')}</span>
                                    </div>
                                }
                                key="flight"
                            >
                                <FlightSearchBox />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
                <BackgroundSlider
                    images={backgroundImages}
                    duration={10}
                    transition={2}
                />
            </div>


            <div className="container">
                {
                    // render widgets
                    widgets.map((widget, index) => {
                        let title = i18n.language == 'vi' ? widget.title : widget.title_en;
                        let content = i18n.language == 'vi' ? widget.content : widget.content_en;

                        switch (widget.code) {
                            case 'BANNER_SLIDER': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <Banner images={banners} actionUrls={config.homepage_banner_action_urls} />
                                    </div>
                                )
                            }
                            case 'APP_SELFI_PLACE': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <CheckinPlaces title={title} subtitle={content} />
                                    </div>
                                )
                            }
                            case 'BLOG': {
                                return (
                                    <div className="mt-md-4  mb-5 mb-md-0" key={index}>
                                        <Blog title={title} subtitle={content} />
                                    </div>
                                )
                            }
                            case 'TIPS_FOR_HOST': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <TipsForHost title={title} subtitle={content} />
                                    </div>
                                )
                            }
                            case 'FEATURED_HOMESTAY': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <FeaturedHomestays title={title} subtitle={content} onClick={onNavigateDetail} />
                                    </div>
                                )
                            }
                            case 'PROMOTION': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <Promotions title={title} subtitle={content} onClick={onNavigateDetail} />
                                    </div>
                                )
                            }
                            case 'VIDEO': {
                                return (
                                    <div className="mt-md-4" key={index}>
                                        <Video title={title} content={content} url={widget.video_url} />
                                    </div>
                                )
                            }
                            default: {
                                if (widget.type == 'VIDEO') {
                                    return (
                                        <div className="mt-md-4" key={index}>
                                            <Video title={title} content={content} url={widget.video_url} />
                                        </div>
                                    )
                                } else if (widget.type == 'STAY') {
                                    return (
                                        <div className="mt-md-4" key={index}>
                                            <StayWidget widget={widget} title={title} subtitle={content} onClick={onNavigateDetail} />
                                        </div>
                                    );
                                } else if (widget.type == 'DESTINATION') {
                                    <div className="mt-md-4" key={index}>
                                        <CheckinPlaces title={title} subtitle={content} />
                                    </div>
                                }

                                return null;
                            }
                        }
                    })
                }
            </div>
            <div className="banner-content-home d-none d-md-block">
                {/* <div className="container">

                    <Row>
                        <Col span={12} className="content-banner">
                            <Title>
                                {t('title_banner_home')}
                            </Title>
                            <div className="text-banner">
                                {t('text_banner_home')}
                            </div>
                            <Row align="middle">
                                <Col>
                                    <img className="img-qr-code" src={require('../public/static/images/qr_2stay.png')} />
                                </Col>

                                <Col className="ml-3">
                                    <div><Link href="https://apps.apple.com/vn/app/2stay/id1545125113?l=vi" >
                                        <img className="img-app mb-3" src={require('../public/static/images/app-store.png')} />
                                    </Link></div>
                                    <div>
                                        <Link href="https://play.google.com/store/apps/details?id=com.stay_app" >
                                            <img className="img-app" src={require('../public/static/images/google-play.png')} />
                                        </Link>
                                    </div>

                                </Col>
                            </Row>

                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                </div> */}
            </div>
            <div className="container">
                {/* Partner logo */}
                <PartnerLogo images={partnerLogos} />
            </div>
            {
                popupImage ? (
                    <Popup
                        image={popupImage}
                        actionUrl={config.homepage_popup_action_url}
                    />
                ) : null
            }
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;

    try {
        var config = await requestGetConfig();

        return {
            props: {
                config: config,
                namespacesRequired: ['common', 'header', 'footer', 'home', 'stayList', 'detailStay', 'auth', 'user_task', 'flight', 'transport', 'payment', 'review'],
            }
        }
    } catch (error) {
        return {
            props: {
                config: {
                    homepage_background_images: [],
                    homepage_promotion_banners: [],
                    homepage_popup_images: [],
                    homepage_partner_logos: []
                },
                namespacesRequired: ['common', 'header', 'footer', 'home', 'stayList', 'detailStay', 'auth', 'user_task', 'flight', 'transport', 'payment', 'review'],
            }
        }
    }
}

// Homepage.getInitialProps = async () => ({

// })

export default withTranslation('home')(Homepage);