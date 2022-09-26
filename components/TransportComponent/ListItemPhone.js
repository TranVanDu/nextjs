import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Divider, Typography } from 'antd';
import { withTranslation } from '../../i18n';
import { StarFilled, InfoCircleOutlined } from '@ant-design/icons';
import { getRoutePrice, vehicleType } from '../../helpers/transport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { priceInVn } from '../../helpers/helpers';
import Modal from 'antd/lib/modal/Modal';

const { Title } = Typography;


function ListItemPhone(props) {
    const { t, data, type, time, onBook } = props;
    const configRd = useSelector(state => state.config);
    var car_type = configRd && configRd.car_type ? configRd.car_type : [];

    const [visible, setVisible] = useState(false);

    const { vehicle, free_waiting_time, free_waiting_time_i, free_waiting_time_return } = data;
    var free_waiting = 0;
    if (type == 1) free_waiting = Math.max(free_waiting_time, free_waiting_time_i);
    else free_waiting = free_waiting_time_return;
    var { price, promotion } = getRoutePrice(data, type, time);

    return (
        <>
            <Card style={{ marginBottom: "15px", borderRadius: "8px" }} bodyStyle={{ padding: "0px", borderRadius: "8px" }}>
                <div className="transport-list-item" onClick={() => onBook(data.id)}>
                    <div className="card-img">
                        <div className="div-img" style={{ backgroundImage: `url(${configRd.url_asset_root}${vehicle.image[0]})` }}></div>
                        <span className="card-tag">{vehicleType(vehicle.type, car_type)}</span>
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
                        </div>
                        {free_waiting ?
                            <div className="info-service">
                                <div className="service-item">
                                    <span className="icon"><FontAwesomeIcon icon={["fas", "clock"]} /></span>
                                    <span>&nbsp;{t('free')}{' '}{free_waiting}{' '}{t('minus')}{' '}{t('waiting_time')}</span>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
                <Divider style={{ margin: "0px" }} />
                <div className="transport-list-item" onClick={() => onBook(data.id)}>
                    <div className="supplier-info">
                        <div>
                            <div className="card-company">{data.company_name}</div>
                            <div className="card-review">
                                <StarFilled className="icon" />
                                <span className="score" >{data.review_summary.avg_rank ? parseFloat(data.review_summary.avg_rank).toFixed(1) : 5}</span>
                                <span className="review-count" >{data.review_summary.total ? data.review_summary.total : 5}{' '}{t('review')}</span>
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
                        </div>
                    </div>
                </div>
                <Divider style={{ margin: "0px" }} />
                <div className="transport-list-item">
                    <div className="view_more_info" onClick={() => setVisible(true)} ><InfoCircleOutlined />&nbsp;{t('view_more_info')}</div>
                </div>
            </Card>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                centered
            >
                <Title level={5}>{t('vehicle_info')}</Title>
                <div>
                    <p style={{ fontSize: "14px" }} >{t('free_cancellation')}{' '}{data.cancel_hour_policy}{' '}{t('hour')}{' '}{t('before_your_pick_up_time')}</p>
                    <Divider style={{ margin: "0px", marginBottom: "15px" }} />
                    {data.route_services && data.route_services.length ?
                        data.route_services.map((item, index) => (
                            <p style={{ fontSize: "14px" }} key={index}>{item.title}</p>
                        ))
                        : null}
                    {data.price_add_holiday ? (
                        <p>{t("surcharge")} {priceInVn(data.price_add_holiday)} {t("during_holidays")}</p>
                    ) : null}
                </div>
            </Modal>
        </>
    )
}

export default withTranslation('transport')(ListItemPhone);