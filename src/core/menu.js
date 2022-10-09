import React from "react";
import {
    AlipayCircleOutlined,
    WechatOutlined,
    createFromIconfontCN
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3225718_siv6fv3cxdo.js',
});

/**
 * 菜单列表
 * @type {*[]}
 */
export const Menu = [
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
        icon: <IconFont type="icon-paypal" />,
        label: 'PayPal 支付回调',
    },
];
