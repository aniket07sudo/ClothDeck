import axios from "axios";
import { useUserDispatch } from "./UserProvider"


export const getUserDataByEmail =  (email:string,dispatch) => {
    console.log("client email",email);
    dispatch({type:'LOADING_START'})

     axios.post("/api/v1/user/getUserData",{
        email
    }).then(res => {
        console.log(res.data);
        dispatch({type:'LOADED_USER_DATA',data:res.data.data})
    }).finally(() => {
        dispatch({type:'LOADING_END'})
    })
} 