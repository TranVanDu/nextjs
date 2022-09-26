import React, { useEffect, useState, useContext } from 'react';
import Property from '../../../components/Property';
import { AppLayout } from '../../../layout';
import { Row, Popover, Checkbox, Col, Slider, Divider, Button, Pagination, Modal } from 'antd';
import MoreFilter from './moreFilter';
import { withTranslation, Router } from '../../../i18n';
import { useRouter } from 'next/router';
import { getListStay, getDataFilter } from '../../../requests/stay';
import { useSelector } from 'react-redux';
import StayMiniSearch from '../../../components/StayMiniSearch';
import Skeleton from 'react-loading-skeleton';
import StaySearchBox from '../../../components/HomeSearchBox/StaySearchBox';
import moment from 'moment';
import { priceInVn } from '../../../helpers/helpers';

const ItemFastFilter = (props) => {
    let { title, onClick, isActive = false } = props;
    return (
        <span className={
            ["fast-filter-item", "pointer", 'mt-1', isActive ? 'active' : ''].join(" ")
        }
            onClick={onClick}
        >
            {title}
        </span>
    )
}

const RoomTypeSelect = (props) => {
    const { t, onChange, value, options, lang } = props;
    const [state, setState] = useState([]);
    return (
        <div className="ml-4 mr-4" style={{ width: "300px" }}>
            <Checkbox.Group defaultValue={value} onChange={(values) => {
                setState(values)
            }}>
                {options.map(item => {
                    return (
                        <Col className="pt-1 pb-1">
                            <Checkbox value={item.id}>{lang == "VI" ? item.title : item.title_en}</Checkbox>
                        </Col>
                    )
                })}
            </Checkbox.Group>
            <Divider />
            <div className="d-flex align-items-center justify-content-end mt-1">
                <Button type="primary" onClick={() => { onChange(state) }}>{t('apply')}</Button>
            </div>
        </div >
    )
}

const PropertyTypeSelect = (props) => {
    const { t, onChange, value, options, lang } = props;
    const [state, setState] = useState([]);
    return (
        <div className="ml-4 mr-4" style={{ width: "300px" }}>
            <Checkbox.Group defaultValue={value} onChange={(values) => {
                setState(values)
            }}>
                {options.map(item => {
                    return (
                        <Col className="pt-1 pb-1">
                            <Checkbox value={item.id}>{lang == "VI" ? item.title : item.title_en}</Checkbox>
                        </Col>
                    )
                })}
            </Checkbox.Group>
            <Divider />
            <div className="d-flex align-items-center justify-content-end mt-1">
                <Button type="primary" onClick={() => { onChange(state) }}>{t('apply')}</Button>
            </div>
        </div>
    )
}

const PriceSort = (props) => {
    let { value, t, onChange } = props
    return (
        <div className="mt-2 mb-2 ml-3 mr-3">
            <p
                className={["text-price-sort", "pointer", value == "price_asc" ? 'active' : ''].join(" ")}
                onClick={() => { onChange('price_asc') }}
            >{t('low_to_high')}</p>
            <p
                className={["text-price-sort", "pointer", value == "price_desc" ? 'active' : ''].join(" ")}
                onClick={() => { onChange('price_desc') }}
            >{t('high_to_low')}</p>
        </div>
    )
}

const PriceFilter = (props) => {
    const { value, t, onChange } = props;
    const [state, setState] = useState([]);
    return (
        <div className="ml-4 mr-4" style={{ width: "400px" }}>
            <p className="filter-price-title mt-2">{t("filter_price")}</p>
            <Slider
                range={true}
                step={1000000}
                defaultValue={value}
                onChange={(v) => { setState(v) }}
                min={0}
                max={15000000}

            />
            <div className="d-flex align-items-center justify-content-between">
                <div className="filter-price-container p-2">
                    <p className="filter-price-text-price">{t('lowest')}</p>
                    <span>{priceInVn(value[0] || 0)}</span>
                </div>
                <div className="filter-price-container p-2">
                    <p className="filter-price-text-price">{t('highest')}</p>
                    <span>{priceInVn(value[1] || 15000000)}</span>
                </div>
            </div>
            <Divider />
            <div className="d-flex align-items-center justify-content-between mt-1 ">
                <Button onClick={() => { onChange([0, 15000000]) }}>{t('delete')}</Button>
                <Button type="primary" onClick={() => { onChange(state) }}>{t('apply')}</Button>
            </div>
        </div>
    )
}

const StayList = (props) => {
    var { t } = props;
    const [fastFilter, setFastFilter] = useState({
        flexCancelPolicy: false,
        promo: false,
        rid: [],
        pid: [],
        prices: [0, 15000000],
        priceFilter: false,
        area: null,
        moreFilter: false,
        sort: 0,
        promo: false,
        beds: 0,
        bathrooms: 0,
        bedrooms: 0,
        amenities: []
    });
    const config = useSelector(state => state.config);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState({
        amenity: [],
        ptype: [],
        rtype: []
    });
    const [paging, setPaging] = useState({
        page: 1,
        items_count: 0,
        count_page: 1
    });

    const [filterModal, setFilterModal] = useState({
        showPTypeFilter: false,
        showRTypeFilter: false,
        showPriceFilter: false,
        showMoreFilter: false,
        showSorter: false,
    })

    const [searchBoxVisible, setSearchBoxVisible] = useState(false)

    const user = useSelector(state => state.auth.user);
    let lang = user ? user.lang : 'VI';

    let content_propertytype = (
        <PropertyTypeSelect t={t} onChange={(v) => { setFastFilter({ ...fastFilter, pid: v }); setFilterModal({ ...filterModal, showPTypeFilter: false }) }} value={fastFilter.ptype} options={dataFilter.ptype} lang={lang} />
    )

    let content_roomtype = (
        <RoomTypeSelect t={t} onChange={(v) => { setFastFilter({ ...fastFilter, rid: v }); setFilterModal({ ...filterModal, showRTypeFilter: false }) }} value={fastFilter.rtype} options={dataFilter.rtype} lang={lang} />
    )

    let content_price = (
        <PriceFilter t={t} onChange={(v) => { setFastFilter({ ...fastFilter, prices: v }); setFilterModal({ ...filterModal, showPriceFilter: false }) }} value={fastFilter.prices} lang={lang} />
    )

    let content_more_filter = (
        <MoreFilter t={t} onApply={(v) => { setFastFilter({ ...fastFilter, ...v }); setFilterModal({ ...filterModal, showMoreFilter: false }) }} value={{
            bathrooms: fastFilter.bathrooms,
            bedrooms: fastFilter.bedrooms,
            beds: fastFilter.beds,
            amenities: fastFilter.amenities
        }}
            optionsAmenity={dataFilter.amenity}
        />
    )

    let content_price_sort = (
        <PriceSort value={fastFilter.sort} t={t} onChange={(value) => {
            setFastFilter({ ...fastFilter, sort: value });
            setFilterModal({ ...filterModal, showSorter: false })
        }} />
    )
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        var query = router.query;
        var options = router.query;
        if (paging.page) options.page = paging.page;
        getListStay({ ...query, ...fastFilter, cpid: fastFilter.flexCancelPolicy ? 1 : '', page: paging.page }).then(data => {
            Router.push({
                pathname: `/stay/list`,
                query: {
                    ...options
                }
            },
                undefined,
                { shallow: false }
            )
            setList(data.list);
            if (paging != data.paging) {
                setPaging(data.paging);
            }
            setLoading(false);
        });
    }, [fastFilter, paging.page]);

    const onResearch = (query) => {
        setSearchBoxVisible(false);
        setLoading(true);
        getListStay({ ...query, ...fastFilter, cpid: fastFilter.flexCancelPolicy ? 1 : '' }).then(data => {
            setList(data.list);
            setPaging(data.paging);
            setLoading(false);
        });
    }

    useEffect(() => {
        getDataFilter().then(data => {
            setDataFilter(data);
        })
    }, []);

    const _navigateToDetail = (item) => {
        let query = router.query;
        Router.push({
            pathname: `/stay/${item.id}`, query: {
                checkin: query.checkin || null,
                checkout: query.checkout || null,
                guest: query.guest || 1,
                children: query.children || 0
            }
        }, undefined, { shallow: true });
    }

    return (
        <AppLayout
            headerProps={{
                children: (
                    <StayMiniSearch t={t} onResearch={onResearch} _query={router.query} />
                )
            }}
            title={`${paging.items_count} ${t('homestay_featured')}`}
        >
            <div className="">
                <div className="container stay-list">
                    <div className="mt-2">
                        {
                            router.query.location ? <span className="text-result">{`${paging.items_count} homestay ${t('in')} ${router.query.location}`} </span>
                                : <span className="text-result">{`${paging.items_count} ${t('homestay_featured')}`} </span>
                        }
                    </div>
                    <Row>
                        <Col md={24} sm={24} xs={24} lg={24} xl={0} className="mt-2">
                            <span className="pointer text-color-primary text-sm"
                                onClick={() => setSearchBoxVisible(true)}
                            >
                                {t('find_other_place')}
                            </span>
                            <Modal visible={searchBoxVisible} footer={false} onCancel={() => { setSearchBoxVisible(false) }}>
                                <StaySearchBox
                                    checkinProp={router.query.checkin ? moment(router.query.checkin, "YYYY-MM-DD") : null}
                                    checkoutProp={router.query.checkin ? moment(router.query.checkout, "YYYY-MM-DD") : null}
                                    adult={router.query.guest}
                                    children={router.query.hildren}
                                    inputPlace={router.query.location || ""}
                                    onResearch={onResearch}
                                    fromList={true}
                                />
                            </Modal>
                        </Col>

                    </Row>
                    <Row className="mt-3 d-flex mb-4 justify-content-between align-items-center" >
                        <Col className="d-flex flex-wrap">
                            <ItemFastFilter onClick={() => { setFastFilter({ ...fastFilter, flexCancelPolicy: !fastFilter.flexCancelPolicy }) }} isActive={fastFilter.flexCancelPolicy} title={t('cancellation_flexibility')} />
                            <ItemFastFilter onClick={() => { setFastFilter({ ...fastFilter, promo: !fastFilter.promo }) }} isActive={fastFilter.promo} title={t('filter_promotion')} />
                            <Popover content={content_propertytype} placement="bottom" trigger="click" visible={filterModal.showPTypeFilter} onVisibleChange={(v) => { setFilterModal({ ...filterModal, showPTypeFilter: v }) }}>
                                <ItemFastFilter onClick={() => { }} isActive={fastFilter.pid.length > null} title={t('filter_property_type')} />
                            </Popover>
                            <Popover content={content_roomtype} placement="bottom" trigger="click" visible={filterModal.showRTypeFilter} onVisibleChange={(v) => { setFilterModal({ ...filterModal, showRTypeFilter: v }) }}>
                                <ItemFastFilter onClick={() => { }} isActive={fastFilter.rid.length > 0} title={t('room_type')} />
                            </Popover>
                            <Popover content={content_price} placement="bottom" trigger="click" visible={filterModal.showPriceFilter} onVisibleChange={(v) => { setFilterModal({ ...filterModal, showPriceFilter: v }) }}>
                                <ItemFastFilter onClick={() => { }} isActive={fastFilter.prices[0] > 0 || fastFilter.prices[1] < 15000000} title={t('filter_price')} />
                            </Popover>
                            <Popover content={content_more_filter} placement="bottom" trigger="click" visible={filterModal.showMoreFilter} onVisibleChange={(v) => { setFilterModal({ ...filterModal, showMoreFilter: v }) }}>
                                <ItemFastFilter onClick={() => { }} isActive={fastFilter.bedrooms > 0 || fastFilter.bathrooms > 0 || fastFilter.beds > 0 || fastFilter.amenities.length > 0} title={t('filter_more')} />
                            </Popover>
                        </Col>
                        <Col className="mt-2">
                            <Popover content={content_price_sort} placement="bottom" trigger="click" visible={filterModal.showSorter} onVisibleChange={(v) => { setFilterModal({ ...filterModal, showSorter: v }) }}>
                                <ItemFastFilter onClick={() => { }} title={t('sort_price')} isActive={fastFilter.sort != 0} />
                            </Popover>
                        </Col>
                    </Row>

                    {!loading ? <Row gutter={16}>
                        {list.map(item => (
                            <Property showPropertyInfo={true} showRating={true} item={item} config={config} onClick={() => _navigateToDetail(item)} key={item.id.toString()} placedown={true} />
                        ))}
                    </Row>
                        :
                        <Row gutter={16} className="mt-3">
                            {
                                [1, 2, 3, 4].map(item => (
                                    <Col md={6} sm={12} xs={24} key={item} className="mb-4 pb-4">
                                        <Skeleton key={item} height={"164px"} />
                                    </Col>
                                ))
                            }
                        </Row>
                    }
                    {!loading && list.length == 0 && <Row gutter={[15, 35]} className="justify-content-center mt-4 pt-4">
                        <span className="text-xl text-bold text-primary">
                            {t('no_results')}
                        </span>
                    </Row>
                    }
                    <Row align="middle" className="pb-4">
                        {paging.items_count > 0 &&
                            <Col span={24} className="d-flex justify-content-center" >
                                <Pagination
                                    // defaultCurrent={paging.page}
                                    total={paging.items_count}
                                    current={parseInt(router.query.page)}
                                    className="d-flex justify-content-center align-items-center"
                                    pageSize={16}
                                    showSizeChanger={false}
                                    onChange={(page) => {
                                        setPaging({
                                            ...paging,
                                            page: page
                                        })
                                    }}
                                />
                            </Col>}
                    </Row>
                </div>
            </div>
        </AppLayout>
    )
}

export default withTranslation('stayList')(StayList);