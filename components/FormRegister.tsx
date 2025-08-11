"use client";
import React, { useState } from "react";

import { Button, Form, Input, Select, notification, DatePicker } from "antd";
import type { CalendarProps, DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import { apiRegister } from "@/app/api/users/apiRegister";
import { TRegister } from "@/app/types/typeRegister";

const { Option } = Select;

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

interface FormRegisterProps {
  onChangeForm: () => void;
}

const FormRegister = ({ onChangeForm }: FormRegisterProps) => {
  const [form] = Form.useForm();

  const [birthday, setBirthday] = useState<string>("");
  const [apiNotification, contextHolder] = notification.useNotification();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthday(dateString as string);
  };

  const onFinish = (values: TRegister) => {
    const data: TRegister = {
      id: 0,
      name: values.name,
      email: values.email,
      password: values.password,
      phone: `0${values.phone}`,
      birthday: birthday,
      gender: values.gender,
      role: "USER",
    };

    apiRegister(values)
      .then((response) => {
        console.log(response);
        apiNotification.success({
          message: "Tạo tài khoản thành công!",
          description: "Bạn có thể đăng nhập ngay bây giờ",
          placement: "top",
          duration: 2,
        });
      })
      .catch((error) => {
        apiNotification.error({
          message: "Tạo tài khoản thất bại",
          description: error.response.data.content,
          placement: "top",
          duration: 2,
        });
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "84",
        }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          labelCol={{ span: 4 }}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 6 }}
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value={true}>Male</Option>
            <Option value={false}>Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          name="birthday"
          label="Birthday"
          rules={[{ required: true, message: "Please select birthday!" }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-around !w-full">
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
            <Button
              onClick={onChangeForm}
              className="!p-0 !underline "
              style={{ alignItems: "end" }}
              type="link"
            >
              Đã có tài khoản đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormRegister;
