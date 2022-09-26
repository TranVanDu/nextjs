import React from 'react';
import { useMediaQuery } from "react-responsive";

function ImageSlide(props) {
    let { onClick, config, uri } = props;
    let url = config.url_asset_root + uri;
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });
    return (
        <div className={!isDesktopOrLaptop ? "image-slide-item d-flex pointer" : "image-slide-item d-flex pointer ml-1"} style={{
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
        }}
            onClick={onClick}
        >
        </div>
    )
}

export default ImageSlide;