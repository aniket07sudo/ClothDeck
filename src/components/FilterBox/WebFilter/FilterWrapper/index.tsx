import { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components"
import ArrowDownIcon from "../../../../assets/icons/Arrow_Down"
import { FilterBoxHeight } from "..";
import { AnimatePresence , motion } from "framer-motion";

export default function MenuToggler({label,children,showLeft}) {

    const theme = useTheme();
    const [open,setOpen] = useState(false);
    const itemRef = useRef(null);

    

    useEffect(() => {

        const handleClickOutside = (event) => {
            if(itemRef.current && !itemRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        window.addEventListener('mousedown',handleClickOutside);

        return () => {
            window.removeEventListener('mousedown',handleClickOutside)
        }
    },[itemRef.current])

    const ClickHandler = (e) => {
        
        setOpen(!open);
    }

    return(
        <FilterItem showLeft={showLeft} ref={itemRef} onClick={ClickHandler}>
            <p>{label}</p>
            <ArrowDownIcon color={theme.text} />
            <AnimatePresence key={3}>
                {open && (
                <motion.div style={{opacity:0, transformOrigin:showLeft ? 'top right' :'top left'}} initial={{opacity:1,transform:'scale(0)',y:-30}} animate={{transform:'scale(1)',y:0,transition:{duration:.2,ease:'easeIn'}}} exit={{transform:'scale(0)',opacity:0,transition:{ duration:.3,ease:'easeOut'}}} onClick={(e) => e.stopPropagation()} className="wrapper">
                    {children}
                </motion.div>)}
            </AnimatePresence>
        </FilterItem>
    )
}

const FilterItem = styled.div`
    display:flex;
    align-items:center;
    gap:0.5rem;
    position:relative;
    height:100%;
    padding:3rem;

    & p {
        font-size:1.8rem;
        font-weight:700;
        user-select:none;
    }

    

    & .wrapper {
        position: absolute;
        top: calc(100% + 1.5rem);
        border:1px solid red;
        border:1px solid ${({theme}) => theme.input.border};
        z-index:2;
        background-color:${({theme}) => theme.body};
        ${props => props.showLeft && ({
            right:0,
        })}

        ${props => !props.showLeft && ({
            left:0
        })}

        & .submit {
            position:relative;
            
        }
    }

    & .item {
        position:absolute;
        top:0;
    }

  
`;