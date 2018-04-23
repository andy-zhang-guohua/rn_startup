import * as RequestParameterSignUtils from './RequestParameterSignUtils'
import {log} from './LogUtils'

/**
 * 基于Fetch API 的POST FORM 访问远程API
 * @param {*} url 目标API url
 * @param {*} parameters 参数JSON对象，或者参数Map对象
 * @returns fetch() api 调用返回的 Promise 对象，响应结果是一个 Response 对象
 * https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export function postForm(url, parameters) {
    const parametersMap = RequestParameterSignUtils.signParameters(parameters);
    //log(parametersMap);
    let formData = new FormData();
    parametersMap.forEach(
        function (value, key, map) {
            formData.append(key, value)
        }
    );
    return fetch(url, {
        method: 'post',
        headers: {
            // 20180307 暂时不能使用 application/x-www-form-urlencoded, 参考 : 
            // https://stackoverflow.com/questions/39351026/multipart-application-json-fetch-post-error-on-android-react-native
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
}

/**
 * 基于Fetch API 的POST FORM 访问远程API
 * @param {*} url 目标API url
 * @param {*} parameters 参数JSON对象，或者参数Map对象
 * @returns fetch() api 调用返回的 Promise 对象，成功时响应体数据是一个 json 对象
 */
export function postFormForJSON(url, parameters) {
    return postForm(url, parameters).then((response) => {
        if (response.ok) return response.json();
        log("post form for json error : \n" + "url = " + url + " [" + response.status + "]");
        throw new Error('访问服务器错误 : ' + response.status);
    });
}

/**
 * 基于Fetch API 的POST FORM 访问远程API
 * @param {*} url 目标API url
 * @param {*} parameters 参数JSON对象，或者参数Map对象
 * @returns fetch() api 调用返回的 Promise 对象，成功时响应体数据是一个 string
 */
export function postFormForText(url, parameters) {
    return postForm(url, parameters).then((response) => {
        if (response.ok) return response.text();
        log("post form for json error : \n" + "url = " + url + " [" + response.status + "]");
        throw new Error('访问服务器错误 : ' + response.status);
    });
}

/**
 * 基于 Fetch API 的 GET 方法访问远程 API
 * @param {*} url 目标 API url
 * @returns fetch() api 调用返回的 Promise 对象，成功时响应体数据是一个 json 对象
 */
export function getForJson(url){
    return fetch(url).then((response =>{
        if (response.ok) return response.json();
        log("get for json error : \n" + "url = " + url + " [" + response.status + "]");
        throw new Error('访问服务器错误 : ' + response.status);
    }))
}