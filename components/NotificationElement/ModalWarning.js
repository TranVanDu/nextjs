import { Modal } from 'antd';

export const ModalWarning = (title, content, onOk) => {
    Modal.warning({
        centered: true,
        title: title,
        content: content,
        onOk: onOk ? onOk : () => { }
    });
}
