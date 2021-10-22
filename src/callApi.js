import axios from 'axios';

let urlApi = "https://todo.api.devcode.gethired.id";

let callApi = async (endpoint, method='GET', data={}) => {
    // let token = localStorage.getItem('token');
    let request = await axios({
        url: urlApi + endpoint,
        method,
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // },
        data
    })
    return request.data
}

export {urlApi, callApi}