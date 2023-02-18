import axios from 'axios';
import { API_URL } from '../constants';
import { storeCookie, removeCookie } from '../utils';

const login = ( username, password ) => {
    const payload = {
        username,
        password
    };

    return axios.post(`${API_URL}/login`, payload)
        .then((res) => {
            if (res.status === 200) {
                storeCookie("user", res.data.user);
                storeCookie("token", res.data.token);
                storeCookie("role", res.data.role);
                return res.data;
            } else {
                return Promise.reject(res.data.error);
            }
        })
        .catch((err) => {
            console.log(err.response?.data.error || err);
            return Promise.reject(err.response?.data.error || "Internal server error");
        })
};

const register = ( username, password, accountType ) => {
    const payload = {
        username,
        password,
        accountType
    };

    return axios.post(`${API_URL}/register`, payload)
        .then((res) => {
            if (res.status === 201) {
                storeCookie("user", res.data.user);
                storeCookie("token", res.data.token);
                storeCookie("role", res.data.role);
                return res.data;
            } else {
                
                return Promise.reject(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err.response?.data.error || err);
            return Promise.reject(err.response?.data.error || "Internal server error");
        })
};

const logout = () => {
    removeCookie("user");
    removeCookie("token");
    removeCookie("role");
}

const authService = { login, register, logout };
export default authService;