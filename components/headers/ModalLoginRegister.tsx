import React from 'react'
import { Modal } from 'antd';
import FormLogin from '../FormLogin';

interface Props {
    isOpen: boolean,
    onClose: () => void
}
const ModalLoginRegister = ({ isOpen, onClose }: Props) => {
    return (
        <Modal
            title="Login"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpen}
            footer={null}
            onOk={onClose}
            onCancel={onClose}
        >
            <FormLogin onCloseModal={onClose} />
        </Modal>
    )
}

export default ModalLoginRegister