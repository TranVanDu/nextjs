import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Row, Col, Badge, Rate, Card } from 'antd';
import Property from '../../Property';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
import PromotionItem from './PromotionItem';
import { withTranslation } from '../../../i18n';
// api requests
import { getWidget } from '../../../requests/widget';

const Promotions = (props) => {
    const { title, subtitle, onClick } = props
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const config = useSelector(state => state.config);
    useEffect(() => {
        getWidget('PROMOTION').then(response => {
            setItems(response.list);
            setLoading(false);
        });
    }, []);
    return (
        <React.Fragment>
            {title ? <div className="title-widget pt-4 pt-md-2">{title}</div> : null}
            {subtitle ? <div className="mb-3">{renderHTML(subtitle)}</div> : null}
            {!loading ? <Row gutter={16}>
                {
                    items.map((item, index) => (
                        // <Property key={index} item={item} config={config} onClick={() => onClick(item)} />
                        <Col md={6} sm={12} xs={24} key={index}>
                            <PromotionItem 
                                title={item.title}
                                image={config ? config.url_asset_root + '400x400/' + item.cover_img : `https://picsum.photos/500/900?random=${index}`}
                                address={item.province}
                                rate={item.rating ? item.rating : 0}
                                price={item.price}
                                promotionPercent={item.promotion_amount || 0}
                                onClick={() => onClick(item)}
                            />
                        </Col>
                    ))
                }

            </Row>
                :
                <Row gutter={16} className="mt-3">
                    {
                        [1, 2, 3, 4].map(item => (
                            <Col md={6} sm={12} xs={24} key={item}>
                                <Skeleton className="checkin-place-item" height={"164px"} />
                            </Col>

                        ))
                    }
                </Row>
            }
        </React.Fragment>
    )
}

export default Promotions;