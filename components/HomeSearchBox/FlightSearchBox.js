import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withTranslation, Router } from '../../i18n';
import { Row, Col, Button, Input, DatePicker, Form, Popover, AutoComplete, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import CustomerQuantity from '../CustomerQuantity';
import { removeVietnameseTones } from '../../helpers/helpers';

const FlightSearchBox = (props) => {
    var { t, defaultValues, onAdditionalSubmit } = props;
    var [formRef] = Form.useForm();
    var airports = useSelector(state => state.config.airports);
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [adults, setAdults] = useState(1);
    const [childrens, setChildrens] = useState(0);
    const [infants, setInfants] = useState(0);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const [fromOptions, setFromOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);

    useEffect(() => {
        console.log(defaultValues)
        if (defaultValues.fromPlace) setFromPlace(defaultValues.fromPlace);
        if (defaultValues.toPlace) setToPlace(defaultValues.toPlace);
        if (defaultValues.adults) setAdults(defaultValues.adults);
        if (defaultValues.childrens) setChildrens(defaultValues.childrens);
        if (defaultValues.infants) setInfants(defaultValues.infants);
        if (defaultValues.customer) formRef.setFieldsValue({ customer: defaultValues.customer });
        if (defaultValues.isRoundTrip !== undefined) {
            setIsRoundTrip(defaultValues.isRoundTrip);
        }
        else formRef.setFieldsValue({ customer: `${adults} ${t('adult')}` });
    }, []);

    useEffect(() => {
        if (airports) {
            let options = airports.map(airport => {
                return {
                    label: (
                        <div>
                            <div>{airport.province}</div>
                            <small>{airport.title}</small>
                        </div>
                    ),
                    province: airport.province,
                    value: airport.code
                }
            });
            setFromOptions(options);
            setToOptions(options);
        }
    }, [airports]);

    const onSelectPlace = (option, type) => {
        let selectedAirport = {};
        let newAirports = [];
        airports.forEach(item => {
            if (item.code == option.value) {
                selectedAirport = item;
            } else {
                newAirports.push(item);
            }
        });
        let options = newAirports.map(airport => {
            return {
                label: (
                    <div>
                        <div>{airport.province}</div>
                        <small>{airport.title}</small>
                    </div>
                ),
                province: airport.province,
                value: airport.code
            }
        });

        formRef.setFieldsValue({
            [type]: `${selectedAirport.province} (${selectedAirport.code})`
        });
        if (type == 'from') {
            setFromPlace(selectedAirport.code);
            setToOptions(options);
        } else if (type == 'to') {
            setToPlace(selectedAirport.code);
            setFromOptions(options);
        }
    }

    const onSearchPlace = (value, type) => {
        value = value.toLowerCase();
        let options = [];
        airports.forEach(airport => {
            let airportTitle = removeVietnameseTones(airport.title).toLowerCase();
            let airportProvince = removeVietnameseTones(airport.province).toLowerCase();
            let airportCode = airport.code.toLowerCase();

            if (airportTitle.indexOf(value) >= 0 || airportProvince.indexOf(value) >= 0 || airportCode.indexOf(value) >= 0) {
                options.push({
                    label: (
                        <div>
                            <div>{airport.province}</div>
                            <small>{airport.title}</small>
                        </div>
                    ),
                    value: airport.code
                });
            }
        });
        if (type == 'from') setFromOptions(options);
        else setToOptions(options);
    }

    const onFinishSetCustomer = (value) => {
        setAdults(value.adults);
        setChildrens(value.childrens);
        setInfants(value.infants);
        setVisiblePopover(false);
        formRef.setFieldsValue({ customer: `${value.adults} ${t('adult')}, ${value.childrens} ${t('children')}, ${value.infants} ${t('infant')}` });
    }

    const onSearch = (values) => {
        console.log(values)
        let isValid = false;
        if (isRoundTrip) {
            if (values.from && values.to && values.start_date && values.return_date && values.customer) isValid = true;
        } else {
            if (values.from && values.to && values.start_date && values.customer) isValid = true;
        }

        if (isValid) {
            if (values.start_date) {
                values.start_date = moment(values.start_date).format('YYYY-MM-DD');
            }
            if (values.return_date) {
                values.return_date = moment(values.return_date).format('YYYY-MM-DD');
            }

            var query = {};
            Object.keys(values).map(key => {
                if (values[key]) query[key] = values[key];
            });
            delete query.customer;
            query.from = fromPlace;
            query.to = toPlace;
            query.adults = adults;
            query.childrens = childrens;
            query.infants = infants;
            query.isRoundTrip = isRoundTrip;
            // query.timeStamp = Date.now();

            Router.push({ pathname: '/flight/list', query: query }, undefined, { shallow: true });
            onAdditionalSubmit();
        } else {
            Modal.error({
                title: t('flight_search_error')
            });
        }
    }

    return (
        <Form onFinish={onSearch} form={formRef} initialValues={defaultValues}>
            <Row align="middle">
                <div className={`home-search-flight-btn ${!isRoundTrip ? 'home-search-flight-btn--active' : ''}`} onClick={() => setIsRoundTrip(false)}>{t('one_way_flight')}</div>
                <div className={`home-search-flight-btn ${isRoundTrip ? 'home-search-flight-btn--active' : ''}`} onClick={() => setIsRoundTrip(true)}>{t('round_trip_flight')}</div>
            </Row>
            <Row gutter={[{ md: 16, sm: 0, xs: 0 }, { md: 0, sm: 8, xs: 8 }]} className="mt-2">
                <Col md={6} sm={24} className="has-right-divider">
                    <div className="home-search-box-label">{t('from')}</div>
                    <Form.Item name="from">
                        <AutoComplete
                            options={fromOptions}
                            onSelect={(value, option) => onSelectPlace(option, 'from')}
                            onSearch={(value) => onSearchPlace(value, 'from')}
                            className="flight-place-autocomplete"
                        >
                            <Input placeholder={t('airport_and_city')} bordered={false} size="large" />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col md={5} sm={24} className="has-right-divider">
                    <div className="home-search-box-label">{t('to')}</div>
                    <Form.Item name="to" >
                        <AutoComplete
                            options={toOptions}
                            onSelect={(value, option) => onSelectPlace(option, 'to')}
                            onSearch={(value) => onSearchPlace(value, 'to')}
                            className="flight-place-autocomplete"
                        // size="large"
                        >
                            <Input placeholder={t('airport_and_city')} bordered={false} size="large" />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col md={isRoundTrip ? 4 : 6} sm={24} xs={24} className={isRoundTrip ? '' : 'has-right-divider'}>
                    <div className="home-search-box-label">{t('start_date')}</div>
                    <Form.Item name="start_date" >
                        <DatePicker
                            style={{ width: "100%" }}
                            placeholder={t('choose_date')}
                            bordered={false}
                            size="large"
                            style={{ width: '100%' }}
                            disabledDate={d => !d || d < moment().startOf("day")}
                            inputReadOnly
                        />
                    </Form.Item>
                </Col>
                {
                    isRoundTrip ? (
                        <Col md={4} sm={24} xs={24} className="has-right-divider">
                            <div className="home-search-box-label">{t('return_date')}</div>
                            <Form.Item name="return_date" >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder={t('choose_date')}
                                    bordered={false}
                                    size="large"
                                    disabledDate={d => !d || d < moment(formRef.getFieldValue('start_date')).startOf("day")}
                                    inputReadOnly
                                />
                            </Form.Item>
                        </Col>
                    ) : null
                }
                <Col md={isRoundTrip ? 3 : 5} sm={24} xs={24}>
                    <div className="home-search-box-label">{t('customer')}</div>
                    <Popover
                        placement="bottom"
                        trigger="click"
                        content={
                            <CustomerQuantity
                                limit={7}
                                defaultAdults={adults}
                                defaultChildrens={childrens}
                                defaultInfants={infants}
                                onFinish={onFinishSetCustomer}
                                isShowInfant={true}
                            />
                        }
                        visible={visiblePopover}
                    >
                        <Form.Item name="customer" >
                            <Input contentEditable={false} placeholder={t('choose_customer_quantity')} bordered={false} size="large" onClick={() => setVisiblePopover(true)} readOnly />
                        </Form.Item>
                    </Popover>

                </Col>
                <Col md={2} sm={24} xs={24}>
                    <Button type="primary" htmlType="submit">
                        <span>{t('search')}</span>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

FlightSearchBox.defaultProps = {
    defaultValues: {},
    onAdditionalSubmit: () => { }
}

export default withTranslation('home')(FlightSearchBox);