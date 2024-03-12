import axios from "axios";
import {jwtDecode}  from 'jwt-decode';


axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = () => {
    const token = window.localStorage.getItem("auth_token");
    return token ? `Bearer ${token}` : null;
};




export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token)
}


export const request = async (method, url, data, id) => {
    let headers = {};

    const authToken = getAuthToken();
    if (authToken) {
        headers = { "Authorization": `Bearer ${authToken}` };
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
        params: { id: id },  
        credentials: 'include'
    });
};

export const getUserIdFromAuthToken = () => {
    const authToken = getAuthToken();
    
    if (!authToken) {
        console.error('No auth token found.');
        return null;
    }

    try {
        const decodedToken = jwtDecode(authToken);
        const userId = decodedToken.id;
        console.log('Decoded User ID:', userId);
        return userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }

};

export const deleteAuthToken = () => {
    window.localStorage.removeItem("auth_token");
};



