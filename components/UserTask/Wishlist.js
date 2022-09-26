import { Col, Layout, Row, Typography, List } from 'antd';
import React, { useState, useEffect } from 'react';
import { i18n, withTranslation, Router } from '../../i18n';
import { myWishlist } from '../../requests/wishlist';
import Skeleton from 'react-loading-skeleton';
import Property from '../Property';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Title } = Typography;

function Wishlist(props) {

    const { t } = props;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const config = useSelector(state => state.config);
    useEffect(() => {
        myWishlist().then(response => {
            setItems(response);
            setLoading(false)
        });
    }, []);

    const onNavigateDetail = (id) => {
        Router.push({
            pathname: `/stay/${id}`, query: {
                checkin: null,
                checkout: null,
                guest: 1,
                children: 0
            }
        }, undefined, { shallow: true });
    }

    return (
        <Content>
            <div className="db-content">
                <React.Fragment>
                    <div className="my-dashboard" style={{ marginBottom: '20px' }}>
                        <div className="header-my-db">
                            <Title level={4} className="title-my-db">{t('wishlist')}</Title>
                        </div>
                        <div className="wishlist-list">
                            {!loading ? (
                                <Row gutter={[15, 35]}>
                                    {
                                        items.length ? (
                                            <React.Fragment>
                                                {
                                                    items.map((item, index) => (
                                                        <Property itemsPerRow={3} key={index} item={item} config={config} onClick={() => onNavigateDetail(item.id)} />
                                                    ))
                                                }
                                            </React.Fragment>
                                        ) : (
                                                <div className="w-100">
                                                    <List dataSource={[]} />
                                                </div>
                                            )
                                    }


                                </Row>
                            )
                                :
                                <Row gutter={16} className="mt-3">
                                    {
                                        [1, 2, 3].map(item => (
                                            <Col md={8} sm={12} xs={24} key={item}>
                                                <Skeleton className="checkin-place-item" key={item} height={"164px"} />
                                            </Col>

                                        ))
                                    }
                                </Row>
                            }
                        </div>
                    </div>
                </React.Fragment>
            </div>
        </Content>
    )
}
export default withTranslation('user_task')(Wishlist);