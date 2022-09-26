import React, { useState, useEffect } from 'react';
import { Layout, Typography, List } from 'antd';
import { withTranslation } from '../../i18n';
import { requestGetListNoti } from '../../requests/notification';
// request

const { Content } = Layout;
const { Title } = Typography;

function Notification(props) {
    const { t } = props;
    const perPage = 20;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ list: [], paging: { page: 1, perPage, count: 1, totalpage: 1 } });
    const [paging, setPaging] = useState({ perPage, page: 1 })

    useEffect(() => {
        setLoading(true);
        requestGetListNoti(paging).then(res => {
            setData(res);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    }, [paging])


    return (
        <Content>
            <div className="db-content">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('notification')}</Title>
                    </div>
                    <div className="rv-tabs">
                        <List
                            className="demo-loadmore-list"
                            loading={loading}
                            itemLayout="horizontal"
                            dataSource={data.list}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={item.message}
                                    />
                                </List.Item>
                            )}
                            pagination={{
                                current: paging.page,
                                total: data.paging.count,
                                size: "small",
                                showSizeChanger: false,
                                onChange: (page, pageSize) => setPaging({ perPage, page })
                            }}
                        />
                    </div>
                </div>
            </div>
        </Content>
    )
}
export default withTranslation('user_task')(Notification);