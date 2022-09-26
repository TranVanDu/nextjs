import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Form, Row, Input, Rate, Upload, Button, Typography, message } from 'antd';
import moment from 'moment';
import { withTranslation, Link } from '../../i18n';
import { PlusOutlined } from '@ant-design/icons';
// request
import { createReview } from '../../requests/review';
import { uploadImages } from '../../requests/image';

const { TextArea } = Input;

const ReviewForm = (props) => {
    var { t, visible, onCancel, order, onSuccessCallback } = props;

    const user = useSelector(state => state.auth.user);

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const onSubmit = async (values) => {
        try {
            setLoading(true);

            if (fileList.length) {
                let data = new FormData();

                fileList.forEach(file => {
                    data.append('file[]', file.originFileObj);
                });
                data.append('folder', `/user/${user.id}`);
                var images = await uploadImages(data);
                values.images = images;
            }

            values.order_id = order.id;
            values.sub_id = order.object_id;

            await createReview(values);
            onSuccessCallback();

            form.resetFields();
            setLoading(false);
            onCancel();
        } catch (error) {
            message.error(t('review_error'));
            setLoading(false);
        }
    }

    return (
        <Modal
            title={t('review_order')}
            visible={visible}
            footer={null}
            onCancel={() => onCancel()}
        >
            {
                order ? (
                    <div>
                        <Typography.Title level={4}>
                            {
                                order.type == 'STAY' ? t('review_homestay') : t('review_transport_supplier')
                            }
                        </Typography.Title>
                        <Typography.Title level={5}>
                            {
                                order.type == 'STAY' ? order.room_title : order.airport_title
                            }
                        </Typography.Title>
                    </div>
                ) : null
            }
            <Form
                layout="vertical"
                onFinish={(values) => onSubmit(values)}
            >
                <Form.Item label={t('title')} name="title">
                    <Input />
                </Form.Item>
                <Form.Item label={t('rating')} name="rank" rules={[{ required: true }]}>
                    <Rate
                        style={{ fontSize: 36 }}
                        tooltips={[t('terrible'), t('bad'), t('normal'), t('good'), t('wonderful')]}
                    />
                </Form.Item>
                <Form.Item label={t('content')} name="comment" rules={[{ required: true }]}>
                    <TextArea />
                </Form.Item>
                <Form.Item label={t('upload_images')}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>{t('upload')}</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Row justify="end">
                    <Button type="primary" htmlType="submit" loading={loading}>{t('submit')}</Button>
                </Row>
            </Form>
        </Modal>
    )
}

ReviewForm.propTypes = {
    visible: PropTypes.bool,
    order: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccessCallback: PropTypes.func
}

ReviewForm.defaultProps = {
    visible: false, 
    onCancel: () => {}, 
    order: {}, 
    onSuccessCallback: () => {}
}


export default withTranslation('review')(ReviewForm);