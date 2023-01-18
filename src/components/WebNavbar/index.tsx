import styles from "./styles.module.scss";
import styled, { useTheme  } from "styled-components";
import Link from "next/link";
import Search from "../../assets/icons/Search";
import Cart from "../../assets/icons/Cart"
import Wishlist from "../../assets/icons/Wishlist"
import { AnimatePresence, motion, useAnimationControls  } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cancel from "../../assets/icons/Cross";
import {devicemaxWidth} from "../../constants/breakpoints";
import Switch from "../../components/Switch"
import Image from "next/image";
import DarkButton from "../Buttons/Darked";
import MenuLink from "./Menus/MenuLink";
import { MenuItems } from "./Menus/menuItems";
import RespBottomSheet from "../ResponsiveBottomSheet";
import CartComponent from "../CartComponent";
import { useUserDispatch } from "../../store/user/UserProvider";
import { useDarkMode } from "../../hooks/useDarkMode";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
// import ProfilePopup from './ProfilePopup'
// import SearchComponent from "./search";

export const NavbarHeight = 98;

const ProfilePopup = dynamic(() => import('./ProfilePopup'))

const SearchComponent = dynamic(() => import('./search'))



const Webnavbar = ({themeToggler}) => {

    const [searchOpen,setSearchOpen] = useState(false);

    const [myProfileShow,setMyProfileShow] = useState(false);

    const { data , status } = useSession();

    const theme = useTheme();
    const dispatch = useUserDispatch();

    console.log("Rendering Web Navbar",data,status);
    
    const Menu = MenuItems.map((item,i) => (
        <MenuLink id={item.id} key={item.id} href={item.href} label={item.label}>
        <SubMenu variants={SubMenuVariants} initial="hidden" animate="show" exit="exit" >
            <motion.div variants={AnimationContainer} initial="hidden" animate="show" className={styles.columnContainer}>
                {item.child.map(child => (
                    <Column key={child.id}>
                    <p>{child.heading}</p>
                    {child.childLinks.map((childLinks,i) => (
                        <Link key={i} href={childLinks.href}>{childLinks.label}</Link>
                    )) }
                </Column>
                ))}
            </motion.div>
        </SubMenu>
    </MenuLink>
    ))


    return (
        <>
      <Wrapper>
        <motion.div className="logoContainer" layoutId="logo">
            <Link href={'/'}>ClothDeck.</Link>
        </motion.div>
        <div className="links">
            {Menu}
        </div>
        <motion.div className={styles.icons}>   
            <SearchContainer layoutId="search-container" onClick={() => setSearchOpen(true)}>
                <input placeholder="Search" readOnly />
                <motion.div layoutId="search-icon">
                    <Search color={theme.text} />
                </motion.div>
            </SearchContainer>
            <div className={styles.Righticons}>
                <div className={styles.cartPopContainer} onClick={() => dispatch({type:'CART_OPEN'})} >
                    <Cart color={theme.text} />
                </div>
                <Link href={'/'}>
                    <Wishlist color={theme.text} />
                </Link>
                <div className="image_profile">
                    {status === 'authenticated' ? 
                        <div onClick={() => setMyProfileShow(true)} className="myProfile">
                            <Image src={data?.user?.image} alt="User Image" width={30} height={30} />
                        </div>
                    : <Link href={'/login'}>Sign In</Link>}
                </div>
                <Switch theme={theme} themeToggler={themeToggler}  />
            </div>
        </motion.div>
        <ProfilePopup setMyProfileShow={setMyProfileShow} myProfileShow={myProfileShow} />
        <SearchComponent searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </Wrapper>
      </>
    )
}

// function CustomComparator(prevProps,nextProps) {
//     return prevProps.theme === nextProps.theme && prevProps.themeToggler === nextProps.themeToggler
// }

export default Webnavbar;



const SubMenuVariants = {
    hidden:{
        transform:'scaleY(0)'
    },
    show:{
        transform:'scaleY(1)',
        transition:{
            duration:.3
        }
    },
    exit:{
        transform:'scaleY(0)',
        transition:{
            duration:.3
        }

    }
}

const SearchContainer = styled(motion.div)`
    border:1px solid ${({theme}) => theme.input.border};
    padding:0.7rem 1.5rem;
    display:flex;
    align-items:center;
    @media ${devicemaxWidth.tablet} {
        padding: 0.2rem 0.5rem;
        max-width:150px;
        font-size;1.2rem;
    }
    @media (max-width:600px) {
        padding:0.1rem;
        max-width:140px;
    }
    & input {
        border:none;
        background-color:transparent;
        height:100%;
        width:100%;
        color: ${({theme}) => theme.text};
        font-family:'Urbanist',sans-serif;
        
    }
    & input::placeholder {
        @media ${devicemaxWidth.tablet} {
            font-size: 1.2rem;
        }
    }
    & input:focus {
        outline:none;
    }
`;

const SearchContainerOpen = styled(motion.div)`
    border:1px solid ${({theme}) => theme.input.border};
    padding:0.7rem 1.5rem;
    display:flex;
    align-items:center;
    
    min-width:50%;
    max-width:60%;
    & input {
        border:none;
        background-color:transparent;
        height:100%;
        width:100%;
        color: ${({theme}) => theme.text};
        font-family:'Urbanist',sans-serif;

    }
    & input:placeholder {
        @media ${devicemaxWidth.tablet} {
            font-size: 0.7rem;
        }
    }
    & input:focus {
        outline:none;
    }
`;


const Column = styled(motion.div)`
    display: flex;
    flex-direction: column;
    & p {
        font-size: 1.8rem;
        margin: 0 0 .5rem 0;
        color: ${({theme}) => theme.text};
        font-weight:600;
    }
    & a {
        font-size: 1.4rem;
        margin: 0.3rem 0;
        transition:all .3s ease-out;
        color: ${({theme}) => theme.neutral};
        font-weight:500;
        &:hover {
            color: ${({theme}) => theme.text};
        }
    }
`;

const SubMenu = styled(motion.div)`
    position: absolute;
    top: 8rem;
    width: 100%;
    max-height: 800px;
    left: 0;
    right: 0;
    padding: 4rem;
    background-color: ${({theme}) => theme.body};
    transform-origin: top center;



    & > div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.body};
    height:${NavbarHeight}px;
    padding: 0 4rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position: fixed;
    z-index:5;
    width:100%;
    // box-shadow: 0px -15px 72px 0px;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);

    .myProfile {
        position:relative;
        cursor:pointer;
    }



    .image_profile {
        padding:0 1rem;
        height:100%;
        overflow:hidden;
        img {
            border-radius:5px;
        }
    }

    & .links {
        & > button {
            padding: 2rem;
            background: transparent;
            border:none;
            color:${({theme}) => theme.text};
            font-size;1.4rem;
            cursor:pointer;
            border-bottom:1.5px solid ${({theme}) => theme.body};
            transition:all .3s ease;
            font-weight:600;
            &:hover {
                border-bottom:1.5px solid ${({theme}) => theme.text};
            }
            @media only screen and (max-width:900px) {
                padding: 1rem;
            }
        }
    }
    @media ${devicemaxWidth.tablet} {
        padding: 1rem 2rem;
    }
    

    & div.logoContainer a {
        color:${({theme}) => theme.text};
        font-size:3rem;
        font-weight:700;
        @media ${devicemaxWidth.tablet} {
            font-size:2rem;
        }
        @media (max-width:600px) {
            font-size:1.4rem
        }
    }


`;

const AnimationContainer = {
    hidden: { opacity: 0 , y:-50 },
    show: {
        opacity: 1,
        y:0,
        transition: {
            duration:.5,
            when:"beforeChildren",
            ease:"easeOut",
        },
    },
}
  