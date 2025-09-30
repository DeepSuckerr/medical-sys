import axios from 'axios';
import Vue from 'vue';

const instance = axios.create({
    baseURL: 'http://localhost:8081',
})


axios.interceptors.request.use(function (config) {

//配置请求拦截器
    //成功拦截时处理具体的请求
    return config;
},function (error) {

    return Promise.reject(error);
})


//配置响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
    console.log(response.data)
}, function (error) {
    return Promise.reject(error);
})

export default instance;

