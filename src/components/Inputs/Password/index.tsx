import styles from "../styles.module.scss";
import {motion,AnimatePresence} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import EyeIcon from "../../../assets/icons/Eye_Open";
import Link from "next/link";
import styled, { useTheme } from "styled-components";

interface TextProps {
    placeholder:string,
    errors:any,
    register:any,
    touchedField:any,
    label:string,
    value:string,
}



export default function Input({placeholder,register,errors,touchedField,label,value}:TextProps) {

    const theme = useTheme();


    const [show,setShow] = useState(false);

    const eyeHandler = () => {
        setShow(!show);
    }


    const BorderColor = useCallback(() => {
        if(errors) {
            return "#ed4337";
        }

        if(!errors && value != "" && touchedField) {
            // return "#262D33"
            return theme.input.borderActive
        }

    },[value,errors])

    
    const container = {
        hidden: { opacity: 0, y:-2 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.5
          },
          y:10
        },
        exit:{
            opacity:0,
            y:-2
        }
      }

      const eyevariant = {
        hidden:{
            opacity:0,
        },
        show:{
            opacity:1,
            transition:{
                duration:.3
            }
        },
        exit:{
            opacity:0,
            transition:{
                duration:.3
            }
        }
      }

    return(
        <StyledWrapper>
            <label>{label}</label>
            <StyledInputContainer >
                <div className={styles.eyeContainer}>
                    <input style={{borderColor:BorderColor()}} {...register} type={show ? 'text' : 'password'} className={styles.input} placeholder={placeholder}/>
                        <div className={styles.eye} onClick={eyeHandler}>
                            {show && <ClosedLine variants={eyevariant} initial="hidden" animate="show" exit="exit" ></ClosedLine>}
                            <EyeIcon />
                        </div>
                </div>
                <AnimatePresence>
                    {errors && <motion.div className={styles.errorContainer} variants={container} initial="hidden" animate="show" exit="exit" > <p>{errors.message}</p></motion.div>}
                </AnimatePresence>
            </StyledInputContainer>
        </StyledWrapper>
    )
} 


const StyledInputContainer = styled.div`
    width: 100%;


    & p {
        margin: 0;
    }

    & .errorContainer {
        position: absolute;
    }

    & input {
        width: 100%;
        padding: 15px 20px;
        border: 1px solid ${({theme}) => theme.input.border};
        transition: border .4s ease;
        font-size: 1.4rem;
        color:${({theme}) => theme.text};
        background-color:${({theme}) => theme.background};

        &:focus , &:focus-within , &:focus-visible {
            outline: none;
            border:1px solid ${({theme}) => theme.input.borderActive};
        }
    }

    & p {
        color: #ed4337;
        font-size: 1.2rem;
    }
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;


    & label {
        font-size: 1.4rem;
        font-weight:600;
    }
`;

const ClosedLine = styled(motion.span)`

    width: 96%;
    transform:rotate(45deg) translateY(-50%);
    transform-origin: center;
    height: 2px;
    background-color: ${({theme}) => theme.text};
    position: absolute;
    top: 47%;
`;