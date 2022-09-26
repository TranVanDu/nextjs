import React from 'react';
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UploadAvatar from '../components/UploadAvatar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withTranslation, Router } from '../i18n';
import {
    faCalendarWeek,
    faEnvelope,
    faHeart,
    faCog,
    faSmile
} from '@fortawesome/free-solid-svg-icons';

const { Title } = Typography;
const { Sider } = Layout;


function Sidebar(props) {
    const { t } = props;
    const router = useRouter();
    const { account } = props;

    const setName = (account) => {
        if (account) {
            var name = "";
            if (account.firstname) name = name + " " + account.firstname;
            if (account.lastname) name = name + " " + account.lastname;
            if (name) return name;
        }
        return t('common:2stay_user');
    }

    const onPushMenu = (query, as) => {
        Router.push({ pathname: '/user/[task]', query: { task: query } }, as, { shallow: true })
    }

    var task = "";
    if (router.query && router.query.task) {
        task = router.query.task.toString();
    }

    return (
        <Sider
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            width="280px"
            onBreakpoint={broken => {
            }}
            onCollapse={(collapsed, type) => {
            }}
        >
            <div>
                <div className="sidebar-db">
                    <div className="sidebar-img" >
                        <UploadAvatar />
                        <Title level={3} className="your-name">{setName(account)}</Title>
                        <Link href="/user/[task]" as="/user/setting"><a className="edit-profile" >{t('edit_profile')}</a></Link>

                    </div>
                    <Menu theme="light" mode="inline" selectedKeys={task} className="menu-sidebar">
                        <Menu.Item key="bookings" className="li-sidebar" onClick={() => onPushMenu("bookings", "/user/bookings")}>
                            <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                            <span className="nav-text">{t('bookings')}</span>
                        </Menu.Item>
                        <Menu.Item key="reviews" className="li-sidebar" onClick={() => onPushMenu("reviews", "/user/reviews")}>
                            <FontAwesomeIcon icon={faSmile} className="mr-2" />
                            <span className="nav-text">{t('reviews')}</span>
                        </Menu.Item>
                        <Menu.Item key="wishlist" className="li-sidebar" onClick={() => onPushMenu("wishlist", "/user/wishlist")}>
                            <FontAwesomeIcon icon={faHeart} className="mr-2" width="20px" />
                            <span className="nav-text">{t('wishlist')}</span>
                        </Menu.Item>
                        <Menu.Item key="inbox" className="li-sidebar" onClick={() => onPushMenu("inbox", "/user/inbox")}>
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            <span className="nav-text">{t('inbox')}</span> {true ? <span className='unread'> {}</span> : null}
                        </Menu.Item>
                        <Menu.Item key="notification" className="li-sidebar" onClick={() => onPushMenu("notification", "/user/notification")}>
                            <FontAwesomeIcon icon={['fas', 'bell']} className="mr-2" />
                            <span className="nav-text">{t('notification')}</span> {true ? <span className='unread'> {}</span> : null}
                        </Menu.Item>
                        <Menu.Item key="setting" className="li-sidebar" onClick={() => onPushMenu("setting", "/user/setting")}>
                            <FontAwesomeIcon icon={['fas', 'user']} className="mr-2" />
                            <span className="nav-text">{t('my_detail')}</span>
                        </Menu.Item>
                        <Menu.Item key="changepassword" className="li-sidebar" onClick={() => onPushMenu("changepassword", "/user/changepassword")}>
                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                            <span className="nav-text">{t('change_password')}</span>
                        </Menu.Item>
                        <Menu.Item key="invite" className="li-sidebar" onClick={() => onPushMenu("invite", "/user/invite")}>
                            <FontAwesomeIcon icon={['fas', 'ticket-alt']} className="mr-2" width="18px" />
                            <span className="nav-text">{t('coupon')}</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>

        </Sider>

    )
}



export default withTranslation(['user_task', 'common'])(Sidebar);