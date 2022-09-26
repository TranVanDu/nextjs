import React, { useState } from 'react';
import { Spin, Col } from 'antd';
import { login } from '../../redux/actions/auth';
import { getCookie } from '../../helpers/cookie';
import { NotiError } from '../NotificationElement/NotiError';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { appleAuthProvider, auth } from '../../firebase';
import { withTranslation, Link, Router } from '../../i18n';

function LoginWithApple(props) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = props;


    const appleSignInPopup = () => {
        // [START auth_google_signin_popup]
        setLoading(true);
        auth
            .signInWithPopup(appleAuthProvider)
            .then((result) => {
                // console.log("result gg", result)
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // console.log("token gg", token);
                var idToken = credential.idToken;
                // console.log("idToken", idToken);
                // The signed-in user info.
                var user = result.user;
                // console.log("user gg", user)
                let data = {
                    firebase_id: user.uid,
                    firstname: user.displayName,
                    lastname: "",
                    email: user.email
                }
                var { next, keepStaying } = props;
                let invitation_code = getCookie("invitation_code");
                if (invitation_code) data.invite_code = invitation_code;
                dispatch(login({ data, option: { type: "apple" } }, "client/auth/login")).then(res => {
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
                        console.log(err);
                        setLoading(false);
                        NotiError('Login error', t('err_try_again'));
                    })
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log("err", error)
                NotiError(t('login_error'), t('err_try_again'));
                setLoading(false);
            });
        // [END auth_google_signin_popup]

    }


    return (
        <Spin spinning={loading} tip="signing in...">
            <div onClick={() => appleSignInPopup()} className="social-login">
                <FontAwesomeIcon icon={["fab", "apple"]} color="rgb(51,51,51)" size={"2x"} />
                <div style={{ fontSize: "14px", fontWeight: "500" }}>Apple</div>
            </div>
        </Spin>
    );
}

export default withTranslation("auth")(LoginWithApple);