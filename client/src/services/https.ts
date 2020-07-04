import axios from 'axios';


export default axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer' + ' ' + localStorage.getItem('jwt')
    }

})