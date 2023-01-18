import { useCallback, useState } from "react"
import styled from "styled-components"

interface StarProps {
    size?:number,
    fill:number
}

export default function Stars({size = 2,fill}:StarProps) {

    const [width,setWidth] = useState((fill / 5) * 100);
 

    return (
        <IconContainer size={size} fill={width} >
            <span className="empty">
                <i></i>
            </span>
            <span className="icon">
                <i></i>
            </span>
        </IconContainer>
    )
}

const IconContainer = styled.span`
    position:relative;
    display:inline-block;
    height:3rem;
    width:8rem;
    & .empty {
        color:#ccc;
    }
    & .icon {
        color:#FFE83B;
    }
    & .icon , & .empty {
        position:absolute;
        left:0;
        top:0;
    }
    & .empty i {
        display: inline-block;
        font-size: ${props => props.size}rem;
        font-style: normal;
        font-weight: 400;
    }
    & .icon i {
        width:${props => props.fill}%;
        overflow:hidden;
        display: inline-block;
        font-size: ${props => props.size}rem;
        vertical-align: top;
        font-style: normal;
        font-weight: 400;
    }
    & i::before {
        content:"\\2605 \\2605 \\2605 \\2605 \\2605"
    }
`