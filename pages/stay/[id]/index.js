import React, { useEffect, useState, useRef } from 'react';
import { AppLayout } from '../../../layout';
import { Row, Col, Avatar, Rate, Modal, Affix, message, Popover, Breadcrumb } from 'antd';
import { withTranslation, Router, i18n } from '../../../i18n';
import Slider from 'react-slick';
import { NextArrowTransparent, PrevArrowTransparent } from '../../../components/Arrow';
import NearbyUtil from '../../../components/Room/NearbyUtil';
import Maps from '../../../components/Room/Map';
import Property from '../../../components/Property';
import RoomSideBar from '../../../components/Room/RoomSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { getDetailStay, getRecommendStay, getMaxRoom } from '../../../requests/stay';
import { useSelector } from 'react-redux';
import moment from 'moment';
import renderHTML from 'react-render-html'
import { getIconClass, priceInVn } from '../../../helpers/helpers'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useLoginToken } from '../../../components/login/useLoginToken';
import Calendar from '../../../components/Room/Calendar';
import ImageSlide from '../../../components/Room/ImageSlide';
import { PRIMARY_COLOR } from '../../../config';
import Responsive from "react-responsive";
import { requestGetConfig } from '../../../requests/config';
import { wishlist, checkWishlist } from '../../../requests/wishlist';
import RoomSideBarMobile from '../../../components/Room/RoomSideBarMobile';
import ShareSocial from '../../../components/ShareSocial';
import Lightbox from 'react-image-lightbox';
import qs from 'qs';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import 'react-image-lightbox/style.css';

const Mobile = props => <Responsive {...props} maxWidth={568} />;
const IPadPro = props => <Responsive {...props} minWidth={780} maxWidth={1024} />;
const Default = props => <Responsive {...props} minWidth={1025} />;

function DetailRoom(props) {
    var { t, stay, config } = props;
    const router = useRouter();
    var query = router.query;
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState(stay);
    const [sugestions, setSuggestions] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const { user, loadingAuth } = useLoginToken();
    const [isLiked, setIsLiked] = useState(false);
    var [config, setConfig] = useState(config);
    const [amenities, setAmenities] = useState([]);
    const [sidebarTopPosition, setSidebarTopPosition] = useState(20);
    const user = useSelector(state => state.auth.user);

    let lang = i18n.language == "vi" ? "VI" : "EN";
    const refDateSelection = useRef(null);

    let condition = {
        checkin: query.checkin ? moment(query.checkin) : null,
        checkout: query.checkout ? moment(query.checkout) : null,
        guest: query.guest || 1,
        children: query.children || 0
    }
    let id = router.query.id;
    const [roomId, setRoomId] = useState(id);
    const [room, setRoom] = useState(1);
    // var config = useSelector(state => state.config);

    useEffect(() => {
        // setLoading(true);
        // getDetailStay(parseInt(roomId)).then(data => {
        //     setProperty(data);
        //     setLoading(false);
        // });
        setAmenities(property.amennities_list.slice(0, 12));

        getRecommendStay(roomId).then(data => {
            setSuggestions(data)
        });

        checkWishlist(roomId).then(data => {
            setIsLiked(data);
        }).catch(err => { })
    }, []);

    const mapRef = useRef(null)

    const _navigateToDetail = (item) => {
        let query = router.query;
        let id = item.id;
        // Router.push({
        //     pathname: `/stay/${id}`, query: {
        //         checkin: null,
        //         checkout: null,
        //         guest: query.guest || 1,
        //         children: query.children || 0
        //     }
        // }, undefined, { shallow: false });

        let params = {
            checkin: '',
            checkout: '',
            guest: query.guest || 1,
            children: query.children || 0
        }
        window.location.href = window.location.origin + '/stay/' + id + '?' + qs.stringify(params);

        setRoomId(item.id);
    }

    const onChangeGuest = ({ adults, childrens }) => {
        let query = router.query;
        let id = router.query.id;
        Router.push({
            pathname: `/stay/${id}`, query: {
                ...query,
                guest: adults || 1,
                children: childrens || 0
            }
        }, undefined, { shallow: true, scroll: false });
    }

    const onChangeDate = ({ startDate, endDate }) => {
        let query = router.query;
        let id = router.query.id;
        Router.push({
            pathname: `/stay/${id}`, query: {
                ...query,
                checkin: startDate.format('YYYY-MM-DD'),
                checkout: endDate.format('YYYY-MM-DD'),
            }
        }, undefined, { shallow: false, scroll: false });
    }

    const onChangeRoom = ({ room }) => {
        let query = router.query;
        let id = router.query.id;
        Router.push({
            pathname: `/stay/${id}`, query: {
                ...query,
                roomCount: room
            }
        }, undefined, { shallow: false, scroll: false });
    }

    const renderGallery = (data) => {
        if (data) {
            let images = data.map(item => {
                return {
                    original: `${config.url_asset_root}${item}`,
                    thumbnail: `${config.url_asset_root}${item}`,
                }
            })
            return (
                <ImageGallery items={images} useBrowserFullscreen={true} showFullscreenButton={false} showPlayButton={false} />
            )
        }
        return null;
    }

    const onBooking = () => {
        if (condition.checkin == null || condition.checkout == null) {
            message.info(t('require_date'));
            refDateSelection.current.scrollIntoView();
            return;
        }
        Router.push({
            pathname: '/stay/b-review',
            query: { ...router.query }
        });
    }

    const onShare = () => {

    }

    const navigateToList = (sid, stype, location) => {

        let query = router.query;
        query.sid = sid;
        query.stype = stype;
        query.location = location;
        if (!query.checkin) {
            delete query.checkin
        }
        if (!query.checkout) {

            delete query.checkout;
        }
        query = {
            ...query,
            guest: query.guest || 1,
            childrens: query.children || 0
        }
        Router.push({ pathname: '/stay/list', query: query }, undefined, { shallow: true });
    }

    useScrollPosition(({ prevPos, currPos }) => {
        var delta = 5;

        if (Math.abs(prevPos.y - currPos.y) <= delta) return;

        if (currPos.y > prevPos.y) {
            // downscroll code
            setSidebarTopPosition(100);
        } else {
            // upscroll code
            setSidebarTopPosition(20);
        }
    }, []);

    var { gallery } = property;
    if (gallery.length < 3) {
        for (let i = 0; i < (3 - gallery.length); i++) {
            if (gallery[i]) {
                gallery.push(gallery[i]);
            } else {
                gallery.push(gallery[0]);
            }
        }
    }

    const images = property.gallery.map(item => `${config.url_asset_root}${item}`);
    
    return (
        <React.Fragment>

            {/* <Modal visible={showGallery} footer={null} className="modal-gallery" onCancel={() => setShowGallery(false)}>
                {renderGallery(property.gallery || [])}
            </Modal> */}

            <AppLayout
                title={property.title || null}
                ogUrl={`https://2stay.vn${router.asPath}`}
                ogTitle={property.title}
                ogDescription={property.note.replace(/(<([^>]+)>)/gi, "")}
                ogImage={config.url_asset_root + property.cover_img[0]}
            >
                {loading ?
                    <div className="d-flex justify-content-center">
                        <Loader type="ThreeDots" color={PRIMARY_COLOR} height="100" width="100" />
                    </div>
                    :
                    <div className="detail-body">
                        <div className="header-slider">
                            <Slider
                                className="mb-4"
                                slidesToShow={2}
                                slidesToScroll={1}
                                infinite={true}
                                prevArrow={<PrevArrowTransparent />}
                                nextArrow={<NextArrowTransparent />}
                                centerMode={true}
                                centerPadding={"200px"}
                                responsive={
                                    [
                                        {
                                            breakpoint: 1024,
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 1,
                                                centerPadding: 20,
                                                autoplay: false,
                                                autoplaySpeed: 2500,
                                                infinite: true,
                                            }
                                        },
                                        {
                                            breakpoint: 480,
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                                autoplay: true,
                                                dots: true,
                                                arrows: false,
                                                infinite: true,
                                                autoplaySpeed: 2500,
                                                centerPadding: 0
                                            }
                                        }
                                    ]
                                }
                            >
                                {gallery.map((item, index) => (
                                    <ImageSlide config={config} uri={item} onClick={() => setShowGallery(true)} key={index.toString()} />
                                ))}
                            </Slider>
                        </div>
                        <div className="container">
                            <Row className="stay-info-container" gutter={24}>
                                <Col sm={24} md={24} lg={16} xs={24}>
                                    <Breadcrumb>

                                        <Breadcrumb.Item>
                                            <a onClick={() =>
                                                navigateToList(property.province_id, 'province', property.province)
                                            } >{property.province}</a>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <a onClick={() =>
                                                navigateToList(property.district_id, 'district', `${property.district}, ${property.province}`)
                                            }>{property.district}</a>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item onClick={() =>
                                            navigateToList(property.ward_id, 'ward', `${property.ward}, ${property.district}, ${property.province}`)
                                        }>{property.ward}</Breadcrumb.Item>
                                    </Breadcrumb>
                                    {/* <div className="stay-title mb-3 d-flex justify-content-between ant-row">
                                        <span className="title-detail-stay ant-col-20">
                                            {property.title}
                                        </span>
                                        <div className="pt-0 ant-col-4 justify-content-end d-flex">
                                            <Popover
                                                placement="bottom"
                                                trigger="click"
                                                content={<ShareSocial link_share={`https://2stay.vn/stay/${id}`} />}
                                            >
                                                <span className="mr-3 pointer icon-detail-page d-flex justify-content-center align-items-center" onClick={onShare}><FontAwesomeIcon icon={faShareAlt} size={"lg"} /></span>

                                            </Popover>
                                            <span className="pointer icon-detail-page d-flex justify-content-center align-items-center" onClick={() => { wishlist(property.id); setIsLiked(!isLiked) }}><FontAwesomeIcon icon={faHeart} size={"lg"} color={isLiked ? "#E64980" : "#000"} /></span>
                                        </div>
                                    </div> */}
                                    <Row className="stay-title mb-3">
                                        <Col md={20} sm={24} xs={24}>
                                            <span className="title-detail-stay ant-col-20">
                                                {property.title}
                                            </span>
                                        </Col>
                                        <Col md={4} sm={24} xs={24}>
                                            <Row className="stay-buttons">
                                                <Popover
                                                    placement="bottomRight"
                                                    trigger="click"
                                                    content={<ShareSocial link_share={`https://2stay.vn/stay/${id}`} />}
                                                >
                                                    <span className="mr-3 pointer icon-detail-page d-flex justify-content-center align-items-center" onClick={onShare}>
                                                        <FontAwesomeIcon icon={faShareAlt} size={"lg"} />
                                                    </span>
                                                </Popover>
                                                <span className="pointer icon-detail-page d-flex justify-content-center align-items-center" onClick={() => { wishlist(property.id); setIsLiked(!isLiked) }}>
                                                    <FontAwesomeIcon icon={faHeart} size={"lg"} color={isLiked ? "#E64980" : "#000"} />
                                                </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div className="d-flex align-items-center mb-2">
                                        <span><img src={require('../../../public/static/images/icons/ic_location.png')} className="icon-md mr-2" /></span>
                                        <span className="text-sm text-bold">{property.location}</span>
                                        <span className="text-color-primary pointer ml-1" onClick={() => {
                                            if (mapRef.current) {
                                                mapRef.current.scrollIntoView()
                                            }
                                        }}>
                                            {t('see_map')}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span><img src={require('../../../public/static/images/icons/ic_like.png')} className="icon-md mr-2" /></span>
                                        {
                                            property.review_summary.avg_rank ?
                                                <span className="text-sm">
                                                    <span className="text-bold">{parseFloat(property.review_summary.avg_rank).toFixed(1)}</span>
                                                    {` (${property.review_summary.total}  ${t('review_lc')})`}
                                                </span>
                                                :
                                                <span className="text-sm text-bold">
                                                    {t('no_review')}
                                                </span>
                                        }
                                    </div>

                                    {/* start summary info */}
                                    <div className="d-flex mt-1 pt-3 pb-2 pl-3 pr-3 sum-info-stay mt-3 ant-row">
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-sm-12 ant-col-md-8 ant-col-xs-12" >
                                            <span><img src={require('../../../public/static/images/icons/ic_home_light.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm">{lang == "VI" ? property.type_title : property.type_title_en}</span>
                                        </div>
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-md-8 ant-col-sm-12">
                                            <span><img src={require('../../../public/static/images/icons/ic_door.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm"> {`${property.bedrooms} ${t('bed_room')}`}</span>
                                        </div>
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-sm-12 ant-col-md-8 ant-col-xs-12">
                                            <span><img src={require('../../../public/static/images/icons/ic_bath.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm"> {`${property.bathrooms} ${t('bath_rooms')}`}</span>
                                        </div>
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-sm-12 ant-col-md-8 ant-col-xs-12">
                                            <span><img src={require('../../../public/static/images/icons/ic_bed.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm">{`${property.beds} ${t('bed')}`}</span>
                                        </div>
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-sm-12 ant-col-md-8 ant-col-xs-12">
                                            <span><img src={require('../../../public/static/images/icons/square-feet.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm">{`${property.square_feet} m²`}</span>
                                        </div>
                                        <div className="d-flex align-items-center ant-col-lg-8 mb-2 ant-col-sm-24 ant-col-md-16 ant-col-xs-24">
                                            <span><img src={require('../../../public/static/images/icons/ic_home_user.png')} className="icon-md mr-2" /></span>
                                            <span className="text-sm"> {`${property.guests_standard} ${t('customer')} (${t('maximun')} ${property.guests_max || property.guests_standard} ${t('customer')})`}</span>
                                        </div>
                                    </div>
                                    {/* end summary info */}

                                    {/* start promo area */}
                                    {property.promotion_enable && <div className="promo-info mt-3 pt-2 pb-2 pl-3">
                                        <div className="d-flex align-items-center">
                                            <span><img src={require('../../../public/static/images/icons/ic_promo.png')} className="icon-lg mr-2" /></span>
                                            <span className="text-sm text-promo">{t('Down')} <span className="text-bold">{`${property.promotion_amount}%`}</span> {t('for_checkin_from')} <span className="text-bold">{`${moment(property.promotion_start_date, "YYYY-MM-DD").format('DD/MM')} - ${moment(property.promotion_end_date, "YYYY-MM-DD").format('DD/MM')}`}</span></span>
                                        </div>
                                    </div>}
                                    {/* end promo area */}

                                    {/* start description area */}
                                    <div className="mt-3 pt-2 pb-2">
                                        {lang == 'VI' || !!!property.note_en ? renderHTML(property.note) : renderHTML(property.note_en)}
                                        {/* </span> */}
                                        {/* <span className="d-flex text-sm text-color-primary mt-2 pointer">
                                        Xem them
                                    </span> */}
                                    </div>
                                    {/* end description area */}

                                    {/* start amenities area */}
                                    <div className="mt-3 pt-2 pb-2">
                                        <span className="d-flex text-xl text-bold mb-2" >{t('Amenity')}</span>
                                        <div className="ant-row pt-3 pb-3">
                                            {
                                                amenities.map(item => {
                                                    return (
                                                        <div className="d-flex align-items-center ant-col-12 mb-3" key={item.id}>
                                                            <span className="mr-4" style={{maxWidth: "1rem", width: "100%"}}><i className={getIconClass(item.title)}></i></span>
                                                            <span className="text-sm">{lang == "VI" ? item.title : item.title_en}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {
                                            property.amennities_list.length > 12 && amenities.length <= 12 ? (
                                                <span className="d-flex text-sm text-color-primary pointer" onClick={() => setAmenities(property.amennities_list)}>
                                                    {t('view_more')}
                                                </span>
                                            ) : null}
                                    </div>
                                    {/* end amenities area */}

                                    {/* start price area */}
                                    <div className="mt-3 pt-2 pb-2">
                                        <span className="d-flex text-xl text-bold mb-2" >{t('Price')}</span>
                                        <span className="d-flex text-sm mb-3">{t('price_maybe_increase')}</span>
                                        <div className="price-item-container d-flex justify-content-between dark">
                                            <span>{t('Mon_to_Thu')}</span>
                                            <span className="text-bold">{`${priceInVn(property.price)}`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between">
                                            <span>{t('Sat_to_Sun')}</span>
                                            <span className="text-bold">{`${priceInVn(property.weekend_price)}`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between dark">
                                            <span>{t('extra_fee')}</span>
                                            <span className="text-bold">{`${priceInVn(property.extra_price)} (${t('after')} ${property.guests_standard} ${t('customer')})`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between">
                                            <span>{t('min_night')}</span>
                                            <span className="text-bold"> {`${property.minimum_nights || 1} ${t('night')}`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between dark">
                                            <span>{t('max_night')}</span>
                                            <span className="text-bold">{`${property.maximum_nights || 90} ${t('night')}`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between">
                                            <span>{t('week_term')}</span>
                                            <span className="text-bold">{`- ${property.week_term_promo} %`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between dark">
                                            <span>{t('month_term')}</span>
                                            <span className="text-bold">{`- ${property.month_term_promo} %`}</span>
                                        </div>
                                    </div>
                                    {/* end price area */}

                                    {/* start review area */}
                                    <div className="mt-3 pt-2 pb-2">
                                        <span className="d-flex text-xl text-bold mb-3" >{t('Review')}</span>
                                        {
                                            property.latestReviews.length > 0 ?
                                                property.latestReviews.map(item => (
                                                    <div className="mb-3" key={item.id}>
                                                        <div className="mb-2 d-flex align-items-center">
                                                            <Avatar size="large" src={`${config.url_asset_root}${item.user_avatar || 'backup.png'}`} />
                                                            <div className="d-flex ml-2 flex-column">
                                                                <span className="d-flex align-items-center">
                                                                    <span className="text-sm bold" > {`${item.user_firstname} ${item.user_lastname}`}</span>
                                                                    <span className="ml-2" >
                                                                        <Rate disabled value={item.rank} count={item.rank} className="rating" />
                                                                    </span>
                                                                </span>
                                                                <span >{moment(item.created_at).format('DD MMM')}</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <span className="text-sm">
                                                                {item.comment}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                < div >
                                                    <span className="text-md text-bold">
                                                        {t('no_review')}
                                                    </span>
                                                </div>
                                        }
                                    </div>
                                    {/* end review area */}

                                    {/* start policy area */}
                                    <div className="mt-3 pt-2 pb-2">
                                        <span className="d-flex text-xl text-bold mb-3" ></span>
                                        <span className="d-flex text-lg text-bold mb-2">{t('policy')}</span>
                                        <div className="d-flex text-sm mb-3">
                                            {`${lang == 'VI' ? property.cancel_policy_title : property.cancel_policy_title_en}: `}
                                        </div>
                                        <div>
                                            {renderHTML(lang == 'VI' ? property.cancel_policy_content : property.cancel_policy_content_en)}
                                        </div>
                                        <span className="d-flex text-lg text-bold mb-3">{t('time_to_checkin')}</span>
                                        <div className="price-item-container d-flex justify-content-between dark">
                                            <span>{t('Checkin')}</span>
                                            <span className="text-bold">{`${property.checkin_time ? property.checkin_time : "02:00 pm"}`}</span>
                                        </div>
                                        <div className="price-item-container d-flex justify-content-between">
                                            <span>{t('Checkout')}</span>
                                            <span className="text-bold">{`${property.checkout_time ? property.checkout_time : "12:00 pm"}`}</span>
                                        </div>
                                    </div>
                                    {/* end policy area */}

                                    {/* start calendar area */}
                                    <div className="mt-3 pt-2 pb-2 calendar-detail" ref={refDateSelection}>
                                        <Mobile>
                                            <Calendar id={id} t={t} defaultStart={condition.checkin} defaultEnd={condition.checkout} onChangeDate={onChangeDate} months={1} daySize={44} />
                                        </Mobile>
                                        <IPadPro>
                                            <Calendar id={id} t={t} defaultStart={condition.checkin} defaultEnd={condition.checkout} onChangeDate={onChangeDate} months={2} daySize={40} />
                                        </IPadPro>
                                        <Default>
                                            <Calendar id={id} t={t} defaultStart={condition.checkin} defaultEnd={condition.checkout} onChangeDate={onChangeDate} months={2} />
                                        </Default>
                                    </div>
                                    {/* end calendar area */}


                                    {
                                        property.latitude && property.longitude ? (
                                            <React.Fragment >
                                                {/* start util area */}
                                                <div className="mt-3 pt-2 pb-2" ref={mapRef}>
                                                    <span className="d-flex text-xl text-bold mb-3" >{t('nearby_util')}</span>
                                                    <span className="d-flex text-sm  mb-3">{t('enjoy_utils')}</span>
                                                    <NearbyUtil cords={{
                                                        lat: property.latitude || null,
                                                        lng: property.longitude || null
                                                    }}
                                                        t={t}
                                                    />
                                                </div>
                                                {/* end util area */}

                                                {/* start map area */}
                                                <div className="mt-3 pt-2 pb-2">
                                                    <Maps coords={{
                                                        lat: property.latitude || null,
                                                        lng: property.longitude || null
                                                    }} />
                                                </div>
                                                {/* end map area */}
                                            </React.Fragment>
                                        ) : null
                                    }

                                </Col>

                                {/* col room sidebar */}
                                <Col sm={0} md={0} lg={8} xs={0} >
                                    <div style={{ position: "sticky", top: sidebarTopPosition, transition: '0.3s ease'  }}>
                                        <RoomSideBar data={query} onChangeGuest={onChangeGuest} property={property} onChangeDate={onChangeDate} t={t} onBooking={onBooking} onChangeRoom={onChangeRoom} />
                                    </div>
                                </Col>
                                {/* end col room sidebar */}
                            </Row>
                            {/* start suggestion area */}
                            {
                                sugestions.length > 0 &&
                                <div className="mt-4 pt-4 pb-5">
                                    <span className="d-flex text-xl text-bold mb-3" >{t('similar_room')}</span>
                                    <Row gutter={16}>
                                        {sugestions.map(item => (
                                            <Property item={item} config={config} showPropertyInfo={true} onClick={() => _navigateToDetail(item)} t={t} key={item.id} />

                                        ))}
                                    </Row>
                                </div>
                            }
                            {/* end suggestion area */}
                        </div>
                    </div>}

                {/* booking area if small device */}
                <Row className="fixed-bottom has-border-top" style={{ backgroundColor: "#fff" }}>
                    <Col xs={24} sm={24} md={24} lg={0} className="pb-3 pl-4 pr-4 pt-1">
                        <RoomSideBarMobile data={query} onChangeGuest={onChangeGuest} property={property} onChangeDate={onChangeDate} t={t} onBooking={onBooking} onChangeRoom={onChangeRoom} />
                    </Col>
                </Row>

                {
                    showGallery ? (
                        <Lightbox
                            mainSrc={images[currentImageIndex]}
                            nextSrc={images[(currentImageIndex + 1) % images.length]}
                            prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => setShowGallery(false)}
                            onMovePrevRequest={() => setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length)}
                            onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
                        />
                    ) : null
                }
            </AppLayout >
        </React.Fragment >
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    try {
        var data = await getDetailStay(parseInt(params.id));
        var config = await requestGetConfig();
        if (!data) {
            return {
                props: {
                    notFound: true,
                }
            }
        }
        return {
            props: {
                stay: data,
                config: config
            }
        }
    } catch (error) {
        return {
            props: {
                notFound: true,
            }
        }
    }
}

export default withTranslation('stayList')(DetailRoom);