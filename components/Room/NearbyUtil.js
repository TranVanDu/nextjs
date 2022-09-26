import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { nearbyUtil } from '../../requests/stay';

function NearbyUtil(props) {
    let { cords, t } = props;
    const [data, setData] = useState([]);
    const [type, setType] = useState('AM_THUC');
    useEffect(() => {
        nearbyUtil(cords).then(data => {
            setData(data);
        })
    }, [])

    let _renderPaneHeader = () => {
        return data.map((item, index) => {
            return (
                <Col span={24} className={["cate-btn", item.type == type ? "active" : "", "pl-4 mb-2 pointer"].join(" ")} key={index}
                    onClick={() => { setType(item.type) }}
                >
                    <span>{t(item.type)}</span>
                </Col>
            )
        })
    }
    let _renderPaneContent = () => {
        let content = data.find(item => item.type == type);
        if (content) {
            return content.places.map((item, index) => {
                return (
                    <Col xs={24} sm={24} md={12} className="pl-2 pl-md-4 mb-2 pointer d-flex" key={index.toString()} >
                        <div className="d-flex order-item mr-2 text-center align-items-center justify-content-center">
                            <span>{index + 1}</span>
                        </div>

                        <span className="text-12 flex-grow-1">{item.name}</span>
                    </Col>
                )
            })
        }
    }

    return (
        <div className="neaby-u-container d-flex ant-row flex-row">
            <div className="p-2 px-md-3 ant-col-8 cate ant-row">
                {_renderPaneHeader()}
            </div>
            <div className="p-2 px-md-3 ant-col-16 cate-content ant-row">
                <Row>
                    {_renderPaneContent()}
                </Row>
            </div>
        </div>
    )
}

export default NearbyUtil;