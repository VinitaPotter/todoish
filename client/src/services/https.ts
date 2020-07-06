import axios from 'axios';

const jwt = document.cookie.split('=')[1]


export default axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer' + ' ' + jwt
    }

})