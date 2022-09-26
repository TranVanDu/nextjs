import { notification } from 'antd';

export const NotiSuccess = (message, description) => {
    notification.success({
        message: message,
        description: description,
    });
};