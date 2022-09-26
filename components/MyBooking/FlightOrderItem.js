
import React, { useState, useEffect } from 'react';
import { Row, Skeleton, Card, Divider } from 'antd';
import { withTranslation, Router } from '../../i18n';
import { Typography, Tooltip } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import { faArrowRight, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
// helper
import { generateAirline, priceInVn } from '../../helpers/helpers';
import OrderStatus from '../OrderStatus';

const { Title } = Typography;

const FlightOrderItem = (props) => {
    var { t, order, airports } = props;
    var flights = JSON.parse(order.flight_info);
    var startPoint = airports.find(airport => airport.code == flights.departure.StartPoint);
    var endPoint = airports.find(airport => airport.code == flights.departure.EndPoint);

    var airlines = [generateAirline(flights.departure.AirlineCode)];
    if (flights.return) {
        airlines.push(generateAirline(flights.return.AirlineCode));
    }

    return (
        <Card
            className={`mb-4 hover-highlight ${order.status == "ORDER_CANCELLED" || order.status == "ORDER_EXPIRED" ? 'card-cancel' : ''}`}
        >
            <div className="pointer" onClick={() => Router.push(`/orders/flight/${order.id}`)}>
                <Row align="top" justify="space-between">
                    <div>
                        <Title level={5}>
                            <span className="mr-2">{startPoint.province} ({startPoint.code})</span>
                            <FontAwesomeIcon icon={flights.return ? faExchangeAlt : faArrowRight} />
                            <span className="ml-2">{endPoint.province} ({endPoint.code})</span>
                        </Title>
                        <div>
                            <span className="flight-date mr-2">{moment(flights.departure.StartDate).format('dd, lll')}</span>
                            <span className="mr-2">|</span>
                            <span className="mr-2">{flights.return ? t('round_trip') : t('one_way')}</span>
                        </div>
                    </div>
                    <div>
                        {
                            airlines.map((airline, index) => (
                                <img className="lf-air-logo ml-2" src={airline.logo} key={index} />
                            ))
                        }

                    </div>
                </Row>
                <Row align="top" justify="space-between">
                    <div>
                        <div><span>{t('order_number')}: </span><b>{order.order_number}</b></div>
                    </div>
                    <div>
                        <Title level={5}>{priceInVn(order.total)}</Title>
                    </div>
                </Row>
            </div>
            <Divider className="mt-2 mb-2" />
            <Row align="top" justify="space-between">
                <div>
                    <div><span>{t('order_created_at')}: </span><span className="flight-date">{moment(order.created_at).format('dd, lll')}</span></div>
                </div>
                <div>
                    <OrderStatus
                        order={order}
                    />
                </div>
            </Row>
        </Card>
    )
}

export default withTranslation('flight')(FlightOrderItem);