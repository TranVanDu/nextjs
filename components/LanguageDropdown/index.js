import React, { useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { i18n } from '../../i18n';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { updateUserInformation } from '../../redux/actions/user';


const LanguageDropdown = (props) => {
    var currentLanguage = i18n.language;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);


    useEffect(() => {
        if (auth) {
            var userLang = "vi";
            if (auth.lang == "EN") userLang = "en";
            if (currentLanguage != userLang) {
                changeCurrentLanguage(userLang);
            }
        }
    }, [auth]);




    const menu = (
        <Menu style={{ width: 150 }} className="dropdown-locale">
            <Menu.Item key="vi" onClick={() => updateLang('vi')}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <img src={require(`../../public/static/images/flags/vi.png`)} className="flag-locale flag-locale-small" />
                        <span>Tiếng Việt</span>
                    </div>
                    {currentLanguage == 'vi' ? <FontAwesomeIcon icon={faCheck} /> : null}
                </div>
            </Menu.Item>
            <Menu.Item key="en" onClick={() => updateLang('en')}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <img src={require(`../../public/static/images/flags/en.png`)} className="flag-locale flag-locale-small" />
                        <span>English</span>
                    </div>

                    {currentLanguage == 'en' ? <FontAwesomeIcon icon={faCheck} /> : null}
                </div>
            </Menu.Item>
        </Menu>
    );

    const changeCurrentLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const updateLang = (language) => {
        changeCurrentLanguage(language);
        if (auth) {
            let lang = "VI";
            if (language == "en") lang = "EN";
            dispatch(updateUserInformation({ lang: lang, id: auth.id }))
        }
    }

    return (
        <Dropdown overlay={menu} trigger={['click']} className="app-locale mr-4">
            <div className="d-flex align-items-center">
                {/* {currentLanguage ? <img src={require(`../../public/static/images/flags/${currentLanguage}.png`)} className="flag-locale" /> : null} */}
                <img src={require(`../../public/static/images/flags/${currentLanguage}.png`)} className="flag-locale" />
                {currentLanguage == 'vi' ? 'VN' : 'EN'} <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </div>
        </Dropdown>
    )
}

export default LanguageDropdown;