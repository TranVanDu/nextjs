
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal, Skeleton, Pagination, Card, Divider } from 'antd';
import { withTranslation, Router } from '../../i18n';
import { Typography, List } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import FlightOrderItem from './FlightOrderItem';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// helper
import { generateAirline } from '../../helpers/helpers';
// actions
import { getMyBooking } from '../../requests/user';




const FlightOrders = (props) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const airports = useSelector(state => state.config.airports);

    useEffect(() => {
        async function getData() {
            let orders = await getMyBooking('FLIGHT');
            setOrders(orders);
            setLoading(false);
        }

        getData();
    }, []);

    return (
        <div>
            {
                loading ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={[1,2,3,4,5]}
                        pagination={{
                            pageSize: 5
                        }}
                        renderItem={item => (
                            <Card className="mb-4">
                                <Skeleton key={item} active paragraph rows={2}  />
                            </Card>
                        )}
                    />
                ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={orders}
                            pagination={{
                                pageSize: 5
                            }}
                            renderItem={item => (
                                <FlightOrderItem order={item} airports={airports} key={item.id} />
                            )}
                        />
                    )
            }
        </div>

    )
}

export default withTranslation('flight')(FlightOrders);