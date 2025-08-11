"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLoginRegister = ({ isOpen, onClose }: Props) => {
  // tạo state để xử lí logic toán tử 3 ngôi => render form tùy theo trạng thái của isLogin
  const [isLogin, setIsLogin] = useState(true);

  // tạo hàm cập nhập lại state isLogin => logic để thay đổi form
  const handleChangeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal
      title={isLogin ? "Login" : "Register"}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      footer={null}
      onOk={onClose}
      onCancel={onClose}
    >
      {/* nếu isLogin là true thì sẽ render ra FormLogin và ngược lại sẽ render ra FormRegister */}
      {isLogin ? (
        // gọi component trong isLogin == true, truyền props xuống là hàm xử lí logic changeState để changeForm
        <FormLogin onCloseModal={onClose} onChangeForm={handleChangeForm} />
      ) : (
        <FormRegister onChangeForm={handleChangeForm} />
      )}
    </Modal>
  );
};

export default ModalLoginRegister;
