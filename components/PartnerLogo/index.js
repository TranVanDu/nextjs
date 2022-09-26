import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// api requests
import { Skeleton, Row, Col } from 'antd';

const PartnerLogo = (props) => {
    let { images } = props;

    const sliderResponsiveOptions = [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerPadding: 20,
            autoplay: true,
            autoplaySpeed: 2500,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: '0px',
            autoplay: true,
            autoplaySpeed: 2500,
            dots: true,
            arrows: false
        }
    }];

    return (
        <div className="mt-4">
            <Slider
                className="mb-4 partner-logo"
                slidesToShow={6}
                slidesToScroll={1}
                infinite={true}
                // prevArrow={<PrevArrow />}
                // nextArrow={<NextArrow />}
                autoplay={true}
                responsive={sliderResponsiveOptions}
            >
                {
                    images.map((item, index) => (
                        <img src={item} className="partner-logo-item" key={index} />
                    ))
                }
            </Slider>
        </div>
    )
}

export default PartnerLogo;