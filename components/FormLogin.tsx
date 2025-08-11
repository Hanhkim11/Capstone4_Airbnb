"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { apiUsers } from "@/app/api/users/apiLogin";
import { useAppDispatch } from "@/app/redux/hooks";
import { setUserLogin } from "@/app/redux/slices/user.slice";

type FieldType = {
  email?: string;
  password?: string;
};

// tạo type props cho component FormLogin
interface FormLoginProps {
  onCloseModal: () => void;
  onChangeForm: () => void;
}
// định nghĩa type cho component FormLogin
const FormLogin = ({ onCloseModal, onChangeForm }: FormLoginProps) => {
  const dispatch = useAppDispatch();

  const [apiNotification, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // Call the API to login
    apiUsers
      .apiLogin(values.email || "", values.password || "")
      .then((response) => {
        localStorage.setItem("userLogin", JSON.stringify(response));
        dispatch(setUserLogin(response));
        onCloseModal();
        apiNotification.success({
          message: "login successfully",
          description: "You are now logged in",
          placement: "top",
          duration: 2,
        });
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    // onCloseModal();
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className=""
      >
        <Form.Item<FieldType>
          labelCol={{ span: 4 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <div className="flex justify-around !w-full">
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            {/* button này sẽ có chức năng changeForm : vì nó được nhận props là 1 hàm xử lí logic để thay đổi form */}
            <Button
              onClick={onChangeForm}
              className="!p-0 !underline "
              style={{ alignItems: "end" }}
              type="link"
            >
              Chưa có tài khoản? Đăng ký
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLogin;
