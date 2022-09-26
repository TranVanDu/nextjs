import React from 'react';
import { Layout, Typography } from 'antd';
import { withTranslation } from '../../i18n';
import { ChatComponent } from './inbox/index'

const { Title } = Typography;

const { Content } = Layout;

function Inbox(props) {
    const { t } = props;
    return (
        <Content>
            <div className="db-content pdtop-20">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('inbox')}</Title>
                    </div>
                    <ChatComponent t={t} />
                </div>
            </div>
        </Content>
    )
}

export default withTranslation('user_task')(Inbox);