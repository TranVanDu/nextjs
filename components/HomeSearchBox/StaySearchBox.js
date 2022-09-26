import React, { useState } from 'react';
import { withTranslation, Router } from '../../i18n';
import { Row, Col, Button, Input, Form, Popover, AutoComplete, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faHome, faMapMarkerAlt, } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import CustomerQuantity from '../CustomerQuantity';
import RangeDatePicker from '../RangeDatePicker';
import { _getRecentSearch, _saveRecentSearch } from '../../helpers/storage';
import { autocomplete } from '../../requests/stay';
import { debounce } from 'lodash';
import { LoadingOutlined } from '@ant-design/icons';
import Responsive, { useMediaQuery } from "react-responsive";
import { logActivity } from '../../requests/user';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const StaySearchBox = (props) => {
    var { t, checkinProp = null, checkoutProp = null, adult = 1, children = 0, place = "", onResearch = null, fromList = false } = props;
    var [form] = Form.useForm();
    const [adults, setAdults] = useState(adult);
    const [childrens, setChildrens] = useState(children);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const [visibleDatePicker, setVisibleDatePicker] = useState(false);
    const [inputPlace, setInputPlace] = useState(place);
    const [location, setLocation] = useState(null);
    const [loadingAutocomplete, setLoadingAutocomplete] = useState(false);

    const suggest = debounce(function (e) {
        e.length > 0 && setLoadingAutocomplete(true);
        setInputPlace(e);
        if (location != null) setLocation(null);
        autocomplete(e).then(data => {
            setSuggestion(data);
            setLoadingAutocomplete(false);
        })
    }, 400)
    const [suggestion, setSuggestion] = useState({
        location: [],
        property: []
    });
    const [dates, setDate] = useState({
        checkin: checkinProp,
        checkout: checkoutProp
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
        form.setFieldsValue({ customer: value.adults + value.childrens });
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
        if (onResearch !== null) {
            onResearch(query);
            return;
        }
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
            logActivity(item.id);
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

    return (
        <Form
            onFinish={onSearch}
            form={form}
        >
            <Row gutter={[{ md: 16, sm: 0, xs: 0 }, { md: 0, sm: 8, xs: 8 }]}>
                <Col md={13} sm={24} xs={24} className="has-right-divider">
                    <div className="home-search-box-label">{t('place')}  </div>
                    <Form.Item name="txtsearch">
                        <AutoComplete
                            options={getOptions()}
                        >
                            <Input placeholder={t('where_to_go')} bordered={false} size="large"
                                onChange={e => {
                                    suggest(e.target.value);
                                }}
                                className="text-bold"
                                suffix={loadingAutocomplete ? <LoadingOutlined /> : <span></span>}
                                style={{ padding: "0px" }}
                            />
                        </AutoComplete>

                    </Form.Item>
                </Col>

                <Col md={5} sm={24} xs={24} className="has-right-divider">
                    <div className="home-search-box-label">{t('date')}</div>

                    <Mobile>
                        <Popover
                            placement="bottom"
                            trigger="click"
                            content={
                                <RangeDatePicker onChange={onChange} checkin={dates.checkin} checkout={dates.checkout} t={t} months={1} />
                            }
                            visible={visibleDatePicker}
                            onVisibleChange={(visible) => setVisibleDatePicker(visible)}
                        >
                            <Input placeholder={t('choose_date')} bordered={false} size="large" onClick={() => setVisibleDatePicker(true)} value={valueDates} className="text-xs text-gray" readOnly />
                        </Popover>
                    </Mobile>
                    <Default>
                        <Popover
                            placement="bottom"
                            trigger="click"
                            content={
                                <RangeDatePicker onChange={onChange} checkin={dates.checkin} checkout={dates.checkout} t={t} />
                            }
                            visible={visibleDatePicker}
                            onVisibleChange={(visible) => setVisibleDatePicker(visible)}
                        >
                            <Input placeholder={t('choose_date')} bordered={false} size="large" onClick={() => setVisibleDatePicker(true)} value={valueDates} className="text-xs text-gray" />
                        </Popover>
                    </Default>
                </Col>
                <Col md={4} sm={24} xs={24} style={{ paddingRight: 0 }}>
                    <div className="home-search-box-label">{t('customer')}</div>
                    <Popover
                        placement="bottom"
                        trigger="click"
                        content={
                            <CustomerQuantity
                                limit={10}
                                defaultAdults={adults}
                                defaultChildrens={childrens}
                                onFinish={onFinishSetCustomer}
                            />
                        }
                        visible={visiblePopover}
                        onVisibleChange={(visible) => setVisiblePopover(visible)}
                    >
                        <Input placeholder={t('choose_customer_quantity')} bordered={false} size="large" onClick={() => setVisiblePopover(true)} value={`${+adults + childrens} ${t('customer')}`} className="text-xs text-gray" style={{ overflow: "visible" }} readOnly />
                    </Popover>
                </Col>
                <Col md={24} sm={24} xs={24} lg={fromList ? 24 : 2} xl={2} className="justify-content-center d-flex">
                    <Button type="primary" htmlType="submit">
                        <span>{t('search')}</span>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default withTranslation('home')(StaySearchBox);