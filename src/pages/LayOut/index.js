/**
 * @Description: 模板组件
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/10/4
 */
import "./index.css";
import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import WeChatPayV2 from "../WeChatPayV2";
import QPay from "../QPay"
import ByteDanceGuaranteedPayment from "../ByteDanceGuaranteedPayment";
import { Breadcrumb, Layout, Menu } from 'antd';
import { Menu as menuList } from "../../core/menu";
const { Sider, Content, Footer } = Layout;

/**
 * 模板组件
 */
class LayOut extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            menuList
        };
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
                        defaultSelectedKeys={['0']}
                    >
                        {menuList.map((item,index) => {
                            return (
                                <Menu.Item key={index}>
                                    <Link to={item.route}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
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
                        <Routes>
                            <Route exact path="/" element={<WeChatPayV2 />}></Route>
                            <Route path="/q-pay" element={<QPay />}></Route>
                            <Route path="/byte-dance-guaranteed-payment" element={<ByteDanceGuaranteedPayment />}></Route>
                            <Route path="/we-chat-pay-v2" element={<WeChatPayV2 />}></Route>
                        </Routes>
                    </div>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Jadenhsiao ©2022 Created by Ant Design
                    </Footer>
                </Content>

            </Layout>
        );
    }

}

export default LayOut;