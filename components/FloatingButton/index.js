import React from 'react';
import { useSelector } from 'react-redux';

const FloatingButton = (props) => {
    const config = useSelector(state => state.config);

    return (
        <a href={`tel:${config.contact_phone}`}>
            <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                <div className="coccoc-alo-ph-circle"></div>
                <div className="coccoc-alo-ph-circle-fill"></div>
                <div className="coccoc-alo-ph-img-circle"></div>
            </div>
        </a>
    );
}

export default FloatingButton;