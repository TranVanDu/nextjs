import React, { useState, useEffect } from 'react';
import { Divider, Button, Popover, Modal } from 'antd';
import 'react-dates/initialize';
import { getPrice } from '../../requests/stay';
import Loader from 'react-loader-spinner'
import { priceInVn } from '../../helpers/helpers';
import Calendar from './Calendar';
import { PRIMARY_COLOR } from '../../config';
import RoomSideBar from './RoomSideBar';
import BReviewSideBar from '../BReview/BReviewSideBar';
import { useRouter } from 'next/router';

function RoomSideBarMobile(props) {
    const router = useRouter();
    var query = router.query;
    const { data, onChangeGuest, onChangeDate, property, t, onBooking, type = "detail", onChangeRoom } = props;
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleDetailBooking, setVisibleDetailBooking] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (data.checkin && data.checkout) {
            getPrice(data.id, { ...data, guests: data.guest }).then(data => {
                setPrice(data);
                setLoading(false);
            })
        }
        else {
            getPrice(data.id, { ...data, guests: data.guest }).then(data => {
                setPrice(data);
                setLoading(false);
            })
        }
    }, [data])

    if (!visibleDetailBooking) {
        return (
            <div className="d-flex align-items-center justify-content-between ">

                {loading ?
                    <div className="d-flex justify-content-center" style={{ height: 30 }}>
                        <Loader type="ThreeDots" color={PRIMARY_COLOR} width={50} height={50} />
                    </div>
                    :
                    <div>
                        <div>
                            <span className="text-bold text-md">{price && priceInVn(price.total)}</span> <span className="text-bold text-sm">{`/${price.duration > 0 ? price.duration : 1} ${t('night')}`}</span>
                        </div>
                        {property && property.promotion_enable && price.promo > 0 &&
                            <span className="text-gray text-line">
                                {priceInVn(price.total + price.promo)}
                            </span>}

                        <div>
                            <span onClick={() => { setVisibleDetailBooking(true) }} className="pointer">{`${+query.guest + +query.children} ${t('Customer')}`}</span>
                        </div>
                        <div>
                            <span onClick={() => { setVisibleDetailBooking(true) }} className="text-color-primary pointer">{t('room_book_info')}</span>
                        </div>
                    </div>
                }
                <Button className="mt-4 mb-1" type="primary" size="large" onClick={onBooking} disabled={loading}>{t('Book_now')}</Button>

            </div>
        )
    }
    else return (
        <Modal
            visible={visibleDetailBooking}
            footer={false}
            onCancel={() => { setVisibleDetailBooking(false) }}
            centered={true}
            maskClosable={true}
            title={t('room_book_info')}
        >
            {
                type == "detail" ?
                    <RoomSideBar data={query} onChangeGuest={onChangeGuest} property={property} onChangeDate={onChangeDate} t={t} onBooking={onBooking} onChangeRoom={onChangeRoom} />
                    :
                    <BReviewSideBar t={t} property={property} coupon={null} price={price} />
            }

        </Modal>
    )
}

export default RoomSideBarMobile