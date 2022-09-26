import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Dropdown, Menu, Skeleton, Affix, Result, Empty, Modal } from 'antd';
import { AppLayout } from '../../../layout';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { withTranslation, Router } from '../../../i18n';
import FilterList from '../../../components/TransportComponent/FilterList';
import { requestSearchTransport } from '../../../requests/transport';
import ListItem from '../../../components/TransportComponent/ListItem';
import _ from 'lodash';
import { getRoutePrice } from '../../../helpers/transport';
import TransportSearchBoxModal from '../../../components/HomeSearchBox/TransportSearchBoxModal';
import { useWindowSize } from '../../../components/useWindowSize';
import ListItemPhone from '../../../components/TransportComponent/ListItemPhone';
import { FilterOutlined } from '@ant-design/icons';

const { Title } = Typography;

const sortOptions = [
    { label: 'lowest_price', key: 'lowest_price' },
    { label: 'hightest_price', key: 'hightest_price' },
];

function LoadingContent(windowSize) {
    if (windowSize.width > 1024)
        return (
            <div className="container mt-4">
                <Row className="mt-4" gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Skeleton active />
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Card style={{ marginBottom: "15px" }}>
                            <Skeleton avatar={{ shape: "square", size: "large" }} active paragraph={{ rows: 3 }} />
                        </Card>
                        <Card style={{ marginBottom: "15px" }}>
                            <Skeleton avatar={{ shape: "square" }} active paragraph={{ rows: 3 }} />
                        </Card>
                        <Card style={{ marginBottom: "15px" }}>
                            <Skeleton avatar={{ shape: "square" }} active paragraph={{ rows: 3 }} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    return (
        <div className="container mt-4">
            <Row className="mt-4" gutter={16}>
                <Col span={24}>
                    <Card style={{ marginBottom: "15px" }}>
                        <Skeleton avatar={{ shape: "square", size: "large" }} active paragraph={{ rows: 3 }} />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card style={{ marginBottom: "15px" }}>
                        <Skeleton avatar={{ shape: "square" }} active paragraph={{ rows: 3 }} />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card style={{ marginBottom: "15px" }}>
                        <Skeleton avatar={{ shape: "square" }} active paragraph={{ rows: 3 }} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


function TransportList(props) {
    const { t } = props;
    const windowSize = useWindowSize();

    const router = useRouter();
    var { query } = router;
    const [affixedHead, setAffixedHead] = useState({});
    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
    const [data, setData] = useState({ list: [], filter: { filter_price: [], filter_type: [], filter_addnight: [] } });
    const [loading, setLoading] = useState(true);
    const [no_match, setNoMatch] = useState(false);
    const [listByFilter, setListByFilter] = useState([]);
    const [list, setList] = useState([]);
    const [filterType, setFilterType] = useState([]);
    const [dataFilterType, setDataFilterType] = useState([]);
    const [valueFilterPrice, setValueFilterPrice] = useState([10000, 1000000]);

    //re search
    const [openResearch, setOpenResearch] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {
        if (query.time_false == 0) {
            var dataSearch = {
                airport: query.airport_id,
                place: query.place_id,
                time: query.time,
                passenger: query.passenger,
                type: query.type
            }
            setLoading(true);
            requestSearchTransport(dataSearch).then(res => {
                setData(res);
                setListByFilter(res.list);
                setList(res.list);
                setLoading(false);
                setDataFilterType(res.filter.filter_type);
                setSelectedSortOption({ label: 'lowest_price', key: 'lowest_price' });
                setNoMatch(false);
                setFilterType([]);

                if (res.filter.filter_price && res.filter.filter_price.length) {
                    let min_price = res.filter.filter_price[0].min_price;
                    let max_price = res.filter.filter_price[0].max_price;
                    if (res.filter.filter_addnight && res.filter.filter_addnight.length && res.filter.filter_addnight[0].max_price_addnight) {
                        max_price = parseInt(max_price) + parseInt(res.filter.filter_addnight[0].max_price_addnight);
                    }
                    setValueFilterPrice([min_price, max_price])
                }
            }).catch(err => {
                setLoading(false);
                console.log(err)
            });
        }
        else {
            setLoading(false)
        }
    }, [query]);


    const onBook = (route_id) => {
        Router.push({ pathname: "/transport/booking", query: { ...query, route_id } })
    }

    const onReset = () => {

    }

    const sort = ({ key }) => {
        let selectedSortOption = sortOptions.find(option => option.key == key);
        setSelectedSortOption(selectedSortOption);

        var newList = [...list];
        var field = "price_onward";
        if (query.type == 2) field = "price_return";
        newList = _.sortBy(newList, item => item[field]);

        if (key == 'hightest_price') {
            newList = newList.reverse();
        }
        setList(newList)
    }


    const onFilterType = (type) => {
        var nfilterType = [...filterType];
        var newList = [...list];
        if (nfilterType.indexOf(type) >= 0) {
            nfilterType = nfilterType.filter(item => item != type);
        }
        else {
            nfilterType.push(type);
        }
        if (nfilterType.length == dataFilterType.length || nfilterType.length == 0) {
            newList = [...listByFilter];
        }
        else {
            newList = listByFilter.filter(item => {
                let { vehicle } = item;
                return nfilterType.indexOf(vehicle.type) >= 0
            })
        }
        setFilterType(nfilterType);
        setNoMatch(newList.length ? false : true);
        setList(newList);
    }

    const onFilterSlide = (filter) => {
        setValueFilterPrice(filter);

        var newList = [...data.list];
        newList = newList.filter(item => {
            var isValid = true;
            if (filter.length) {
                var { price } = getRoutePrice(item, query.type, query.time);
                if (filter[0] > price || price > filter[1]) isValid = false;
            }
            return isValid;
        });
        var dataFilterType = [];
        if (newList.length == data.list.length) {
            dataFilterType = [...data.filter.filter_type];
        }
        else {
            for (let i = 0; i < newList.length; i++) {
                let type = newList[i].vehicle.type;
                if (dataFilterType.indexOf(type) < 0) dataFilterType.push(type);
            }
            dataFilterType = dataFilterType.map(item => {
                return { vehicle_type: item }
            })
        }

        setList(newList);
        setListByFilter(newList);
        setFilterType([]);
        setNoMatch(newList.length ? false : true);
        setDataFilterType(dataFilterType);

    }

    return (
        <AppLayout
            title={t('transport')}
            headChildren={
                <React.Fragment>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd-mobile/2.3.4/antd-mobile.css" />
                </React.Fragment>
            }
        >
            <div className="gray-background">
                <Affix offsetTop={0} onChange={affixed => { affixed ? setAffixedHead({ backgroundColor: "#ffffff", boxShadow: " 0 1px 3px 0 #e0e0e0" }) : setAffixedHead({}) }}>
                    <div style={{ paddingTop: "20px", paddingBottom: "20px", ...affixedHead }}>
                        <div className="container mt-4">
                            <Row justify="space-between">
                                <Title level={3} className="mb-0">
                                    {query.type == 1 ? <span>{query.airport_title}</span> : <span>{query.sub_address}</span>}
                                    &nbsp;<FontAwesomeIcon icon={faArrowRight} size="sm" />&nbsp;
                                    {query.type == 1 ? <span>{query.sub_address}</span> : <span>{query.airport_title}</span>}
                                </Title>
                                <Button type="default" size="middle" onClick={() => setOpenResearch(true)}> <FontAwesomeIcon icon={['fas', 'pen']} />&nbsp;{t('edit')}</Button>
                            </Row>

                            <Row justify="space-between" className="mt-2">
                                <div>
                                    <span className="flight-date">{query.time}</span>
                                    <span className="ml-2">|</span>
                                    <span className="ml-2">{query.passenger}{' '}{t("passenger")}</span>
                                </div>
                                <div>
                                    <span className="mr-2">{t('sort')}:</span>
                                    <Dropdown overlay={
                                        <Menu onClick={sort} selectedKeys={[selectedSortOption.key]}>
                                            {
                                                sortOptions.map((option, index) => (
                                                    <Menu.Item key={option.key}>{t(option.label)}</Menu.Item>
                                                ))
                                            }
                                        </Menu>
                                    }>
                                        <span>
                                            <span className="mr-1 font-weight-6">
                                                {t(selectedSortOption.label)}
                                            </span>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </span>
                                    </Dropdown>
                                    {windowSize.width <= 1024 ? <span style={{ marginLeft: "20px" }} onClick={() => setOpenFilter(true)} ><FontAwesomeIcon icon={['fas', 'filter']} /></span> : null}
                                </div>
                            </Row>
                        </div>
                    </div>
                </Affix>
                {loading ? <LoadingContent /> :
                    query.time_false == "1" ?
                        <Result
                            status="warning"
                            title={t("time_false")}
                            extra={<Button type="primary" onClick={() => setOpenResearch(true)}>{t('try_again')}</Button>}
                        />
                        :
                        !data.list.length ?
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span>{t('no_data')}</span>
                                }
                            >
                                <Button type="primary" onClick={() => setOpenResearch(true)}>{t('try_again')}</Button>
                            </Empty>
                            :
                            <div className="container mt-4">
                                <Row className="mt-4" gutter={16}>
                                    {windowSize.width > 1024 ?
                                        <Col span={6}>
                                            <div style={{ position: "sticky", top: "141px" }}>
                                                <Card>
                                                    <FilterList
                                                        onFilterType={onFilterType}
                                                        dataType={dataFilterType}
                                                        valueDataType={filterType}
                                                        onFilterSlide={onFilterSlide}
                                                        dataFilter_price={data.filter.filter_price}
                                                        dataFilterPriceAddNight={data.filter.filter_addnight}
                                                        valueFilterPrice={valueFilterPrice}
                                                    />
                                                </Card>
                                            </div>
                                        </Col>
                                        : null}
                                    <Col span={windowSize.width > 1024 ? 18 : 24}>
                                        {no_match ?
                                            <Empty
                                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                description={
                                                    <span>{t('filter_not_found')}</span>
                                                }
                                            >
                                                <Button type="primary" onClick={() => window.location.reload()}>{t('reset')}</Button>
                                            </Empty>
                                            :
                                            windowSize.width > 1024 ?
                                                list.map(item =>
                                                    (
                                                        <ListItem
                                                            data={item}
                                                            key={item.id}
                                                            time={query.time}
                                                            type={query.type}
                                                            onBook={onBook}
                                                        />
                                                    ))
                                                : list.map(item => (
                                                    <ListItemPhone
                                                        data={item}
                                                        key={item.id}
                                                        time={query.time}
                                                        type={query.type}
                                                        onBook={onBook}
                                                    />
                                                )
                                                )}
                                    </Col>
                                </Row>
                            </div>
                }
            </div>
            <Modal
                visible={openResearch}
                closable={false}
                footer={null}
                onCancel={() => setOpenResearch(false)}
                width={windowSize.width > 1024 ? 1000 : null}
                destroyOnClose
            >
                <TransportSearchBoxModal
                    defaultValue={query}
                    onClose={() => setOpenResearch(false)}
                />
            </Modal>
            <Modal
                visible={openFilter}
                closable={false}
                footer={null}
                onCancel={() => setOpenFilter(false)}
            // destroyOnClose
            >
                <FilterList
                    onFilterType={onFilterType}
                    dataType={dataFilterType}
                    valueDataType={filterType}
                    onFilterSlide={onFilterSlide}
                    dataFilter_price={data.filter.filter_price}
                    dataFilterPriceAddNight={data.filter.filter_addnight}
                    valueFilterPrice={valueFilterPrice}
                />
            </Modal>
        </AppLayout>
    )
}

export default withTranslation('transport')(TransportList);