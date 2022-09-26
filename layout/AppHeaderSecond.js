import React, { useEffect, useState } from 'react';
import PropsType from 'prop-types';
import { Layout, Menu, Dropdown, Button, Row, Col, Modal, Drawer, Divider, Avatar, Affix } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faHotel,
    faUser,
    faCalendarWeek,
    faEnvelope,
    faHeart,
    faCog,
    faPowerOff,
    faSignInAlt,
    faBars,
    faBlog,
    faSmile,
    faSync,
    faThumbtack
} from '@fortawesome/free-solid-svg-icons';
import { i18n, withTranslation, Link } from '../i18n';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
// actions
import { logout } from '../redux/actions/auth';
import { becomeHost } from '../requests/user';
import { getBlogCategories } from '../requests/widget';
// multilanguage
import dynamic from 'next/dynamic';
const LanguageDropdownComponent = dynamic(() => import('../components/LanguageDropdown'));

const { Header } = Layout;
const { SubMenu } = Menu;

const AppHeaderSecond = (props) => {
    var { t, background, mode, className, children, ua } = props;
    var currentLanguage = i18n.language;

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const config = useSelector(state => state.config);
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [loadingBecomeHost, setLoadingBecomehost] = useState(false);
    const [menuCategories, setMenuCategories] = useState([]);

    useEffect(() => {
        let getData = async () => {
            try {
                let categories = await getBlogCategories();
                let displayedCategories = categories.filter(category => config.custom_header_menu.indexOf(category.id) >= 0);
                setMenuCategories(displayedCategories);
            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [config])

    const onLogout = () => {
        Modal.confirm({
            title: t('logout_alert'),
            onOk: () => {
                dispatch(logout());
            }
        });
    }

    const onBecomeHost = () => {
        if (!user) {
            Modal.warning({
                title: t('user_login_warning')
            });
            return;
        } else {
            if (!user.email || !user.password) {
                Modal.warning({
                    title: t('user_missing_email_and_password')
                });
                return;
            }
        }
        setLoadingBecomehost(true);
        becomeHost().then(res => {
            setLoadingBecomehost(false);
            window.open("https://host.2stay.vn/", '_blank')
        });
    }

    const accountMenu = (
        <Menu className="dropdown-account">
            {
                user ? (
                    <Menu.Item>
                        <span className="user-avatar">
                            <img src={user.image ? config.url_asset_root + user.image : config.url_asset_root + 'backup.png'} />
                            <span>{user.firstname} {user.lastname}</span>
                        </span>
                    </Menu.Item>
                ) : null
            }
            <Menu.Item key="/exchange">
                <Link rel="noopener noreferrer" href="/exchange">
                    <div>
                        <FontAwesomeIcon icon={faSync} className="mr-2" />
                        <span>{t('exchange')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/bookings">
                <Link rel="noopener noreferrer" href="/user/bookings">
                    <div>
                        <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                        <span>{t('my_bookings')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/reviews">
                <Link rel="noopener noreferrer" href="/user/reviews">
                    <div>
                        <FontAwesomeIcon icon={faSmile} className="mr-2" />
                        <span>{t('my_reviews')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/wishlist">
                <Link rel="noopener noreferrer" href="/user/wishlist">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={faHeart} className="mr-2" />
                        <span>{t('wishlist')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/inbox">
                <Link rel="noopener noreferrer" href="/user/inbox">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <span>{t('inbox')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/notification">
                <Link rel="noopener noreferrer" href="/user/notification">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={['fas', 'bell']} className="mr-2" />
                        <span>{t('notification')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/setting">
                <Link rel="noopener noreferrer" href="/user/setting">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={['fas', 'user']} className="mr-2" />
                        <span>{t('account_setting')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/changepassword">
                <Link rel="noopener noreferrer" href="/user/changepassword">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        <span>{t('change_password')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item key="/user/invite">
                <Link rel="noopener noreferrer" href="/user/invite">
                    <div className="account-menu-item">
                        <FontAwesomeIcon icon={['fas', 'ticket-alt']} className="mr-2" />
                        <span>{t('coupon')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item onClick={() => onLogout()}>
                <div className="account-menu-item">
                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                    <span>{t('logout')}</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    const authMenu = (
        <Menu style={{ width: 150 }} className="dropdown-auth">
            <Menu.Item>
                <Link rel="noopener noreferrer" href="/login">
                    <div>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <span>{t('login')}</span>
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link rel="noopener noreferrer" href="/registration">
                    <div>
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        <span>{t('register')}</span>
                    </div>
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header id="app_header" className={`app_header--second ${className}`}>
            <div className="container" id="app_header--mobile">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <Link href="/#" >
                            <img src={require(`../public/static/images/logo_light.png`)} alt="2stay" />
                        </Link>
                    </div>
                    <div onClick={() => setVisibleDrawer(true)}>
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </div>
                </div>
                <Drawer
                    title={
                        <div className="logo">
                            <Link href="/#" >
                                <img src={require(`../public/static/images/logo_dark.png`)} alt="2stay" />
                            </Link>
                        </div>
                    }
                    placement="left"
                    onClose={() => setVisibleDrawer(false)}
                    visible={visibleDrawer}
                >
                    <Menu
                        mode="inline"
                    >
                        {user ? accountMenu : authMenu}
                        <Divider />
                        {
                            menuCategories.map(item => {
                                return (
                                    <Menu.Item active={false} key={item.id}>
                                        <FontAwesomeIcon icon={faThumbtack} className="mr-2" />
                                        <a href={item.link} target="_blank">{item.name}</a>
                                    </Menu.Item>
                                )
                            })
                        }
                        <Menu.Item active={false}>
                            <div>
                                <FontAwesomeIcon icon={faBlog} className="mr-2" />
                                <a href="https://2stay.vn/blog" target="_blank">{t('blog')}</a>
                            </div>
                        </Menu.Item>
                        <Menu.Item active={false}>
                            <FontAwesomeIcon icon={faHotel} className="mr-2" />
                            <a rel="noopener noreferrer" onClick={() => onBecomeHost()} className="mr-2">{t('host')}</a>
                            {loadingBecomeHost && <LoadingOutlined />}
                        </Menu.Item>
                        <Menu.Item active={false}>
                            {currentLanguage ? <LanguageDropdownComponent /> : null}
                        </Menu.Item>
                    </Menu>
                </Drawer>
            </div>
            <Row align="middle" id="app_header--pc">
                <Col span={8}>
                    <div className="logo">
                        <Link href="/#" >
                            <img src={require(`../public/static/images/logo_light.png`)} alt="2stay" />
                        </Link>
                    </div>
                </Col>
                {/* <Col span={8}>
                        <div className="d-flex justify-content-center">
                            {children}
                        </div>
                    </Col> */}
                <Col span={16} >
                    <div className="d-flex justify-content-end align-items-center menu-header">
                        {
                            menuCategories.map(item => {
                                return (
                                    <span className="mr-4" key={item.id}>
                                        <a href={item.link} target="_blank">{item.name}</a>
                                    </span>
                                )
                            })
                        }
                        <span className="mr-4">
                            <a href="https://2stay.vn/blog" target="_blank">{t('blog')}</a>
                        </span>
                        <span className="mr-4">
                            <a rel="noopener noreferrer" onClick={() => onBecomeHost()} className="mr-2">{t('host')}</a>
                            {loadingBecomeHost && <LoadingOutlined />}
                        </span>

                        {currentLanguage ? <LanguageDropdownComponent /> : null}

                        <Dropdown overlay={user ? accountMenu : authMenu} placement="bottomRight" trigger={["click"]} className="">
                            {
                                user ? (
                                    <div className="pointer">
                                        <Avatar
                                            size={32}
                                            src={<img src={user.image ? config.url_asset_root + user.image : config.url_asset_root + 'backup.png'} />}
                                            style={{ border: 'solid 2px #fff' }}
                                        />
                                        <span className="ml-2">{user.firstname}</span>
                                    </div>
                                ) : (
                                    <Button type="default" shape="round">
                                        <FontAwesomeIcon icon={faUser} /><span className="ml-2">{t('profile')}</span>
                                    </Button>
                                )
                            }

                        </Dropdown>
                    </div>
                </Col>
            </Row>
        </Header>
    )
}


AppHeaderSecond.propTypes = {
    className: PropsType.string,
    background: PropsType.string,
    mode: PropsType.oneOf(['dark', 'light'])
}

AppHeaderSecond.defaultProps = {
    background: '#fff',
    className: '',
    mode: 'dark'
}

export default withTranslation('header')(AppHeaderSecond);