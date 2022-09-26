import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { withTranslation } from '../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from 'react-number-format';
import { convertClassOfFlightBooking, generateAirline, priceInVn } from '../../helpers/helpers';

const { Title } = Typography;

const FlightItemFare = (props) => {
    var { t, flight, airline, airports, rules } = props;

    let startPoint = airports.find(airport => airport.code == flight.start);
    let endPoint = airports.find(airport => airport.code == flight.end);

    return (
        <Row gutter={[16, 16]}>
            <Col md={12} sm={24} xs={24}>
                <Title level={5}>{t('conditional')}</Title>
                <div>
                    <img className="lf-air-logo mr-3" src={airline.logo} />
                    <span className="">{airline.name}</span>
                </div>
                <div className="fl-price-detail">{startPoint.province} ({flight.start}) <FontAwesomeIcon icon={faArrowRight} size="xs" /> {endPoint.province} ({flight.end})</div>
                <div>{convertClassOfFlightBooking(flight.class)}</div>

                <ul className="mt-2 flight-fare-rules">
                    {
                        rules.map(rule => <li>{rule}</li>)
                    }
                </ul>
            </Col>
            <Col md={12} sm={24} xs={24}>
                <Title level={5}>{t('price_detail')}</Title>
                <Row justify="space-between">
                    <div className="fl-price-detail">{t('price_adult')} (x{flight.adults})</div>
                    <div className="fl-price-detail">{priceInVn(flight.price * flight.adults)}</div>
                </Row>
                {
                    parseInt(flight.childrens) ? (
                        <Row justify="space-between">
                            <div className="fl-price-detail">{t('price_child')} (x{flight.childrens})</div>
                            <div className="fl-price-detail">{priceInVn(flight.childrenPrice * flight.childrens)}</div>
                        </Row>
                    ) : null
                }
                {
                    parseInt(flight.infants) ? (
                        <Row justify="space-between">
                            <div className="fl-price-detail">{t('price_infant')} (x{flight.infants})</div>
                            <div className="fl-price-detail">{priceInVn(flight.infantPrice * flight.infants)}</div>
                        </Row>
                    ) : null
                }
                <Row justify="space-between">
                    <div className="fl-price-detail">{t('tax_and_fee')}</div>
                    <div className="fl-price-detail">{t('included')}</div>
                </Row>
                <hr />
                <Row justify="space-between">
                    <div className="fl-price-detail">{t('total')}</div>
                    <div className="fl-price-detail">
                        <NumberFormat value={flight.totalPrice} displayType="text" thousandSeparator="." decimalSeparator="," /> đ
                </div>
                </Row>
            </Col>
        </Row>
    )
}

export default withTranslation('flight')(FlightItemFare);