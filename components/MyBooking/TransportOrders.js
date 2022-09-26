
import React, { useState, useEffect } from 'react';
import { Skeleton, Card } from 'antd';
import { withTranslation } from '../../i18n';
import { List } from 'antd';
import _ from 'lodash';
import TransportOrderItem from './TransportOrderItem';
import ReviewForm from '../ReviewForm';
// request
import { requestListBookingTransport } from '../../requests/transport';

function TransportOrder(props) {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [visibleReviewForm, setVisibleReviewForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState({
        sort: {
            type: "desc",
            attr: "id"
        },
        paging: {
            perpage: 20,
            page: 1
        }
    })

    useEffect(() => {
        async function getData() {
            try {
                let orders = await requestListBookingTransport(filter);
                setOrders(orders.list);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
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
            let orders = await requestListBookingTransport(filter);
            setOrders(orders.list);
        }
        getData();
    }

    return (
        <div>
            {
                loading ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={[1, 2]}
                        pagination={{
                            pageSize: 5
                        }}
                        renderItem={item => (
                            <Card className="mb-4">
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
                                <TransportOrderItem
                                    order={item}
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

export default withTranslation('transport')(TransportOrder);