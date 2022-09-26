import React, { useState } from 'react';
import { Input, Button, Form, Modal } from 'antd';
import { ModalError } from '../NotificationElement/ModalError';
import { ModalSuccess } from '../NotificationElement/ModalSuccess';
import { useDispatch } from 'react-redux';
import { withTranslation } from '../../i18n';
import { requestCheckExistMail, requestResetPassword } from '../../requests/auth';



function ConfirmResetPass(props) {
    const { t } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const checkmail = (rule, value, callback) => {
        if (value) {
            requestCheckExistMail(value).then(res => {
                callback(t('oops_invalid_email_address'));
            })
                .catch(err => {
                    callback();
                })
        }
        // else callback();
    };

    const handleSubmit = values => {
        setLoading(true);

        var data = {
            email: values.email,
        }
        requestResetPassword(data).then(res => {
            setLoading(false);
            ModalSuccess(t('send_link_to_email_success'), t("please_follow_the_instructions_sent_to_your_email_to_reset_your_password"), () => props.handleCancel())

        })
            .catch(err => {
                setLoading(false);
                ModalError(t('send_link_to_email_error'), err.data.msg)
            })

    };

    return (
        <Modal className="ct-modal-width"
            visible={props.visible}
            footer={null}
            closable={true}
            destroyOnClose={true}
            onCancel={props.handleCancel}
        >

            <h3>{t('reset_password')}</h3>


            <Form
                onFinish={handleSubmit}
                initialValues={{ email: props.email }}
            >
                <p>{t('enter_the_email_address_used_to_create_your_2stay_account_and_we_ll_send_you_a_link_to_reset_your_password')}</p>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: t('email_not_valid'),
                        },
                        {
                            required: true,
                            message: t('email_required'),
                        },
                        {
                            validator: checkmail,
                        },
                    ]}
                    normalize={value => value.trim()}
                >
                    <Input placeholder={t('email_address')} />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="w-100" style={{ borderRadius: "3px" }}>{t('send')}</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}



export default withTranslation("auth")(ConfirmResetPass);