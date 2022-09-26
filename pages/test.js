import React, { useEffect, useState } from 'react';
import { AppLayout } from '../layout';
import { Menu, Card, Row, Col, Button, Input, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StaySearchBox, TransportSearchBox, FlightSearchBox } from '../components/HomeSearchBox';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';

const SamplePage = (props) => {
    const [selectedMenu, setSelectedMenu] = useState('stay');

    var searchBoxComponent = <StaySearchBox />;
    if (selectedMenu == 'transport') searchBoxComponent = <TransportSearchBox />;
    else if (selectedMenu == 'flight') searchBoxComponent = <FlightSearchBox />;

    return (
        <AppLayout
            headerProps={{
                className: 'home-header',
                background: 'transparent',
                mode: 'dark'
            }}
            headChildren={
                <React.Fragment>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd-mobile/2.3.4/antd-mobile.css" />
                </React.Fragment>
            }
        >
            <div className="home-search-wrapper">
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={new Date()}
                >
                    <Button>Open Datepicker</Button>
                </DatePicker>

            </div>
        </AppLayout>
    )
}

export default SamplePage;