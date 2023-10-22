const axios = require('axios');

async function login(username, password){
    const response = axios.post('/login',{
        username,
        password
    })
    return response
}
async function signup(username, password){
    const response = axios.post('/signup',{
        username,
        password
    })
    return response
}