import { AnimatePresence,motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { isMobileOnly, isTablet } from "react-device-detect";
import { useUser, useUserDispatch } from "../../store/user/UserProvider";


export default function RespBottomSheet({children}) {

    console.log("Rendering Responsive Bottom Sheet");
    

    const BackdropRef = useRef();

    const user = useUser();

    const dispatch = useUserDispatch();

    function handleClickOutside(event) {
        if(BackdropRef.current && !BackdropRef.current.contains(event.target) && !user.prompt) {
            if(event.button == 0) {
                dispatch({type:'CART_CLOSE'})
            }
        }
    }

    useEffect(() => {

        document.addEventListener('mousedown',handleClickOutside);

        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[BackdropRef.current,user.prompt])

    useEffect(() => {
        if(user.cart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    },[user.cart])

    let Component = null;

    if(isMobileOnly) {
        Component = (
            <Wrapper mobile={true} ref={BackdropRef} onClick={e => e.stopPropagation()} initial={{y:"100%"}} animate={{y:0,transition:{duration:.2,ease:'easeOut'}}} exit={{y:"100%",transition:{duration:.2,ease:'easeIn'}}}>
                {children}
            </Wrapper>
        )
    } else {
        Component = (
            <Wrapper mobile={false} ref={BackdropRef} initial={{x:"100%"}} animate={{x:0,transition:{duration:.2,ease:'easeInOut'}}} exit={{x:"100%",transition:{duration:.2,ease:'easeInOut'}}}  >
            {children}
        </Wrapper>
        )
    }

    return (
        <AnimatePresence>
                {user.cart && 
            <Backdrop initial={{backgroundColor:'rgba(0,0,0,0)'}} animate={{backgroundColor:'rgba(0,0,0,0.6)',transition:{duration:.3}}} exit={{backgroundColor:'rgba(0,0,0,0)',transition:{duration:.3}}}>
                {Component}
            </Backdrop>}
        </AnimatePresence>
    )
}

const Backdrop = styled(motion.div)`
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    background-color:rgba(0,0,0,0.7);
    z-index:10;
`;

const Wrapper = styled(motion.div)`
    position:fixed;
    right:0;
    width:40%;
    background-color:${({theme}) => theme.body};
    bottom:0;
    top:0;
    max-width:46rem;
    ${props => props.mobile && css`
        width:100%;
        height:100%;
    `}
`;