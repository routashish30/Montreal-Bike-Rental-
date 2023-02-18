import axios from 'axios';
import { API_URL } from '../constants';
import { retrieveCookie } from '../utils';

const getAllBikes = () => {
    const token = retrieveCookie("token");

    return axios.get(`${API_URL}/bikes`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 200) {
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

const updateBike = (bikeID, status = null, location = null) => {
    const token = retrieveCookie("token");

    const payload = {
        bikeID,
        status,
        location
    };

    return axios.patch(`${API_URL}/bikes`, payload, {
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 200) {
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

const addBike = (status = null, location = null) => {
    const token = retrieveCookie("token");

    const payload = {
        status,
        location
    };

    return axios.post(`${API_URL}/bikes`, payload, {
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 201) {
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

const getUserBike = () => {
    const token = retrieveCookie("token");

    return axios.get(`${API_URL}/bike`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 200) {
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

const setUserBike = (status, location, code = null) => {
    const token = retrieveCookie("token");
    const payload = {
        status,
        location,
        code
    };

    return axios.patch(`${API_URL}/bike`, payload, { 
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 200) {
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

const removeUserBike = (location, code = null) => {
    const token = retrieveCookie("token");
    const payload = {
        location,
        code
    };

    return axios.delete(`${API_URL}/bike`, { 
        data: payload,
        headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then((res) => {
        if (res.status === 200) {
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


const bikesService = { getAllBikes, updateBike, addBike, getUserBike, setUserBike, removeUserBike };
export default bikesService;