import styles from "./styles.module.scss";
import {motion,AnimatePresence} from "framer-motion";
import { useCallback, useEffect } from "react";
import styled, {useTheme} from 'styled-components';

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
        hidden: { opacity: 0, y:0 },
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

    return(
        <StyledWrapper>
            <label>{label}</label>
            <StyledInputContainer>
                <input style={{borderColor:BorderColor(),backgroundColor:theme.body}} {...register} type={'text'} className={styles.input} placeholder={placeholder}/>
                <AnimatePresence>
                    {errors && <motion.div className={styles.errorContainer} variants={container} initial="hidden" animate="show" exit="exit" > <p>{errors.message}</p></motion.div>}
                </AnimatePresence>
            </StyledInputContainer>
        </StyledWrapper>
    )
} 

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