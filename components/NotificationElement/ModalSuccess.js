import { Modal } from 'antd';

export const ModalSuccess = (title, content, onOk) => {
    Modal.success({
        centered: true,
        title: title,
        content: content,
        onOk: onOk ? onOk : () => { }
    });
}