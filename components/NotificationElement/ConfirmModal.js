import { Modal } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { confirm } = Modal;

export const ShowConfirm = (props) => {
    confirm({
        title: props.title ? <React.Fragment><FontAwesomeIcon className="icon-confirm-modal" icon={['fal', 'exclamation-circle']} /> {props.title}</React.Fragment> :  <React.Fragment><FontAwesomeIcon className="icon-confirm-modal" icon={['fal', 'exclamation-circle']} /> title</React.Fragment> ,
        icon: null,
        content: props.content ? props.content : 'Some descriptions',
        okText: props.okText ? props.okText : 'OK',
        okType: props.okType ? props.okType : 'primary',
        cancelText: props.cancelText ? props.cancelText : 'Cancel',
        onOk: props.onOk ? props.onOk : () => { },
        onCancel: props.onCancel ? props.onCancel : () => { },
        centered: true
    });
}
