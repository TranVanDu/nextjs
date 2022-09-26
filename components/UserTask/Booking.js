import React from 'react';
import { Layout, Tabs } from 'antd';
import { withTranslation, Router } from '../../i18n';
import { Typography } from 'antd';
import FlightOrders from '../MyBooking/FlightOrders';
import StayOrders from '../MyBooking/StayOrders';
import TransportOrders from '../MyBooking/TransportOrders';
const { TabPane } = Tabs;


const { Content } = Layout;
const { Title } = Typography;


const Booking = (props) => {
    var { t, activeTab } = props;

    const onChangeTab = (activeTab) => {
        Router.push(`/user/bookings?activeTab=${activeTab}`, undefined, { shallow: true })
    }

    return (
        <Content>
            <div className="db-content booking">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('my_bookings')}</Title>
                    </div>
                    <div className="rv-tabs">
                        <Tabs activeKey={activeTab ? activeTab : "stay"} onChange={onChangeTab}>
                            <TabPane tab={t('stay_orders')} key="stay">
                                <StayOrders />
                            </TabPane>
                            <TabPane tab={t('transport_orders')} key="transport">
                                <TransportOrders />
                            </TabPane>
                            <TabPane tab={t('flight_orders')} key="flight">
                                <FlightOrders />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default withTranslation('order')(Booking);