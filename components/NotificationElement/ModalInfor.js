import { Modal } from 'antd';

export const ModalInfor = (title, content, onOk) => {
    Modal.info({
        centered: true,
        title: title,
        content: content,
        onOk: onOk ? onOk : () => { }
    });
}
