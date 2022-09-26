import React from 'react';
import { Row, Col, Card, Skeleton } from 'antd';

function LoadingBooking(props) {
    var { width } = props;
    return (
        <Row gutter={[20, 20]}>
            <Col lg={16} md={24} sm={24} xs={24}>
                <Card>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Card>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
                <Card>
                    <Skeleton active />
                </Card>
                <Card className="mt-4">
                    <Skeleton active />
                </Card>
            </Col>
        </Row>
    )
}

export default LoadingBooking;