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
 * 获取预签名内容
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
        params[key] = "application/xml; charset=utf-8";
    });
    keys.sort();
    console.log(keys);
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