import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, Router } from '../../../i18n';
import { Row, Col, Checkbox, Slider, Typography } from 'antd';
import _ from 'lodash';
import { faSunrise, faSunset, faMoon } from '@fortawesome/pro-regular-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// helper
import { generateAirline, priceInVn } from '../../../helpers/helpers';

const { Title } = Typography;

const Filter = (props) => {
    var { t, filter, onChangePrice, onFilter, onFilterPrice } = props;

    const timeFilterOptions = [
        { label: t('early_morning'), sublabel: '00:00 - 06:00', key: 'EM', icon: faSunrise },
        { label: t('morning'), sublabel: '06:00 - 12:00', key: 'M', icon: faSun },
        { label: t('afternoon'), sublabel: '12:00 - 18:00', key: 'A', icon: faSunset },
        { label: t('evening'), sublabel: '18:00 - 24:00', key: 'E', icon: faMoon },
    ];

    const airlineFilterOptions = [
        { label: 'Vietnam Airlines', key: 'VN' },
        { label: 'Vietjet Air', key: 'VJ' },
        { label: 'Bamboo Airways', key: 'QH' },
    ];

    const classFilterOptions = [
        // {
        //     label: t('vna_economy_lite'),
        //     key: "P,A"
        // },
        // {
        //     label: t('vna_economy_classic'),
        //     key: "E,T,R,N,Q,L"
        // },
        // {
        //     label: t('vna_economy_flex'),
        //     key: "K,H,S,M"
        // },
        // {
        //     label: t('vna_premium_economy'),
        //     key: "U,Z,W"
        // },
        // {
        //     label: t('vna_business'),
        //     key: "I,D,C,J"
        // },
        // {
        //     label: t('vj_eco'),
        //     key: "Eco"
        // },
        // {
        //     label: t('vj_deluxe'),
        //     key: "Deluxe"
        // },
        // {
        //     label: t('vj_skyboss'),
        //     key: "SkyBoss"
        // },
        // {
        //     label: t('qh_economy_savermax'),
        //     key: "ECONOMYSAVERMAX"
        // },
        // {
        //     label: t('qh_economy_saver'),
        //     key: "ECONOMYSAVER"
        // },
        // {
        //     label: t('qh_economy_smart'),
        //     key: "ECONOMYSMART"
        // },
        // {
        //     label: t('qh_economy_flex'),
        //     key: "ECONOMYFLEX"
        // },
        // {
        //     label: t('qh_premium_smart'),
        //     key: "PREMIUMSMART"
        // },
        // {
        //     label: t('qh_premium_flex'),
        //     key: "PREMIUMFLEX"
        // },
        // {
        //     label: t('qh_business_smart'),
        //     key: "BUSINESSSMART"
        // },
        // {
        //     label: t('qh_business_flex'),
        //     key: "BUSINESSFLEX"
        // },
        {
            label: t('economy_lite'),
            key: "P|A|Eco|ECONOMYSAVER|ECONOMYSAVERMAX|ECONOMYSMART|ECONOMYFLEX"
        },
        {
            label: t('economy'),
            key: "E|T|R|N|Q|L|K|H|S|M|U|Z|W|Deluxe|PREMIUMSMART|PREMIUMFLEX"
        },
        {
            label: t('business'),
            key: "I|D|C|J|SkyBoss|BUSINESSSMART|BUSINESSFLEX"
        },
    ];

    return (
        <div>
            <Title level={5}>{t('airlines')}</Title>
            {
                airlineFilterOptions.map((option, index) => (
                    <Row justify="space-between" align="middle" key={index} className="filter-option" align="middle">
                        <div>
                            <img className="lf-air-logo" src={generateAirline(option.key).logo} />
                            <span className="ml-1">{option.label}</span>
                        </div>
                        <div>
                            <Checkbox
                                checked={filter.airlines.indexOf(option.key) >= 0}
                                onChange={(e) => onFilter('airlines', option.key, e.target.checked)}
                            />
                        </div>
                    </Row>
                ))
            }
            <Title level={5} className="mt-4">{t('departure_time')}</Title>
            <Row justify="space-between" className="filter-option" align="middle" gutter={16}>
                {
                    timeFilterOptions.map((option, index) => {
                        let checked = filter.departureTimes.indexOf(option.key) >= 0;
                        return (
                            <Col md={12} sm={12} xs={12} key={index}>
                                <div
                                    className={`filter-option--time ${checked ? 'active' : ''}`}
                                    onClick={(e) => onFilter('departureTimes', option.key, !checked)}
                                >
                                    <FontAwesomeIcon icon={option.icon} style={{ fontSize: 20 }} />
                                    <span className="mt-1">{option.sublabel}</span>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <Title level={5} className="mt-4">{t('arrival_time')}</Title>
            <Row justify="space-between" className="filter-option" align="middle" gutter={16}>
                {
                    timeFilterOptions.map((option, index) => {
                        let checked = filter.arrivalTimes.indexOf(option.key) >= 0;
                        return (
                            <Col md={12} sm={12} xs={12} key={index}>
                                <div
                                    className={`filter-option--time ${checked ? 'active' : ''}`}
                                    onClick={(e) => onFilter('arrivalTimes', option.key, !checked)}
                                >
                                    <FontAwesomeIcon icon={option.icon} style={{ fontSize: 20 }} />
                                    <span className="mt-1">{option.sublabel}</span>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <Title level={5} className="mt-4">{t('fare_class')}</Title>
            {
                classFilterOptions.map((option, index) => (
                    <Row key={index} className="filter-option" align="top">
                        <Col span={22}>
                            <span>{option.label}</span>
                        </Col>
                        <Col span={2}>
                            <div className="text-right">
                                <Checkbox
                                    checked={filter.classes.indexOf(option.key) >= 0}
                                    onChange={(e) => onFilter('classes', option.key, e.target.checked)}
                                />
                            </div>
                        </Col>
                    </Row>
                ))
            }
            <Title level={5} className="mt-4">{t('price_range')}</Title>
            <div>
                <span>
                    {/* {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filter.prices[0])} */}
                    {priceInVn(filter.prices[0])}
                </span>
                <span className="ml-1 mr-1">-</span>
                <span>
                    {/* {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filter.prices[1])} */}
                    {priceInVn(filter.prices[1])}
                </span>
            </div>
            <div className="mt-3">
                <Slider
                    range={true}
                    step={500000}
                    value={[filter.prices[0], filter.prices[1]]}
                    // onChange={(value) => setFilter({ ...filter, prices: value })}
                    onChange={(value) => onChangePrice({ ...filter, prices: value })}
                    onAfterChange={(value) => onFilterPrice(value)}
                    min={0}
                    max={10000000}
                    tipFormatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                />
            </div>
        </div>
    )
}

export default withTranslation('flight')(Filter);