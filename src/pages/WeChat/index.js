import "./index.css";
import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';

class WeChat extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            form:{
                api_private_key:'',
                callback_url:'',
                out_trade_no:'',
                trade_no:'',
                total_fee:0.00,
                return_code:"success",
                result_code:"success",
                attach:"success"
            }
        };
    }

    render(){
        return (
            <Form name="basic" labelCol={{span:8}} wrapperCol={{span:16}} autoComplete="off">
                {/* description:微信支付商户的`API`秘钥 */}
                <Form.Item
                    label="API 秘钥"
                    name="api_private_key"
                    rule={[
                        {
                            required:true,
                            message:"请输入微信支付秘钥"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:支付回调地址 */}
                <Form.Item
                    label="支付回调地址"
                    name="callback_url"
                    rule={[
                        {
                            required:true,
                            message:"请输入支付回调地址"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:商户订单号 */}
                <Form.Item
                    label="商户订单号"
                    name="out_trade_no"
                    extra="API 接口字段为`out_trade_no`，并且为商户系统内部订单号"
                    rule={[
                        {
                            required:true,
                            message:"请输入商户订单号"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:微信支付订单号 */}
                <Form.Item
                    label="微信支付订单号"
                    name="trade_no"
                    extra="API 接口字段为`trade_no`"
                    rule={[
                        {
                            required:true,
                            message:"请输入微信支付订单号"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:本次交易的订单金额，币种为人民币 */}
                <Form.Item
                    label="订单金额"
                    name="total_fee"
                    extra="本次交易的订单金额，币种为人民币，单位为分"
                    rule={[
                        {
                            required:true,
                            message:"请输入订单金额"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:交易状态 */}
                <Form.Item
                    label="交易状态"
                    name="return_code"
                    extra="本次交易的交易状态，字段为`return_code`"
                    rule={[
                        {
                            required:true,
                            message:"请输入交易状态"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:交易结果 */}
                <Form.Item
                    label="交易结果"
                    name="result_code"
                    extra="本次交易的交易结果，字段为`result_code`"
                    rule={[
                        {
                            required:true,
                            message:"请输入交易结果"
                        }
                    ]}>
                    <Input />
                </Form.Item>
                {/* description:商家数据包，原样返回 */}
                <Form.Item
                    label="商家数据包"
                    name="attach"
                    extra="商家数据包，字段为`attach`"
                    rule={[
                        {
                            required:true,
                            message:"商家数据包"
                        }
                    ]}>
                    <Input />
                </Form.Item>
            </Form>
        );
    }

}

export default WeChat;