import React, { useState, useEffect } from 'react';
import { Row, Col, AutoComplete, Input, Popover, Button, Form } from 'antd';
import CustomerQuantity from '../CustomerQuantity';
import RangeDatePicker from '../RangeDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { autocomplete } from '../../requests/stay';
import moment from 'moment';
import { Router } from '../../i18n';

function StayMiniSearch(props) {
    const { t, onResearch, _query } = props;
    var [form] = Form.useForm();
    const [adults, setAdults] = useState(_query.guest);
    const [childrens, setChildrens] = useState(_query.childrens);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const [visibleDatePicker, setVisibleDatePicker] = useState(false);
    const [inputPlace, setInputPlace] = useState(_query.location || '');
    const [location, setLocation] = useState({
        id: _query.sid,
        type: _query.stype,
        full_paths: _query.location
    });
    const [loadingAutocomplete, setLoadingAutocomplete] = useState(false);

    const suggest = debounce(function (e) {
        e.length > 0 && setLoadingAutocomplete(true);
        setInputPlace(e);
        autocomplete(e).then(data => {
            setSuggestion(data);
            setLoadingAutocomplete(false);
        })
    }, 400);

    const [suggestion, setSuggestion] = useState({
        location: [],
        property: []
    });
    const [dates, setDate] = useState({
        checkin: moment(_query.checkin) || null,
        checkout: moment(_query.checkout) || null
    });

    const onChange = ({ startDate, endDate }) => {
        setDate({
            checkin: startDate,
            checkout: endDate
        })
        setVisibleDatePicker(false);
    }

    const onFinishSetCustomer = (value) => {
        setAdults(value.adults);
        setChildrens(value.childrens);
        setVisiblePopover(false);
    }

    const onSearch = (values) => {
        if (dates.checkin && dates.checkout) {
            values.checkin = moment(dates.checkin).format('YYYY-MM-DD');
            values.checkout = moment(dates.checkout).format('YYYY-MM-DD');
        }
        if (location) {
            values.sid = location.id;
            values.stype = location.type;
            values.location = location.full_paths
        }

        var query = {};
        Object.keys(values).map(key => {
            if (values[key]) query[key] = values[key];
        });
        query = {
            ...query,
            guest: adults,
            childrens: childrens
        }

        Router.push({ pathname: '/stay/list', query: query }, undefined, { shallow: true });
        onResearch(query);
    }

    let valueDates = dates.checkin && dates.checkout ? `${dates.checkin.format('DD/MM')} - ${dates.checkout.format('DD/MM')}` : null;

    const getOptions = () => {
        let options = [];
        if (inputPlace.length > 0) {
            if (suggestion.location.length > 0) {
                options.push({
                    label: renderTitle(t('place')),
                    options: suggestion.location.map(item => renderItem(item))
                })
            }
            if (suggestion.property.length > 0) {
                options.push({
                    label: renderTitle(t('stay')),
                    options: suggestion.property.map(item => renderItem(item))
                })
            }
        }
        return options;
    }

    let onClickSuggestion = (item) => {
        if (item.full_paths) {
            setLocation(item);
            setInputPlace(item.full_paths);
            form.setFieldsValue({ txtsearch: item.full_paths })
        }
        else {
            Router.push({
                pathname: `/stay/${item.id}`, query: {
                    checkin: null,
                    checkout: null,
                    guest: 1,
                    children: 0
                }
            }, undefined, { shallow: true });
        }
    }

    const renderItem = (item) => {
        return {
            label: (
                <div
                    className="pt-1 pb-1"
                    style={{
                        display: 'flex',
                    }}
                    onClick={() => onClickSuggestion(item)}
                >
                    <span className="mr-2" style={{ width: "30px", textAlign: "center" }}><FontAwesomeIcon icon={item.full_paths ? faMapMarkerAlt : faHome} size="lg" /></span>
                    <span className="">{item.title}</span>

                </div>
            ),
        };
    };

    const renderTitle = (title) => {
        return (
            <span className="text-md">
                {title}
            </span>
        );
    };

    useEffect(() => {
        form.setFieldsValue({ txtsearch: _query.location });
    }, []);

    return (
        <Row gutter={2} className="mini-box-search d-flex justify-content-center align-items-center">
            <Col span={8} className="has-right-divider">
                <Form form={form}>
                    <Form.Item name="txtsearch" style={{ marginBottom: 0 }}>
                        <AutoComplete
                            options={getOptions()}
                            size="large"
                            dropdownMatchSelectWidth={350}
                        >
                            <Input placeholder={t('where_to_go')} bordered={false} size="middle" onChange={e => {
                                suggest(e.target.value)
                            }}
                                className={'text-bold'}
                            />
                        </AutoComplete>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8} className="has-right-divider">
                <Popover
                    placement="bottom"
                    trigger="click"
                    content={
                        <RangeDatePicker
                            onChange={onChange}
                            checkin={dates.checkin}
                            checkout={dates.checkout}
                            t={t} />
                    }
                    visible={visibleDatePicker}
                    onVisibleChange={(visible) => setVisibleDatePicker(visible)}
                >
                    <Input placeholder={t('choose_date')} bordered={false} size="middle"
                        onClick={() => setVisibleDatePicker(true)}
                        value={valueDates}
                        className="text-xs text-gray text-bold" />
                </Popover>
            </Col>
            <Col span={5} className="">
                <Popover
                    placement="bottom"
                    trigger="click"
                    content={
                        <CustomerQuantity
                            limit={10}
                            defaultAdults={+adults}
                            defaultChildrens={+childrens}
                            onFinish={onFinishSetCustomer}
                        />
                    }
                    visible={visiblePopover}
                    onVisibleChange={(visible) => setVisiblePopover(visible)}

                >
                    <Input placeholder={t('choose_customer_quantity')} bordered={false} size="middle"
                        onClick={() => setVisiblePopover(true)}
                        value={`${parseInt(adults) + parseInt(childrens)} ${t('customer')}`}
                        className="text-xs text-gray text-bold" style={{ overflow: "visible" }} />
                </Popover>
            </Col>
            <Col span={3} className="d-flex justify-content-center" >
                <Button type="primary" htmlType="submit" onClick={() => onSearch({})}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Col>
        </Row>
    )
}

export default StayMiniSearch