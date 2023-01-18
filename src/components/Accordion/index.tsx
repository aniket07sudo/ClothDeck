import { useCallback, useEffect, useRef, useState } from "react"
import BulletPoints from "../../utils/BulletPoints";
import ArrowUp from "../../assets/icons/Arrow_Up"
import styled, { useTheme } from "styled-components";

export default function Accordion({children,title,opened=false}) {

    const theme = useTheme();
    const contentRef = useRef<HTMLInputElement>(null);


    const [active,setActive] = useState(opened ? opened : false);

    const ClickHandler = () => {
        if(active) {
            setActive(false);
            
        } else {
            setActive(true);
        }
        
    }

    return (
        <AccordionStyle scrollHeight={contentRef.current?.scrollHeight} >
            <div onClick={ClickHandler} className={`accordion_head ${active ? 'open': 'closed'}`}>
                <h3>{title}</h3>
                {!opened && <ArrowUp color={theme.text} />}
            </div>
            <div ref={contentRef} className={`accordion_desc ${active ? 'open' : 'close'}`}>
                {children}
            </div>
        </AccordionStyle>
    )
}

const AccordionStyle = styled.div`
    display:block;
    pre {
        font-family:'Urbanist',sans-serif;
        font-size:1.6rem;
      
        line-height:2.4rem;
        padding-left: 0;
        padding-bottom:1rem;
        white-space: pre-line;
        margin:0;

    }
    & .accordion_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor:pointer;
        -webkit-tap-highlight-color: transparent;

        & svg {
            transition:all .5s ease;
        }
        &.closed svg {
            transform:rotate(180deg);
        }
        &.open svg {
            transform:rotate(360deg);
        }
    & h3 {
        font-size: 1.8rem;
        padding: 2rem 0 2rem 0;
        }
    }

    & .accordion_desc {
        background-color:${({theme}) => theme.body};
        transition: all 0.3s ease;
        overflow:hidden;

        &.close {
            max-height:0;
        }
        &.open {
            max-height:${props => props.scrollHeight + 1000}px;
            padding:0 0 1rem 0;
        }
    }

    
`;