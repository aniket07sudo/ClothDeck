import {TabData} from "../index"
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface tabsProps {
    Data:TabData[]
}

const Tab_Height = 60;
const Padding = 30;

export default function MobTabs({Data}:tabsProps) {

    const [activeIndex,setActiveIndex] = useState(0);
    const [indicatorWidth,setIndicatorWidth] = useState(0);
    const [leftOffset,setLeftOffset] = useState(0);

    const IndicatorRefs = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {

        function SetTabPosition() {
            const currentTab = IndicatorRefs.current[activeIndex];
            setLeftOffset(currentTab?.offsetLeft ?? 0);
            setIndicatorWidth(currentTab?.clientWidth ?? 0);
        }

        SetTabPosition();

    },[activeIndex])
    

    return (
        <TabWrapper>
            <TabContainer>
                <div className="tabs">
                    {Data.map((tab,idx) => (
                        <Button selected={activeIndex == idx} key={tab.id} ref={(el) => (IndicatorRefs.current[idx] = el)} onClick={() => setActiveIndex(idx)}>
                            {tab.label}
                        </Button>
                    ))}
                </div>
                <Indicator indicatorWidth={indicatorWidth} leftOffset={leftOffset} />
            </TabContainer>
            <TabContent>
                {Data[activeIndex].content}
            </TabContent>
        </TabWrapper>
    )
}

const TabWrapper = styled.div`
`;

const TabContent = styled(motion.div)`
    overflow-x:scroll;
    max-height:${(window.innerHeight / 2) - Tab_Height * 2}px;
    & > div {
        max-width:100%;
        padding:2rem;
    }
    & .dropdown_options {
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));

    }

    & .submit {
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:${Tab_Height}px;
    }
   
`;

const TabContainer = styled.div`
    position: relative;
    height:${Tab_Height}px;
    & .tabs {
        display: flex;
        height:100%;
        align-items:center;
    }
    & button {
        transition:all .5s ease;
    }
`;

const Button = styled.div`
    background:transparent;
    border: none;
    font-size:1.8rem;
    font-family:'Urbanist',sans-serif;
    font-weight:700;
    padding:0 1.5rem;
    color:${props => props.selected ? props.theme.text : '#737373'}
`;

const Indicator = styled.div`
    display:block;
    position:absolute;
    bottom:0;
    left:${props => props.leftOffset}px;
    height:3px;
    width:${props => props.indicatorWidth}px;
    background-color:${({theme}) => theme.text};
    transition:all .4s ease;
`;
