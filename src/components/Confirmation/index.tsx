import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components"
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import ModalManager from "./ModalManager"


export default function Confirmation() {

    console.log("Rendering Confirmation Popup");

    const User = useUser();

    const dispatch = useUserDispatch();

    const BackdropRef = useRef();

    function handleClickOutside(event) {
        if(BackdropRef.current && !BackdropRef.current.contains(event.target)) {
            if(event.button == 0) {
                dispatch({type:'PROMPT_CLOSE'})
            }
        }
    }

    const HandleCancel = () => {
        dispatch({type:'PROMPT_CLOSE'})
    } 

    useEffect(() => {
     

        document.addEventListener('mousedown',handleClickOutside);

        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[BackdropRef.current])

    return (
        <AnimatePresence>
            {User.prompt && <Backdrop>
                <Wrapper ref={BackdropRef} initial={{scale:0.5,opacity:0}} transition={{duration:.2}} animate={{scale:1,opacity:1,transition:{ease:'easeInOut'}}} exit={{scale:0.5,opacity:0}}>
                    <ModalManager cancel={HandleCancel} type={User.promptType} />
                </Wrapper>
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
    background-color:rgba(0,0,0,0.5);
    z-index:100;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Wrapper = styled(motion.div)`
    position:fixed;
    background-color:${({theme}) => theme.body};
   
    max-width:40rem;
    min-width:20rem;
    max-height:20rem;
`;