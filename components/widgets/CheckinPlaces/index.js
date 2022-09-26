import React, { useState, useEffect } from 'react';
import PropsType from 'prop-types';
import { Link } from '../../../i18n';
import { Typography, Row, Col } from 'antd';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../Arrow';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
// api requests
import { getWidget } from '../../../requests/widget';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const CheckinPlaceItem = (props) => {
    let { title, subtitle, image, url, item, key } = props;
    return (
        <Link href={url} key={key} >
            <div className="checkin-place-item">
                <div
                    className="checkin-place-item-image d-flex"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url("${image}")`
                    }}
                >
                    <div className="align-self-end ml-4 mb-2">
                        <Title className="checkin-place-item-title mb-2" level={4}>{title}</Title>
                        {/* <div className="checkin-place-item-title">{subtitle}</div> */}
                    </div>
                </div>
            </div>
        </Link>

    )
}

const CheckinPlaces = (props) => {
    var { title, subtitle } = props;
    const config = useSelector(state => state.config);

    const sliderResponsiveOptions = [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: 20,
            autoplay: true,
            autoplaySpeed: 2500,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '0px',
            autoplay: true,
            autoplaySpeed: 2500,
            dots: true,
            arrows: false
        }
    }];

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        getWidget('APP_SELFI_PLACE').then(response => {
            setPlaces(response.list);
        });
    }, [places.length]);

    return (
        <React.Fragment>
            {
                title ? <div className="title-widget pt-4">{title}</div> : <Skeleton width={400} height={30} />
            }
            {
                subtitle ? <div className="mb-3">{renderHTML(subtitle)}</div> : null
            }
            {
                places.length ? (
                    <Slider
                        className="mb-4 slide salfi-slide"
                        slidesToShow={places.length > 4 ? 5 : places.length}
                        slidesToScroll={1}
                        infinite={true}
                        autoplay={true}
                        prevArrow={<PrevArrow />}
                        nextArrow={<NextArrow />}
                        responsive={sliderResponsiveOptions}
                    >
                        {
                            places.map((place, index) => (
                                <CheckinPlaceItem
                                    key={index}
                                    title={place.title}
                                    subtitle={`${place.property_count} homestays`}
                                    image={place.image ? encodeURI(config.url_asset_root + '400x400/' + place.image) : require('../../../public/static/images/default-checkin-img.jpeg')}
                                    url={`/stay/list/?sid=${place.id}&stype=${place.type}&location=${place.title}&guest=1&childrens=0`}
                                    item={place}
                                />
                            ))
                        }
                    </Slider>
                ) : (
                        <Row gutter={16} className="mt-3">
                            {
                                [1, 2, 3, 4, 5].map(item => (
                                    <Col md={6} sm={12} xs={24} key={item}>
                                        <Skeleton className="checkin-place-item" height={300} />
                                    </Col>

                                ))
                            }
                        </Row>
                    )
            }
        </React.Fragment>
    )
}

export default CheckinPlaces;