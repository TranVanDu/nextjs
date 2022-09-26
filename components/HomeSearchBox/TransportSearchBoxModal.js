import React, { useEffect, useState } from 'react';
import { withTranslation, Router } from '../../i18n';
import { Row, Col, Button, Input, DatePicker, Form, TimePicker, AutoComplete, Popover, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { requestGetDistrictByName, requestGetActiveAirport } from '../../requests/transport';
import PlacesAutoComplete from './PlaceAutoComplete';
import { getDistrictByData } from '../../helpers/autocomplete';
import CustomerQuantity from '../CustomerQuantity/transport';
import { useWindowSize } from '../useWindowSize';
import { strToAlphaBet } from '../../helpers/helpers';
import { DatePicker as MobileTimePicker } from 'antd-mobile';


const renderItem = (airport) => {
    return {
        value: airport.title,
        label: airport.title,
        data: airport
    };
};


const TransportSearchBoxModal = (props) => {
    const { t, defaultValue, onClose } = props;
    const [form] = Form.useForm();
    const windowSize = useWindowSize();

    const [isOnward, setIsOnward] = useState(defaultValue.type == 1 ? true : false);
    const [place, setPlace] = useState({ place_id: defaultValue.place_id, address: defaultValue.address, sub_address: defaultValue.sub_address });
    const [airport, setAirport] = useState({ id: defaultValue.airport_id, title: defaultValue.airport_title, province_longitude: defaultValue.province_longitude, province_latitude: defaultValue.province_latitude });
    const [passenger, setPassenger] = useState(defaultValue.passenger);
    const [pickDate, setPickDate] = useState({ pickDateStr: moment(defaultValue.time, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY"), pickDateMt: moment(defaultValue.time, "DD/MM/YYYY HH:mm") });
    const [pickTime, setPickTime] = useState({ pickTimeStr: moment(defaultValue.time, "DD/MM/YYYY HH:mm").format("HH:mm"), pickTimeMt: moment(defaultValue.time, "DD/MM/YYYY HH:mm") });
    const [resultAirport, setResultAirport] = useState([]);

    const [visibleFrom, setVisibleFrom] = useState(false);
    const [visibleTo, setVisibleTo] = useState(false);
    const [visiblePickDate, setVisiblePickDate] = useState(false);
    const [visiblePickTime, setVisiblePickTime] = useState(false);

    useEffect(() => {
        requestGetActiveAirport().then(res => {
            setResultAirport(res);
        })
    }, [])

    const setDataPlace = async (place) => {
        var place_route = getDistrictByData(place);
        var district = await requestGetDistrictByName(place_route);
        setPlace({ place_id: district ? district.id : null, sub_address: place.value, address: place.formatted_address })
    }

    const setDataAirport = (value, option) => {
        setAirport(option.data);
    }


    const onSearch = (values) => {

        if (!airport) {
            setVisibleFrom(true);
            setTimeout(() => setVisibleFrom(false), 3000);
            return;
        }
        if (!place) {
            setVisibleTo(true);
            setTimeout(() => setVisibleTo(false), 3000);
            return;
        }
        if (!pickDate.pickDateStr) {
            setVisiblePickDate(true);
            setTimeout(() => setVisiblePickDate(false), 3000);
            return;
        }
        if (!pickTime.pickTimeStr) {
            setVisiblePickTime(true);
            setTimeout(() => setVisiblePickDate(false), 3000);
            return;
        }

        var dataSearch = {
            airport_id: airport.id,
            airport_title: airport.title,
            place_id: place.place_id,
            address: place.address,
            sub_address: place.sub_address,
            time: `${pickDate.pickDateStr} ${pickTime.pickTimeStr}`,
            passenger: passenger,
            type: isOnward ? 1 : 2
        }

        var time = moment(dataSearch.time, "DD/MM/YYYY HH:mm").valueOf();
        var time_now = moment().add(2, "hours").valueOf();
        var time_false = 0;
        if (time < time_now) {
            time_false = 1;
        }
        dataSearch.time_false = time_false;
        // console.log("data search", dataSearch)

        Router.push({ pathname: '/transport/list', query: dataSearch }, undefined, { shallow: true });
        onClose();
    }

    return (
        <div className="home-search-box">
            <Form onFinish={onSearch} form={form}>
                <Row align="middle">
                    <div className={`home-search-flight-btn ${isOnward ? 'home-search-flight-btn--active' : ''}`} onClick={() => setIsOnward(true)}>{t('airport_pickup')}</div>
                    <div className={`home-search-flight-btn ${!isOnward ? 'home-search-flight-btn--active' : ''}`} onClick={() => setIsOnward(false)}>{t('airport_dropoff')}</div>
                </Row>
                <Row gutter={[{ md: 16, sm: 0, xs: 0 }, { md: 0, sm: 8, xs: 8 }]} className="mt-2">
                    <Col md={6} sm={24} xs={24} className="has-right-divider">
                        <Tooltip placement="topLeft" title={t('choose_from')} visible={visibleFrom}>
                            <div className="home-search-box-label">{t('from')}</div>
                            {isOnward ?
                                <AutoComplete
                                    dropdownClassName="box-search-home-autocomplete-dat"
                                    dropdownMatchSelectWidth={windowSize.width > 1024 ? 500 : true}
                                    options={resultAirport.map(item => renderItem(item))}
                                    notFoundContent={t('notFoundContent')}
                                    onSelect={setDataAirport}
                                    style={{ width: "100%" }}
                                    filterOption={(inputValue, option) => {
                                        return strToAlphaBet(option.value.toLowerCase()).indexOf(strToAlphaBet(inputValue.toLowerCase())) !== -1;
                                    }}
                                    defaultValue={airport ? airport.title : null}
                                >
                                    <Input
                                        placeholder={t('airport_and_city')}
                                        bordered={false} size="large"
                                        style={{ width: "100%" }}
                                    />
                                </AutoComplete>
                                : <PlacesAutoComplete
                                    onChange={setDataPlace}
                                    defaultValue={place ? place.sub_address : ""}
                                    dropdownMatchSelectWidth={windowSize.width > 1024 ? 500 : true}
                                    airport={airport}
                                />
                            }
                        </Tooltip>

                    </Col>
                    <Col md={6} sm={24} xs={24} className="has-right-divider">
                        <Tooltip placement="topLeft" title={t('choose_to')} visible={visibleTo}>
                            <div className="home-search-box-label">{t('to')}</div>
                            {isOnward ?
                                <PlacesAutoComplete
                                    onChange={setDataPlace}
                                    defaultValue={place ? place.sub_address : ""}
                                    dropdownMatchSelectWidth={windowSize.width > 1024 ? 500 : true}
                                    airport={airport}
                                />
                                : <AutoComplete
                                    dropdownClassName="box-search-home-autocomplete-dat"
                                    dropdownMatchSelectWidth={windowSize.width > 1024 ? 500 : true}
                                    options={resultAirport.map(item => renderItem(item))}
                                    notFoundContent={t('notFoundContent')}
                                    onSelect={setDataAirport}
                                    style={{ width: "100%" }}
                                    filterOption={(inputValue, option) => {
                                        return strToAlphaBet(option.value.toLowerCase()).indexOf(strToAlphaBet(inputValue.toLowerCase())) !== -1;
                                    }}
                                    defaultValue={airport ? airport.title : null}
                                >
                                    <Input
                                        placeholder={t('airport_and_city')}
                                        bordered={false} size="large"
                                        style={{ width: "100%" }}
                                    />
                                </AutoComplete>}
                        </Tooltip>
                    </Col>
                    <Col md={4} sm={24} xs={24} className="has-right-divider">
                        <Tooltip placement="topLeft" title={t('choose_pick_date')} visible={visiblePickDate} >
                            <div className="home-search-box-label">{t('pick_date')}</div>
                            <DatePicker
                                format="DD/MM/YYYY"
                                placeholder={t('choose_date')}
                                bordered={false}
                                size="large"
                                disabledDate={d => !d || d < moment().startOf("day")}
                                style={{ width: "100%" }}
                                onChange={(dateMt, dateStr) => setPickDate({ pickDateStr: dateStr, pickDateMt: dateMt })}
                                value={pickDate.pickDateMt}
                                inputReadOnly
                            />
                        </Tooltip>
                    </Col>
                    <Col md={3} sm={24} xs={24} className="has-right-divider">
                        <Tooltip placement="topLeft" title={t('choose_pick_time')} visible={visiblePickTime} >
                            <div className="home-search-box-label">{t('pick_time')}</div>
                            {windowSize.width > 1024 ?
                                <TimePicker
                                    format={"HH:mm"}
                                    placeholder={t('choose_time')}
                                    bordered={false}
                                    size="large"
                                    style={{ width: "100%" }}
                                    onChange={(timeMt, timeStr) => setPickTime({ pickTimeStr: timeStr, pickTimeMt: timeMt })}
                                    value={pickTime.pickTimeMt}
                                    showNow={false}
                                    minuteStep={10}
                                    inputReadOnly
                                    popupClassName="dat-custom-time-picker"
                                    onSelect={(value) => {
                                        const timeString = moment(value).format("HH:mm");
                                        setPickTime({ pickTimeStr: timeString, pickTimeMt: value });
                                    }}
                                />
                                :
                                <MobileTimePicker
                                    mode="time"
                                    minuteStep={10}
                                    value={pickTime.pickTimeMt ? new Date(pickTime.pickTimeMt.valueOf()) : new Date()}
                                    onChange={time => {
                                        const timeMt = moment(time.getTime());
                                        setPickTime({ pickTimeStr: timeMt.format("HH:mm"), pickTimeMt: timeMt })
                                    }}
                                    locale={{
                                        DatePickerLocale: {
                                            hour: '',
                                            minute: ''
                                        },
                                        okText: "Ok",
                                        dismissText: t('cancel')
                                    }}
                                >
                                    <Input
                                        placeholder={t('choose_time')}
                                        bordered={false}
                                        size="large"
                                        value={pickTime.pickTimeStr}
                                        style={{ width: "100%" }}
                                        readOnly
                                    />
                                </MobileTimePicker>
                            }
                        </Tooltip>
                    </Col>
                    <Col md={3} sm={24} xs={24}>
                        <div className="home-search-box-label">{t('customer')}</div>
                        <Popover
                            placement="bottomRight"
                            trigger="click"
                            content={
                                <CustomerQuantity
                                    num={passenger}
                                    onChange={(num) => setPassenger(num)}
                                    width={windowSize.width > 1024 ? 350 : "100%"}
                                />
                            }
                        >
                            <Input
                                placeholder={t('choose_customer_quantity')}
                                bordered={false}
                                size="large"
                                value={`${passenger} ` + t('passenger')}
                                style={{ width: "100%" }}
                            />
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
        </div>
    )
}

export default withTranslation('home')(TransportSearchBoxModal);