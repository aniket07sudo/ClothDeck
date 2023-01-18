import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react"
import styled from "styled-components";


export default function BottomSheet({children,show,toggler}) {

    const WrapperRef = useRef();
    useEffect(() => {
        
        function HandleOutside(e) {
            if(WrapperRef.current && !WrapperRef.current.contains(e.target)) {
                toggler(false);
            }
        }
        document.addEventListener("mousedown", HandleOutside);
        return () => {
          document.removeEventListener("mousedown", HandleOutside);
        };
    },[WrapperRef.current])

    useEffect(() => {
        if(show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    },[show])


    return(
        <AnimatePresence>
            {show && 
            <Backdrop initial={{opacity:0}} animate={{opacity:1,transition:{duration:.3}}} exit={{opacity:0,transition:{duration:.3}}}>
                <Wrapper initial={{y:"100%"}} animate={{y:0,transition:{duration:.2,ease:'easeInOut'}}} exit={{y:"100%",transition:{duration:.2,ease:'easeInOut'}}} ref={WrapperRef}>
                    {children}
                </Wrapper>
            </Backdrop>}
        </AnimatePresence>
    )
}

const Backdrop = styled(motion.div)`
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color:rgba(0,0,0,0.3);
`;

const Wrapper = styled(motion.div)`
    position:absolute;
    bottom:0;
    width:100%;
    max-height:100%;
    height:50%;
    background-color:${({theme}) => theme.body};
    color:${({theme}) => theme.text};
    border-top:1px solid ${({theme}) => theme.input.borderActive};
`;