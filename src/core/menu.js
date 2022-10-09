import React from "react";
import {
    AlipayCircleOutlined,
    WechatOutlined
} from '@ant-design/icons';


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
        icon: <AlipayCircleOutlined />,
        label: 'PayPal 支付回调',
    },
];
