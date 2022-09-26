import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import qs from 'qs';
import renderHTML from 'react-render-html';

const Video = (props) => {
    const {title, content, url} = props;

    let urlQuery = qs.parse(url.split('?')[1]);

    return (
        <Row gutter={[24, 24]} className="video-row">
            <Col md={16} sm={24} xs={24} >
                <div className="videoWrapper">
                    <iframe src={`https://www.youtube.com/embed/${urlQuery.v}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

            </Col>
            <Col md={8} sm={24} xs={24}>
                <Card hoverable className="video-card">
                <Typography.Title level={4}>{title}</Typography.Title>
                <div>
                    {content ? renderHTML(content) : null}
                </div>
                </Card>
            </Col>
        </Row>
    )
}

export default Video;