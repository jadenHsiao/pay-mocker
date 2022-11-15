import React from "react";
import {
    QqOutlined,
    AlipayCircleOutlined,
    WechatOutlined,
    createFromIconfontCN
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3225718_jbjm348rjb.js',
});

/**
 * 菜单列表
 * @type {*[]}
 */
export const Menu = [
    {
        key: '1',
        icon: <WechatOutlined />,
        label: '微信支付通知（V2）',
    },
    {
        key:'2',
        icon:<QqOutlined />,
        label: 'QQ钱包支付通知',
    },
    {
        key: '3',
        icon: <IconFont type="icon-bytedance" />,
        label: '字节跳动担保支付通知',
    },
    // {
    //     key: '4',
    //     icon: <IconFont type="icon-paypal" />,
    //     label: 'PayPal 支付回调',
    // },
];
