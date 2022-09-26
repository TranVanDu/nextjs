import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Typography, Rate, Divider, Card, Tag, Row } from 'antd';
import { i18n, withTranslation, Router } from '../../i18n';
import moment from 'moment';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const ReviewItem = (props) => {
    const { t, review } = props;

    return (
        <Card className="mb-4">
            <Row align="middle">
                <Tag color={review.type == 'STAY' ? '#F37F28' : '#4A1153'}>{review.type == 'STAY' ? t('stay') : t('car')}</Tag>
                <Typography.Title level={5} className="mb-0">{review.object_title}</Typography.Title>
            </Row>
            {review.title ? <Typography.Title level={5}>{review.title}</Typography.Title> : null}
            <Rate value={review.rank} disabled />
            <div>
                {review.comment}
            </div>
            <Divider className="mt-2 mb-2" />
            <div>
                {t('created_at')}: {moment(review.created_at).format('dd, lll')}
            </div>
        </Card>
    )
}
export default withTranslation('review')(ReviewItem);