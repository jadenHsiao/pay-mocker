import "./index.css";
import React from "react";
import WeChat from "../WeChat";
import { Breadcrumb, Layout, Menu } from 'antd';
import {
    AlipayCircleOutlined,
    WechatOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
const { Sider, Header, Content, Footer } = Layout;


class LayOut extends React.Component
{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Layout>
                <div className="logo" />
                <Sider trigger={null} collapsible>
                    <div className="logo">PayMocker</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <WechatOutlined />,
                                label: '微信支付回调（V2）',
                            },
                            {
                                key: '2',
                                icon: <AlipayCircleOutlined />,
                                label: '支付宝支付回调',
                            },
                            {
                                key: '3',
                                icon: <AlipayCircleOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                        marginTop: 64,
                    }}
                >
                    <Breadcrumb>
                        <Breadcrumb.Item>PayMocker</Breadcrumb.Item>
                        <Breadcrumb.Item>微信支付回调（V2）</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        className="site-layout-background"
                        style={{
                            padding: '12px 0',
                        }}
                    >
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{
                                    height: '100%',
                                }}
                            />
                        </Sider>
                    </Layout>
                    <div
                        className="site-layout-background">
                        <WeChat />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Jadenhsiao ©2022 Created by Ant Design
                </Footer>
            </Layout>
            </Layout>
        );
    }

}

export default LayOut;