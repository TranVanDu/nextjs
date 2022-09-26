import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { getRoomrate } from '../../requests/stay';

function Calendar(props) {
    const { t, id, defaultStart, defaultEnd, onChangeDate, months = 2, daySize = 48 } = props
    const [startDate, setStartDate] = useState(defaultStart);
    const [endDate, setEndDate] = useState(defaultEnd);
    const [focusedInput, setFocusedInput] = useState('startDate');
    const [roomRate, setRoomRate] = useState([]);
    useEffect(() => {
        getRoomrate(id).then(data => {
            setRoomRate(data);
        })
    }, [])

    useEffect(() => {
        setStartDate(defaultStart);
    }, [props.defaultStart]);

    useEffect(() => {
        setEndDate(defaultEnd);
    }, [props.defaultEnd]);

    let onFocusChange = (focusedInput = 'startDate') => {
        setFocusedInput(focusedInput || 'startDate');
    }

    const renderDay = (day) => {
        let dayFormat = day.format('YYYY-MM-DD');
        let index = roomRate.findIndex(item => item.date === dayFormat)
        if (index > -1) {
            if (roomRate[index].status == 1) {
                return (
                    <span>
                        <span className="d-block">{day.format('D')}</span>
                        <span className="text-ss d-block">{Math.floor(parseFloat(roomRate[index].price) / 1000) + 'K'}</span>
                    </span>
                )
            }
            else {
                return (<span className="d-block" style={{  color: "#cacccd" }}>{day.format('D')}</span>)
            }
        }
        return (
            <span className="d-block">{day.format('D')}</span>
        )
    }

    return (
        <div>
            <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                    if (startDate && endDate) {
                        onChangeDate({ startDate, endDate });
                    }
                }}
                minDate={moment().startOf('day')}
                maxDate={moment().add('6', 'M')}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                numberOfMonths={months}
                daySize={daySize}
                withPortal={false}
                orientation={'horizontal'}
                hideKeyboardShortcutsPanel={true}
                noBorder={true}
                renderDayContents={renderDay}
                isOutsideRange={day => {
                    let dayFormat = day.format('YYYY-MM-DD');
                    let index = roomRate.findIndex(item => item.date === dayFormat);
                    if (moment().add('6', 'M') > day && day >= moment().startOf('day')) {
                        if (index > -1) {
                            // if (roomRate[index].status == 0 ) {
                            //     return true;
                            // }
                        }
                        else {
                            return true;
                        }
                        return false
                    }
                    return true;
                }}
            />
        </div>
    )
}

export default Calendar