import React, { useState, useEffect } from 'react';
import { Row, Button, Divider } from 'antd';
import { withTranslation } from '../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { generateAirline, convertTime } from '../../helpers/helpers';
import moment from 'moment';

const SelectedFlightItem = (props) => {
    var { t, flight, onClickDetail, onClickChangeFlight } = props;

    var airline = generateAirline(flight.AirlineCode);

    return (
        <div className="selected-flight-item">
            <Row align="middle" justify="space-between">
                <div>
                    <img className="lf-air-logo mr-3" src={airline.logo} />
                    <span>{airline.name}</span>
                </div>
                <Button type="link" size="small" className="p-0">{t('detail')}</Button>
            </Row>
            <Row align="middle" justify="space-between">
                <div className="d-flex align-items-center">
                    <div className="text-center">
                        <div className="selected-flight-item-title">{moment(flight.StartDate).format('HH:mm')}</div>
                        <div className="selected-flight-item-subtitle">{flight.StartPoint}</div>
                    </div>
                    <div className="selected-flight-item-divider">
                        <Divider>
                            <FontAwesomeIcon icon={faPlane} size="sm" />
                        </Divider>
                    </div>
                    <div className="text-center">
                        <div className="selected-flight-item-title">{moment(flight.EndDate).format('HH:mm')}</div>
                        <div className="selected-flight-item-subtitle">{flight.EndPoint}</div>
                    </div>
                    <div className="text-center ml-3">
                        <div className="selected-flight-item-title">{convertTime(flight.Duration)}</div>
                        <div className="selected-flight-item-subtitle">{flight.ListSegment.length == 1 ? t('direct_flight') : `${flight.ListSegment.length} ${t('stops')}`}</div>
                    </div>
                </div>
                <Button type="primary" size="small" onClick={() => onClickChangeFlight()}>
                    {t('change_flight')}
                </Button>
            </Row>
        </div>
    )
}

export default withTranslation('flight')(SelectedFlightItem);