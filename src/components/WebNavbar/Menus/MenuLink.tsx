import { AnimatePresence , motion } from "framer-motion"
import Link from "next/link"
import { Router, useRouter } from "next/router";
import { useState } from "react"
import styled from "styled-components";
import styles from "./styles.module.scss"


export default function MenuLink({label,children,href,id}) {

    const [menuOpen,setMenuOpen] = useState(false);

    const router = useRouter();

    return (
        <button key={id} onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}  onClick={() => router.push(href)}>
            <span>{label}</span>
            <AnimatePresence key={id}>
                {menuOpen && children}
            </AnimatePresence>
        </button>
    )
}

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