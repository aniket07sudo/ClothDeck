import { AnimatePresence, createMotionComponent, motion } from "framer-motion"
import styled, { useTheme  } from "styled-components"
import Image from "next/image"
import Star from "../../assets/icons/Star"
import React from "react"
import HeartIcon from "../../assets/icons/Heart"
import { DataProp } from "../../../pages"
import { device, devicemaxWidth } from "../../constants/breakpoints"
import { useCallback, useMemo, useState } from "react"
import { isMobile } from 'react-device-detect'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useUserDispatch } from "../../store/user/UserProvider"


export const ProductCard = React.memo(({item,addBag}:DataProp) => {

    const Router = useRouter();

    const [activeVariant,setActiveVariant] = useState(0);

    console.log("Product Card Rendered");

    const [gotoCart,setGoToCart] = useState(false);

    const dispatch = useUserDispatch();

    

    const HandleClickCard = (sto) => {
        console.log(sto);
    }
    

    const HandleActiveVaraint = (index) => {
        setActiveVariant(index)
    }

    const BrandIcon = dynamic(() => import(`../../../src/assets/icons/${item.brand.iconUrl}`),{
        ssr:false,
        loading:() => <p>{item.brand.title}</p>
    });

    const HandleAddBag = (size,VariantId) => {
        addBag(size,VariantId);
        setGoToCart(true);
    }

    const HoverItemsRender = () => {
        if(gotoCart) {
            return (
                <button className="go_to_cart" onClick={() => dispatch({type:'CART_OPEN'})}>Go To Bag</button>
            )
        }

        return (
            item.variants[activeVariant].stock.map(sto => (
                <button key={sto._id} onClick={() => HandleAddBag(sto,item.variants[activeVariant].id)}>{sto.size}</button>
            ))
        )
        
    }

    

    return(
        
        <ProductContainer >
            <div className="product_wrapper" onClick={() => Router.push(`/product/${item._id}`)} >
                <ProductImage layoutId={`main-image-${item._id}`} >
                    <div className="image_header">
                        <div className="brand_icon">
                            <BrandIcon color="white" />
                        </div>
                        <div className="add_fav">
                            <HeartIcon color={'#fff'} />
                        </div>
                    </div>
                    <motion.div animate={{opacity:1}} transition={{duration:.2}} className="main_image_container"  >
                        <Image fill sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw" src={item.variants[activeVariant].images[0]} alt="Image" />
                    </motion.div>
                    <div onClick={(e) => {e.stopPropagation();}} className="add_to_cart">
                        {/* <PlusIcon color={'#fff'} />
                        <p>ADD TO BAG</p> */}
                        {HoverItemsRender()}
                    </div>
                </ProductImage>
                <ProductContentContainer>
                    <ProductVariant>
                        {item.variants.map((variant,i) => (
                            <div key={variant._id} onClick={(e) => e.stopPropagation()} onMouseOver={() => HandleActiveVaraint(i)} style={{backgroundColor:variant.attr.color}}></div>
                        ))}
                    </ProductVariant>
                    <ProductTitle >
                        <motion.h3 layoutId={`main_text-${item._id}`} >{item.title}</motion.h3>
                    </ProductTitle>
                    <div className="catContainer">
                        <p>{item.category.map(item => item.name)}</p>
                        <p><Star color="#FFE83B" /> <span>{item.ratings_average}</span>({item.ratings_quantity})</p>
                    </div>
                    <motion.div layoutId={`main_price_${item._id}`} className="price_container">
                        {item.variants[activeVariant].discounted_price ? <p>
                            <del>Rs {item.variants[activeVariant].price}</del><span>Rs {item.variants[activeVariant].discounted_price}</span>
                        </p> : <p>Rs {item.variants[activeVariant].price}</p>}
                        
                        {item.variants[activeVariant].discountPercentage > 0 && <p>{item.variants[activeVariant].discountPercentage}% Off</p>}
                    </motion.div>
                </ProductContentContainer>
            </div>
        </ProductContainer>

    )
})

const ProductVariant = styled.div`
    display:flex;
    gap:1rem;
    pointer-events: all;
    & > div {
        width:2.2rem;
        height:1.6rem;
        border:1px solid ${({theme}) => theme.text};
    }
`;

const ProductContainer = styled(motion.div)`
    width:100%;
    max-width:37rem;
    margin:0 auto;
    -webkit-tap-highlight-color: transparent;

    

    & .add_to_cart {
        border:none;
        display:flex;
        gap:1.6rem;
        align-items:center;
        position:absolute;
        bottom:0;
        padding:1rem 2rem;
        left:50%;
        transform:translateX(-50%) scaleY(0);
        background-color:${({theme}) => theme.footer};
        transform-origin:bottom;
        transition:all .25s ease;
        z-index:100;

        .go_to_cart {
            background:transparent;
            border:none;
            font-size:1.4rem;
        }

        button {
            background:transparent;
            border:1px solid white;
            color:white;
            cursor:pointer;
            padding:.6rem;
        }

        &:focus , &:visited , &:focus-within {
            outline:none;
            border:none;
        }
        & p {
            font-size:1.6rem;
            font-weight:700;
            color:white;
            white-space:nowrap;
        }
    }
    @media only screen and ${device.laptop} {
        &:hover .add_to_cart {
            transform:translateX(-50%) scaleY(1);
            pointer-events: all;
            cursor:pointer;
        }
    }
    & .product_wrapper {
        display:grid;

        grid-template-rows: minmax(30rem,35rem) minmax(10rem,15rem);
        pointer-events:auto;
        cursor:pointer;
        @media only screen and ${devicemaxWidth.mobileL} {
            grid-template-rows: minmax(20rem,25rem) minmax(10rem,13rem);
        }
        @media only screen and ${devicemaxWidth.mobileM} {
            grid-template-rows: minmax(20rem,25rem) minmax(10rem,15rem);
        }

    }
    
`;

const ProductImage = styled(motion.div)`
    position:relative;
    overflow:hidden;
    text-align:center;
    
    & .main_image_container {
        height:100%;
    }
    & img {
        object-fit:cover;
        object-position:top;
        width:100%;
        height:100%;
        max-height:41rem;
    }
    & .image_header {
        & .brand_icon {
            height:3.8rem;
            width:3.8rem;
            @media only screen and ${devicemaxWidth.mobileL} {
                height:2.2rem;
                width:2.2rem;
            }
            svg {
                width:100%;
                height:100%;
                
            }
        }
        & .icon {
            object-fit:contain;
            width:3rem;
            height:3rem;
        }
        background:linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,0));
        position:absolute;
        top:0;
        left:0;
        right:0;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:1rem 3rem;
        z-index:2;
        @media only screen and ${devicemaxWidth.tablet} {
            padding:2rem;
        }
        @media only screen and ${devicemaxWidth.mobileL} {
            padding:0 1rem;
            & > svg {
                max-width:3rem;
            }
        }
    }
    & .add_fav {
        display:flex;
        align-items:center;
        justify-content:center;
        @media only screen and ${devicemaxWidth.mobileL} {
            width:3rem;
            height:3rem;
            & svg {
                max-width:1.8rem;
            }
        }
    }
`;

const ProductContentContainer = styled.div`
    display:grid;
    grid-template-rows: 1.4rem minmax(5rem,7rem) 2rem 3.6rem;
    grid-row-gap:1rem;
    padding:1rem 0 0 0;
    @media only screen and ${devicemaxWidth.tablet} {
        grid-template-rows:2rem minmax(3rem,6rem) 2rem 3.6rem;
    }
    @media only screen and ${devicemaxWidth.mobileL} {
        grid-template-rows:2rem minmax(3rem,4rem) 2rem 2rem;
        grid-row-gap:0.6rem;
    }
    @media only screen and ${devicemaxWidth.mobileM} {
        grid-template-rows:2rem 5rem 2rem 2rem;
    }
  
    & .catContainer {
        display:flex;
        justify-content:space-between;
        p:nth-child(1) {
            font-size:1.8rem;
            color:#737373;
            margin:0;
            font-weight:400;
            @media only screen and ${devicemaxWidth.mobileL} {
                font-size:1.4rem;
            }
        }
        p:nth-child(2) {
            display:flex;
            align-items:center;
            font-size:1.6rem;
            gap:0.2rem;
            color:${({theme}) => theme.text};
            margin:0;
            font-weight:600;
        }
    }
    & .price_container {
        display:flex;
        align-items:center;
        justify-content:space-between;
        white-space:no-wrap;
        p {
            margin:0;
            font-weight:600;
            font-size:1.8rem
        }
        & del {
            color:${({theme}) => theme.neutral};
            font-weight:400!important;
            margin-right:1rem;
            font-size:1.8rem;
            @media only screen and ${devicemaxWidth.mobileL} {
                font-size:1.2rem;
            }
        }
        p:nth-child(2) {
            color:${({theme}) => theme.error};
            font-size:2rem;
            @media only screen and ${devicemaxWidth.mobileL} {
                font-size:1.4rem;
            }
        }
    }

`;

const ProductTitle = styled(motion.div)`
    text-align:left;
    & h3 {
        font-size:2rem;
        margin:0;
        display: -webkit-box;
        height: auto;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
            font-weight:600;
            line-height:2.6rem;
            @media only screen and ${devicemaxWidth.tablet} {
                line-height:2.6rem;
                height: 5rem;
            }
            @media only screen and ${devicemaxWidth.mobileL} {
                font-size:1.8rem;
                line-height:2rem;
                height: 100%;
            }
        }
`;
