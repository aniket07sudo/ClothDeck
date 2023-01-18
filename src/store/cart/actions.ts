import axios from "axios";


export const getCartData =  async (userId:string) => {
    await axios.get(`/api/v1/cart/getCart/${userId}`);
} 

export const updateCartItems =  async (userId:string,body) => {
    return await axios.patch(`/api/v1/cart/updateCartItem//${userId}`,body);
}

export const getCartItems =  async (userId:string) => {
    return await axios.get(`/api/v1/cart/getCart//${userId}`);
} 