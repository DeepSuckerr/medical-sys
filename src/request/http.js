import axios from 'axios';
import Vue from 'vue';

const instance = axios.create({
    baseURL: 'http://localhost:8081',
})


export default instance;