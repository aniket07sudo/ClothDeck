import Image from "next/image";
import { AnimatePresence, motion} from 'framer-motion'
import Styles from "./Styles.module.scss"
import {  memo, useCallback,  useMemo, useRef, useState } from "react";
import Layout from "../../src/components/ProviderLayout"
import styled, { useTheme } from "styled-components";
// import { Data } from "../../src/constants/FakeData";
import ReactImageMagnify from 'react-image-magnify'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Slider from "react-slick";
import CollectionTray from "../../src/components/CollectionTray"
import "slick-carousel/slick/slick.css"; 
// import StarIcon from "../../src/assets/icons/Star"
import ArrowNext from "../../src/assets/icons/Arrow_Next"
import ArrowPrev from "../../src/assets/icons/Arrow_Prev"
import Star from "../../src/assets/icons/Star"
import { devicemaxWidth } from "../../src/constants/breakpoints";
import Accordion from "../../src/components/Accordion";
import BulletPoints from "../../src/utils/BulletPoints";
import Link from "next/link";
import DarkButton from "../../src/components/Buttons/Darked";
import OutlinedButton from "../../src/components/Buttons/Outlined"
import Item from "../../models/ItemModel";
import { manager } from "../../lib/createConnection";
import dynamic from "next/dynamic";
import RadioButton from "../../src/components/Buttons/RadioButtons";
import LoaderComponent from "../../src/components/Loaders/input";
import { useRouter } from "next/router";
import StarIcon from "../../src/assets/icons/stars.svg"
import Stars from "../../src/components/Stars";
import Review from "../../src/components/Review";
import axios from "axios";
import { useUser, useUserDispatch } from "../../src/store/user/UserProvider";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


interface IDProps {
    productData:any
}


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: Styles.slick_dots,
    arrows: true
  } 

 function ProductDetails({productData}:IDProps) {

    const theme = useTheme();
    const sliderRef = useRef();
    let Product = productData[0];
    console.log("productData",productData);

    const User = useUser();

    const dispatch = useUserDispatch();

    
    const [activeVariant,setActiveVariant] = useState(0);
    const [activeSize,setActiveSize] = useState(0);
    const [calculatedDiscount,setCalulatedDiscount] = useState<number>(0);
    const [activeSizeIndex,setActiveSizeIndex] = useState<number>(-1);

    const { status } = useSession();

    const router = useRouter();
    
    
    const setVariantHandler = (index) => {
        console.log("index",index);
        setActiveVariant(index);
        setActiveSizeIndex(-1);
    }
    
    
    const SizeHandler = (e) => {
        console.log("Selected Size",e.target.value);
        
        setActiveSize(e.target.value);
        const activeIndex = Product.variants[activeVariant].stock.findIndex(item => e.target.value === item.size);
        
        if(activeIndex > -1) {
            CalculateDiscount();
        }
        
        if(activeIndex > -1) {
            setActiveSizeIndex(activeIndex);
        }

        console.log("Setted Size",activeSize);
        
    }
    
    const PrevArrow = useMemo(() => (
        <ButtonContainer className="slick_dots" onClick={() => sliderRef.current.slickPrev()}>
            <ArrowPrev color={'#fff'} />
        </ButtonContainer>
    ),[])
      
      const NextArrow = useMemo(() => (
          <ButtonContainer className="slick_dots" onClick={() => sliderRef.current.slickPrev()}>
            <ArrowNext color={'#fff'} />
        </ButtonContainer>
      ),[])
      
      
      const BrandIcon = dynamic(() => import(`../../src/assets/icons/${Product.brand.iconUrl}`));
      
      const CalculateDiscount = useCallback(() => {
          if(Product.variants[activeVariant] && activeSizeIndex > -1) {
              const originalPrice = Product.variants[activeVariant].price;
              const discountedPrice = Product.variants[activeVariant].stock[activeSizeIndex].price;
              const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
              setCalulatedDiscount((Math.round(discountPercentage) / 10) * 10)
            }
        },[activeSizeIndex,activeVariant])
        
        const ProductVariantImage = Product.variants[activeVariant]?.images.map((img,id) => (
            <SlideItem key={id}>
            <ReactImageMagnify
                enlargedImageContainerDimensions={{width:1200,height:1800}}
                enlargedImagePosition={'over'}
                    {...{
                    smallImage: {
                        alt: "Image",
                        isFluidWidth: true,
                        src: img,
                        sizes:"(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
                    },
                    largeImage: {
                        alt: "",
                        // src: "/images/unsplash.jpg",
                        src: img,
                        width: 1200,
                        height: 1800
                    },
                    isHintEnabled: true
                    }}
                />
        </SlideItem>
    ))
    
    const SizeSelector = Product.variants[activeVariant].stock.map((stock,i) => (
        <RadioButton key={stock._id} selected={activeSize === stock.size} SelectHandler={SizeHandler} label={stock.size} value={stock.size}  />
    ))
        
        const VariantSelector = Product.variants.map((variant,i) => (
            <button style={{border:activeVariant == i ? `1.5px solid ${theme.text}` : `1.5px solid ${theme.body}`}} key={variant.id} onClick={() => setVariantHandler(i)}>
            <Image src={variant.images[0]} width={60} height={100} alt="Image" />
        </button>
    ))
    
    const ProductDesc = Product.description.map(desc => (
        <Accordion key={desc._id} title={desc.heading}>
            <pre>{desc.detail}</pre>
        </Accordion>
    ))

    const AddToCart = useCallback((size,id) => {
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
            size:size
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
    
    
    return (
        <motion.div className={Styles.ProductDetailsWrapper}>
                <ProductDetailsContainer>
                    <motion.div layoutId={`main-image-${Product._id}`} className={Styles.ProductSlideContainer}>
                        <Slider ref={sliderRef} prevArrow={PrevArrow} nextArrow={NextArrow} className={Styles.Slider} {...settings}>
                            {ProductVariantImage}
                        </Slider>
                    </motion.div>
                    <div className="ProductInfo">
                        <div className="brand_head">
                            <BrandIcon width={50} height={50} color={theme.text} />
                            <span>{Product.brand.title}</span>
                        </div>
                        <h3>{Product.variants[activeVariant].title}</h3>
                        <div className="catContainer">
                            <p>{Product.category[0].name}</p>
                            <p><Star color="#FFE83B" /><span>{Product.ratings_average}</span>&nbsp;<span className="review">({Product.ratings_quantity} Reviews)</span></p>
                        </div>
                        <div className="price_container">
                            {Product.variants[activeVariant].discounted_price ? 
                                <p>
                                    <del>Rs {Product.variants[activeVariant].price}</del><span>Rs {activeSizeIndex > -1 ? Product.variants[activeVariant].stock[activeSizeIndex].price : Product.variants[activeVariant].discounted_price}</span>
                                </p>
                                :
                                <p>Rs { activeSizeIndex > -1 ? Product.variants[activeVariant].stock[activeSizeIndex].price : Product.variants[activeVariant].price}</p>
                            }
                            {Product.variants[activeVariant].discountPercentage > 0 && <p>{activeSizeIndex > -1 ? calculatedDiscount : Product.variants[activeVariant].discountPercentage}% Off</p>}
                        </div>
                        {Product.variants.length > 1 && <><div className="divider"></div>
                         <div className="color_guide">
                            <div className="size_guide_head">
                                <h4>Select Color</h4>
                            </div>
                            <div className="color_selector">
                                {VariantSelector}
                            </div>
                        </div> </>}
                        <div className="divider"></div>
                        <div className="size_guide">
                            <div className="size_guide_head">
                                <h4>Select Size</h4>
                                <Link href={'/'}>Size Guide</Link>
                            </div>
                            <div className="size_selector">
                                {SizeSelector}
                            </div>
                        </div>
                        <div className="ctas">
                            <DarkButton onClick={() => AddToCart(activeSize,Product.variants[activeVariant]._id)} readOnly label="ADD TO BAG" />
                            <OutlinedButton readOnly label="FAVOURITE" />
                        </div>
                    </div>
                    <div className="Product_Description">
                        {ProductDesc}
                        <Accordion title={`Reviews (${Product.reviews}) `}>
                            <div className="write_review">
                                <div className="ratings_average">
                                    <Stars fill={Product.ratings_average} />
                                    <p>{Product.ratings_average ?? 0} Stars</p>
                                </div>
                                <button>Write Review</button>
                            </div>
                            <Review />
                            <OutlinedButton label="SEE ALL REVIEWS" value="See All Review" />
                        </Accordion> 
                    </div>
                </ProductDetailsContainer>
        </motion.div>
    )
}

ProductDetails.getLayout = function getLayout(page:any) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }


export default ProductDetails;

export async function getStaticPaths()  {

    await manager.connect();

    const ItemData = await Item.find();


    const ParsedData = JSON.parse(JSON.stringify(ItemData));

    
    const paths = ParsedData.map(item => {
        return {
            params: { id:item._id }
        }
    })
    
    console.log("Parsed Path",paths);

    return {
        paths,
        fallback:false,
    }
}

export const getStaticProps: GetStaticProps = async context => {

        
        await manager.connect();
        
        // const ItemData = await Item.findById(context.params?.id).populate('category');

        const ItemData = await Item.findOne({_id:context.params?.id}).populate('reviews variants category').select('-__v');

        console.log("Item Data",ItemData);
        
        const ParsedData = JSON.parse(JSON.stringify(ItemData));
        
        console.log("Parsed",ParsedData);
        
        return {
            props: {
                productData:[ParsedData]
            }
        }
  
  }


const ButtonContainer = styled.div`
    opacity:1;
    transition:all .3s ease;
    position:absolute;
    z-index:2;
    transform: translateY(0%);
    padding:1rem;
    top: 0;
    bottom: 0;
    background-color:rgba(0,0,0,0.4);
    display:flex!important;
    align-items:center;
    justify-content:center;
    &.slick-prev {
        left:0;
    }
    &.slick-next {
        right:0;
    }
    &.slick-disabled {
        opacity:0;
        visibility:hidden;
    }
`;

const SlideItem = styled(motion.div)`
& img {
    width: 100%;
    height:100%;
}
`;

const ProductDetailsContainer = styled(motion.div)`
        display:grid;
        grid-template-columns: minmax(30rem,1.4fr) 1fr;
        grid-column-gap:8rem;
        grid-row-gap:5rem;
        position:relative;
        padding-bottom:2rem;
        .write_review {
            padding:0 0 2rem 0;
            display:flex;
            flex-direction:column;
            gap:1rem;
            align-items:start;
            button {
                background:transparent;
                border:none;
                border-bottom:1px solid ${({theme}) => theme.text};
                font-size:1.6rem;
                padding:0;
                color:${({theme}) => theme.text};
                cursor:pointer;
            }
        }
        .ratings_average {
            display:flex;
            align-items:center;
            gap:2rem;

            p {
                font-size:1.6rem;
                font-weight:600;
            }
        }

      

        & .preview_container {
            z-index:20;
            position:fixed!important;
            top:110px!important;
            right:0!important;
            left:60%!important;
        }
       
        @media only screen and ${devicemaxWidth.laptop} {
            grid-column-gap:3rem;
        }
        @media only screen and ${devicemaxWidth.tablet} {
            grid-template-columns: repeat(auto-fit,minmax(30rem,1fr));
        }
        @media only screen and ${devicemaxWidth.mobileL} {
            grid-row-gap: 3rem;
        }
        & .ProductInfo {
            font-size: 3.2rem;
            .brand_head {
                display:flex;
                align-items:center;
                gap:1rem;
                span {
                    font-size:2.2rem;
                    font-weight:500;
                    line-height:2;
                }
            }
            .color_selector {
                padding:2rem 0 0 0;
                display:flex;
                gap:1rem;
                max-width:2rem;
                button , button:focus , button:focus-within {
                    background:transparent;
                    border:none;
                    cursor:pointer;
                    padding:0;

                }
                img {
                    object-fit:cover;
                    height:100%;
                }
            }
            & .icon {
                svg {
                    fill:red;
                }
            }
            & .ctas {
                margin:3rem 0;
                display:flex;
                flex-direction:column;
                gap:2rem;
            }

            & .size_guide_head {
                display:flex;
                justify-content:space-between;
                & h4 , a {
                    font-size:1.8rem;
                }
                & a {
                    color:${({theme}) => theme.neutral};
                    font-weight:600;
                }
            }

            & .size_selector {
                display:flex;
                flex-wrap:wrap;
                gap:1rem;
                margin:2rem 0;
                & .size_block {
                    & input {
                        display:none;
                    }
                    & input:disabled ~ label {
                        color:${({theme}) => theme.input.border};
                    }
                    & label {
                        font-size:1.8rem;
                        font-weight:600;
                        position:relative;
                        width:8.5rem;
                        height:6rem;
                        border:1px solid ${({theme}) => theme.input.border};
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        transition:all .3s ease;
                    }
               
                    & label::before {
                        content:'';
                    }
                    
                    & input:checked + label {
                        border:1px solid ${({theme}) => theme.input.borderActive};
                    }
                }
            }
            
            & .divider {
                width:100%;
                height:2px;
                background-color:${({theme}) => theme.picBackground};
                display:block;
                margin:3rem 0;
            }
            @media only screen and ${devicemaxWidth.laptop} {
                font-size:2.4rem;
            }
            & .price_container {
                display:flex;
                justify-content:space-between;
                margin:1rem 0;
                p {
                    margin:0;
                    font-size:2.4rem;
                    font-weight:600;
                }
                & del {
                    color:${({theme}) => theme.neutral};
                    font-weight:400!important;
                    margin-right:1rem;
                }
                p:nth-child(2) {
                    color:${({theme}) => theme.error};
                    @media only screen and ${devicemaxWidth.mobileL} {
                        font-size:1.8rem;
                    }
                }
            }
            & .catContainer {
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin:1rem 0;
                & .review {
                    color:${({theme}) => theme.paraText};
                }
                & p:nth-child(1) {
                    color:${({theme}) => theme.paraText};
                    font-size:1.8rem;
                    
                }
                & p:nth-child(2) {
                    display:flex;
                    align-items:center;
                    color:${({theme}) => theme.text};
                    font-size:1.6rem;
                }
            }
        }

        & .Product_Description {
            & > div:not(:first-child)::before {
                content:"";
                display:block;
                width:100%;
                height:1px;
                background-color:${({theme}) => theme.input.border};
            }
            & .Product_Description_container {
                & h3 {
                    font-size:1.8rem;
                    margin-bottom:2rem;
                }
                & p {
                    font-size:1.6rem;
                    line-height:2.3rem;
                }
            }
        }

    & .productImgContainer {
        background-color: ${({theme}) => theme.picBackground};
        max-width: 72rem;

        & img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            max-height: 80rem;
        }
    }

`;

