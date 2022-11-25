/**
 * @Description: 字节跳动模拟支付回调组件
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/11/13
 */
import "./index.css";
import React from "react";
import CryptoJS from "crypto-js";
import {Alert, Button, DatePicker, Form, Input, Radio} from "antd";
import moment from "moment";
import {successMark, urlRegex} from "../../core/constant";
import {createNonce} from "../../utils/string"
import {post} from "../../utils/request";


/**
 * 字节跳动担保支付模拟组件
 */
class ByteDanceGuaranteedPayment extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            alertContent: "",
            alertType: successMark.toLowerCase(),
            form: {
                callBackUrl: "",
                token: "",
                // `msg`，`json`字符串内容
                appid: "",
                cp_orderno: "",
                cp_extra: "",
                way: "1",
                channel_no: "",
                payment_order_no: "",
                total_amount: "",
                status: successMark,
                seller_uid: "",
                extra: "",
                item_id: "",
                paid_at: "",
                message: "",
                order_id: "",
                nonce: "",
                timestamp: "",
                type: "payment",
            }
        }
    }

    componentDidMount() {
        let that = this,
            form = that.state.form;
        form.nonce = createNonce();
        this.setState({
            form
        })
    };

    /**
     * 重置表单内容
     */
    handleOnReset = () => {
        this.formRef.current.resetFields();
    };

    /**
     * 时间选择器点击确定时修改`state`时间戳数据
     */
    handleConfirmTime = (val, field) => {
        let that = this,
            form = that.state.form;
        form[field] = moment(val).unix().toString();
        this.setState({
            form
        });
    };

    /**
     * 获取签名内容
     */
    handleGetSignContent = (value) => {

        let msgExceptFields = [
                "nonce", "timestamp", "type",
                "callBackUrl", "token"
            ],
            msg = {},
            content = {
                token: value.token,
                nonce: value.nonce,
                timestamp: value.timestamp.toString(),
            };

        for (let key in value) {
            if (-1 !== msgExceptFields.indexOf(key)) {
                continue;
            }
            msg[key] = "total_amount" === key ? value[key] * 100 : value[key];
        }
        content.type = value.type;
        content.msg = JSON.stringify(msg);
        const {timestamp, nonce, token} = content;
        let strArr = [token, timestamp, nonce, content.msg].sort().join("");
        content.msg_signature = CryptoJS.SHA1(strArr).toString();
        delete content.token;
        return content;

    };

    /**
     * 发送网络请求到后端
     */
    handleOnSend = async () => {
        let that = this;
        await this.formRef.current.validateFields()
            .then((values) => {
                let form = that.state.form,
                    url = values.callBackUrl,
                    state = that.state,
                    alertContent = state.alertContent,
                    alertType = state.alertType;
                values.nonce = form.nonce;
                values.timestamp = form.timestamp;
                values.paid_at = form.paid_at;
                let headers =  {
                        headers: {
                            "Accept":"application/json",
                            "Content-Type": "application/json"
                        },
                    };
                let jsonString = JSON.stringify(this.handleGetSignContent(values));
                post(url,jsonString,headers)
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

    render() {

        const {alertShow, alertContent, form, alertType} = this.state;

        return (
            <div className="byte-dance">
                {alertShow ?
                    <Alert
                        message={successMark.toLowerCase() === alertType ? "成功" : "错误"}
                        description={alertContent}
                        type={alertType}
                        showIcon/>
                    : ''}
                <Form name="basic"
                      ref={this.formRef}
                      labelCol={{span: 4}}
                      wrapperCol={{span: 14}}
                      layout="horizontal"
                      initialValues={form}
                      style={{paddingTop: "40px"}}
                      autoComplete="off">
                    {/* description:应用`AppID` */}
                    <Form.Item
                        label="AppID"
                        name="appid"
                        rules={[
                            {
                                required: true,
                                message: "请输入字节跳动应用 App ID"
                            }
                        ]}>
                        <Input placeholder="请输入字节跳动应用 App ID"/>
                    </Form.Item>
                    {/* description:字节跳动担保支付信息令牌（`Token`） */}
                    <Form.Item
                        label="Token"
                        name="token"
                        rules={[
                            {
                                required: true,
                                message: "请输入字节跳动担保支付信息令牌（`Token`）"
                            }
                        ]}>
                        <Input placeholder="请输入字节跳动担保支付信息令牌（`Token`）"/>
                    </Form.Item>
                    {/* description:支付回调地址 */}
                    <Form.Item
                        label="支付回调地址"
                        name="callBackUrl"
                        placeholder="请输入支付回调地址"
                        rules={[
                            {
                                required: true,
                                message: "请输入支付回调地址"
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    let url = getFieldValue("callBackUrl"),
                                        regexResult = url.search(urlRegex);
                                    if (-1 !== regexResult) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("请输入有效的 URL 地址"));
                                }
                            })
                        ]}>
                        <Input placeholder="请输入支付回调地址"/>
                    </Form.Item>
                    {/* description:开发者侧的订单号 */}
                    <Form.Item
                        label="开发者侧的订单号"
                        name="cp_orderno"
                        rules={[
                            {
                                required: true,
                                message: "请输入开发者侧订单号（`cp_orderno`）"
                            }
                        ]}>
                        <Input placeholder="请输入开发者侧订单号（`cp_orderno`）"/>
                    </Form.Item>
                    {/* description:预下单时开发者传入字段 */}
                    <Form.Item
                        label="预下单时开发者传入字段"
                        name="cp_extra"
                    >
                        <Input placeholder="预下单时开发者传入字段（`cp_extra`）"/>
                    </Form.Item>
                    {/* description:支付渠道 */}
                    <Form.Item
                        label="支付渠道"
                        name="way"
                    >
                        <Radio.Group>
                            <Radio.Button value="1">微信支付</Radio.Button>
                            <Radio.Button value="2">支付宝支付</Radio.Button>
                            <Radio.Button value="10">抖音支付</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {/* description:支付渠道侧单号 */}
                    <Form.Item
                        label="支付渠道侧单号"
                        name="channel_no"
                    >
                        <Input placeholder="请输入支付渠道侧单号（`channel_no`）"/>
                    </Form.Item>
                    {/* description:支付渠道侧PC单号，支付页面可见 */}
                    <Form.Item
                        label="支付渠道侧PC单号"
                        extra="支付页面可见"
                        name="payment_order_no"
                    >
                        <Input placeholder="支付渠道侧PC单号，支付页面可见（`payment_order_no`）"/>
                    </Form.Item>
                    {/* description:支付金额 */}
                    <Form.Item
                        label="支付金额"
                        name="total_amount"
                        extra="值范围为0~99999999999"
                        rules={[
                            {
                                required: true,
                                message: "请输入支付金额"
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("total_amount") > 0.00) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("支付金额不能小于0.01元！"))
                                }
                            })
                        ]}>
                        <Input prefix="￥" suffix="RMB" type="number" placeholder="请输入支付金额"/>
                    </Form.Item>
                    {/* description:订单来源视频对应视频 */}
                    <Form.Item
                        label="订单来源视频对应视频 ID"
                        name="item_id"
                    >
                        <Input placeholder="订单来源视频对应视频 ID（`item_id`）"/>
                    </Form.Item>
                    {/* description:该笔交易卖家商户号 */}
                    <Form.Item
                        label="该笔交易卖家商户号"
                        name="seller_uid"
                        rules={[
                            {
                                required: true,
                                message: "请输入该笔交易卖家商户号"
                            }
                        ]}
                    >
                        <Input placeholder="该笔交易卖家商户号（`seller_uid`）"/>
                    </Form.Item>
                    {/* description:抖音侧订单号 */}
                    <Form.Item
                        label="抖音侧订单号"
                        name="order_id"
                    >
                        <Input placeholder="抖音侧订单号（`order_id`）"/>
                    </Form.Item>
                    {/* description:回调请求时间选择 */}
                    <Form.Item label="回调请求时间"
                               rules={[
                                   {
                                       required: true,
                                       message: "回调请求时间必须选择的"
                                   },
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           let timestamp = moment(getFieldValue("timestamp")).unix();
                                           if (undefined !== timestamp) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error("请选择正确的回调请求时间！"))
                                       }
                                   })
                               ]}
                               name="timestamp">
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择回调请求时间"
                            onOk={
                                (val) => {
                                    this.handleConfirmTime(val, "timestamp")
                                }
                            }
                        />
                    </Form.Item>
                    {/* description:支付时间选择 */}
                    <Form.Item label="支付时间"
                               rules={[
                                   {
                                       required: true,
                                       message: "支付时间必须选择的"
                                   },
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           let timestamp = moment(getFieldValue("paid_at")).unix();
                                           if (undefined !== timestamp) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error("请选择正确的回调请求时间！"))
                                       }
                                   })
                               ]}
                               name="paid_at">
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择回调请求时间"
                            onOk={
                                (val) => {
                                    this.handleConfirmTime(val, "paid_at")
                                }
                            }
                        />
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

export default ByteDanceGuaranteedPayment;