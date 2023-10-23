import axios from "axios"


export async function login(username, password) {
    try {
        const user = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            username,
            password
        })
        localStorage.setItem("id",user.data.id)
        localStorage.setItem("username",user.data.username)
        window.location.replace('/home')
    } catch (error) {
        console.error(error)
    }
}
export async function signup(username, password) {
    try {
        const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
            username,
            password
        })
    } catch(error){
        console.error(error)
    }
}
export async function logout(){
    localStorage.clear()
    window.location.replace('/')
}
