import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../Arrow';
import BlogItem from '../../BlogItem';
import renderHTML from 'react-render-html';
// api requests
import { getTipsForHost } from '../../../requests/post';
import { Skeleton, Row, Col } from 'antd';

const TipsForHost = (props) => {
    let { title, subtitle } = props;
    const [tips, setTips] = useState([]);
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

    useEffect(() => {
        if (!tips.length) {
            getTipsForHost().then(posts => {
                setTips(posts);
            });
        }
    }, [tips.length]);

    return (
        <div>
            <div className="title-widget pt-4 pt-md-2">{title}</div>
            <div className="mb-3">{renderHTML(subtitle)}</div>
            {tips && tips.length ?
                <Slider
                    className="mb-4 slide"
                    slidesToShow={tips.length > 2 ? 3 : tips.length}
                    slidesToScroll={1}
                    infinite={true}
                    prevArrow={<PrevArrow />}
                    nextArrow={<NextArrow />}
                    responsive={sliderResponsiveOptions}
                >
                    {
                        tips.map((post, index) => (
                            <BlogItem
                                key={index}
                                title={post.title.rendered}
                                url={post.link}
                                image={post.featured_img_url}
                                isTitleOverImage={false}
                                categories={post.post_categories}
                            />
                        ))
                    }
                </Slider>
                :
                <Row gutter={16} className="mt-3">
                    {
                        [1, 2, 3].map(item => (
                            <Col md={6} sm={12} xs={24} key={item}>
                                <Skeleton className="checkin-place-item" height={300} />
                            </Col>

                        ))
                    }
                </Row>
            }
        </div>
    )
}

export default TipsForHost;