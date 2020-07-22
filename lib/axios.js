import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://default.ordering.ch/api/',
});

export default instance;