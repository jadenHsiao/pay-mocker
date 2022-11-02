/**
 * @Description: 模板组件
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/10/4
 */
import "./index.css";
import React from "react";
import WeChat from "../WeChatPayV2";
import QPay from "../QPay"
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
                        defaultSelectedKeys={['1']}
                        items={menuList}
                    />
                </Sider>
                <QPay className="site-layout">
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
            </QPay>
            </Layout>
        );
    }

}

export default LayOut;