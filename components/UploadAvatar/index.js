import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CameraOutlined } from '@ant-design/icons';
import { requestUpdateAvatar } from "../../requests/user";
import { message, Spin } from "antd";
import { withTranslation } from '../../i18n';



function UploadAvatar(props) {

    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const config = useSelector(state => state.config);
    const user = useSelector(state => state.auth.user);
    const { t } = props;

    const handleImageUpdate = (event) => {
        var file = event.target.files[0];
        let formD = new FormData();
        formD.append("file", file)
        setLoading(true);
        requestUpdateAvatar(formD).then(res => {
            setLoading(false);
            setImgSrc(res.data);
            message.success(t('update_success'))
        }).catch(err => {
            setLoading(false);
            message.error(t("update_fail"))
        })
    }

    return (
        <React.Fragment>
            {loading ?
                <div className="container-avatar">
                    <img src={imgSrc ? config.url_asset_root + imgSrc : (user && user.image ? config.url_asset_root + user.image : config.url_asset_root + "backup.png")} alt="Avatar" className="image-avatar-loading" />
                    <div className="middle-avatar-loading">
                        <div className="text-avatar">
                            <Spin></Spin>
                        </div>
                    </div>
                </div>
                :
                <div className="container-avatar">
                    <img src={imgSrc ? config.url_asset_root + imgSrc : (user && user.image ? config.url_asset_root + user.image : config.url_asset_root + "backup.png")} alt="Avatar" className="image-avatar" />
                    <div className="middle-avatar">
                        <div className="text-avatar">
                            <label htmlFor="upload-btn-avatar" style={{ cursor: "pointer" }}><CameraOutlined /></label>
                            <input
                                type="file"
                                id="upload-btn-avatar"
                                accept="image/*"
                                name="avatar"
                                className="d-none"
                                onChange={handleImageUpdate}
                            />
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>


    );
}



export default withTranslation('user_task')(UploadAvatar);