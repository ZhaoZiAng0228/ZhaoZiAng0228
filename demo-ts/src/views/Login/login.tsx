/*
 * @Author: your name
 * @Date: 2021-11-10 16:56:37
 * @LastEditTime: 2022-08-06 11:06:13
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\view\Login\login.tsx
 * 
 * 登录
 */
import { useState } from "react"
import { Form, Input, Button, message, Col, Row } from 'antd';
import register from "../Register/register";

export interface QueryParamsProps {
    username?: string;
    password?: string;
}

const Login = (props: any) => {
    const [form] = Form.useForm();

    //登录
    const login = () => {
        form.validateFields().then((values: QueryParamsProps) => {
            if (values) {
                if (values.username === sessionStorage.getItem('username') && values.password === sessionStorage.getItem('password')) {
                    props.history.push('/layout/house/market')
                    message.success('登陆成功！')
                } else {
                    message.error('账号或密码错误，请重新输入！')
                }
            }
        })
    }
    //去注册
    const goRegister = () => {
        props.history.push('/register')
    }

    return (
        <div>
            <h1>登陆界面</h1>
            <Form form={form}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder='请输入账号' />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => login()}>
                                Submit
                            </Button>
                            <span onClick={() => goRegister()}>去登陆</span>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login
