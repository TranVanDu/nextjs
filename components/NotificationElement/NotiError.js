import { notification } from 'antd';

export const NotiError = (message, description) => {
    notification.error({
        message: message,
        description: description,
    });
};