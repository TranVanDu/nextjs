import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Router } from '../../i18n';
import { Row, Col, Button, Typography, DatePicker, Form, Popover, Radio, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faMale, faChild, faBaby, faHouseUser } from '@fortawesome/free-solid-svg-icons';

const { Text } = Typography;

const RoomQuantity = (props) => {
    var { t, limit, defaultRoom, onFinish } = props;

    const [room, setRoom] = useState(parseInt(defaultRoom));

    const changeRoomQuantity = (e) => {
        if (e.target.value == 'minus') {
            if (room > 1) setRoom(room - 1);
        } else {
            if (limit) {
                if (room < limit) setRoom(room + 1);
            } else {
                setRoom(room + 1);
            }
        }
    }

    return (
        <div className="customer-quantity-popover">
            <Row justify="space-between" align="middle">
                <div className="d-flex align-items-center">
                    <div>
                        <div>{t('Room')}</div>
                    </div>
                </div>
                <div>
                    <Radio.Group value={'value'} onChange={changeRoomQuantity}>
                        <Radio.Button value="minus">
                            <FontAwesomeIcon icon={faMinus} />
                        </Radio.Button>
                        <Radio.Button value="value" style={{ pointerEvents: 'none', width: 40 }}>{parseInt(room)}</Radio.Button>
                        <Radio.Button value="plus">
                            <FontAwesomeIcon icon={faPlus} />
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </Row>


            <hr />
            <Row justify="space-between" align="middle">
                <Text type="danger" className="w-75">{room == limit ? `${room} ${t('reached_limit_room_alert')}` : null}</Text>

                <Button type="primary" size="small" onClick={() => onFinish({ room: room })}>{t('done')}</Button>
            </Row>
        </div>
    )
}

RoomQuantity.defaultProps = {
    defaultRoom: 1,
}

RoomQuantity.propTypes = {
    defaultRoom: PropTypes.number,
}

export default withTranslation('home')(RoomQuantity);