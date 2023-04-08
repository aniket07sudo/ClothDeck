import axios from "axios";

const api = axios.create({
    withCredentials:true,
    headers:{
        
    },
    baseURL:'www.clothdeck.com',

})