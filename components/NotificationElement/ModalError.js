import { Modal } from 'antd';

export const ModalError = (title, content, onOk) => {
    Modal.error({
        centered: true,
        title: title,
        content: content,
        onOk: onOk ? onOk : () => { }
    });
}
