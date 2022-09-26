import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropsType from 'prop-types';
import { Layout, Affix, BackTop } from 'antd';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import Head from 'next/head';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { useLoginToken } from '../components/login/useLoginToken';
import OneSignal, { useOneSignalSetup } from 'react-onesignal';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { debounce } from 'lodash';
// actions
import { getConfig } from '../redux/actions/ConfigActions';
import { subscribe } from '../requests/notification';
import AppHeaderSecond from './AppHeaderSecond';
import AppFooterSecond from './AppFooterSecond';
import FloatingButton from '../components/FloatingButton';

config.autoAddCss = false;

export const AppLayout = (props) => {
    var { title, keywords, ogUrl, ogTitle, ogDescription, ogImage, headerProps, children, headChildren } = props;
    const dispatch = useDispatch();
    const { user, loading } = useLoginToken();
    const [hideOnScroll, setHideOnScroll] = useState(false);
    const [headerClassName, setHeaderClassName] = useState('');

    const config = useSelector(state => state.config);

    useEffect(() => {
        dispatch(getConfig());
    }, []);

    useEffect(() => {
        if (config.onesignal_app_id) {
            OneSignal.initialize(config.onesignal_app_id, {
                safari_web_id: 'web.onesignal.auto.49809676-9f7f-4916-aef3-fd94958742a1',
                allowLocalhostAsSecureOrigin: true
            });
        }
    }, [user, config]);

    useOneSignalSetup(() => {
        OneSignal.registerForPushNotifications();
        // Obtains the current playerId from the browser
        OneSignal.getPlayerId().then(playerId => {
            subscribe({
                user_id: user ? user.id : null,
                device_id: playerId
            });
        })
    });

    useScrollPosition(({ prevPos, currPos }) => {
        var delta = 5;
        
        if (Math.abs(prevPos.y - currPos.y) <= delta) return;

        if (currPos.y > prevPos.y) {
            // downscroll code
            setHeaderClassName('');

        } else {
            // upscroll code
            setHeaderClassName('app-header-hidden');
        }
    }, []);

    return (
        <Layout style={props.layoutStyle}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link> */}
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="/static/css/bootstrap.min.css" />

                <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" rel="stylesheet"></link>

                <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossOrigin="anonymous" />

                <meta name="author" content="2stay" />
                {/* <meta name="description" content="2stay là nền tảng đặt phòng homestay, dịch vụ đưa đón sân bay và đặt vé máy bay hàng đầu tại Việt Nam." /> */}
                <meta name="description" content={ogDescription} />
                <meta name="keywords" content={keywords} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage} />
                <style>{dom.css()}</style>
                {headChildren}
            </Head>
            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-47V842BVBK"></script>
            <script defer src="https://api.2stay.vn/assets/custom_code/js/custom.js"></script>
            {/* <AppHeader {...headerProps} /> */}
            {/* {
                !hideOnScroll ? (
                    // <Affix offsetTop={0} className="app_header--second-wrapper" >
                    // <AppHeaderSecond {...headerProps} />
                    // </Affix>
                    <div className="app_header--second-wrapper" >
                        <AppHeaderSecond {...headerProps} />
                    </div>
                ) : null
            } */}
            <AppHeaderSecond {...headerProps} className={headerClassName} />
            {/* content */}
            <div id="app_container">
                {children}
            </div>

            {/* footer */}
            <AppFooterSecond />
            <FloatingButton />
        </Layout>
    )
}

AppLayout.propTypes = {
    title: PropsType.string,
    keywords: PropsType.string,
    ogUrl: PropsType.string,
    ogTitle: PropsType.string,
    ogDescription: PropsType.string,
    ogImage: PropsType.string,
    children: PropsType.any,
    headerProps: PropsType.object,
    layoutStyle: PropsType.object,
}

AppLayout.defaultProps = {
    title: '2stay - Đặt homestay, xe đưa đón và vé máy bay nhanh chóng',
    keywords: "đặt phòng, đặt xe, đặt vé máy bay",
    ogUrl: 'https://2stay.vn/',
    ogTitle: '2stay - Đặt homestay, xe đưa đón và vé máy bay nhanh chóng',
    ogDescription: '2stay là nền tảng đặt phòng homestay, dịch vụ đưa đón sân bay và đặt vé máy bay hàng đầu tại Việt Nam.',
    ogImage: '/static/images/share_image.jpg',
    children: <div></div>,
    headerProps: {},
    layoutStyle: {},
    headChildren: <></>
}