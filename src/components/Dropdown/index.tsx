import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import ArrowDownIcon from "../../assets/icons/Arrow_Down"

const DropdownHeight = 60;

 function Dropdown({Options,value,onChange,label,identifier}:any) {

    console.log("Rendering Dropdown");


    const [open,setOpen] = useState(false);
    const theme = useTheme();

    const BackdropRef = useRef();

    const OnclickScroll = () => {
        setOpen(!open);
        if(BackdropRef.current) {
            BackdropRef.current.scrollIntoView({behavior:"smooth",inline:'end'});
        }

    }

    // useEffect(() => {
    //     if(open) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // },[open])

   

    useEffect(() => {
        function HandleOutside(e) {
            if(BackdropRef.current && !BackdropRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown',HandleOutside);

        return () => {
            document.removeEventListener('mousedown',HandleOutside);
        }
    },[BackdropRef.current])


    

    return (
        <DropdownContainer ref={BackdropRef} optionlength={Options.length} onClick={OnclickScroll}>
            <button className="dropdown_button">
                <p>{label} : {value[`${identifier}`]}</p>
                <ArrowDownIcon color={theme.text} />
            </button>
            <AnimatePresence>
                {open && 
                <motion.div className="option_container" style={{transformOrigin:'top'}} initial={{transform:'scale(0)'}} animate={{transform:'scale(1)',transition:{duration:.2,ease:'easeIn'}}} exit={{transform:'scale(0)',transition:{ duration:.2,ease:'easeOut'}}}>
                    {Options.map((option,i) => (
                        <div className="option" onClick={() => onChange(option)} key={option.id}>{option[`${identifier}`] ?? 'NA'}</div>
                    ))}
                </motion.div>}
            </AnimatePresence>
        </DropdownContainer>
    )
}

export default memo(Dropdown);

const DropdownContainer = styled.div`
    max-width:19rem;
    position:relative;
    flex:1;
    -webkit-tap-highlight-color: transparent;
    .dropdown_button {
        border:1px solid ${({theme}) => theme.input.border}!important;
        background:transparent;
    }
    & button {
        border:1px solid ${({theme}) => theme.input.border};
        position:relative;
        width:100%;
        height:${DropdownHeight}px;
        font-size:1.6rem;
        color:${({theme}) => theme.text};
        font-weight:700;


        svg {
            position:absolute;
            right:5%;
            top:50%;
            transform:translateY(-50%);
        }
    }
    .option_container {
        cursor:pointer;
        position:absolute;
        top:${DropdownHeight}px;
        background-color:${({theme}) => theme.body};
        z-index:5;
        right:0;
        left:0;
        border-right:1px solid ${({theme}) => theme.input.border}!important;
        border-left:1px solid ${({theme}) => theme.input.border}!important;
        ${props => props.optionlength > 3 && css`
            overflow-y:scroll;
            max-height:${DropdownHeight * 3.5}px;
          
        `}
        .option {
            height:${DropdownHeight}px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:1.6rem;
            font-weight:600;
            transition:all .3s ease;
            // &:not(:last-child) {
                border-bottom:1px solid ${({theme}) => theme.input.border};
            // }
            &:hover {
                background-color:${({theme}) => theme.footer};
                color:white;
            }
        }
    }
`;