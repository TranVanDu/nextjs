import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Divider, Modal, Row, Col, Typography } from 'antd';
import { withTranslation } from '../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { generateAirline, convertTime, convertClassOfFlightBooking, priceInVn } from '../../helpers/helpers';
import moment from 'moment';
import FlightItemDetail from '../FlightItem/FlightItemDetail';
import FlightItemFare from '../FlightItem/FlightItemFare';

const { Title } = Typography;

const SelectedFlightModal = (props) => {
    var { t, visible, flights, onOk, onCancel, airports, screenSize } = props;
    const router = useRouter();
    const [detailType, setDetailType] = useState(null);
    var airlines = flights.map((flight, index) => {
        return generateAirline(flight.AirlineCode);
    });

    var totalPrice = 0;
    flights.forEach(flight => {
        totalPrice = totalPrice + flight.PriceAdult + flight.FeeAdult + flight.TaxAdult;
    });

    const toggleOpenDetail = (type) => {
        var newType;
        if (type == detailType) newType = null;
        else newType = type;

        setDetailType(newType);
    }

    return (
        <Modal
            visible={visible}
            onCancel={() => onCancel()}
            title={t('your_flights')}
            footer={null}
            className="selected-flights-modal"
        >
            {
                flights.map((flight, index) => {
                    // let airline = generateAirline(flight.AirlineCode);
                    let flightClass = convertClassOfFlightBooking(flight.Class);

                    return (
                        <div key={index}>
                            <Row gutter={16} key={index} align="middle">
                                <Col lg={6} md={24} sm={12} xs={12}>
                                    <div className="selected-flight-property-title">{t('departure')}</div>
                                    <div className="flight-date">{moment(flight.StartDate).format('dddd, ll')}</div>
                                </Col>
                                <Col lg={8} md={9} sm={12} xs={12}>
                                    <Row align="middle" className="selected-flight-airline">
                                        <img className="lf-air-logo mr-3" src={airlines[index].logo} />
                                        <div className="selected-flight-airline-text">
                                            <div className="selected-flight-property-title">{airlines[index].name}</div>
                                            <div>{flightClass}</div>
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg={6} md={10} sm={16} xs={16}>
                                    <Row align="middle" justify="space-between">
                                        <div className="text-center">
                                            <div className="selected-flight-property-title">{moment(flight.StartDate).format('HH:mm')}</div>
                                            <div>{flight.StartPoint}</div>
                                        </div>
                                        <div className="selected-flight-icon-divider">
                                            <Divider>
                                                <FontAwesomeIcon icon={faPlane} size="sm" />
                                            </Divider>
                                        </div>
                                        <div className="text-center">
                                            <div className="selected-flight-property-title">{moment(flight.EndDate).format('HH:mm')}</div>
                                            <div>{flight.EndPoint}</div>
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg={4} md={5} sm={8} xs={8}>
                                    <div className="text-right">
                                        <div className="selected-flight-property-title">{convertTime(flight.Duration)}</div>
                                        <div>{flight.ListSegment.length == 1 ? t('direct_flight') : `${flight.ListSegment.length} ${t('stops')}`}</div>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                        </div>
                    )
                })
            }
            <Row gutter={[16, 16]} align="middle" justify="space-between" className="selected-flights-total-price">
                <Col className="d-flex align-items-center">
                    <span className="mr-3" onClick={() => toggleOpenDetail('flight')}>
                        <Button type={detailType == 'flight' ? "primary" : "link"} className={detailType == 'flight' ? '' : 'p-0'} shape="round" size="small">{t('flight_detail')}</Button>
                    </span>
                    <span onClick={() => toggleOpenDetail('fare')}>
                        <Button type={detailType == 'fare' ? "primary" : "link"} className={detailType == 'fare' ? '' : 'p-0'} shape="round" size="small">{t('fare_detail')}</Button>
                    </span>
                </Col>
                <Col className="d-flex align-items-center justify-content-between">
                    <div className="mr-4 text-right text-mobile-left">
                        <Title level={screenSize.width > 576 ? 4 : 5} className="total-price">{priceInVn(totalPrice)}/{t('passenger')}</Title>
                        <div className="total-price-subtitle">{t('included_tax_and_fee')}</div>
                    </div>
                    <Button className="primary-purple" size="large" type="primary" onClick={() => onOk()}>{t('continue')}</Button>
                </Col>
            </Row>
            {
                detailType ? (
                    <div>
                        <Divider />
                        {
                            detailType == 'flight' ? (
                                <div className="selected-flights-detail">
                                    {
                                        flights.map((item, index) => {
                                            let flight = {
                                                start: item.StartPoint,
                                                end: item.EndPoint,
                                                start_time: moment(item.StartDate).format('HH:mm'),
                                                end_time: moment(item.EndDate).format('HH:mm'),
                                                stops: item.Stops,
                                                duration: item.Duration,
                                                price: item.PriceAdult + item.FeeAdult + item.TaxAdult,
                                                childrenPrice: item.PriceChild + item.FeeChild + item.TaxChild,
                                                infantPrice: item.PriceInfant + item.FeeInfant + item.TaxInfant,
                                                totalPrice: item.TotalPrice,
                                                class: item.Class,
                                                airline_code: item.AirlineCode,
                                                segments: item.ListSegment,
                                                adults: router.query.adults,
                                                childrens: router.query.childrens,
                                                infants: router.query.infants
                                            }

                                            return (
                                                <div>
                                                    <FlightItemDetail
                                                        flight={flight}
                                                        key={index}
                                                        airports={airports}
                                                        airline={airlines[index]}
                                                        rules={item.baggageRules}
                                                    />
                                                    {index < flights.length - 1 ? <Divider /> : null}
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="selected-flights-fare">
                                    {
                                        flights.map((item, index) => {
                                            let flight = {
                                                start: item.StartPoint,
                                                end: item.EndPoint,
                                                start_time: moment(item.StartDate).format('HH:mm'),
                                                end_time: moment(item.EndDate).format('HH:mm'),
                                                stops: item.Stops,
                                                duration: item.Duration,
                                                price: item.PriceAdult + item.FeeAdult + item.TaxAdult,
                                                childrenPrice: item.PriceChild + item.FeeChild + item.TaxChild,
                                                infantPrice: item.PriceInfant + item.FeeInfant + item.TaxInfant,
                                                totalPrice: item.TotalPrice,
                                                class: item.Class,
                                                airline_code: item.AirlineCode,
                                                segments: item.ListSegment,
                                                adults: router.query.adults,
                                                childrens: router.query.childrens,
                                                infants: router.query.infants
                                            }

                                            return (
                                                <div>
                                                    <FlightItemFare
                                                        flight={flight}
                                                        key={index}
                                                        airports={airports}
                                                        airline={airlines[index]}
                                                        rules={item.fareRules}
                                                    />
                                                    {index < flights.length - 1 ? <Divider /> : null}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                ) : null
            }
        </Modal>
    )
}

export default withTranslation('flight')(SelectedFlightModal);