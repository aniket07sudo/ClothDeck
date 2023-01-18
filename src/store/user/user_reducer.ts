import getUserData from "../../../pages/api/v1/item/getUserData";

export default function reducer(state:any,action:any) {
    switch(action.type) {
        case "LOADING_START":
            return {
                ...state,
                loading:true
            }
        case "LOADING_END":
            return {
                ...state,
                loading:false
            }
        case "CART_OPEN":
            return {
                ...state,
                cart:true
            }
        case "CART_CLOSE":
            return {
                ...state,
                cart:false
            }
        case "LOADED_USER_DATA":
            console.log("loaded user data",action.data.createdAt);
            
            return {
                ...state,
                user_id:action.data?._id,
                userEmail:action.data?.email,
                image:action.data?.imageUrl,
                memberSince:action.data.createdAt
            }
        case "ADDED_CART_DATA":
            console.log("Redux Data",action.item);
            let estimatedDelivery = 0;
            if(state.cart_items.length > 0) {
                estimatedDelivery = 100;
            }
         
            return {
                ...state,
                cart_items:[
                    ...state.cart_items,
                    action.item
                ],
                cartTotal:action.item.subTotal,
                estimatedDelivery:estimatedDelivery
            }
        case "UPDATE_SUBTOTAL":
            return {
                ...state,
                cartTotal:action.subTotal
            }
        case "LOAD_CART":
            console.log("Console",action.data);

            let delivery = 0;
            if(state.cart_items.length > 0) {
                delivery = 100;
            }
            
            return {
                ...state,
                cart_items:action.data.data,
                cartTotal:action.data.subTotal,
                estimatedDelivery:delivery
            }
        case "UPDATE_CART_ITEM":
          
            console.log("Dispatched Obj",action.item);

            const tempItem = state.cart_items.find(item => item.variantId == action.item.variantId)
            
            // var findItem = state.cart_items.findIndex(item => item)
            // var TempState = 
            tempItem.quantity = action.item.quantity;
            tempItem.size = action.item.size;
            console.log("Updated Item",tempItem);
            
            return {
                ...state,
                tempItem
                // cart
            }
        default:
            console.log("Hello");
            

    }
}