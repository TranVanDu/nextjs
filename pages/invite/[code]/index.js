import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { setCookie } from '../../../helpers/cookie';
import { priceInVn } from '../../../helpers/helpers';
import { withTranslation, Router, Link } from '../../../i18n';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppLayout } from '../../../layout';
import { loadRuleInviteFriendSignUp } from '../../../requests/user';

export async function getServerSideProps(context) {
    try {
        var res = await loadRuleInviteFriendSignUp()
        return {
            props: {
                point: res
            }
        }
    } catch (error) {
        return {
            props: {
                point: 0
            }
        }
    }

}

function Invite(props) {

    const { point, t } = props;


    const router = useRouter();
    const { code } = router.query;
    if (code) setCookie("invitation_code", code, 30);

    return (
        <AppLayout
            ogDescription="Get a AUD 100 Off discount after you sign up!"
        >
            <div className="bg-invite-code d-flex align-items-center">
                <div className="invite-wrap container">
                    <h1>{t('well_come')}&nbsp;2Stay</h1>
                    {point.points ? <h2>{t("get_a_vnd")}&nbsp;{priceInVn(point.points)}&nbsp;{t('off_discount')}</h2> : null}
                    <div className="register_btn" data-track-event="Invitation|Invite Friends Page Button Clicked">
                        <Link href="/registration">
                            <a className="a-register">{t('sign_up_now')}</a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="promise">
                <div className="container">
                    <Row className="d-lg-flex align-items-center">
                        <Col xs={24} lg={8} className="align-self-center">
                            <div className="promise_box d-flex flex-column flex-lg-row align-items-center">
                                <div className="promise-left"><FontAwesomeIcon className="" icon={['fas', 'suitcase-rolling']} width="33px" /></div>
                                <div className="promise-right">
                                    <p className="promise-top">{t('handpicked_experiences')}</p>
                                    <p className="promise-bottom">{t('read_real_user_reviews')}</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={8} className="align-self-center">
                            <div className="promise_box d-flex flex-column flex-lg-row align-items-center">
                                <div className="promise-left"><FontAwesomeIcon className="" icon={['fas', 'badge-percent']} width="44px" /></div>
                                <div className="promise-right">
                                    <p className="promise-top">{t('best_price_guaranteed')}</p>
                                    <p className="promise-bottom">{t('discounts_up_to_off')}</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={8} className="align-self-center">
                            <div className="promise_box d-flex flex-column flex-lg-row align-items-center">
                                <div className="promise-left"><FontAwesomeIcon className="" icon={['fas', 'mobile-alt']} width="28px" /></div>
                                <div className="promise-right">
                                    <p className="promise-top">{t('seamless_safe_booking')}</p>
                                    <p className="promise-bottom">{t('hassle_ticket_entry')}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="content-video d-none d-lg-block">
                <div className="container text-center">
                    <h2>{t("YOURS_TO_EXPLORE")}</h2>
                    <h3>{t('YOURS_TO_EXPLORE_content')}</h3>
                    <div className="video " >
                        <iframe width="800" height="450" src="https://www.youtube.com/embed/3M0TmN2TsK4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default withTranslation('user_task')(Invite);


