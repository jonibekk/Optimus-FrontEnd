import axios from "axios";

const SetAuth = (token) => {
    if (token !== undefined && token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.defaults.withCredentials = true;
        localStorage.setItem('jwt_token', token);
        return true;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
        return false;
    }
}

export default SetAuth;