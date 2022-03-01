/*
 * @Author: your name
 * @Date: 2021-11-10 16:56:37
 * @LastEditTime: 2021-11-11 18:45:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\view\Login\login.tsx
 * 
 * 登录
 */
import { FC, useState } from "react"
import { Form, Input, Button, message } from 'antd';
import { BackgroundLogin } from "../../api/user";

export const Login: FC<any> = (props: any) => {
    const [info, setInfo] = useState({
        username: '',
        password: ''
    })

    //登录
    const login = async () => {
        const res = await BackgroundLogin({
            username: info.username,
            password: info.password
        })
        if (res.data.code === 200) {
            message.success('登陆成功');
            //将token进行本地存储
            localStorage.setItem('token', res.data.token)
            //跳转至主页面
            props.history.push('/layout/house')
        } else {
            message.error(res.data.msg);
        }
    }
    //去注册
    const goRegister = async () => {
        props.history.push('/register')
    }

    return (
        <div id='app'>
            <h1>登录界面</h1>
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
                    <Button type="primary" htmlType="submit" onClick={() => login()}>
                        Submit
                    </Button>
                    <span onClick={() => goRegister()}>去注册</span>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
