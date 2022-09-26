import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../Arrow';

const Banner = (props) => {
    let { images, actionUrls } = props;
    const sliderResponsiveOptions = [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
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

    return (
        <div>
            <Slider
                className="mb-4 slide home-banner"
                slidesToShow={1}
                slidesToScroll={1}
                infinite={true}
                autoplay={true}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
                responsive={sliderResponsiveOptions}
            >
                {
                    images.map((image, index) => (
                        <a key={index} href={actionUrls[index]} target="_blank">
                            <img src={image} width="100%"  />
                        </a>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Banner;