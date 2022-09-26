import React, { useState } from 'react';
import { withTranslation } from '../../i18n';
import { Card, Button, Modal } from 'antd';
import LoginModal from '../LoginModal';
import { useSelector } from 'react-redux';

function LoginContainer(props) {
    const { t } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    if (user == null)
        return (
            <div className="mb-4 pb-4">
                <Modal visible={modalVisible} footer={null} onCancel={() => setModalVisible(false)} width="450px">
                    <LoginModal t={t} loginSuccess={() => { setModalVisible(false) }} />
                </Modal>
                <Card className="card-login-require">
                    <h4>{t('login_container_title')}</h4>
                    <p>{t('login_container_line1')}</p>
                    <p>{t('login_container_line2')}</p>
                    <Button type="primary" size="large" onClick={() => { setModalVisible(true) }}>{t('login_container_login_now')}</Button>
                </Card>
            </div>
        )
    else return null
}

export default withTranslation('home')(LoginContainer);