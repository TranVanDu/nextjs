import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Input, Tabs, List } from 'antd';
import { withTranslation } from '../../i18n';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';
import { priceInVn } from '../../helpers/helpers';
import { loadRuleInviteFriendSignUp } from '../../requests/user';
import { requestGetMyCoupon } from '../../requests/coupon';
import ApplicableCoupon from '../coupon/ApplicableCoupon';
import NotApplicableCoupon from '../coupon/NotApplicableCoupon';

const { TabPane } = Tabs;

const { Title } = Typography;

const { Content } = Layout;

function Invite(props) {
    const { t } = props;
    const [point, setPoint] = useState(0);
    const [listCoupon1, setListCoupon1] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            loadRuleInviteFriendSignUp().then(res => {
                setPoint(res.points);
            });
            requestGetMyCoupon(1).then(res => {
                setListCoupon1(res);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            });
        } catch (error) {

        }

    }, []);

    const [copied, setCopied] = useState(false);
    const authUser = useSelector(state => state.auth.user);

    var link_invite = authUser ? `https://2stay.vn/invite/${authUser.invitation_code}` : "";
    var URLMessenger = `https://www.facebook.com/dialog/send?app_id=542477432970123&` + `link=${link_invite}` + `&redirect_uri=https://2stay.vn/user/invite`

    return (
        <Content>
            <div className="db-content booking">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('coupon')}</Title>
                    </div>
                    <div className="rv-tabs">
                        <div style={{ padding: "1px" }}>
                            <List
                                grid={{ gutter: [10, 10], lg: 2, md: 2, xs: 1, sm: 1, xl: 2, xxl: 2 }}
                                dataSource={listCoupon1}
                                renderItem={item => (
                                    <List.Item>
                                        <ApplicableCoupon item={item} />
                                    </List.Item>
                                )}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('invite')}</Title>
                    </div>
                    <div className="rv-tabs">
                        <Title level={5}>{t("invite_title")}</Title>
                        {point ? <p>{t('invite_content')}&nbsp;{priceInVn(point)}</p> : null}
                        <div>
                            <div className="d-flex mb-3">
                                <Input value={link_invite} style={{ marginRight: "20px" }} />
                                <CopyToClipboard text={link_invite}
                                    onCopy={() => setCopied(true)}>
                                    <Button>{copied ? <span style={{ color: 'red' }}><FontAwesomeIcon icon={['fab', 'check']} width="16px" />Copied</span> : <div><span className="d-lg-none">Copy</span><span className="d-none d-lg-block">Copy Link</span></div>}</Button>
                                </CopyToClipboard>
                            </div>
                            <div className="share-social d-flex align-items-center">
                                <div className="mr-3">Share</div>
                                <div className="mr-3">
                                    <TwitterShareButton className="share-twitter d-flex align-items-center"
                                        url={link_invite}
                                    >
                                        <TwitterIcon
                                            size={45}
                                        /> <span className="d-none d-lg-block">Twitter</span>

                                    </TwitterShareButton>
                                </div>
                                <div className="mr-3">
                                    <FacebookShareButton className="share-face d-flex align-items-center"
                                        url={link_invite}
                                    >
                                        <FacebookIcon
                                            size={45} /> <span className="d-none d-lg-block">Facebook</span>
                                    </FacebookShareButton>
                                </div>
                                <div className="" >
                                    <a href={URLMessenger} target="blank" className="d-flex align-items-center">
                                        <FontAwesomeIcon className="icon-messenger" icon={['fab', 'facebook-messenger']} width="22px" /> <span className="d-none d-lg-block">Messenger</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default withTranslation('user_task')(Invite);