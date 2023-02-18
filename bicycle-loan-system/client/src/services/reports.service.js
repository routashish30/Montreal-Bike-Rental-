import axios from 'axios';
import { API_URL } from '../constants';
import { retrieveCookie } from '../utils';

const getAllReports = () => {
    const token = retrieveCookie("token");

    return axios.get(`${API_URL}/reports`, { 
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

const submitReport = (bikeID, status, report) => {
    const token = retrieveCookie("token");

    const payload = {
        bikeID,
        status,
        report
    };

    return axios.post(`${API_URL}/reports`, payload, {
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

const reportsService = { getAllReports, submitReport };
export default reportsService;