import axios from 'axios';
import { API_URL } from '../constants';
import { retrieveCookie } from '../utils';

const getLocations = () => {
    const token = retrieveCookie("token");

    return axios.get(`${API_URL}/locations`, { 
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

const addLocation = (address, totalSpots, availBikes, openSpots) => {
    const payload = {
        address,
        totalSpots,
        availBikes,
        openSpots
    };

    const token = retrieveCookie("token");

    return axios.post(`${API_URL}/locations`, payload, {
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

const locationsService = { getLocations, addLocation };
export default locationsService;