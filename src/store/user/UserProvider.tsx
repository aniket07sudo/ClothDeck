import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import UserReducer from "./user_reducer";

const InitialState = {
    userEmail:null,
    user_id:null,
    cart_items:[],
    loading:false,
    cart:false,
    estimatedDelivery:100,
    cartTotal:0,
    memberSince:null
}

// export const UserContext = React.createContext({
//     userEmail:null,
//     user_id:null,
//     cart_items:[]
// });

export const UserContext = React.createContext<any>(InitialState);

export const UserDispatchContext = createContext({});

export function useUser() {
    return useContext(UserContext);
}

export function useUserDispatch() {
    return useContext(UserDispatchContext)
}

export default function UserContextProvider(props) {

    const [state,dispatch] = useReducer<any>(UserReducer,InitialState);

    const value = useMemo(() => state,[state,dispatch])


    return (
        <UserContext.Provider value={value}>
            <UserDispatchContext.Provider value={dispatch}>
                {props.children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}


