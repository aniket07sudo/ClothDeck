import { useSession } from "next-auth/react";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import {ProductCard} from "../ProductCard"
import React from "react";
import Styles from "./Styles.module.scss"
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";


const Productlist = ({ProductData}) => {

  console.log("Rendering Product List");

  const { status , data } = useSession();
  const User = useUser();

  const router = useRouter();

  const dispatch = useUserDispatch();

   const Productbag = useCallback((size,id) => {
    console.log("ID",id,size);
    console.log("User",User,status);

    if(!User.user_id) {
      return;
    }


    if(status === 'unauthenticated') {
        toast.warn('Login to Start Adding Items');
        router.push('/login');
    }
    
    if(status === 'authenticated') {
      const ReqBody = {
        variantId:id,
        quantity:1,
        size:size.size
    }
    console.log("Product Bag",ReqBody,User.user_id);

    axios.post(`/api/v1/cart/addCartItem/${User.user_id}`,ReqBody,{
        headers: {
          'Content-Type': 'application/json'
        },
    }).then(res => {
      
        if(res.data.status === 'success') {
          console.log("Addded Item",res.data);
          
          dispatch({type:'ADDED_CART_DATA',item:res.data.data})
          toast.success("Item Added !")
        }
          if(res.data.status === 'Error') {
            toast.error("Something Went Wrong")
          }
        
    }).catch(err => {
      console.log(err);
        // if(res.status === 'Error') {
          toast.error("Something Went Wrong")
        // }
    })

    }
    
  },[status,dispatch,User])

  const ProductItems = ProductData.map((item) => (
    <ProductCard key={item._id} addBag={Productbag}  item={item} />
  ))

    return(
        <div className={Styles.ProductListWrapper}>
            <h3>Popular For You</h3>
            <div className={Styles.Productcontainer}>
                {ProductItems}
            </div>
          </div>
    )
}



export default Productlist;
