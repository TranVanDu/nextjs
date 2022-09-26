import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { withTranslation, Link } from '../../i18n';
import { getCookie, setCookie } from '../../helpers/cookie';

const Popup = (props) => {
    var { t, image, actionUrl } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let isHidePopup = getCookie('2stay_hide_popup');
        if (parseInt(isHidePopup)) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [])

    const onCancel = () => {
        setVisible(false);
        setCookie('2stay_hide_popup', 1, 7);
    }

    return (
        <Modal 
            className="homepage-popup" 
            visible={visible} 
            footer={null} 
            onCancel={() => onCancel()}
            closeIcon={<Button shape="round" size="small" danger type="primary">{t('close')}</Button>}
            >
            <Link href={actionUrl}>
                <img src={image} style={{ width: '100%', height: 'auto' }} />
            </Link>
        </Modal>
    )
}

export default withTranslation('home')(Popup);