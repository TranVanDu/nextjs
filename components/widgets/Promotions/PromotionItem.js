import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Badge, Rate, Card } from 'antd';
import Property from '../../Property';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
import { priceInVn } from '../../../helpers/helpers';
import { withTranslation } from '../../../i18n';
// api requests
import { getWidget } from '../../../requests/widget';

const PromotionItem = (props) => {
    const { t, image, title, address, rate, price, promotionPercent, onClick } = props;

    let promotionPrice = price * (1 - promotionPercent / 100);

    return (
        <Card
            cover={<img src={image} className="promotion-item--img" />}
            className="promotion-item"
            hoverable
            onClick={() => onClick()}
        >
            <div className="promotion-item--content">
                <div className="promotion-percent">{promotionPercent}% OFF</div>
                <Typography.Title level={4} className="mt-4">{title}</Typography.Title>
                {rate > 0 ? <Rate disabled value={rate} count={rate} className="rating" /> : <span className="text-color-primary">{t('no_review')}</span>}
                <div>
                    <small>{address}</small>
                </div>
                <Typography.Title level={4} className="text-primary">{priceInVn(promotionPrice)}</Typography.Title>
                <div className="text-strike">{priceInVn(price)}</div>
            </div>
        </Card>
    )
}

export default withTranslation('stayList')(PromotionItem);