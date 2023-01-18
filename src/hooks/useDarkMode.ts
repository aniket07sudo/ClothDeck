import {useCallback, useEffect, useState} from "react";

export const useDarkMode = () => {
    const [theme,setTheme] = useState('light');

    const setMode = (mode:string) => {
        window.localStorage.setItem('theme',mode);
        setTheme(mode);
    }

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    }

    // const GetTheme = useCallback(() => {
    //     const localTheme = window.localStorage.getItem('theme');
    //     if(localTheme) {
    //         setMode(localTheme);
    //     }
    //      else {
            
    //         window.matchMedia('(prefers-color-scheme: dark)').matches && setMode('dark');
    //     }
    // },[theme])

    // useEffect(() => {
    //     GetTheme();
    // },[])

 

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if(localTheme) {
            setMode(localTheme);
        }
         else {
            
            window.matchMedia('(prefers-color-scheme: dark)').matches && setMode('dark');
        }
    },[])

    

    return [theme,themeToggler]
}
