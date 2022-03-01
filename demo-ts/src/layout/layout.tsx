/*
 * @Author: your name
 * @Date: 2021-11-10 19:07:07
 * @LastEditTime: 2021-11-11 20:30:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\layout\index.tsx
 */
import { FC } from 'react'
import { RouterView, routes } from '../router/index'
import './layout.scss'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    PieChartOutlined,
    LineChartOutlined,
    AppstoreOutlined,
    CommentOutlined,
    HeartOutlined,
    CarOutlined,
    PlaySquareOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'


export const Home: FC = (props: any) => {
    const { Header, Content, Footer, Sider } = Layout;
    const onCollapse = (collapsed: any) => {
        console.log(collapsed);
        // setState({ collapsed });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    style={{ marginTop: '50px' }}
                >
                    <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        <Link to='/layout/house'>房源管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PlaySquareOutlined />}>
                        <Link to='/layout/live'>直播管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CarOutlined />}>
                        <Link to='/layout/group'>团购管理</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PieChartOutlined />}>
                        <Link to='/layout/audit'>审核管理</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<HeartOutlined />}>
                        <Link to='/layout/ordor'>订单管理</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CommentOutlined />}>
                        <Link to='/layout/message'>资讯管理</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<LineChartOutlined />}>
                        <Link to='/layout/broker'>经纪人管理</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ backgroundColor: '#4381E6' }} >宏烨找房后台管理系统</Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* 二级路由 */}
                    </Breadcrumb>
                    <RouterView routes={props.routes} />
                </Content>
            </Layout>
        </Layout>
        // {/* <main className="main">
        //     <RouterView routes={props.routes} />
        // </main> */}
    )
}

export default Home

