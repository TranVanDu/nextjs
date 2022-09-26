import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Timeline, Spin } from 'antd';
import { i18n, withTranslation } from '../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSuitcaseRolling, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { convertClassOfFlightBooking, convertPlaneType, generateAirline } from '../../helpers/helpers';
import moment from 'moment';

const { Title } = Typography;

const FlightItemDetail = (props) => {
    var { t, flight, airports, airline, rules } = props;

    return (
        <div>
            {
                flight.segments.map((segment, index) => {
                    let segmentStartPoint = airports.find(airport => airport.code == segment.StartPoint);
                    let segmentEndPoint = airports.find(airport => airport.code == segment.EndPoint);
                    return (
                        <Timeline key={index} mode="left">
                            <Timeline.Item
                                label={
                                    <div>
                                        <div>{moment(segment.StartDate).format('HH:mm')}</div>
                                        <div>{moment(segment.StartDate).format('DD MMM')}</div>
                                    </div>
                                }
                            >
                                <div>{segmentStartPoint ? `${segmentStartPoint.province} (${segmentStartPoint.code})` : segment.StartPoint}</div>
                                <div className="fl-detail-info">
                                    <Row gutter={16}>
                                        <Col md={3}>
                                            <img className="lf-air-logo mr-3" src={airline.logo} />
                                        </Col>
                                        <Col md={21}>
                                            <b className="title- ">{airline.name} {segment.FlightNumber}</b>
                                            <div>{convertClassOfFlightBooking(segment.Class)}</div>
                                        </Col>
                                    </Row>
                                    <Row gutter={16} className="mt-4">
                                        <Col md={16}>
                                            <Row align="top">
                                                <FontAwesomeIcon className="lf-icon-suitcase" icon={faSuitcaseRolling} />
                                                {/* <div className="ml-2 w-75">{t('luggage')}</div> */}
                                                <div className="ml-2 w-80">
                                                    {
                                                        rules.map(rule => <div>{rule}</div>)
                                                    }
                                                </div>
                                            </Row>

                                        </Col>
                                        <Col md={8}>
                                            <Row align="top">
                                                <FontAwesomeIcon className="lf-icon-suitcase" icon={faInfoCircle} />
                                                <div className="ml-2">
                                                    {convertPlaneType(segment.Plane, segment.AirlineCode)}
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item
                                label={
                                    <div>
                                        <div>{moment(segment.EndDate).format('HH:mm')}</div>
                                        <div>{moment(segment.EndDate).format('DD MMM')}</div>
                                    </div>
                                }
                            >
                                {segmentEndPoint ? `${segmentEndPoint.province} (${segmentEndPoint.code})` : segment.EndPoint}
                            </Timeline.Item>
                        </Timeline>
                    )
                })
            }

        </div>
    )
}

export default withTranslation('flight')(FlightItemDetail);