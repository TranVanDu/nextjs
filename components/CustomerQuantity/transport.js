import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '../../i18n';
import { Row, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


function CustomerQuantity(props) {
    const { t, num, onChange, maxPassenger, width } = props;
    const [number, setNumber] = useState(num);

    const changeNum = (e) => {
        let v = number;
        if (e.target.value == 'minus') {
            if (v > 1) v--;
        } else {
            if (maxPassenger) {
                if (v < maxPassenger) v++;
            } else {
                v++;
            }
        }
        onChange(v);
        setNumber(v);
    }

    return (
        <div style={{ width: width }}>
            <Row justify="space-between" align="middle">
                <div>
                    <div style={{ fontWeight: "500" }} >{t('num_passenger')}</div>
                    <small>({t('both_adult_child')})</small>
                </div>
                <Radio.Group value={'value'} onChange={(e) => changeNum(e)}>
                    <Radio.Button value="minus">
                        <FontAwesomeIcon icon={faMinus} />
                    </Radio.Button>
                    <Radio.Button value="value" style={{ pointerEvents: 'none' }}>{number}</Radio.Button>
                    <Radio.Button value="plus">
                        <FontAwesomeIcon icon={faPlus} />
                    </Radio.Button>
                </Radio.Group>
            </Row>
        </div>
    )
}

CustomerQuantity.defaultProps = {
    num: 2,
    onChange: () => { },
    maxPassenger: 50
}

CustomerQuantity.propTypes = {
    num: PropTypes.number,
    maxPassenger: PropTypes.number,
    onChange: PropTypes.func,
}

export default withTranslation('home')(CustomerQuantity);