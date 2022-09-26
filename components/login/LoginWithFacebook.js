import React, { useState } from 'react';
import { Spin } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { login } from '../../redux/actions/auth';
import { getCookie } from '../../helpers/cookie';
import { NotiError } from '../NotificationElement/NotiError';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation, Router } from '../../i18n';


function LoginWithFacebook(props) {
    const { t } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const responseFacebook = (response) => {
        if (response.accessToken) {
            let data = {
                token: response.accessToken,
            }
            var { next, keepStaying } = props;
            let invitation_code = getCookie("invitation_code");
            if (invitation_code) data.invite_code = invitation_code;
            setLoading(true);

            dispatch(login({ data, option: { type: "facebook" } }, "client/auth/login")).then(res => {
                setLoading(false);
                if (keepStaying) {
                    props.loginSuccess()
                }
                else {
                    if (next) {
                        let query = { ...next };
                        delete query.nextpathname; delete query.nextaspath;
                        next.nextaspath ? Router.push({ pathname: next.nextpathname, query: { ...query } }, next.nextaspath) : Router.push({ pathname: next.nextpathname, query: { ...query } });
                    }
                    else Router.push('/');
                }
            })
                .catch(err => {
                    // console.log(err);
                    setLoading(false);
                    NotiError(t('login_error'), t('err_try_again'));
                })
        }
        else {
            // console.log(response)
            NotiError(t('login_error'), t('err_try_again'));
        }
    }

    return (
        <Spin spinning={loading} tip="signing in...">
            <FacebookLogin
                appId="942552929899433"
                autoLoad={false}
                disableMobileRedirect={true}
                callback={responseFacebook}
                render={renderProps => (
                    <div onClick={renderProps.onClick} className="social-login">
                        <FontAwesomeIcon icon={["fab", "facebook-square"]} color="rgb(63,85,154)" size={"2x"} />
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>Facebook</div>
                    </div>
                )}
            />
        </Spin>
    );
}

export default withTranslation("auth")(LoginWithFacebook);