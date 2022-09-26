import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Typography, Button, Divider, Timeline } from 'antd';
import { i18n, withTranslation } from '../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faInfoCircle, faPlane, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from 'react-number-format';
import { generateAirline, convertTime, convertClassOfFlightBooking, convertPlaneType, priceInVn } from '../../helpers/helpers';
import moment from 'moment';
import FlightItemFare from './FlightItemFare';
import FlightItemDetail from './FlightItemDetail';
// requests
import { getFareRuleInfo } from '../../requests/flight';

const { Title } = Typography;

const FlightItem = (props) => {
    const [detailType, setDetailType] = useState('');
    const [baggageRules, setBaggageRules] = useState([]); 
    const [fareRules, setFareRules] = useState([]); 
    const airports = useSelector((state) => state.config.airports);
    var { t, flight, onSelect, screenSize, flightSession } = props;

    var airline = generateAirline(flight.airline_code);

    useEffect(() => {
        async function getData() {
            let data = await getFareRuleInfo({
                DataSession: localStorage.getItem('flightDataSession'),
                FlightSession: flightSession,
                lang: i18n.language
            });

            let baggageRules = [], fareRules = [];
            data.Data.forEach(item => {
                let temp = item.toLowerCase();
                if (temp.indexOf('baggage') >= 0 || temp.indexOf('hành lý') >= 0) baggageRules.push(item);
                else fareRules.push(item);
            });
            setBaggageRules(baggageRules);
            setFareRules(fareRules);
        }
        getData();
    }, []);

    const toggleOpenDetail = (type) => {
        var newType;
        if (type == detailType) newType = '';
        else newType = type;

        setDetailType(newType);
    }

    return (
        <Card className="list-flight-card" hoverable>
            <Row gutter={8} justify="space-between" align="middle">
                <Col lg={6} md={3} sm={0} xs={0}>
                    <img className="lf-air-logo mr-3" src={airline.logo} />
                    <span className="lf-air-title">{airline.name}</span>
                    <div className="lf-air-title">{convertClassOfFlightBooking(flight.class)}</div>
                </Col>
                <Col lg={3} md={3} sm={5} xs={5} className="text-center text-mobile-left">
                    <Title level={screenSize.width > 576 ? 4 : 5}>{flight.start_time}</Title>
                    <div>{flight.start}</div>
                </Col>
                <Col lg={3} md={4} sm={6} xs={6} className="text-center">
                    <Divider><FontAwesomeIcon icon={faPlane} /></Divider>
                </Col>
                <Col lg={3} md={3} sm={5} xs={5} className="text-center text-mobile-right">
                    <Title level={screenSize.width > 576 ? 4 : 5}>{flight.end_time}</Title>
                    <div>{flight.end}</div>
                </Col>
                <Col lg={3} md={0} sm={8} xs={8} className="text-center text-mobile-right">
                    <Title level={screenSize.width > 576 ? 4 : 5}>{convertTime(flight.duration)}</Title>
                    <div>{!flight.stops ? t('direct_flight') : `${flight.stops} ${t('stops')}`}</div>
                </Col>
                {/* <Col lg={1} md={0} sm={0} xs={0} className="text-right">
                    <FontAwesomeIcon className="lf-icon-suitcase" icon={faSuitcaseRolling} />
                </Col> */}
                <Col lg={6} md={11} sm={24} xs={24} className="text-right flight-item-price">
                    <div className="lf-price-text">
                        <span className="lf-price">{priceInVn(flight.price)}</span>/{t('passenger')}
                    </div>
                    <Button className="primary-purple lf-btn-select" type="primary" size={screenSize.width > 576 ? "large" : "medium"} onClick={() => onSelect(baggageRules, fareRules)}>{t('choose')}</Button>
                </Col>
            </Row>
            <div className="mobile-flight-item-airline">
                <img className="lf-air-logo mr-3" src={airline.logo} />
                <span className="lf-air-title">{airline.name}</span>
            </div>
            <div className="lf-text-view-detail">
                <span className="mr-4" onClick={() => toggleOpenDetail('flight')}>
                    <Button type={detailType == 'flight' ? "primary" : "link"} className={detailType == 'flight' ? '' : 'p-0'} shape="round" size="small">{t('flight_detail')}</Button>
                </span>
                <span onClick={() => toggleOpenDetail('fare')}>
                    <Button type={detailType == 'fare' ? "primary" : "link"} className={detailType == 'fare' ? '' : 'p-0'} shape="round" size="small">{t('fare_detail')}</Button>
                </span>
            </div>
            {
                detailType ? (
                    <div>
                        <Divider />
                        {
                            detailType == 'flight' ? (
                                <FlightItemDetail
                                    flight={flight}
                                    airports={airports}
                                    airline={airline}
                                    rules={baggageRules}
                                />
                            ) : (
                                    <FlightItemFare
                                        flight={flight}
                                        airports={airports}
                                        airline={airline}
                                        rules={fareRules}
                                    />
                                )
                        }
                    </div>
                ) : null
            }
        </Card>
    )
}

export default withTranslation('flight')(FlightItem);