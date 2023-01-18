import styled, { useTheme } from "styled-components"
import { NavbarHeight } from "../WebNavbar";
import CartIcon from "../../assets/icons/Cart"
import { useEffect, useRef, useState } from "react";

export default function FeaturesPop({children,shown,close,icon}) {

    const theme = useTheme();
    const [open,setOpen] = useState(false);

    const BackdropRef = useRef(null);

    useEffect(() => {
       
        function handleClickOutside(event) {
          if (BackdropRef.current && !BackdropRef.current.contains(event.target)) {
            setOpen(false);
          } 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [BackdropRef]);

    return(
        <div style={{backgroundColor:'red'}} onClick={() => setOpen(!open)}>
                {icon}
                <PopBackdrop >
                {open && 
                    <PopUpContainer onClick={e => {
                        e.stopPropagation();
                    }} >
                        {children}
                    </PopUpContainer>
                }
                </PopBackdrop>
            </div>
    )
}

const PopBackdrop = styled.div`
    position:absolute;
    height:100vh;
    left:0;
    right:0;
    top:0;
    background: rgba(0,0,0,0.3);
    z-index:2;
`;

const PopUpContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 0;
    padding: 3rem;
    background-color: ${({theme}) => theme.body};
    width:42rem;
`;