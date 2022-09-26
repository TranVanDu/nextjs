import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Typography, Button, Dropdown, Menu, Badge, Skeleton, Empty, Divider, Modal, Affix, Radio } from 'antd';
import { AppLayout } from '../../../layout';
import { withTranslation, Router } from '../../../i18n';
import { useRouter } from 'next/router';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import { faArrowRight, faChevronDown, faPen, faPlane } from '@fortawesome/free-solid-svg-icons';
import FlightItem from '../../../components/FlightItem';
import SelectedFlightItem from '../../../components/SelectedFlightItem';
import SelectedFlightModal from '../../../components/SelectedFlightModal';
import FlightSearchBox from '../../../components/HomeSearchBox/FlightSearchBox';
import Filter from './Filter';
import { useWindowSize } from '../../../components/useWindowSize';
// api requests
import { searchFlightAction, selectFlightsToBookingAction } from '../../../redux/actions/flight';

const { Title } = Typography;

const filterAndSortFlights = (flights, filter, sorter, flightMarkup = 0, totalPassengers = 1) => {
    
    // filter
    var newFilghts = flights.filter(flight => {
        let isValid = true;

        if (filter.departureTimes.length) {
            var departureHour = moment(flight.StartDate).hour();
            if (filter.departureTimes.indexOf('EM') >= 0 && (0 <= departureHour && departureHour < 6)) isValid = true;
            else if (filter.departureTimes.indexOf('M') >= 0 && (6 <= departureHour && departureHour < 12)) isValid = true;
            else if (filter.departureTimes.indexOf('A') >= 0 && (12 <= departureHour && departureHour < 18)) isValid = true;
            else if (filter.departureTimes.indexOf('E') >= 0 && (18 <= departureHour && departureHour < 24)) isValid = true;
            else isValid = false;
        }
        if (filter.arrivalTimes.length && isValid) {
            var arrivalHour = moment(flight.EndDate).hour();
            if (filter.arrivalTimes.indexOf('EM') >= 0 && (0 < arrivalHour && arrivalHour <= 6)) isValid = true;
            else if (filter.arrivalTimes.indexOf('M') >= 0 && (6 < arrivalHour && arrivalHour <= 12)) isValid = true;
            else if (filter.arrivalTimes.indexOf('A') >= 0 && (12 < arrivalHour && arrivalHour <= 18)) isValid = true;
            else if (filter.arrivalTimes.indexOf('E') >= 0 && (18 < arrivalHour && arrivalHour <= 24)) isValid = true;
            else isValid = false;
        }
        if (filter.airlines.length && isValid) {
            if (filter.airlines.indexOf(flight.AirlineCode) < 0) isValid = false;
        }
        if (filter.prices.length && isValid) {
            if (filter.prices[0] > flight.TotalPrice || flight.TotalPrice > filter.prices[1]) isValid = false;
        }
        if (filter.classes.length && isValid) {
            console.log('======================>>>>', filter.classes)
            let isMatchClass = false;
            for (let i = 0; i < filter.classes.length; i++) {
                console.log(filter.classes[i].split('|'), flight.Class, filter.classes[i].split('|').indexOf(flight.Class))
                if (filter.classes[i].split('|').indexOf(flight.Class) >= 0) {
                    isMatchClass = true;
                    break;
                }
            }
            isValid = isMatchClass;
        }

        if (['VN', 'VJ', 'QH'].indexOf(flight.AirlineCode) < 0) isValid = false;

        return isValid;
    });

    // sort
    newFilghts = _.sortBy(newFilghts, flight => flight[sorter.field]);
    if (sorter.type == 'desc') newFilghts = newFilghts.reverse();

    // markup
    newFilghts.map(flight => {
        if (flight.PriceAdult >= 0) flight.PriceAdult += flightMarkup;
        if (flight.PriceChild >= 0) flight.PriceChild += flightMarkup;
        if (flight.PriceInfant >= 0) flight.PriceInfant += flightMarkup;
        flight.TotalPrice += flightMarkup * totalPassengers;

        return flight;
    });

    return newFilghts;
}

const FlightList = (props) => {
    const { t } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [processedFlights, setProcessedFlights] = useState([]);
    const [renderedFlights, setRenderedFlights] = useState([]);
    const [filter, setFilter] = useState({
        departureTimes: [],
        arrivalTimes: [],
        airlines: [],
        classes: [],
        prices: [0, 10000000]
    });
    // const [filterMobile, setFilterMobile] = useState({
    //     departureTimes: [],
    //     arrivalTimes: [],
    //     airlines: [],
    //     classes: [],
    //     prices: [0, 10000000]
    // });
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [mobileModalVisbleType, setMobileModalVisbleType] = useState(null);
    const screenSize = useWindowSize();

    const sortOptions = [
        { label: t('lowest_price'), key: 'lowest_price', field: 'TotalPrice', type: 'asc' },
        { label: t('earliest_take_off'), key: 'earliest_take_off', field: 'StartDate', type: 'asc' },
        { label: t('latest_take_off'), key: 'latest_take_off', field: 'StartDate', type: 'desc' },
        { label: t('earliest_landing'), key: 'earliest_landing', field: 'EndDate', type: 'asc' },
        { label: t('latest_landing'), key: 'latest_landing', field: 'EndDate', type: 'desc' },
        { label: t('shortest_duration'), key: 'shortest_duration', field: 'Duration', type: 'asc' }
    ];

    var query = router.query;
    if (typeof query.isRoundTrip != 'boolean') {
        query.isRoundTrip = (query.isRoundTrip == 'true') ? true : false;
    }

    useEffect(() => {
        console.log('================== Initial');
        let data = {
            StartPoint: query.from,
            EndPoint: query.to,
            DepartureDate: moment(query.start_date).format('DD/MM/YYYY'),
            Adult: query.adults,
            Children: query.childrens,
            Infant: query.infants,
            ItineraryType: query.isRoundTrip ? 2 : 1
        };
        if (query.return_date) data.ReturnDate = moment(query.return_date).format('DD/MM/YYYY');
        dispatch(searchFlightAction(data));
    }, []);

    const flightData = useSelector((state) => state.flight);
    const config = useSelector((state) => state.config);
    const user = useSelector((state) => state.auth.user);
    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);

    var startPoint = null, endPoint = null;
    if (config.airports) {
        startPoint = config.airports.find(airport => airport.code == query.from);
        endPoint = config.airports.find(airport => airport.code == query.to);
    }

    useEffect(() => {
        let flights = selectedFlights.length == 0 ? flightData.departureFlights : flightData.returnFlights;

        let initFilter = { ...filter };
        if (query.departureTimes) initFilter.departureTimes = query.departureTimes.split(',');
        if (query.arrivalTimes) initFilter.arrivalTimes = query.arrivalTimes.split(',');
        if (query.airlines) initFilter.airlines = query.airlines.split(',');
        if (query.classes) initFilter.classes = query.classes.split(',');
        if (query.prices) initFilter.prices = query.prices.split(',');
        setFilter(initFilter);

        if (query.sort) {
            let initSortOption = sortOptions.find(option => option.key == query.sort);
            setSelectedSortOption(initSortOption);
        }

        let flightResults = filterAndSortFlights(flights, filter, selectedSortOption, config.flight_markup, parseInt(query.adults) + parseInt(query.childrens) + parseInt(query.infants));
        setProcessedFlights(flightResults);
        setRenderedFlights(flightResults.slice(0, 10));
        setLoading(false);
        // if (flights.length) setLoading(false);
    }, [flightData.currentQuery]);

    useEffect(() => {
        let isSearchFlight = true;
        // const { currentQuery } = flightData;
        // if ((query.from != currentQuery.StartPoint) || (query.to != currentQuery.EndPoint) || (parseInt(query.adults) != currentQuery.Adult) || (parseInt(query.childrens) != currentQuery.Children)) {
        //     isSearchFlight = true;
        // }
        // if (moment(query.start_date).format('DD/MM/YYYY') != currentQuery.DepartureDate) {
        //     isSearchFlight = true;
        // }
        // let newItineraryType = query.isRoundTrip ? 2 : 1;
        // if (newItineraryType != currentQuery.ItineraryType) {
        //     isSearchFlight = true;
        // }
        // if (newItineraryType == 2) {
        //     if (moment(query.return_date).format('DD/MM/YYYY') != currentQuery.ReturnDate) {
        //         isSearchFlight = true;
        //     }
        // }

        if (isSearchFlight) {
            setModalEditVisible(false);
            setLoading(true);

            console.log('================== Query changed');

            async function getDataFlight() {
                let data = {
                    StartPoint: query.from,
                    EndPoint: query.to,
                    DepartureDate: moment(query.start_date).format('DD/MM/YYYY'),
                    Adult: query.adults,
                    Children: query.childrens,
                    Infant: query.infants,
                    ItineraryType: query.isRoundTrip ? 2 : 1
                };
                if (query.return_date) data.ReturnDate = moment(query.return_date).format('DD/MM/YYYY');
                await dispatch(searchFlightAction(data));
            }
            getDataFlight();

        }

        let flights = flightData.departureFlights;
        if (query.isRoundTrip && selectedFlights.length == 1) {
            flights = flightData.returnFlights;
        }

        console.log('url query changed');
        console.log(flights);

        if (flights.length) {
            setLoading(true);
            let flightResults = filterAndSortFlights(flights, filter, selectedSortOption, config.flight_markup, parseInt(query.adults) + parseInt(query.childrens) + parseInt(query.infants));
            setProcessedFlights(flightResults);
            setRenderedFlights(flightResults.slice(0, 10));
            if (!isSearchFlight) setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        if (query.isRoundTrip) {
            setLoading(true);
            let flights = [];
            let flightResults = [];

            if (selectedFlights.length == 0) {
                flights = flightData.departureFlights;
                flightResults = filterAndSortFlights(flights, filter, selectedSortOption, config.flight_markup, parseInt(query.adults) + parseInt(query.childrens) + parseInt(query.infants));

                setProcessedFlights(flightResults);
                setRenderedFlights(flightResults.slice(0, 10));
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            } else if (selectedFlights.length == 1) {
                flights = flightData.returnFlights;
                flightResults = filterAndSortFlights(flights, filter, selectedSortOption, config.flight_markup, parseInt(query.adults) + parseInt(query.childrens) + parseInt(query.infants));

                setProcessedFlights(flightResults);
                setRenderedFlights(flightResults.slice(0, 10));
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            } else if (selectedFlights.length == 2) {
                setModalVisible(true);
            }
        } else {
            if (selectedFlights.length) setModalVisible(true);
        }
    }, [selectedFlights.length]);

    const loadMore = () => {
        var renderedCount = renderedFlights.length;
        renderedCount += 10;
        setRenderedFlights(processedFlights.slice(0, renderedCount));
    }

    const sort = ({ key }) => {
        let selectedSortOption = sortOptions.find(option => option.key == key);
        setSelectedSortOption(selectedSortOption);
        router.push({ pathname: '/flight/list', query: { ...router.query, sort: key } });
    }

    // filter desktop
    const onFilter = (filterOption, value, checked) => {
        var options = [...filter[filterOption]];
        if (checked) {
            options = [...options, value];
        } else {
            options = options.filter(option => option !== value);
        }

        filter[filterOption] = options;
        setFilter(filter);
        router.push({ pathname: '/flight/list', query: { ...query, [filterOption]: options.join(',') } });
    }

    const onFilterPrice = (values) => {
        filter.prices = values;
        setFilter(filter);
        router.push({ pathname: '/flight/list', query: { ...query, prices: values.join(',') } });
    }

    // // filter mobile
    // const onFilterMobile = (filterOption, value, checked) => {
    //     var options = [...filterMobile[filterOption]];
    //     if (checked) {
    //         options = [...options, value];
    //     } else {
    //         options = options.filter(option => option !== value);
    //     }

    //     filterMobile[filterOption] = options;
    //     setFilterMobile(filterMobile);
    // }

    // const onFilterPriceMobile = (values) => {
    //     filterMobile.prices = values;
    //     setFilter(filterMobile);
    // }

    // const onCancelFilterMobile = () => {
    //     let initFilter = {
    //         departureTimes: [],
    //         arrivalTimes: [],
    //         airlines: [],
    //         classes: [],
    //         prices: [0, 10000000]
    //     };

    //     if (query.departureTimes) initFilter.departureTimes = query.departureTimes.split(',');
    //     if (query.arrivalTimes) initFilter.arrivalTimes = query.arrivalTimes.split(',');
    //     if (query.airlines) initFilter.airlines = query.airlines.split(',');
    //     if (query.classes) initFilter.classes = query.classes.split(',');
    //     if (query.prices) initFilter.prices = query.prices.split(',');
    //     setFilterMobile(initFilter);
    // }

    // const onApplyFilterMobile = () => {
    //     let query = {};
    //     Object.keys(filterMobile).forEach(key => {
    //         query[key] = filterMobile[key].join(',');
    //     });
    //     router.push({ pathname: '/flight/list', query: query });
    // }

    const onSelectFlight = (flight, baggageRules, fareRules) => {
        flight.baggageRules = baggageRules;
        flight.fareRules = fareRules;
        setSelectedFlights([...selectedFlights, flight]);
    }

    const onChangeSelectedFlight = (position) => {
        let newSelectedFlights = selectedFlights.filter((item, index) => {
            if (index != position) return item;
        });

        setSelectedFlights(newSelectedFlights);
    }

    const onCancelModal = () => {
        setModalVisible(false);
        onChangeSelectedFlight(selectedFlights.length - 1);
    }

    const continueToBooking = () => {
        dispatch(selectFlightsToBookingAction(query, selectedFlights));
        Router.push('/flight/booking');
    }

    const onEditQuery = () => {
        setModalEditVisible(true);
    }

    return (
        <AppLayout
            title={t('flight')}
        >
            <div className="gray-background">
                <div className="container mt-4">
                    <Row justify="space-between">
                        <Title level={2} className="mb-0">
                            <span>{startPoint ? `${startPoint.province} (${startPoint.code})` : null}</span>
                            <FontAwesomeIcon className="ml-2" icon={faArrowRight} size="sm" />
                            <span className="ml-2">{endPoint ? `${endPoint.province} (${endPoint.code})` : null}</span>
                        </Title>
                        <Button type="default" size="large" onClick={() => onEditQuery()}>
                            <FontAwesomeIcon icon={faPen} /><span className="ml-2">{t('edit')}</span>
                        </Button>
                    </Row>

                    <Row justify="space-between" className="mt-2">
                        <div>
                            <span className="flight-date">{moment(query.start_date, 'YYYY-MM-DD').format('dddd, ll')}</span>
                            <span className="ml-2">|</span>
                            <span className="ml-2">{parseInt(query.adults)} {t('adult')}, {parseInt(query.childrens)} {t('children')}, {parseInt(query.infants)} {t('infant')}</span>
                        </div>
                        <div className="pc-flight-sorter">
                            <span className="mr-2">{t('sort')}:</span>
                            <Dropdown
                                overlay={
                                    <Menu onClick={sort} selectedKeys={[selectedSortOption.key]}>
                                        {
                                            sortOptions.map((option, index) => (
                                                <Menu.Item key={option.key}>{option.label}</Menu.Item>
                                            ))
                                        }
                                    </Menu>
                                }
                                className="flight-sort-dropdown"
                            >
                                <span>
                                    <b className="mr-1">
                                        {selectedSortOption.label}
                                    </b>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            </Dropdown>
                        </div>
                    </Row>
                    <Row className="mt-4" gutter={16}>
                        <Col lg={6} md={0} sm={0} xs={0}>
                            <Card className="card-filters-list">
                                <Filter
                                    filter={filter}
                                    onChangePrice={(data) => setFilter(data)}
                                    onFilter={(optionName, key, value) => onFilter(optionName, key, value)}
                                    onFilterPrice={(value) => onFilterPrice(value)}
                                />
                            </Card>
                        </Col>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            {
                                query.isRoundTrip ? (
                                    <div>
                                        <Card className="flights-preview-card">
                                            <Row>
                                                <Col md={12} sm={24}>
                                                    <Button size="small" className="primary-purple" type="primary">{t('departure')}</Button>
                                                    <div className="mt-2">
                                                        <span className="flight-date">{moment(query.start_date, 'YYYY-MM-DD').format('dddd, ll')}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center flights-preview-departure">
                                                        <span>{startPoint ? `${startPoint.province} (${startPoint.code})` : null}</span>
                                                        <FontAwesomeIcon className="ml-2" icon={faArrowRight} size="sm" />
                                                        <span className="ml-2">{endPoint ? `${endPoint.province} (${endPoint.code})` : null}</span>
                                                    </div>
                                                    {
                                                        selectedFlights[0] ? (
                                                            <React.Fragment>
                                                                <Divider style={{ margin: '12px 0px' }} />
                                                                <SelectedFlightItem
                                                                    flight={selectedFlights[0]}
                                                                    onClickDetail={() => { }}
                                                                    onClickChangeFlight={() => onChangeSelectedFlight(0)}
                                                                />
                                                            </React.Fragment>
                                                        ) : null
                                                    }
                                                </Col>
                                                <Col md={12} sm={24}>
                                                    <Button size="small" className="primary-purple" type="primary">{t('return')}</Button>
                                                    <div className="mt-2">
                                                        <span className="flight-date">{moment(query.return_date, 'YYYY-MM-DD').format('dddd, ll')}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center flights-preview-return">
                                                        <span>{endPoint ? `${endPoint.province} (${endPoint.code})` : null}</span>
                                                        <FontAwesomeIcon className="ml-2" icon={faArrowRight} size="sm" />
                                                        <span className="ml-2">{startPoint ? `${startPoint.province} (${startPoint.code})` : null}</span>
                                                    </div>
                                                    {
                                                        selectedFlights[1] ? (
                                                            <React.Fragment>
                                                                <Divider style={{ margin: '12px 0px' }} />
                                                                <SelectedFlightItem flight={selectedFlights[1]} />
                                                            </React.Fragment>
                                                        ) : null
                                                    }
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Title level={4}>
                                            {selectedFlights.length == 0 ? t('select_departing_flight') : t('select_returning_flight')}
                                        </Title>
                                    </div>
                                ) : null
                            }
                            {
                                loading ? (
                                    <div>
                                        {
                                            [1, 2, 3, 4, 5].map(item => (
                                                <Card className="list-flight-card" key={item}>
                                                    <Skeleton key={item} active paragraph rows={1} />
                                                </Card>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        {
                                            renderedFlights.length ? (
                                                <div>
                                                    {
                                                        renderedFlights.map((item, index) => (
                                                            <FlightItem
                                                                flight={{
                                                                    start: item.StartPoint,
                                                                    end: item.EndPoint,
                                                                    startName: startPoint.province,
                                                                    endName: endPoint.province,
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
                                                                    adults: query.adults,
                                                                    childrens: query.childrens,
                                                                    infants: query.infants
                                                                }}
                                                                onSelect={(baggageRules, fareRules) => onSelectFlight(item, baggageRules, fareRules)}
                                                                screenSize={screenSize}
                                                                key={item.FlightSession}
                                                                flightSession={item.FlightSession}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <Empty description={t('empty')} />
                                            )
                                        }

                                        <div className="text-center mt-4 mb-4">
                                            {
                                                renderedFlights.length < processedFlights.length ? (
                                                    <Button type="default" onClick={loadMore}>{t('load_more_results')}</Button>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Affix offsetBottom={20} className="mobile-flight-sorter-filter">
                            <Radio.Group buttonStyle="solid" value={mobileModalVisbleType} onChange={(e) => setMobileModalVisbleType(e.target.value)}>
                                <Radio.Button value="sort">
                                    <Badge dot>{t('sort')}</Badge>
                                </Radio.Button>
                                <Radio.Button value="filter">
                                    {(filter.departureTimes.length || filter.arrivalTimes.length || filter.classes.length || filter.airlines.length || filter.prices.join(',') != '0,10000000') ? <Badge dot>{t('filter')}</Badge> : t('filter')}
                                </Radio.Button>
                            </Radio.Group>
                        </Affix>
                    </div>
                    <Modal
                        footer={
                            <Button type="primary" size="small" onClick={() => setMobileModalVisbleType(null)}>{t('apply')}</Button>
                        }
                        width={'100%'}
                        visible={mobileModalVisbleType == 'sort'}
                        title={t('sort')}
                        closable={false}
                        className="mobile-flight-sorter-modal"
                    >
                        <Menu onClick={sort} selectedKeys={[selectedSortOption.key]}>
                            {
                                sortOptions.map((option, index) => (
                                    <Menu.Item key={option.key}>{option.label}</Menu.Item>
                                ))
                            }
                        </Menu>
                    </Modal>
                    <Modal
                        footer={
                            <Button type="primary" size="small" onClick={() => setMobileModalVisbleType(null)}>{t('apply')}</Button>
                        }
                        width={'100%'}
                        visible={mobileModalVisbleType == 'filter'}
                        title={t('filter')}
                        closable={false}
                        className="mobile-flight-filter-modal"
                    >
                        <Filter
                            filter={filter}
                            onChangePrice={(data) => setFilter(data)}
                            onFilter={(optionName, key, value) => onFilter(optionName, key, value)}
                            onFilterPrice={(value) => onFilterPrice(value)}
                        />
                    </Modal>
                </div>
            </div>
            <SelectedFlightModal
                visible={modalVisible}
                flights={selectedFlights}
                onCancel={() => onCancelModal()}
                onOk={() => continueToBooking()}
                airports={config.airports}
                screenSize={screenSize}
            />
            {
                !loading && startPoint && endPoint ? (
                    <Modal
                        visible={modalEditVisible}
                        footer={null}
                        className="edit-flight-query-modal"
                        onCancel={() => setModalEditVisible(false)}
                        closeIcon={null}
                        closable={false}
                    >
                        <div className='home-search-box'>
                            <FlightSearchBox
                                defaultValues={{
                                    fromPlace: startPoint.code,
                                    toPlace: endPoint.code,
                                    from: `${startPoint.province} (${startPoint.code})`,
                                    to: `${endPoint.province} (${endPoint.code})`,
                                    start_date: moment(query.start_date),
                                    return_date: query.return_date ? moment(query.return_date) : '',
                                    adults: parseInt(query.adults),
                                    childrens: parseInt(query.childrens),
                                    infants: parseInt(query.infants),
                                    customer: `${query.adults} ${t('adult')}, ${query.childrens} ${t('children')}, ${query.infants} ${t('infant')}`,
                                    isRoundTrip: query.isRoundTrip
                                }}
                                onAdditionalSubmit={() => setModalEditVisible(false)}
                            />
                        </div>
                    </Modal>
                ) : null
            }
        </AppLayout>
    )
}

export default withTranslation('flight')(FlightList);