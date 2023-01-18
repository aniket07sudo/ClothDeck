import { useEffect, useState } from "react";
import {isMobile,isTablet} from 'react-device-detect';
import { isSSR } from "./isSSR";

export default function CheckDevice() {

  
    
    const [dimensions,setDimensions] = useState({});

    useEffect(() => {
        if(!isSSR) {
            setDimensions({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
    },[])

    const SettingDimensions = () => {
        
            setDimensions({
                width:window.innerWidth,
                height:window.innerHeight
            })
    }

    useEffect(() => {

        window.addEventListener('resize',SettingDimensions);

        return () => {
            window.removeEventListener('resize',SettingDimensions);
        }

    },[dimensions])

    return [dimensions]
    
}