import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import styled, { keyframes } from "styled-components"
import { useUser } from "../../store/user/UserProvider";
import LoaderComponent from "./input";

function OverlayLoader() {

    const state = useUser();

    console.log("Overlay Loader",state);
    

    return (
        <AnimatePresence>
        {state.loading && 
        <Overlay initial={{opacity:0}} animate={{opacity:1,transition:{duration:.32}}} exit={{opacity:1,transition:{duration:.3}}}>
            <motion.p>ClothDeck.</motion.p>
        </Overlay>}
        </AnimatePresence>
    )
}

export default memo(OverlayLoader);

const Animate = keyframes`
    0% {
        transform:scale(0.9);
        opacity:0.5;

    }

    50% {
        transform:scale(1.1);
        opacity:1;

    }

    100% {
        transform:scale(0.9);
        opacity:0.5;

    }
`;


const Overlay = styled(motion.div)`
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    top:0;
    background-color:rgba(0,0,0,1);
    z-index:30;
    display:flex;
    align-items:center;
    justify-content:center;

    p {
        font-size:4rem;
        font-weight:700;
        animation:${Animate} 1.3s linear infinite;
        color:#fff;
    }
`;


