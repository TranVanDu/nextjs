import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import Property from '../../Property';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
// api requests
import { getWidget } from '../../../requests/widget'


const StayWidget = (props) => {
    const { title, subtitle, widget, onClick } = props
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const config = useSelector(state => state.config);
    useEffect(() => {
        getWidget(widget.code).then(response => {
            setItems(response.list);
            setLoading(false)
        });
    }, []);

    return (
        <React.Fragment>
            <div className="title-widget pt-4">{title}</div>
            {subtitle ? <div className="mb-3">{renderHTML(subtitle)}</div> : null}
            {!loading ? <Row gutter={16}>
                {
                    items.map((item, index) => (
                        <Property key={index} item={item} config={config} onClick={() => onClick(item)} />
                    ))
                }

            </Row>
                :
                <Row gutter={16} className="mt-3">
                    {
                        [1, 2, 3, 4].map(item => (
                            <Col md={6} sm={12} xs={24} key={item}>
                                <Skeleton className="checkin-place-item"  height={"164px"} />
                            </Col>

                        ))
                    }
                </Row>
            }
        </React.Fragment>
    )
}

export default StayWidget;