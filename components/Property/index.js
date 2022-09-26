import React from 'react';
import { Col, Card, Rate } from 'antd';
import { priceInVn, renderPrice } from '../../helpers/helpers';
import { withTranslation } from '../../i18n';
const { Meta } = Card;




const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function Property(props) {
    let { itemsPerRow = 4, showDistance = false, showRating = true, showLocation = true, showPropertyInfo = false, onClick, item, index, config, t, placedown = false } = props;
    let cover_img = item ? typeof (item.cover_img) == 'string' ? item.cover_img : item.cover_img[0] : '';
    let image = config ? config.url_asset_root + '400x400/' + cover_img : `https://picsum.photos/500/900?random=${index}`;
    let rate = item.rating ? item.rating : 0;
    return (
        <Col sm={12} lg={Math.floor(24 / itemsPerRow)} md={8} xs={24} className="mb-3">
            <div className="property" onClick={() => onClick()}>
                <div
                    style={{ backgroundImage: `url(${image})`, width: 'auto', height: "164px", backgroundSize: "cover", borderRadius: "8px", position: "relative" }}
                >
                    {item.promotion_enable && <div className="promo-info pl-2 pr-2">
                        <span className="text-promo">{`${item.promotion_amount}% OFF`}</span>
                    </div>}
                </div>
                <div className="mt-2">
                    {/* {showDistance && !placedown && <p className="distance-text"> {`${item.distance.toFixed(2)}km`}</p>} */}
                    {showLocation && !placedown && <div className="d-flex align-items-end mb-1">
                        <span ><img src={require('../../public/static/images/icons/ic_location.png')} className="icon-gray mr-2" /></span>
                        <span className="location-text text-gray">{item.province}</span>
                    </div>}
                    <p className="text-title">{item.title}</p>
                    {showRating && (rate > 0 ? < Rate disabled value={rate} count={rate} className="rating" /> : <span className="text-color-primary">{t('no_review')}</span>)}
                    {showLocation && placedown && <div className="d-flex align-items-end mb-1">
                        <span ><img src={require('../../public/static/images/icons/ic_location.png')} className="icon-gray mr-2" /></span>
                        <span className="location-text text-gray">{item.province}</span>
                    </div>}
                    {showPropertyInfo && <div className="d-flex align-items-end">
                        <span><img src={require('../../public/static/images/icons/ic_home.png')} className="icon-gray mr-2" /></span>
                        <span className="location-text">{`${item.guests_standard} ${t('customer')}`}</span>
                        <span className="dot mr-1 ml-1 mb-2" />
                        <span className="location-text">{`${item.bedrooms} ${t('bed_room')}`}</span>
                    </div>}
                    <div className="mt-1 pt-1">
                        <span className="text-price mr-1 text-bold">
                            {priceInVn(item.promotion_enable ? item.promotion_price : item.price)}
                        </span>
                        {item.promotion_enable && <span className="text-price-line">
                            {priceInVn(item.price)}
                        </span>}

                    </div>
                </div>
            </div>

        </Col>
    )
}

export default withTranslation('stayList')(Property)