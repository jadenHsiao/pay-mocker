/**
 * @Description: 支付宝模拟支付回调组件
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/10/9
 */
import "./index.css";
import React from "react";

const successMark = "SUCCESS";

class AliPay extends React.Component
{

    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            alertShow:false,
            alertContent:"",
            alertType:successMark.toLowerCase(),
            form:{
                apiPrivateKey:"",
                callBackUrl:"",
                outTradeNo:"",
                transactionId:"",
                totalFee:0.01,
                returnCode:successMark,
                resultCode:successMark,
                signType:"MD5",
                attach:successMark
            }
        }
    }

}

export default AliPay;