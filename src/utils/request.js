/**
 * @Description: 网络请求工具函数
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/10/4
 */
import axios from "axios";

/**
 * 错误码和提示信息
 * @type {{"1": string, "200": string, "500": string, "503": string}}
 */
const errorContent = {
    1:"未知错误",
    200:"模拟回调成功",
    500:"模拟失败，检查是否开启跨域",
    503:"服务端无响应"
};

/**
 * 返回结构体
 * @type {{code: number, message: *}}
 */
var response = {
    code:200,
    message:errorContent["200"]
};

/**
 * 错误处理
 * @param error
 * @returns {{code: number, message: *}}
 */
function errorHandler(error){
    if("ERR_NETWORK" == error.code){
        response.code = 1;
        response.message = errorContent["1"];
        return response;
    }
    if(error.response){
        let statusCode = error.response.status;
        response.code = statusCode;
        response.message = errorContent[statusCode];
    }
    else if(error.request){
        response.code = 503;
        response.message = errorContent["503"]
    }
    else{
        response.code = 1;
        response.message = errorContent["1"]
    }
    return response
}

/**
 * `Post` 请求
 * @param url
 * @param params
 * @param headers
 * @returns {Promise<any>}
 */
export function post (url,params = {},headers = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,params,headers).then(content => {
                response.code = 200;
                response.message = errorContent["200"];
                resolve(response)
            }).catch(error => {
                let errorResult = errorHandler(error);
                reject(errorResult);
            })
    })
}