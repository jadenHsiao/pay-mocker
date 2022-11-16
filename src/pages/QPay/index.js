/**
 * @Description: QQ钱包模拟支付回调组件
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/11/2
*/
import "./index.css";
import React from "react";
import CryptoJS from "crypto-js";
import { Button, Radio , Form, Input, Alert  } from 'antd';
import { post } from "../../utils/request";
import { signContent,randomString } from "../../utils/string";
import { successMark,urlRegex } from "../../core/constant";

/**
 * QQ钱包支付模拟组件
 */
class QPay extends React.Component
{

    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            alertShow:false,
            alertContent:"",
            alertType:successMark.toLowerCase(),
            form:{
                mchId:"",
                apiPrivateKey:"",
                callBackUrl:"",
                outTradeNo:"",
                transactionId:"",
                bankType:"",
                feeType:"CNY",
                cashFee:0.01,
                timeEnd:"",
                totalFee:0.01,
                tradeState:successMark,
                tradeType:"JSAPI",
                attach:successMark,
                nonceStr:randomString(32)
            }
        }
    }

    /**
     * 根据字段获取表单的值
     * @param fields
     * @returns {*}
     */
    handleGetFieldValue = (fields) => {
        let formData = this.formRef.current.getFieldsValue(),
            value = formData[fields];
        return value;
    };

    /**
     * 发起回调请求
     * @returns {Promise<void>}
     */
    handleOnSend = async () => {
        await this.formRef.current.validateFields()
            .then((values) => {
                let that = this,
                    url = that.handleGetFieldValue("callBackUrl"),
                    state = that.state,
                    alertContent = state.alertContent,
                    alertType = state.alertType,
                    xml = that.handleNotifyXML(values),
                    headers =  {
                        headers: {
                            "Accept":"application/xml",
                            "Content-Type": "application/xml"
                        },
                    };
                post(url,xml,headers)
                    .then((value)=>{
                        alertContent = value.message;
                        alertType = successMark.toLowerCase();
                    })
                    .catch((error)=>{
                        alertContent = error.message;
                        alertType = "error"
                    })
                    .finally(()=>{
                        this.setState({
                            alertShow:true,
                            alertContent,
                            alertType
                        })
                    })
            })
            .catch((error) => {
                console.log(error)
            });
    };

    /**
     * 获取回包 `XML`
     * @returns {string}
     */
    handleNotifyXML = (values) => {
        let fields = [
                "outTradeNo","transactionId","bankType",
                "feeType","cashFee","timeEnd","tradeType",
                "totalFee","tradeState","attach","mchId"
            ],
            xml = "",
            state = values;
            state.totalFee = state.totalFee * 100;
            state.cashFee = state.cashFee * 100;
        let content = signContent(fields,state),
            preSignContent = content.value + "&key=" + this.handleGetFieldValue("apiPrivateKey"),
            sign = CryptoJS.MD5(preSignContent).toString().toUpperCase();
        content.keys.forEach((item,index) => {
            let currentValue = content.params[item];
            xml+="<"+item+"><![CDATA["+currentValue+"]]></"+item+">";
        });
        xml+="<sign><![CDATA["+sign+"]]></sign>";
        return "<xml>"+xml+"</xml>";
    };

    /**
     * 重置表单内容
     */
    handleOnReset = () => {
        this.formRef.current.resetFields();
    };

    render(){

        const { alertShow,alertContent,form,alertType } = this.state;

        return (
            <div className="q-pay">
                { alertShow ?
                    <Alert
                        message={successMark.toLowerCase() === alertType ? "成功" : "错误"}
                        description={alertContent}
                        type={alertType}
                        showIcon />
                    : '' }
                <Form name="basic"
                      ref={this.formRef}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 14 }}
                      layout="horizontal"
                      initialValues={form}
                      style={{paddingTop:"40px"}}
                      autoComplete="off">
                    {/* description:QQ钱包商户的`API`秘钥 */}
                    <Form.Item
                        label="API 秘钥"
                        name="apiPrivateKey"
                        rules={[
                            {
                                required:true,
                                message:"请输入QQ钱包秘钥"
                            }
                        ]}>
                        <Input placeholder="请输入QQ钱包秘钥" />
                    </Form.Item>
                    {/* description:支付回调地址 */}
                    <Form.Item
                        label="支付回调地址"
                        name="callBackUrl"
                        placeholder="请输入支付回调地址"
                        rules={[
                            {
                                required:true,
                                message:"请输入支付回调地址"
                            },
                            ({getFieldValue}) => ({
                                validator(_,value){
                                    let url = getFieldValue("callBackUrl"),
                                        regexResult = url.search(urlRegex);
                                    if(-1 !== regexResult) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("请输入有效的 URL 地址"));
                                }
                            })
                        ]}>
                        <Input placeholder="请输入支付回调地址" />
                    </Form.Item>
                    {/* description:商户号 */}
                    <Form.Item
                        label="商户号"
                        name="mchId"
                        extra="QQ钱包分配的商户号"
                        rules={[
                            {
                                required:true,
                                message:"请输入商户号"
                            }
                        ]}>
                        <Input placeholder="请输入商户号"  />
                    </Form.Item>
                    {/* description:商户订单号 */}
                    <Form.Item
                        label="商户订单号"
                        name="outTradeNo"
                        extra="API 接口字段为`out_trade_no`，并且为商户系统内部订单号"
                        rules={[
                            {
                                required:true,
                                message:"请输入商户订单号"
                            }
                        ]}>
                        <Input placeholder="请输入商户订单号"  />
                    </Form.Item>
                    {/* description:货币类型 */}
                    <Form.Item
                        label="货币类型"
                        name="feeType"
                        extra="默认为人民币：CNY"
                        rules={[
                            {
                                required:true,
                                message:"请输入货币类型"
                            }
                        ]}>
                        <Input placeholder="请输入货币类型"  />
                    </Form.Item>
                    {/* description:付款银行 */}
                    <Form.Item
                        label="付款银行"
                        name="bankType"
                        extra="银行类型，采取字符串类型的银行卡标识"
                        rules={[
                            {
                                required:true,
                                message:"请输入付款银行"
                            }
                        ]}>
                        <Input placeholder="请输入付款银行"  />
                    </Form.Item>
                    {/* description:QQ钱包订单号 */}
                    <Form.Item
                        label="QQ钱包订单号"
                        name="transactionId"
                        extra="API 接口字段为`trade_no`"
                        rules={[
                            {
                                required:true,
                                message:"请输入QQ钱包订单号"
                            }
                        ]}>
                        <Input placeholder="请输入QQ钱包订单号"  />
                    </Form.Item>
                    {/* description:本次交易的订单金额，币种为人民币 */}
                    <Form.Item
                        label="订单金额"
                        name="totalFee"
                        extra="本次交易的订单金额，币种为人民币，单位为元"
                        rules={[
                            {
                                required:true,
                                message:"请输入订单金额"
                            },
                            ({getFieldValue}) => ({
                                validator(_,value){
                                    if(!value || getFieldValue("totalFee") > 0.00){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("订单的金额不能小于0.01元！"))
                                }
                            })
                        ]}>
                        <Input prefix="￥" suffix="RMB"  type="number" placeholder="请输入订单金额"  />
                    </Form.Item>
                    {/* description:用户支付金额，币种为人民币 */}
                    <Form.Item
                        label="用户支付金额"
                        name="cashFee"
                        extra="用户支付金额，币种为人民币，单位为元"
                        rules={[
                            {
                                required:true,
                                message:"请输入用户支付金额"
                            },
                            ({getFieldValue}) => ({
                                validator(_,value){
                                    if(!value || getFieldValue("cashFee") > 0.00){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("用户支付金额不能小于0.01元！"))
                                }
                            })
                        ]}>
                        <Input prefix="￥" suffix="RMB"  type="number" placeholder="请输入用户支付金额"  />
                    </Form.Item>
                    {/* description:支付完成时间 */}
                    <Form.Item
                        label="支付完成时间"
                        name="timeEnd"
                        extra="订单支付时间，格式为yyyyMMddHHmmss，如果为2022年9月25日9点10分10秒为20220925091010"
                        rules={[
                            {
                                required:true,
                                message:"支付完成时间"
                            }
                        ]}>
                        <Input placeholder="请输入支付完成时间" />
                    </Form.Item>
                    {/* description:支付状态 */}
                    <Form.Item
                        label="支付状态"
                        name="tradeState"
                        extra="本次交易的支付状态">
                        <Input disabled={true}/>
                    </Form.Item>
                    {/* description:商家数据包，原样返回 */}
                    <Form.Item
                        label="商家数据包"
                        name="attach"
                        extra="商家数据包，字段为`attach`">
                        <Input placeholder="请输入商家数据包" />
                    </Form.Item>
                    {/* description:支付场景 */}
                    <Form.Item
                        label="支付场景"
                        name="tradeType"
                    >
                        <Radio.Group defaultValue="MICROPAY">
                            <Radio.Button value="MICROPAY">MICROPAY</Radio.Button>
                            <Radio.Button value="APP">APP</Radio.Button>
                            <Radio.Button value="JSAPI">JSAPI</Radio.Button>
                            <Radio.Button value="NATIVE">NATIVE</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {/* description:功能按钮区 */}
                    <Form.Item wrapperCol={{offset: 4, span: 14,}}>
                        <Button type="primary"
                                onClick={this.handleOnSend}
                                htmlType="submit">
                            发送请求
                        </Button>
                        <Button htmlType="button" onClick={this.handleOnReset}>
                            重置内容
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

export default QPay;