import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUser, faMapMarkerAlt, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { Divider, Image } from 'antd';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Loader from 'react-loader-spinner';
import { priceInVn } from '../../helpers/helpers';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PRIMARY_COLOR } from '../../config';
import { i18n } from '../../i18n';

function BReviewSideBar(props) {
    let lang = i18n.language == "vi" ? "VI" : "EN";

    const { t, coupon = null, property, price, room } = props;
    const router = useRouter();
    var query = router.query;
    let data = query;

    const [startDate, setStartDate] = useState(data.checkin && data.checkin != "" ? moment(data.checkin, 'YYYY-MM-DD') : null);
    const [endDate, setEndDate] = useState(data.checkout && data.checkin != "" ? moment(data.checkout, 'YYYY-MM-DD') : null);
    const [loading, setLoading] = useState(false);
    const config = useSelector(state => state.config);
    let cAmount = !!coupon ? coupon.amount : 0;

    return (
        <div className="card-price-info-container">
            {loading || property == null ?
                <div className="d-flex justify-content-center" style={{ height: 30 }}>
                    <Loader type="ThreeDots" color={PRIMARY_COLOR} width={50} height={50} />
                </div>
                :
                <React.Fragment>
                    <div>
                        <Image
                            width={"100%"}
                            height={"180px"}
                            src={`${config.url_asset_root}${property.cover_img[0]}`}
                            style={{
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />
                        <span className="text-md text-bold mt-2 d-block">{property.title}</span>
                    </div>
                    <p><span><FontAwesomeIcon icon={faMapMarkerAlt} /> </span>{property.location}</p>
                </React.Fragment>
            }
            <span className="d-flex mt-4 pl-4 pr-4 pt-3 pb-3 room-sidebar-input align-items-center">
                <FontAwesomeIcon icon={faCalendarDay} size={"lg"} />

                <span className="d-flex justify-content-between flex-grow-1 ml-4">
                    <span className="pointer">{startDate ? startDate.format('DD/MM/YYYY') : "dd/mm/yy"}</span>
                    <span>{t('to')}</span>
                    <span className="pointer">{endDate ? endDate.format('DD/MM/YYYY') : "dd/mm/yy"}</span>
                </span>
            </span>

            <span className="d-flex mt-4 pl-4 pr-4 pt-3 pb-3 room-sidebar-input align-items-center" onClick={() => { }}>
                <FontAwesomeIcon icon={faUser} size={'lg'} />
                <span className="d-flex justify-content-between flex-grow-1 ml-4">
                    <span className="pointer">{`${parseInt(data.guest) + parseInt(data.children)} ${t('customer')}`}</span>
                </span>
            </span>

            { room > 1 && <span className="d-flex mt-4 pl-4 pr-4 pt-3 pb-3 room-sidebar-input align-items-center" onClick={() => { }}>
                <FontAwesomeIcon icon={faHouseUser} size={'lg'} />
                <span className="d-flex justify-content-between flex-grow-1 ml-4">
                    <span className="pointer">{`${parseInt(room) || 1} ${t('room')}`}</span>
                </span>
            </span>}

            {data.checkin && data.checkout && price &&
                (<React.Fragment>
                    <div className="mt-3 d-flex justify-content-between">
                        <span className="text-md">{`${t('Fee_hiring')} ${price.duration} ${t('night')}`}</span>
                        <span className="text-bold text-md">{`${priceInVn(price.raw_price)}`}</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                        <span className="text-md">{t('Cleaning_fee')}</span>
                        <span className="text-bold text-md">{priceInVn(price.cleaning_fee || 0)}</span>
                    </div>
                    {price.promo > 0 && <div className="mt-3 d-flex justify-content-between">
                        <span className="text-md">{t('Promo')}</span>
                        <span className="text-bold text-md text-success">{`- ${priceInVn(price.promo)}`}</span>
                    </div>}
                    {!!coupon && coupon.amount > 0 && <div className="mt-3 d-flex justify-content-between">
                        <span className="text-md">{t('Promo_coupon')}</span>
                        <span className="text-bold text-md text-success">{`- ${priceInVn(coupon.amount < price.total ? coupon.amount : price.total)}`}</span>
                    </div>}
                    {price.extra_price > 0 && <div className="mt-3 d-flex justify-content-between">
                        <span>
                            <span className="text-md d-block">{t('extra_fee_m')} </span>
                            <span className="text-xs d-block mt-1">
                                {`(${t('reach_standard')})`}
                            </span>
                        </span>
                        <span className="text-bold text-md">{`${priceInVn(price.extra_price)}`}</span>
                    </div>}
                    <Divider />
                    {loading || property == null ?
                        <div className="d-flex justify-content-center" style={{ height: 21 }}>
                            <Loader type="ThreeDots" color={PRIMARY_COLOR} width={50} height={50} />
                        </div>
                        :
                        <React.Fragment>
                            <div className="mt-3 d-flex justify-content-between">
                                <span className="text-md">{t('Total')}</span>
                                <span className="text-bold text-md ">{priceInVn(+price.total - parseInt(cAmount))}</span>
                            </div>
                            <Divider />
                            <div>
                                <p className="text-md text-bold">{t('policy_cancel')}</p>
                                <div>
                                    {/* <span className="text-bold">{property.cancel_policy_title}: </span> */}
                                    <span className="text-bold">{`${lang == 'VI' ? property.cancel_policy_title : property.cancel_policy_title_en}: `}</span>
                                    <span>
                                        {renderHTML(lang == 'VI' ? property.cancel_policy_content : property.cancel_policy_content_en)}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </React.Fragment>)
            }
        </div >
    )
}

export default BReviewSideBar