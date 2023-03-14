# pay-mocker - 支付回调调试工具
## 介绍
pay-mocker 是一款基于 React 开发的支付回调调试工具，便于后端开发人员在开发环境下对支付回调业务内容调试。
## 使用
### 准备
#### 环境

 - nodejs
 - npm
 - Git
#### 技术栈
- React
- AntDesign
- ES2015+
### 安装
1. 克隆源码
```shell
git clone https://github.com/jadenHsiao/pay-mocker.git
```
2. 安装依赖和编译运行
```shell
# 安装依赖
npm i 
# 编译运行
npm start
```
3. 打包静态资源文件
```shell
npm run build
```
## 说明
本工具目前支持微信支付V2、QQ钱包支付、字节跳动小程序担保支付；所以在使用前，请先阅读对应的开发文档。
- [微信支付V2](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7&index=8)
- [QQ钱包](https://mp.qpay.tenpay.cn/buss/wiki/38/1204)
- [字节跳动担保支付](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/ecpay/pay-list/callback/)

## 下一步
** 如果有其他支付类型需要支持的，请提 issue，或者联系我 **
