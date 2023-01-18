import { AnimatePresence , motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavbarHeight } from ".";


export default function Popup({myProfileShow,setMyProfileShow}) {

    const WrapperRef = useRef(null);

    const HandleClickOutside =(e) => {
        if(WrapperRef.current && !WrapperRef.current.contains(e.target)) {
            setMyProfileShow(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown',HandleClickOutside);

        return () => {
            document.removeEventListener('mousedown',HandleClickOutside)
        }
    },[])

    return (
        <>
            <AnimatePresence>
                {myProfileShow && 
                <Backdrop initial={{backgroundColor:'rgba(0,0,0,0)'}} animate={{backgroundColor:'rgba(0,0,0,0.6)',transition:{duration:.3}}} exit={{backgroundColor:'rgba(0,0,0,0)',transition:{duration:.3}}}>
                    <motion.div ref={WrapperRef} style={{transformOrigin:'top right'}} initial={{transform:'scale(0)',opacity:0}} animate={{transform:'scale(1)',opacity:1}} exit={{transform:'scale(0)',opacity:0}} className="popupBar">
                        <Link href={'/myProfile'}>Edit Account</Link>
                        <Link href={'/myProfile'}>Orders</Link>
                        <Link href={'/myProfile'}>Favorites</Link>
                        <Link href={'/myProfile'}>Setting</Link>
                        <Link href={'/'} onClick={() => signOut()}>Logout</Link>
                    </motion.div>
                </Backdrop>}
            </AnimatePresence>
        </>
    )
}

const Backdrop = styled(motion.div)`
    position:fixed;
    right:0;
    left:0;
    bottom:0;
    top:0;
    background-color:rgba(0,0,0,0.7);
    z-index:10;

    .popupBar {
        position:absolute;
        background-color:${({theme}) => theme.body};
        width:34rem;
        top:${NavbarHeight + 2}px;
        right:10rem;
        display:flex;
        flex-direction:column;
        border:1px solid #e7e7e7;
        & > * {
            padding:1.5rem 3rem;
            font-size:1.8rem;
            font-weight:700;
            transition:all .2s ease;
            &:hover {
                background-color:${({theme}) => theme.text};
                color:${({theme}) => theme.body};
            }
        }
    }
`;