
import Footer from "../Footer/index";
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import {isMobileOnly} from 'react-device-detect';
import {motion, useAnimationControls} from 'framer-motion'
import { GlobalStyles } from "../../styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme,darkTheme } from "../../styles/theme";
import { useDarkMode } from "../../hooks/useDarkMode";



export default function Home({children}) {


  const [theme,themeToggler] = useDarkMode();

  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        {children}
    </ThemeProvider>
  )
}
