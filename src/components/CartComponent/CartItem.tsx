import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import Dropdown from "../Dropdown";
import DeleteIcon from "../../assets/icons/Delete.svg"

export default function CartItem({itemData,UpdateItem,onClick}) {

    const [selectedSize,setSelectedSize] = useState(itemData.stocks.find(cartItem => cartItem.size == itemData.size));

    const dispatch = useUserDispatch();
    const User = useUser();

    const [activeSizeIndex,setActiveSizeIndex] = useState(itemData.stocks.findIndex(cartItem => cartItem.size == itemData.size));

    const FindPrice = useMemo(() => {
        const findSize = itemData.stocks.find(cartItem => cartItem.size == selectedSize.size);
        return findSize.price;
    },[selectedSize])

    const CalculateDiscount = useMemo(() => {
        const Percentage = Math.round((Math.abs(selectedSize.price - itemData.price) / itemData.price) * 100);
        return Percentage
    },[selectedSize])   

    const QuantityArray = useMemo(() => {
        const Arr = new Array(itemData.stocks[activeSizeIndex].count ?? 5).fill().map((e,i) => {
            return { id:i,quantity:i+1,value:i+1 }
        })

        return Arr;
        
    },[activeSizeIndex,selectedSize])

    console.log("ItemData",itemData);

    const [selectedQuantity,setSelectedQuantity] = useState(User.cart_items.find(item => item.variantId == itemData.variantId) ?? QuantityArray[0]);

    const HandleSizeChange = useCallback((selectedSize,variantId) => {

        UpdateItem(selectedQuantity,selectedSize,variantId).then(res => {
            console.log("Completed Selecting Quantity,size");
            
            setSelectedSize(selectedSize);
            // dispatch({type:'UPDATE_CART_ITEM',variantId,size:selectedSize.size,selectedQuantity})
            toast.success('Items Updated')
            
        }).catch(err => {
            console.log("Error Selecting",err);
            toast.error('Error Selecting Size')
        })
    },[selectedQuantity,dispatch])

    const HandleQuantityChange = useCallback((quantity,variantId) => {

        UpdateItem(quantity,selectedSize,variantId).then(res => {
            console.log("Completed Selecting Quantity,size");
            setSelectedQuantity(quantity);
            // dispatch({type:'UPDATE_CART_ITEM',variantId,size:selectedSize.size,selectedQuantity})
            toast.success('Items Updated')
            
        }).catch(err => {
            console.log("Error Selecting",err);
            toast.error('Error Selecting Size')
        })
    },[selectedSize,dispatch])

    const SizeDropDown = useMemo(() => {
        return (
                <Dropdown label="Size" identifier="size" Options={itemData.stocks} value={selectedSize} onChange={(val) => HandleSizeChange(val,itemData.variantId)} />
        )
    },[selectedSize,HandleSizeChange])

    const QuantityDropdown = useMemo(() => {
        return (
            <Dropdown label="Quantity" identifier="quantity" Options={QuantityArray} value={selectedQuantity} onChange={(val) => HandleQuantityChange(val,itemData.variantId)} />
        )
    },[selectedQuantity,HandleSizeChange])

    return (
        <ItemWrapper>
            <ItemContainer>
                <div className="image_container">
                    <Image src={itemData.image} alt="Image" width={120} height={120} />
                </div>
                <div className="content_box">
                    <h4>{itemData.name}</h4>
                    <p>Football Shirt</p>
                    <div className="content_container">
                        <div className="price_container">
                            <p><del>Rs{itemData.price}</del></p>
                            <p>Rs {FindPrice}</p>
                        </div>
                        {CalculateDiscount > 0 && <div className="discount_container">
                            <p>{CalculateDiscount}% Off</p>
                        </div>}
                    </div>
                </div>
                <div className="deleteBtn" onClick={onClick}>
                    <DeleteIcon />
                </div>
            </ItemContainer>
            <Option>
                {SizeDropDown}
                {QuantityDropdown}
            </Option>

        </ItemWrapper>
    )
}

const ItemWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:2rem;
`;

const ItemContainer = styled.div`
    // display:flex;
    // gap:2rem;
    // align-items:center;
    display:grid;
    grid-template-columns:1fr 3fr 0.5fr;
    grid-column-gap:1rem;

    .image_container {
    
        img {
            object-fit:cover;
            object-position:top;
        }
    }
    .content_box {  
        display:flex;
        flex-direction:column;
        gap:1rem;

        & h4 {
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
        }
        
        .content_container {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:0.8rem;

            .price_container {
                display:flex;
                align-items:center;
                gap:0.8rem;

                p:nth-child(1){
                    font-size:1.4rem;
                }
    
                p:nth-child(2){
                    font-size:1.8rem;
                    font-weight:600;
                    color:${({theme}) => theme.text};
                }
            }

            .discount_container {
                p {
                    color:${({theme}) => theme.danger};
                    font-size:1.8rem;
                    font-weight:600;
                }
            }

           
        }
        
        h4 {
            font-size:1.6rem;
            font-weight:700;
            line-height:2.4rem;
        }
        & p:nth-child(2) {
            color:#737373;
            font-size:1.4rem;
        }
        & p:nth-child(3) {
            font-weight:600;

            font-size:1.8rem;
        }
    }

    .deleteBtn {
        align-self:flex-start;
        border:1px solid ${({theme}) => theme.input.border};
        padding:1rem;
        cursor:pointer;
        transition:background-color .3s ease;

        & svg {
            width:2rem;
            height:2rem;
            object-fit:contain;
            stroke:black;
        }

        &:hover {
            background-color:${({theme}) => theme.danger};
            & svg {
                stroke:white;
            }
        }
    }
`;

const Option = styled.div`
    display:flex;
    gap:2rem;
   
`;
