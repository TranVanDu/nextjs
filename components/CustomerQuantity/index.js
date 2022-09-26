import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Router } from '../../i18n';
import { Row, Col, Button, Typography, DatePicker, Form, Popover, Radio, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faMale, faChild, faBaby } from '@fortawesome/free-solid-svg-icons';

const { Text } = Typography;

const CustomerQuantity = (props) => {
    var { t, limit, defaultAdults, defaultChildrens, defaultInfants, onFinish, isShowInfant } = props;
    const [adults, setAdults] = useState(defaultAdults);
    const [childrens, setChildrens] = useState(defaultChildrens);
    const [infants, setInfants] = useState(defaultInfants);

    const changeAdultQuantity = (e) => {
        if (e.target.value == 'minus') {
            if (adults > 1) setAdults(adults - 1);
        } else {
            if (limit) {
                if (adults + childrens < limit) setAdults(adults + 1);
            } else {
                setAdults(adults + 1);
            }
        }
    }

    const changeChildrenQuantity = (e) => {
        if (e.target.value == 'minus') {
            if (childrens > 0) setChildrens(childrens - 1);
        } else {
            if (limit) {
                if (adults + childrens < limit) setChildrens(childrens + 1);
            } else {
                setChildrens(childrens + 1);
            }
        }
    }

    const changeInfantQuantity = (e) => {
        if (e.target.value == 'minus') {
            if (infants > 0) setInfants(infants - 1);
        } else {
            if (infants + 1 <= adults) setInfants(infants + 1);
        }
    }

    return (
        <div className="customer-quantity-popover">
            <Row justify="space-between" align="middle">
                <div className="d-flex align-items-center">
                    <div>
                        <div>{t('adult')}</div>
                        <small>({t('larger_than_12_years_old')})</small>
                    </div>
                </div>
                <div>
                    <Radio.Group value={'value'} onChange={changeAdultQuantity}>
                        <Radio.Button value="minus">
                            <FontAwesomeIcon icon={faMinus} />
                        </Radio.Button>
                        <Radio.Button value="value" style={{ pointerEvents: 'none', width: 40 }}>{adults}</Radio.Button>
                        <Radio.Button value="plus">
                            <FontAwesomeIcon icon={faPlus} />
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </Row>
            <Row justify="space-between" align="middle" className="mt-2">
                <div className="d-flex align-items-center">
                    <div>
                        <div>{t('children')}</div>
                        <small>({t('between_2_and_12_years_old')})</small>
                    </div>
                </div>
                <div>
                    <Radio.Group value={'value'} onChange={changeChildrenQuantity}>
                        <Radio.Button value="minus">
                            <FontAwesomeIcon icon={faMinus} />
                        </Radio.Button>
                        <Radio.Button value="value" style={{ pointerEvents: 'none', width: 40 }}>{childrens}</Radio.Button>
                        <Radio.Button value="plus">
                            <FontAwesomeIcon icon={faPlus} />
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </Row>
            {
                isShowInfant ? (
                    <Row justify="space-between" align="middle" className="mt-2">
                        <div className="d-flex align-items-center">
                            <div>
                                <div>{t('infant')}</div>
                                <small>({t('smaller_than_2_years_old')})</small>
                            </div>
                        </div>
                        <div>
                            <Radio.Group value={'value'} onChange={changeInfantQuantity}>
                                <Radio.Button value="minus">
                                    <FontAwesomeIcon icon={faMinus} />
                                </Radio.Button>
                                <Radio.Button value="value" style={{ pointerEvents: 'none', width: 40 }}>{infants}</Radio.Button>
                                <Radio.Button value="plus">
                                    <FontAwesomeIcon icon={faPlus} />
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                    </Row>
                ) : null
            }
            <hr />
            <Row justify="space-between" align="middle">
                <Text type="danger" className="w-75">{adults + childrens == limit ? t('reached_limit_alert') : null}</Text>
                <Text type="danger" className="w-75">{infants == adults ? t('infants_reached_limit_alert') : null}</Text>
                <Button type="primary" size="small" onClick={() => onFinish({ adults: adults, childrens: childrens, infants: infants })}>{t('done')}</Button>
            </Row>
        </div>
    )
}

CustomerQuantity.defaultProps = {
    defaultAdults: 1,
    defaultChildrens: 0,
    defaultInfants: 0,
    onFinish: () => { },
    isShowInfant: false
}

CustomerQuantity.propTypes = {
    defaultAdults: PropTypes.number,
    defaultChildrens: PropTypes.number,
    defaultInfants: PropTypes.number,
    onFinish: PropTypes.func,
    isShowInfant: PropTypes.bool
}

export default withTranslation('home')(CustomerQuantity);