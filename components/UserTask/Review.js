import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Typography, List } from 'antd';
import { i18n, withTranslation, Router } from '../../i18n';
import ReviewItem from '../ReviewItem';
// request
import { getMyReviews } from '../../requests/review';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

function Review(props) {
    const { t } = props;
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('all');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            let reviews = await getMyReviews(type);
            setReviews(reviews);
            setLoading(false);
        }
        getData();
    }, [type])

    return (
        <Content>
            <div className="db-content">
                <div className="my-dashboard">
                    <div className="header-my-db">
                        <Title level={4} className="title-my-db">{t('reviews')}</Title>
                    </div>
                    <div className="rv-tabs">
                        <Tabs defaultActiveKey="all" onChange={(key) => setType(key)}>
                            <TabPane tab={t("All")} key="all">
                            </TabPane>
                            <TabPane tab={t(`Pending`)} key="pending">
                            </TabPane>
                            <TabPane tab={t('Reviewed')} key="reviewed">
                            </TabPane>
                        </Tabs>
                        <List
                            dataSource={reviews}
                            renderItem={item => (
                                <ReviewItem review={item} />
                            )}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </Content>
    )
}
export default withTranslation('user_task')(Review);