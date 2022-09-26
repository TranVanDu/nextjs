import { Card } from 'antd';
import moment from "moment";
import React from 'react';
import { priceInVn } from '../../helpers/helpers';
import { withTranslation } from '../../i18n';

function ApplicableCoupon(props) {
    const { item, t } = props;
    return (
        <Card title={item.title} key={item.id} className="card-oder-list-trans">
            <div>
                <div style={{ fontWeight: "600" }} >{priceInVn(item.amount)} Off</div>
                <div>{t('applicable')}:&nbsp;{t('valid_for_purchases_above')}&nbsp;{priceInVn(item.min_order)}</div>
                <div>{t('expires')}:&nbsp;{moment(new Date(item.expired)).format('dd,  lll')} </div>
                <div>{t('applicable_to')}&nbsp;{item.order_type}&nbsp;orders</div>
            </div>
            <div className="bottom-coupon">{item.code}</div>
        </Card>
    )
}

export default withTranslation('user_task')(ApplicableCoupon);