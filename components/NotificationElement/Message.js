import { message } from 'antd';

export const messageSuccess = (msg) => {
  message.success(msg);
};

export const messageError = (msg) => {
  message.error(msg);
};

export const messageWarning = (msg) => {
  message.warning(msg);
};
