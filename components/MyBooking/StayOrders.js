import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withTranslation, Router } from '../../i18n';
import { List, Card, Skeleton } from 'antd';
import _ from 'lodash';
import StayOrderItem from './StayOrderItem';
import { getMyStayBookings } from '../../requests/user';
import ReviewForm from '../ReviewForm';

const StayOrders = (props) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [visibleReviewForm, setVisibleReviewForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const config = useSelector(state => state.config);

    useEffect(() => {
        async function getData() {
            let orders = await getMyStayBookings();
            setOrders(orders);
            setLoading(false);
        }
        getData();
    }, []);

    const onChangePage = (page) => {
        setCurrentPage(page);
    }

    const openReviewForm = (order) => {
        setSelectedOrder(order);
        setVisibleReviewForm(true);
    }

    const closeReviewForm = () => {
        setSelectedOrder(null);
        setVisibleReviewForm(false);
    }

    const onRefreshList = () => {
        async function getData() {
            let orders = await getMyStayBookings();
            setOrders(orders);
        }
        getData();
    }
 
    return (
        <div>
            {
                loading ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={[1, 2, 3, 4, 5]}
                        pagination={{
                            pageSize: 5
                        }}
                        renderItem={item => (
                            <Card className="mb-4" key={item}>
                                <Skeleton key={item} active paragraph rows={2} />
                            </Card>
                        )}
                    />
                ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={orders}
                            pagination={{
                                pageSize: 5,
                                current: currentPage,
                                onChange: (page, pageSize) => onChangePage(page)
                            }}
                            renderItem={item => (
                                <StayOrderItem
                                    order={item}
                                    config={config}
                                    key={item.id}
                                    onClickReview={() => openReviewForm(item)}
                                />
                            )}
                        />
                    )
            }
            <ReviewForm
                visible={visibleReviewForm}
                onCancel={() => closeReviewForm()}
                onSuccessCallback={() => onRefreshList()}
                order={selectedOrder}
            />
        </div>

    )
}

export default withTranslation('stayList')(StayOrders);