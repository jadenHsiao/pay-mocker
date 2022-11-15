/**
 * @Description: 字符串工具函数
 * @author Jaden hsiao
 * @link https://www.jytype.cn
 * @date 2022/10/4
 */

/**
 * 驼峰变量名转下划线
 * @param str
 * @returns {*}
 */
export function toLowerLine(str){
    let temp = str.replace(/[A-Z]/g, function (match) {
        return "_" + match.toLowerCase();
    });
    if(temp.slice(0,1) === '_'){
        temp = temp.slice(1);
    }
    return temp;
}

/**
 * 获取预签名内容（适用于微信支付`v2`版本和`QQ`钱包）
 * @param fields
 * @param state
 * @returns {{params, content: string, key: *}}
 */
export function signContent(fields,state){
    let keys = [],
        params = {},
        content = "";
    fields.forEach((item,index) => {
        let key = toLowerLine(item);
        keys.push(key);
        params[key] = state[item];
    });
    keys.sort();
    keys.forEach((item,index) => {
        if(index > 0){
            content += "&";
        }
        content += item + "=" + params[item];
    });
    return {
        value:content,
        keys,
        params
    };
}

/**
 * 生成随机字符串
 * @param e
 * @returns {string|string}
 */
export function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
