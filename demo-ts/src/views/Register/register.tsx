/*
 * @Author: your name
 * @Date: 2021-11-10 16:56:37
 * @LastEditTime: 2022-08-06 10:59:49
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\view\Login\login.tsx
 * 
 * 注册
 */
import { FC, useState } from "react"
import { Form, Input, Button, Col, Row, message } from 'antd';

export interface QueryParamsProps {
    username: string;
    password: string;
}

const Register: FC<any> = (props: any) => {
    const [form] = Form.useForm();
    //注册
    const register = () => {
        form.validateFields().then((values: QueryParamsProps) => {
            sessionStorage.setItem('username', values?.username)
            sessionStorage.setItem('password', values?.password)
            message.success('注册成功！请登录！')
            props.history.push('/login')
        })
    }
    //去登录
    const goLogin = async () => {
        props.history.push('/login')
    }

    return (
        <div>
            <h1>注册界面</h1>
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
                            <Button type="primary" htmlType="submit" onClick={() => register()}>
                                Submit
                            </Button>
                            <span onClick={() => goLogin()}>去登陆</span>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Register
