import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUser, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { Divider, Button, Popover } from 'antd';
import 'react-dates/initialize';
import moment from 'moment'
import CustomerQuantity from '../../components/CustomerQuantity';
import { getPrice } from '../../requests/stay';
import Loader from 'react-loader-spinner'
import { priceInVn } from '../../helpers/helpers';
import Calendar from './Calendar';
import { PRIMARY_COLOR } from '../../config';
import RoomQuantity from '../RoomQuantity';

function RoomSideBar(props) {
    const { data, onChangeGuest, onChangeDate, property, t, onBooking, onChangeRoom } = props;
    const [startDate, setStartDate] = useState(data.checkin && data.checkin != "" ? moment(data.checkin, 'YYYY-MM-DD') : null);
    const [endDate, setEndDate] = useState(data.checkout && data.checkin != "" ? moment(data.checkout, 'YYYY-MM-DD') : null);
    const [showQCustomer, setShowQCustomer] = useState(false);
    const [showQRoom, setShowQRoom] = useState(false);
    const [qRoom, setQRoom] = useState(data.roomCount);
    const [showDate, setShowDate] = useState(false);
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [maxRoom, setMaxRoom] = useState(1);

    let condition = {
        checkin: data.checkin ? moment(data.checkin) : null,
        checkout: data.checkout ? moment(data.checkout) : null,
        guest: data.guest || 1,
        children: data.children || 0,
        room: data.roomCount
    }

    useEffect(() => {
        let checkin = data.checkin && data.checkin != "" ? moment(data.checkin, 'YYYY-MM-DD') : null;
        let checkout = data.checkout && data.checkout != "" ? moment(data.checkout, 'YYYY-MM-DD') : null;
        setStartDate(checkin);
        setEndDate(checkout);
    }, [props.data.checkin, props.data.checkout]);

    let datepicker = () => (
        <div>
            <Calendar id={data.id} t={t} defaultStart={condition.checkin} defaultEnd={condition.checkout} onChangeDate={onChangeDate} months={1} daySize={40} />
            <Divider className="mb-1 mt-1" />
            <div className="d-flex align-items-center justify-content-between mt-2">
                <div><span className="text-ss">
                    {t("pick_checkin_checkout_date")}
                </span></div>
                <Button type="primary" onClick={() => { setShowDate(false) }}>{t('apply')}</Button>

            </div>
        </div>
    )

    useEffect(() => {
        setLoading(true);
        if (data.checkin && data.checkout) {
            getPrice(data.id, { ...data, guests: data.guest, roomCount: data.roomCount || 1 }).then(data => {
                setPrice(data);
                setLoading(false);
                setMaxRoom(data.max_room);
                if (parseInt(data.max_room) < parseInt(data.roomCount)) {
                    onChangeRoom({ room: data.max_room });
                    getPrice(data.id, { ...data, guests: data.guest, roomCount: 1 }).then(data => {
                        setPrice(data);
                    })
                }
            })
        }
        else {
            getPrice(data.id, { ...data, guests: data.guest, roomCount: data.roomCount || 1 }).then(data => {
                setPrice(data);
                setLoading(false);
                setMaxRoom(1)
            })
        }
    }, [data])

    const onFinishSetCustomer = ({ adults, childrens }) => {
        setShowQCustomer(false);
        onChangeGuest({ adults, childrens });
    }

    const onFinishSetRoom = ({ room }) => {
        setShowQRoom(false);
        onChangeRoom({ room });
    }

    return (
        <div className="card-price-info-container">
            {loading ?
                <div className="d-flex justify-content-center" style={{ height: 30 }}>
                    <Loader type="ThreeDots" color={PRIMARY_COLOR} width={50} height={50} />
                </div>
                :
                <React.Fragment>
                    <div><span className="text-bold text-xl text-primary">{price && priceInVn(price.total)}</span> <span className="text-bold text-md">{`/${price.duration > 0 ? price.duration : 1} ${t('night')}`}</span></div>
                    {property && property.promotion_enable && price.promo > 0 && <span className="text-gray text-line">{priceInVn(price.total + price.promo)}</span>}
                </React.Fragment>
            }
            <span className="d-flex mt-4 pl-3 pr-3 pt-3 pb-3 room-sidebar-input align-items-center">
                <FontAwesomeIcon icon={faCalendarDay} size={"lg"} />
                <Popover content={datepicker} trigger="click" placement="bottom" visible={showDate} onVisibleChange={(v) => { setShowDate(v) }}>
                    <span className="d-flex justify-content-between flex-grow-1 ml-2 align-items-center">
                        <span className="pointer">{startDate ? startDate.format('DD/MM/YYYY') : "dd/mm/yy"}</span>
                        <span className="text-ss">{t('to')}</span>
                        <span className="pointer">{endDate ? endDate.format('DD/MM/YYYY') : "dd/mm/yy"}</span>
                    </span>
                </Popover>
            </span>
            <Popover
                content={<CustomerQuantity
                    limit={parseInt(property.guests_max)}
                    defaultAdults={parseInt(data.guest)}
                    defaultChildrens={parseInt(data.children)}
                    onFinish={onFinishSetCustomer}

                />} placement="bottom"
                onVisibleChange={(v) => setShowQCustomer(v)}
                visible={showQCustomer}
                trigger="click"
            >
                <span className="d-flex mt-4 pl-3 pr-3 pt-3 pb-3 room-sidebar-input align-items-center" onClick={() => setShowQCustomer(true)}>
                    <FontAwesomeIcon icon={faUser} size={'lg'} />
                    <span className="d-flex justify-content-between flex-grow-1 ml-2">
                        <span className="pointer">{`${parseInt(data.guest) + parseInt(data.children)} ${t('customer')}`}</span>
                    </span>
                </span>
            </Popover>

            { maxRoom > 1 && property.qty > 1 && <Popover
                content={<RoomQuantity
                    limit={parseInt(maxRoom)}
                    defaultRoom={parseInt(qRoom || 1)}
                    onFinish={onFinishSetRoom}

                />} placement="bottom"
                onVisibleChange={(v) => setShowQRoom(v)}
                visible={showQRoom}
                trigger="click"
            >
                <span className="d-flex mt-4 pl-3 pr-3 pt-3 pb-3 room-sidebar-input align-items-center" onClick={() => setShowQRoom(true)}>
                    <FontAwesomeIcon icon={faHouseUser} size={'lg'} />
                    <span className="d-flex justify-content-between flex-grow-1 ml-2">
                        <span className="pointer">{`${parseInt(data.roomCount ? data.roomCount : 1)} ${t('room')}`}</span>
                    </span>
                </span>
            </Popover>}

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
                    {loading ?
                        <div className="d-flex justify-content-center" style={{ height: 21 }}>
                            <Loader type="ThreeDots" color={PRIMARY_COLOR} width={50} height={50} />
                        </div>
                        : <div className="mt-3 d-flex justify-content-between">
                            <span className="text-md">{t('Total')}</span>
                            <span className="text-bold text-md ">{priceInVn(price.total)}</span>

                        </div>}
                    {maxRoom > 1 && property.qty > 1 &&
                        <div className="text-right">
                            <span>{`${data.roomCount ? data.roomCount : 1} ${t('room')}`}</span>
                        </div>}
                </React.Fragment>)
            }
            {property.vat_included && <p style={{ marginBottom: 0 }} className="mt-2">{t("vat_included")}</p>}
            {!loading && <Button className="mt-4 mb-1" type="primary" style={{ width: "100%", height: "48px" }} onClick={onBooking}>{t('Book_now')}</Button>}
            {!property.avail && <span>{t("room_not_avail")}</span>}
        </div >
    )
}

export default RoomSideBar