import Link from "next/link";
import styled, { useTheme } from "styled-components";
import Menu from "../../assets/icons/Hamburger";
import Search from "../../assets/icons/Search";
import Cancel from "../../assets/icons/Cross";
import RightArrow from "../../assets/icons/RightIcon";
import Image from "next/image";
import Styles from "./styles.module.scss";
import NightIcon from "../../assets/icons/Night"
import { useCallback, useState , useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { devicemaxWidth } from "../../constants/breakpoints";
import Switch from "../../components/Switch"
import memo from "lodash/memoize"
import Debounce from "lodash/debounce"
import CartIcon from "../../assets/icons/Cart"
import RespBottomSheet from "../ResponsiveBottomSheet";
import CartComponent from "../CartComponent";
import {signOut, useSession} from 'next-auth/react'
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import useScrollDirection from "../../hooks/useScrollDirection";
import dynamic from "next/dynamic";

export const NavbarHeight = 78;

const SearchComponent = dynamic(() => import('./search'))



export default function UseMemoMobNavbar({themeToggler}) {

    const [open,setOpen] = useState(false);
    const [searchOpen,setSearchOpen] = useState(false);
    const [cartOpen,setCartOpen] = useState(false);
    const theme = useTheme();
    const WrapperRef = useRef(null);

    const user = useUser();

    const dispatch = useUserDispatch();

    const scrollDirection = useScrollDirection();
    
    useEffect(() => {
       
        function handleClickOutside(event) {
          if (WrapperRef.current && !WrapperRef.current.contains(event.target)) {
            setOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [WrapperRef]);
      

    useEffect(() => {
        if(open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    },[open])

    const ClickHandler = () => {
        setOpen(!open)
    }

    const SideSearchHandler = () => {
        setOpen(false);
        setSearchOpen(true);
    }

    const FormatDate = (date) => {

        console.log("Inserted Date",date);
        
        let Dateformat = new Date(date);

        console.log("Date Format",Dateformat.toLocaleString('default',{ month:'short' , year:'numeric' }));
        

        return `${Dateformat.toLocaleString('default',{ month:'short' , year:'numeric' })}`

    }

    const Sessions = useSession();

    

    return(
        <>
        <Wrapper scrollDirection={scrollDirection}>
            <button onClick={ClickHandler}>
                <Menu color={theme.text} />
            </button>
            <Link href={'/'}>ClothDeck.</Link>
            <div className="icon_control_container">
            <div onClick={() => dispatch({type:'CART_OPEN'})}>
                    <CartIcon width={26} height={26} color={theme.text} />
                </div>
                <motion.i style={{maxWidth:40,maxHeight:40}} initial={{opacity:1}} layoutId="mob_search_icon" onClick={() => setSearchOpen(true)}>
                    <Search color={theme.text} height={30} width={30} />
                </motion.i>
            </div>
            <AnimatePresence key={4}>
                {open && 
                <SidebarBackDrop initial={{backgroundColor:'rgba(0,0,0,0)'}} animate={{backgroundColor:'rgba(0,0,0,0.5)'}} transition={{duration:.5}} exit={{opacity:0}}>
                    <SideBar initial={{x:"-100%"}} animate={{x:"0%",transition:{duration:.2,ease:"easeIn"}}} exit={{x:"-100%",transition:{duration:.2,ease:"easeOut"}}} ref={WrapperRef}>
                        <div className="side_head">
                            <p>Menu</p>
                            <button onClick={ClickHandler}>
                                <Cancel color={theme.text} height={30} width={30} />
                            </button>
                        </div>
                            <Link href={Sessions.status === "authenticated" ? '/myProfile' : '/login'} className={Styles.user_info}>
                                <div>
                                    <div className={Styles.imageContainer}>
                                        <Image src={Sessions.data?.user?.image  ?? '/Images/guest.png'} width={80} height={80} alt="User Photo" />
                                    </div>
                                    <div className={Styles.profile_content}>
                                        <p>Hi, {Sessions.status === "authenticated" ? Sessions.data?.user?.name : 'Guest'}</p>
                                        <p> {Sessions.status === "authenticated" ? `Member Since ${FormatDate(user.memberSince)}` : 'Sign in'}</p>
                                        
                                    </div>
                                </div>
                                <RightArrow color={theme.text} />
                            </Link>
                            <div className="sidebar_search_container">
                                <SidebarSearch onClick={SideSearchHandler} >
                                    <input placeholder="Search"  />
                                    <motion.i transition={{delay:.2,duration:1}} >
                                        <Search color={theme.text} height={30} width={30} />
                                    </motion.i>
                                </SidebarSearch>
                            </div>
                            <div className={Styles.sideLinks}>
                                <Link href={'/'}>My Bag</Link>
                                <Link href={'/'}>Favorites</Link>
                                <Link href={'/'}>Men</Link>
                                <Link href={'/'}>Woman</Link>
                                <Link href={'/'}>Kids</Link>
                                <Link href={'/'}>Brands</Link>
                            </div>
                            <div className="bottom_div">
                                {Sessions.status === "authenticated" && <button className="logout" onClick={() => signOut()}>Log out</button>}
                                <Switch themeToggler={themeToggler} />
                            </div>
                    </SideBar>
                </SidebarBackDrop>}
            </AnimatePresence>
            <SearchComponent searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        </Wrapper>
        <div style={{height:NavbarHeight}}></div>
        </>
    )
}

const SidebarSearch = styled(motion.div)`
border:1px solid ${({theme}) => theme.input.border};
padding:0.7rem 1.5rem;
display:flex;
align-items:center;
width:100%;
position:relative;
margin:1rem 0;

& input {
    border:none;
    background-color:transparent;
    height:100%;
    width:100%;
    color: ${({theme}) => theme.text};
    font-size:1.4rem;
    font-family:'Urbanist',sans-serif;

}
& + div a {
    -webkit-tap-highlight-color: ${({theme}) => theme.body};

}
& input:placeholder {
    @media ${devicemaxWidth.tablet} {
        font-size: 0.7rem;
    }
}
& input:focus {
    outline:none;
}
& button {
    position:absolute;
    right:0
}
`;

const SidebarBackDrop = styled(motion.div)`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    transition:background-color .5s ease;
    background: rgba(0, 0, 0, 0.5);
    z-index:5;
`;

const Wrapper = styled(motion.div)`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 0.5rem 0 1rem;
    transition:height .3s ease;
    height:${props => props.scrollDirection == 'down' ? 0 : NavbarHeight}px;
    position:fixed;
    background-color:${({theme}) => theme.body};
    width:100%;
    z-index:5;
    box-shadow: 0 4px 12px 0 rgb(255 255 255 / 5%);
    overflow:${props => props.scrollDirection == 'down' ? 'hidden' : 'visible'};

    .icon_control_container {
        height:100%;
        display:flex;
        align-items:center;
        & > * {
            padding:0 0.5rem;
            height:100%;
            display:flex;
        align-items:center;
        }
    }
    
    & button {
        background:transparent;
        border:none;
    }

    & > a {
        font-size:3rem;
        font-weight:800;
    }
 
`;

const MobSearch = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.7rem 2rem;
    display: flex;
    justify-content: space-between;
    background-color:${({theme}) => theme.body};


    & button {
        background: transparent;
        padding: .7rem;
    }
`;

const Searchopen = styled(motion.div)`
    border:1px solid ${({theme}) => theme.input.border};
    padding:0.7rem 1.5rem;
    display:flex;
    align-items:center;
    width:85%;
    min-width:150px;
    position:relative;
    & input {
        border:none;
        background-color:transparent;
        height:100%;
        width:100%;
        color: ${({theme}) => theme.text};
        font-size:1.4rem;
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
    & button {
        position:absolute;
        right:0
    }
`;

const SideBar = styled(motion.div)`
    background-color:${({theme}) => theme.body};
    height:100%;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    max-width:400px;
    width:90%;
    border-right:1px solid ${({theme}) => theme.text};
    

    & .sidebar_search_container {
        padding:0 2rem;
    }

    & .bottom_div {  
        border-top:1px solid ${({theme}) => theme.input.border};
        padding:2rem;

        .logout {
            color:${({theme}) => theme.text};
            background:transparent;
            font-size:2rem;
            padding:1rem 0 2rem 0;
            font-weight:600;
            width:100%;
            text-align:left;
        }
    }   
    & .side_head {
        padding:2rem;
        display:flex;
        align-items:center;
        justify-content:space-between;
        & p {
            font-size:1.8rem;
            color:${({theme}) => theme.text};
            margin:0;
            font-weight:700;
        }
        & button {
            background:transparent;
            margin:0;
        
        }
    }
`;