import axios from 'axios';

const jwt = localStorage.getItem('jwt');

export default axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer' + ' ' + jwt
    }

})