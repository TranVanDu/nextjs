import React, { useState } from 'react';
import { Row, Checkbox, Col, Divider, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { withTranslation } from '../../../../i18n';
import { useSelector } from 'react-redux';
const InputNumberOption = (props) => {
    let { title, onChange, value, type, t } = props;
    return (
        <div className="d-flex align-items-center justify-content-between">
            <p className="text-bold stay-filter-label">{title}</p>
            <div className="p-2">
                <span className="pl-2 pr-2 mr-2 pointer" onClick={() => {
                    if (value > 0) {
                        onChange(value - 1, type)
                    }
                }}><FontAwesomeIcon icon={faMinus} /></span>
                <span className="text-bold p-1">{+value} </span>
                <span className="pl-2 pr-2 ml-2 pointer"
                    onClick={() => {
                        if (value < 9) {
                            onChange(value + 1, type)
                        }
                    }}><FontAwesomeIcon icon={faPlus} /></span>
            </div>
        </div>
    )
}

const MoreFilter = (props) => {
    var { t, onApply, optionsAmenity, value } = props;
    const user = useSelector(state => state.auth.user);
    let lang = user ? user.lang : 'VI';
    const initState = {
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        amenities: []
    }
    const [state, setState] = useState({
        beds: 1,
        bedrooms: 1,
        bathrooms: 1,
        amenities: []
    })
    let onChange = (value, attr) => {
        setState({
            ...state,
            [attr]: value
        })
    }
    return (
        <div className="ml-4 mr-4 d-flex flex-column" style={{ width: "400px", height: "600px" }}>
            <div className="mb-2">
                <p className="filter-price-title mt-2">{t('general')}</p>
                <InputNumberOption title={t('bed')} value={state.beds} onChange={onChange} type="beds" />
                <InputNumberOption title={t('bed_room')} value={state.bedrooms} onChange={onChange} type="bedrooms" />
                <InputNumberOption title={t('bath_room')} value={state.bathrooms} onChange={onChange} type="bathrooms" />
                <Divider className="mb-1 mt-1" />
            </div>

            <div className="flex-grow-1" style={{ overflow: 'auto' }}>
                <p className="filter-price-title mt-2">{t('amentity')}</p>
                <Checkbox.Group style={{ width: "100%", overflow: "auto" }} defaultValue={value.amenities} onChange={(ids) => { setState({ ...state, amenities: ids }) }}>
                    <Row>
                        {optionsAmenity.map(item => {
                            return (
                                <Col span={12} className="pt-1 pb-1">
                                    <Checkbox value={item.id} ><span className="text-select-option">{lang == "VI" ? item.title : item.title_en}</span></Checkbox>
                                </Col>
                            )
                        })}

                    </Row>
                </Checkbox.Group>
            </div>
            <Divider className="mb-1 mt-1" />
            <div className="d-flex align-items-center justify-content-between mt-2">
                <Button onClick={() => { onApply(initState) }}>{t('delete')}</Button>
                <Button type="primary" onClick={() => { onApply(state) }}>{t('apply')}</Button>
            </div>
        </div>
    )
}

export default withTranslation('stayList')(MoreFilter);