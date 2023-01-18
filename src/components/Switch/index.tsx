import { memo, useState } from "react";
import styled, { useTheme } from "styled-components"
import { useDarkMode } from "../../hooks/useDarkMode";
import NightIcon from "../../assets/icons/Night"
import DayIcon from "../../assets/icons/Day"


 function Checkbox({themeToggler}) {

    
    const theme = useTheme();

    
    
    
    console.log("Rendering Switch",theme);

    return (
        <div style={{cursor:'pointer'}} onClick={themeToggler}>
            <span className="slider">
                {theme.body == '#fff' ? <NightIcon color={'#000'} /> : <DayIcon color={'#fff'} />}
            </span>
        </div>
    )
}

export default memo(Checkbox);


