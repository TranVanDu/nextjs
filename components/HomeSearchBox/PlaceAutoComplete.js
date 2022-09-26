import {
    Input, AutoComplete
} from 'antd';
import React, { useState, useEffect } from 'react';
import { withTranslation } from '../../i18n';
import { getPlace, getMyAutocompleteAddress } from '../../requests/placeAutoComplete';
import { debounce } from 'lodash';

function PlacesAutoComplete(props) {
    const { t, dropdownMatchSelectWidth } = props;

    const [address, setAddress] = useState("");
    const [isOpenPlace, setIsOpenPlace] = useState(false);
    const [dataSearch, setDataSearch] = useState([])
    const [defaultDataSearch, setDefaultDataSearch] = useState([]);

    useEffect(() => {
        if (props.defaultValue) {
            setAddress(props.defaultValue);
            if (props.airport && props.airport.province_latitude)
                getMyAutocompleteAddress(`${props.defaultValue}&location=${props.airport && props.airport.province_latitude},${props.airport.province_longitude}}&radius=300000`).then(dataPlace => {
                    setDataSearch(dataPlace);
                })
        }
    }, [])

    useEffect(() => {
        if (props.airport && props.airport.province_latitude) {
            getMyAutocompleteAddress(`${"khách sạn"}&types=establishment&location=${props.airport.province_latitude},${props.airport.province_longitude}&radius=20000`).then(dataPlace => {
                setDefaultDataSearch(dataPlace);
            })
        }
    }, [props.airport]);


    const handleChange = (address) => {
        setAddress(address);
    }

    const searchPlace = debounce(async (keyword) => {
        if (keyword) {
            if (props.airport && props.airport.province_latitude) {
                var dataPlace = await getMyAutocompleteAddress(`${keyword}&location=${props.airport.province_latitude},${props.airport.province_longitude}&radius=300000`);
                setDataSearch(dataPlace);
            }
            else {
                var dataPlace = await getMyAutocompleteAddress(`${keyword}`);
                setDataSearch(dataPlace);
            }
        }
        else setDataSearch([]);
    }, 300);

    const handleSelect = (address, option) => {
        setIsOpenPlace(false);
        setAddress(address);
        if (option && option.placeId) {
            getPlace(option.placeId)
                .then(results => {
                    props.onChange({ ...results, value: address });
                })
                .catch(error => {
                    // console.log("error", error)
                });
        }

    };


    return (
        <AutoComplete
            value={address}
            style={{ width: "100%" }}
            dropdownClassName="box-search-home-autocomplete-dat"
            dropdownMatchSelectWidth={dropdownMatchSelectWidth}
            options={address ? dataSearch.map((item, index) => {
                return {
                    value: `${item.structured_formatting.main_text}`,
                    label: (
                        <div>
                            <p style={{ fontWeight: "500", marginBottom: "2px" }}>{item.structured_formatting.main_text}</p>
                            <p style={{ color: "rgb(205,205,205)", marginBottom: "0px" }}>{item.structured_formatting.secondary_text}</p>
                        </div>
                    ),
                    placeId: item.place_id,
                    key: `${index}${item.place_id}`
                }
            }) :
                defaultDataSearch.map((item, index) => {
                    return {
                        value: `${item.structured_formatting.main_text}`,
                        label: (
                            <div>
                                <p style={{ fontWeight: "500", marginBottom: "2px" }}>{item.structured_formatting.main_text}</p>
                                <p style={{ color: "rgb(205,205,205)", marginBottom: "0px" }}>{item.structured_formatting.secondary_text}</p>
                            </div>
                        ),
                        placeId: item.place_id,
                        key: `${index}${item.place_id}`
                    }
                })
            }
            notFoundContent={t('notFoundContent')}
            onSelect={handleSelect}
            onFocus={() => setIsOpenPlace(true)}
            onBlur={() => setIsOpenPlace(false)}
            open={(address || dataSearch.length || defaultDataSearch.length) && isOpenPlace}
            size="large"
        >
            <Input
                placeholder={t('address')}
                bordered={false}
                size="large"
                style={{ width: "100%" }}
                onChange={(e) => { handleChange(e.target.value); searchPlace(e.target.value); setIsOpenPlace(true); }}
            />
        </AutoComplete>
    )
}

export default withTranslation('home')(PlacesAutoComplete);