import React, { useState, useEffect } from 'react';

import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';

import { Button } from 'antd';
import moment from 'moment'
function RangeDatePicker(props) {
    const { onChange, checkin = null, checkout = null, t, months = 2 } = props;
    const [focusedInput, setFocusedInput] = useState('startDate');
    const [startDate, setStartDate] = useState(checkin);
    const [endDate, setEndDate] = useState(checkout);
    let onFocusChange = (focusedInput = 'startDate') => {
        setFocusedInput(focusedInput || 'startDate');
    }

    useEffect(() => {
        setStartDate(checkin);
        setEndDate(endDate);
    }, [checkin, checkout])
    return (
        <div>
            <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }}
                minDate={moment()}
                maxDate={moment().add('6', 'M')}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                numberOfMonths={months}
                hideKeyboardShortcutsPanel={true}
                noBorder={true}
                // renderDayContents={(day) => <span style={{
                // }}><span className="d-block">{day.day() % 6 === 5 ? '😻' : day.format('D')}</span>
                //     <span className="text-ss d-block">500k</span>
                // </span>}
                isOutsideRange={day => {
                    if (moment().add('6', 'M') >= day && day >= moment()) {
                        return false
                    }
                    return true

                }}
            />
            {/* <div className="d-flex p-2 justify-content-start">
                <span className="text-xs">{t('pick_checkin_checkout_date')}</span>
            </div> */}
            <div className="d-flex p-2 justify-content-between align-items-center mt-2">
                <Button onClick={() => { onChange({ startDate: null, endDate: null }) }}>{t('delete')}</Button>
                <Button type="primary" onClick={() => { onChange({ startDate: startDate, endDate: endDate }) }}>{t('apply')}</Button>
            </div>
        </div>
    )
}

export default RangeDatePicker