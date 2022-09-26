import React, { useState, useEffect } from 'react';
import { Divider, Button, Popover, Modal } from 'antd';
import 'react-dates/initialize';
import { getPrice } from '../../requests/stay';
import Loader from 'react-loader-spinner'
import { priceInVn } from '../../helpers/helpers';
import { PRIMARY_COLOR } from '../../config';
import BReviewSideBar from '../BReview/BReviewSideBar';

function BReviewSideBarMobile(props) {
    const { t, property, coupon, price, room } = props;
    const [visibleDetailBooking, setVisibleDetailBooking] = useState(false);
    let cAmount = !!coupon ? coupon.amount : 0;

    if (!visibleDetailBooking) {
        return (
            <div className="d-flex align-items-center justify-content-between ">
                <div>
                    <div>
                        <span className="text-bold text-xl">{price && priceInVn(+price.total - parseInt(cAmount))}</span> <span className="text-bold text-md">{`/${price && price.duration > 0 ? price.duration : 1} ${t('night')}`}</span>
                    </div>
                    <div>
                        <span onClick={() => { setVisibleDetailBooking(true) }} className="text-color-primary pointer">{t('room_book_info')}</span>
                    </div>
                </div>
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
            <BReviewSideBar t={t} property={property} coupon={null} price={price} room={room}/>
        </Modal>
    )
}

export default BReviewSideBarMobile