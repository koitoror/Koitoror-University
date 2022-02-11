import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import SocialNetworks from './SocialNetworks';
import { Typography } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'

import { actionSignIn, actionSignInSuccess, actionSignInError } from '../../redux/actions/auth';
import api from '../../api/axios';

const { Title } = Typography;

// window.jwt_decode = jwt_decode

export default function SignIn() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(state => state)
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwt_decode(localStorage.getItem('authTokens'))
            : null,
    )
    const onFinish = async values => {
        try {
            dispatch(actionSignIn())
            const payload = {
                username: get(values, 'email', ''),
                password: get(values, 'password', '')
            }

            const res = await api({
                url: '/api/token/',
                data: payload,
                method: 'POST'
            });

            if (res && res.status === 200) {
                console.log('RES  --->', res)

                // get access token from header
                // const accessToken = res.headers.authorization;
                // const accessToken = res.config.headers.Authorization;
                const accessToken = res.data.access;

                console.log('ACCESS TOKEN  ----> ', accessToken)
                // console.log(typeof(accessToken))
                // setUser(jwt_decode(`${accessToken}`))
                setUser(jwt_decode(accessToken))
                // console.log('USER  ------> ', user)
                localStorage.setItem('authTokens', JSON.stringify(res.data))

                // const { username } = user;
                // console.log('USERNAME  ------> ', username)
                user.accessToken = accessToken

                // setTimeout(()=>{
                //     notification.success(
                //         message="Logged-In Successfully"
                //     )
                // }, 1000)

                // update user profile redux and perist
                dispatch(actionSignInSuccess(user))
                form.resetFields()
                navigate('/')
            }
        } catch (error) {
            const errorMessage = get(error, 'error.message', 'Something went wrong!')
            message.error(errorMessage)
            dispatch(actionSignInError(error))
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="signin"
                form={form}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            // style={{padding: 0, height: 50}}
            >
                <Title level={2} className="text-center">Sign in</Title>
                <SocialNetworks />

                <div className="option-text">or use your account</div>

                <Form.Item
                    name="email"
                    hasFeedback
                    label="Email address"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your email.',
                //     },
                //      {
                //         type: "email",
                //         message: 'Your email is invalid.',
                //      }
                // ]}
                >
                    <Input placeholder='Email' size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    hasFeedback
                    label="Password"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your password.',
                //     },
                //     { min: 6, message: 'Password must be minimum 6 characters.' },
                // ]}
                >
                    <Input.Password placeholder='Password' size="large" />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="#">
                        Forgot password?
                    </a>
                </Form.Item>


                <Button
                    loading={auth.loading}
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    icon={<LoginOutlined />}
                    size="large"
                >
                    Sign In
                </Button>
            </Form>
        </>
    )
}