export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <img src={require('../../public/static/images/ic-fwd.png')}
            style={{ width: "52px", height: "52px", ...style }}
            className={className}
            onClick={onClick}
        />
    );
}

export const NextArrowTransparent = (props) => {
    const { className, style, onClick } = props;
    return (
        <img src={require('../../public/static/images/icons/ic_fwd_transparent.png')}
            style={{ width: "52px", height: "52px", ...style }}
            className={className}
            onClick={onClick}
        />
    );
}

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <img src={require('../../public/static/images/ic-prev.png')}
            style={{ ...style, width: "52px", height: "52px", zIndex: 999 }}
            className={className}
            onClick={onClick}
        />
    );
}
export const PrevArrowTransparent = (props) => {
    const { className, style, onClick } = props;
    return (
        <img src={require('../../public/static/images/icons/ic_prev_transparent.png')}
            style={{ ...style, width: "52px", height: "52px", zIndex: 999 }}
            className={className}
            onClick={onClick}
        />
    );
}

