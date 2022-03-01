/*
 * @Author: your name
 * @Date: 2021-11-10 16:56:37
 * @LastEditTime: 2021-11-11 16:49:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\view\Login\login.tsx
 * 
 * 注册
 */
import { FC, useState, useEffect } from "react"
import { Form, Input, Button, message } from 'antd';
import { BackgroundRegister } from "../../api/user";

export const Register: FC<any> = (props: any) => {
    const [info, setInfo] = useState({
        username: '',
        password: '',
        code: ''
    })

    //注册
    // useEffect(() => { }, [])

    const register = async () => {
        const res = await BackgroundRegister({
            username: info.username,
            password: info.password
        })
        if (res.data.code === 200) {
            message.success('注册成功');
            //将token进行本地存储
            localStorage.setItem('token', res.data.token)
            //跳转至登录页
            props.history.push('/login')
        } else {
            message.error('注册失败');
        }
    }
    //去登录
    const goLogin = async () => {
        props.history.push('/login')
    }

    return (
        <div id='app'>
            <h1>注册界面</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='请输入账号' value={info.username}
                        onChange={(val) => {
                            setInfo((prev: any) => {
                                return {
                                    ...prev,
                                    username: val.target.value
                                }
                            })
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='请输入密码' value={info.password}
                        onChange={(val) => {
                            setInfo((prev: any) => {
                                return {
                                    ...prev,
                                    password: val.target.value
                                }
                            })
                        }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={() => register()}>
                        Submit
                    </Button>
                    <span onClick={() => goLogin()}>去登陆</span>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
