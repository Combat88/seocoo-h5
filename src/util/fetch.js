/* eslint-disable no-self-assign */
import axios from "axios";
import Url from "./url";
import { Toast } from "vant";


// 添加请求拦截器
const instance = axios.create({
    baseURL: Url,
    timeout: 1000 * 20,
    responsType: 'bolb',

});

// http request 拦截器
instance.interceptors.request.use(
    config => {
        // console.log('请求接口', config);
        config.data = config.data;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
instance.interceptors.response.use(
    response => {
        // 响应的状态
        if (response.data.status != 200) {
            return Promise.reject(response.data);
        } else {
            return response;
        }
    },
    error => {
        if (error) {

        }
        return Promise.reject(error); // 返回接口返回的错误信息
    }
);
// 请求处理
export default function (options) {
    return instance(options)
        .then(({
            data
        }) => {
            return data.data;
        })
        .catch(error => {
            Toast(error.msg)
            return Promise.reject(error);
            // return error;
        });
}