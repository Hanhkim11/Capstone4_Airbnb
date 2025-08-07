'use client'
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { apiUsers } from '@/app/api/users/apiLogin';
import { useAppDispatch } from '@/app/redux/hooks';
import { setUserLogin } from '@/app/redux/slices/user.slice';

type FieldType = {
    email?: string;
    password?: string;
};

interface FormLoginProps {
    onCloseModal: () => void;
}
const FormLogin = ({ onCloseModal }: FormLoginProps) => {
    const dispatch = useAppDispatch();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        // Call the API to login
        apiUsers.apiLogin(values.email || "", values.password || "")
            .then((response) => {
                localStorage.setItem("userLogin", JSON.stringify(response))
                dispatch(setUserLogin(response))
                console.log(response)
            })
            .catch((error) => {
                console.error('Login failed:', error);
            })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // onCloseModal();
    };

    return (
        <Form
            name="basic"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className=''
        >
            <Form.Item<FieldType>
                labelCol={{ span: 4 }}
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input className='w-full' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormLogin