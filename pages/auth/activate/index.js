import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../../layout';
import { useRouter } from 'next/router';
import { withTranslation } from '../../../i18n';
import { Result, Spin } from 'antd';
import { requestVerifyMail } from '../../../requests/verify';

function VerifyMail(props) {

    const router = useRouter();
    var { query } = router;
    const { t } = props;

    const [loading, setLoadingEmail] = useState(true);
    const [resultMail, setResultMail] = useState(false);

    const handleVerifyEmail = (actionCode) => {

        requestVerifyMail({ actionCode }).then(resp => {
            setLoadingEmail(false);
            setResultMail(true);
        })
            .catch(function (error) {
                console.log(error);
                setLoadingEmail(false);
                setResultMail(false);
            });

    }

    useEffect(() => {
        handleVerifyEmail(query.oobCode);
    }, [])



    return (
        <AppLayout>
            <div className="gray-background">
                <div className="container mt-5 mb-5">
                    {loading ? <div style={{ height: "50vh" }}>
                        <div className="text-center">
                            <Spin />
                        </div>
                    </div> :
                        resultMail ?
                            <div className="bg-page-box ct-page-activate">
                                <div className="container d-flex align-items-center justify-content-center ct-page-box">
                                    <div className="text-center">
                                        <Result
                                            status="success"
                                            title={t('verify_email_success')}
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="bg-page-box ct-page-activate">
                                <div className="container d-flex align-items-center justify-content-center ct-page-box">
                                    <div className="text-center">
                                        <Result
                                            status="error"
                                            title={t('verify_email_error')}
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </AppLayout>
    )

}


export default withTranslation('user_task')(VerifyMail);