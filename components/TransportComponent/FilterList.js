import React from 'react';
import { Typography, Slider, Divider } from 'antd';
import { withTranslation } from '../../i18n';
import CheckboxTag from '../checkboxTag';
import { vehicleType } from '../../helpers/transport';
import { useSelector } from 'react-redux';

const { Title } = Typography;


function FilterList(props) {
    const { t, onFilterType, dataType, valueDataType, dataFilter_price, onFilterSlide, dataFilterPriceAddNight, valueFilterPrice = [10000, 1000000] } = props;
    var dataCheckBoxTag = [];
    const config = useSelector((state) => {
        return state.config;
    })
    var car_type = config && config.car_type ? config.car_type : [];
    dataCheckBoxTag = dataType.map(item => {
        return { value: item.vehicle_type, display: vehicleType(item.vehicle_type, car_type) }
    });
    var min_price = 100000;
    var max_price = 10000000;
    if (dataFilter_price && dataFilter_price.length) {
        min_price = dataFilter_price[0].min_price;
        max_price = dataFilter_price[0].max_price;
        if (dataFilterPriceAddNight && dataFilterPriceAddNight.length && dataFilterPriceAddNight[0].max_price_addnight) {
            max_price = parseInt(max_price) + parseInt(dataFilterPriceAddNight[0].max_price_addnight);
        }
    }
    return (
        <>
            <Title level={5}>{t('vehicle_type')}</Title>
            <div>
                <CheckboxTag
                    data={dataCheckBoxTag}
                    onChange={onFilterType}
                    value={valueDataType}
                />
            </div>
            {/* <Title level={5}>Dịch vụ</Title>
            {
                timeFilterOptions.map((option, index) => (
                    <Row justify="space-between" key={index} className="filter-option">
                        <div>
                            <span>{option.label}</span>
                        </div>
                        <div>
                            <Checkbox value={option.key} />
                        </div>
                    </Row>
                ))
            } */}
            <Divider />
            <Title level={5} className="mt-4">{t('price_range')}</Title>
            <div>
                <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(valueFilterPrice[0])}
                </span>
                <span className="ml-1 mr-1">-</span>
                <span>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(valueFilterPrice[1])}
                </span>
            </div>
            <div className="mt-3">
                <Slider
                    value={[valueFilterPrice[0], valueFilterPrice[1]]}
                    range={true}
                    step={1000}
                    defaultValue={[min_price, max_price]}
                    // onChange={}
                    onChange={(value) => onFilterSlide(value)}
                    min={min_price}
                    max={max_price}
                    tipFormatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                />
            </div>
        </>
    )
}

export default withTranslation('transport')(FilterList);