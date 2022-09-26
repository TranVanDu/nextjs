import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Tag, Popover } from 'antd';
import { withTranslation } from '../../i18n';
import { StarFilled } from '@ant-design/icons';
import { getRoutePrice, vehicleType } from '../../helpers/transport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { priceInVn } from '../../helpers/helpers';

function getColor(id) {
    switch (id) {
        case 1: return "#87d068";
        case 2: return "#2db7f5";
        default: return "#108ee9";
    }
}



function ListItem(props) {
    const { t, data, type, time, onBook } = props;
    const configRd = useSelector(state => state.config);
    var car_type = configRd && configRd.car_type ? configRd.car_type : [];

    const { vehicle, free_waiting_time, free_waiting_time_i, free_waiting_time_return } = data;
    var free_waiting = 0;
    if (type == 1) free_waiting = Math.max(free_waiting_time, free_waiting_time_i);
    else free_waiting = free_waiting_time_return;
    var { price, promotion } = getRoutePrice(data, type, time);
    // console.log("promo", promotion)
    return (
        <Card style={{ marginBottom: "15px", borderRadius: "8px" }} bodyStyle={{ padding: "0px", borderRadius: "8px" }}>
            <div className="transport-list-item">
                <div className="card-img">
                    <div className="div-img" style={{ backgroundImage: `url(${configRd.url_asset_root}${vehicle.image[0]})` }}></div>
                    <span className="card-tag">{vehicleType(vehicle.type, car_type)}</span>
                    <div className="card-company">{data.company_name}</div>
                    <div className="card-review">
                        {data.review_summary.total ? (
                            <>
                                <StarFilled className="icon" />
                                <span className="score" >{data.review_summary.avg_rank ? parseFloat(data.review_summary.avg_rank).toFixed(1) : 5}</span>
                                <span className="review-count" >{data.review_summary.total ? data.review_summary.total : 5}{' '}{t('review')}</span>
                            </>
                        )
                            : (
                                <span className="review-count" >{t('no_review')}</span>
                            )
                        }
                    </div>
                </div>
                <div className="card-info" >
                    <div className="info-title">
                        {vehicle.title}&nbsp;
                        <span className="remark" >{t('or_similar')}</span>
                    </div>

                    <div className="info-service">
                        <div className="service-item">
                            <span className="icon"><FontAwesomeIcon icon={["fas", "user-tie"]} /></span>
                            <span>&nbsp;{vehicle.seat}</span>
                        </div>
                        <div className="service-item">
                            <span className="icon"><FontAwesomeIcon icon={["fas", "suitcase-rolling"]} /></span>
                            <span>&nbsp;{vehicle.luggage}</span>
                        </div>
                        {free_waiting ?
                            <div className="service-item">
                                <span className="icon"><FontAwesomeIcon icon={["fas", "clock"]} /></span>
                                <span>&nbsp;{t('free')}{' '}{free_waiting}{' '}{t('minus')}{' '}{t('waiting_time')}</span>
                            </div>
                            : null}
                    </div>
                    <div className="info-more-service">
                        {/* <div className="more-item"> */}
                        {data.route_services && data.route_services.length ?
                            <>
                                {
                                    data.route_services.map((item, index) => (
                                        <Tag className="more-item" color={getColor(item.id)} key={index}>{item.title}</Tag>
                                    ))
                                }
                                {data.price_add_holiday ? (
                                    <Popover content={<p>{t("surcharge")} {priceInVn(data.price_add_holiday)} {t("during_holidays")}</p>} trigger="hover">
                                        <Tag color="cyan" className="more-item">{t("holiday_surcharge")}</Tag>
                                    </Popover>
                                ) : null}
                            </>
                            : data.price_add_holiday ? (
                                <Popover content={<p>{t("surcharge")} {priceInVn(data.price_add_holiday)} {t("during_holidays")}</p>} trigger="hover">
                                    <Tag color="cyan" className="more-item">{t("holiday_surcharge")}</Tag>
                                </Popover>
                            ) : <div className="more-item"></div>}
                        {/* </div> */}
                    </div>
                    <div className="info-description">
                        {t('free_cancellation')}{' '}{data.cancel_hour_policy}{' '}{t('hour')}{' '}{t('before_your_pick_up_time')}
                    </div>
                </div>
                <div className="card-price">
                    {promotion ?
                        <div className="sub-price">
                            <span>{priceInVn(price)}</span>
                        </div>
                        : null}
                    <div className="price">
                        <span>{priceInVn(price - promotion)}</span>
                    </div>
                    <div className="price-tip">
                        <span>{t('taxes_and_fees_included')}</span>
                    </div>
                    <div className="btn-book">
                        <Button type="primary" className="book-transport" onClick={() => onBook(data.id)}>{t('book_now')}</Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default withTranslation('transport')(ListItem);