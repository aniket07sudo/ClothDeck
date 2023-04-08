import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { isIOS, isMobile, isMobileOnly, isDesktop } from "react-device-detect";
import styled, { css, useTheme } from "styled-components"
import CancelIcon from "../../assets/icons/Cross"
import { isSSR } from "../../hooks/isSSR";
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import DarkButton from "../Buttons/Darked";
import Dropdown from "../Dropdown";
import CartItem from "./CartItem";
import { getCartData, getCartItems, updateCartItems } from "../../store/cart/actions";
import ConfirmPopup from "../Confirmation"


const ItemHeight = 210;

 function CartComponent() {

    const [confirmation,setConfirmation] = useState(false);

    const theme = useTheme();

    const dispatch = useUserDispatch();

    const User = useUser();
    
    const router = useRouter();

    const handleShop = () => {
        router.push('/')
        dispatch({type:'CART_CLOSE'})
    }

    const UpdateItem = useCallback(async (val,size,varId) => {
        console.log("ee",val);
        console.log("Size",size,varId);

        console.log("Creating Update Item Function");

        let obj = {
            variantId:varId,
            quantity:val.quantity,
            size:size.size
        }

        console.log("Item Upate Object",obj);

        return updateCartItems(User.user_id,obj).then(res => {
            // setSubTotal(res.data.total)
            console.log("res",res.data);
            dispatch({type:'UPDATE_CART_ITEM',item:obj})
            
            dispatch({type:'UPDATE_SUBTOTAL',subTotal:res.data.total})
            
        })
        
    },[dispatch])

    const GetCartItems = () => {
        getCartItems(User.user_id).then(res => {
            dispatch({type:'LOAD_CART',data:res.data})
        }).catch(err => {
            console.log("Err",err);
            
        })
    }

    const ConfirmDelete = () => {
        dispatch({type:'CONFIRM_CART_DELETE'})
    }

    useEffect(() => {
        GetCartItems();
    },[])

    const ItemsRender = () => {
        if(User.cart_items.length > 0) {
            return (
                <ItemsCart>
                <div className="cart_head">
                    <h4>My Bag ({User.cart_items.length} Items)</h4>
                    <div onClick={() => dispatch({type:'CART_CLOSE'})}>
                        <CancelIcon width={26} height={26} color={theme.text} />
                    </div>
                </div>
                <Items csr={!isSSR()}>
                    {User.cart_items.map(item => (
                        <CartItem onClick={ConfirmDelete} UpdateItem={(val,size,varId) => UpdateItem(val,size,varId)} key={item._id} itemData={item} />
                    ))} 
                    <div className="gutter"></div>
                    </Items>
                    <Details>
                        <div className="row">
                            <p>Subtotal</p>
                            <p>Rs {User.cartTotal}</p>
                        </div>
                        <div className="row">
                            <p>Estimated Delivery & Handling</p>
                            <p>Rs {User.estimatedDelivery}</p>
                        </div>
                        <div className="row">
                            <p><strong>Total</strong></p>
                            <p>Rs {User.cartTotal + User.estimatedDelivery}</p>
                        </div>
                    </Details>
                    <div className="cta">
                        <DarkButton label="Checkout" />
                    </div>
                </ItemsCart>
            )
        }

        return (
            <EmptyCart>
                <div className="cancel_btn">
                    <div onClick={() => dispatch({type:'CART_CLOSE'})}>
                        <CancelIcon width={26} height={26} color={theme.text} />
                    </div>
                </div>
                <div className="empty_cart_item">
                    <div className="cart_illus">
                        <Image src={'/Images/Illustrations/cart.svg'} width={300} height={300} alt="Illustration" />
                    </div>
                    <div className="empty_content">
                        <h4>Your Cart is Empty</h4>
                        <p>Looks like you haven't added anything to your cart yet</p>
                        <DarkButton onClick={handleShop} label="SHOP NOW" />
                    </div>
                </div>
            </EmptyCart>

        )
    }

    return (
        <>
            <Container>
                {ItemsRender()}
            </Container>
        </>
    )
}

export default CartComponent;

const Padding_Container = 30;

const Cart_Head = 50;

const Misc = 225;

const ItemsCart = styled.div`
    height:100vh;
`;

const EmptyCart = styled.div`
    padding:4rem;
    display:flex;
    flex-direction:column;
    height:100vh;
    .cancel_btn {
        text-align:right;
    }

    .cart_illus {
        text-align:center;
    }

    .empty_cart_item {
        flex:1;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

    .empty_content {
        text-align:center;
        display:flex;
        flex-direction:column;
        h4 {
            font-size:3rem;
            margin-bottom:1rem;
        }

        p {
            font-size:2rem;
            color:#97989A;
            font-weight:500;
            margin-bottom:3rem;

        }

    }
`;


const Item = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
`;

const Items = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
    overflow-y:scroll;
    padding:0 ${Padding_Container}px;
    min-height:60vh;
    height:55vh;
    max-height:68vh;
    flex:1;

    .gutter {
        min-height:10rem;
        width:100%;
    }
    // height:${props => props.csr && isMobileOnly && css`
    //     ${window.screen.availHeight - (Padding_Container * 2) - Cart_Head - Misc - 180}px;
    // `}
  
    // height:${props => props.csr && isDesktop && css`
    //     unset;
    // `}
   
`;


const Details = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
    padding:2rem ${Padding_Container}px;

    .row {
        display:flex;
        justify-content:space-between;
        font-size:1.6rem;

        p:nth-child(2) {
            font-weight:700;
        }
    }
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    gap:3rem;
    height:100vh;
    position:relative;
    .cta {
        padding:2rem ${Padding_Container}px;
    }
    & .cart_head {
        display:flex;
        align-items:center;
        padding:${Padding_Container}px ${Padding_Container}px 0 ${Padding_Container}px;

        & > div {
            padding:1rem 0 1rem 1rem;
            cursor:pointer;
        }
        h4 {
            font-size:1.8rem;
        }
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
`;

