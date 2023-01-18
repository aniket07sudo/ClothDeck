
import Footer from "../Footer/index";
import React, { Children, memo, Suspense, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import {isMobileOnly} from 'react-device-detect';
import {AnimatePresence, motion, useAnimationControls} from 'framer-motion'
import { GlobalStyles } from "../../styles/globalStyles";
import { ThemeProvider, useTheme } from "styled-components";
import { lightTheme,darkTheme } from "../../styles/theme";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useRouter } from "next/router";
import RespBottomSheet from "../ResponsiveBottomSheet";
import Cartcomponent from "../CartComponent";
import { useUser, useUserDispatch } from "../../store/user/UserProvider";
import { useSession } from "next-auth/react";
import { getUserDataByEmail } from "../../store/user/actions";


const DynamicMobNavbar = dynamic(() => import("../MobNavbar"),{
  ssr:false,
  loading:() => <p>Loading..</p>
})

const DynamicWebNavbar = dynamic(() => import("../WebNavbar"),{
  ssr:false,
  loading:() => <p>Loading..</p>,

})


function Layout({children}) {

  // const theme = useTheme();

  const [theme,themeToggler] = useDarkMode();

  const { status , data} = useSession();


  console.log("Rendering Layout",theme);
  
  const Router = useRouter();

  const dispatch = useUserDispatch();

 


  // const InitializeAuth = useCallback(() => {
  //   console.log("Executing Initializing Ath",data);
    
  //   if(status == 'authenticated') {
  //     getUserDataByEmail(data.user?.email,dispatch).then(res => {
  //       console.log("Reload User Data",res);
  //     })
  //   } else {
  //     dispatch({type:"LOADING_END"});
  //   }
  // },[])

  // const InitliazeAuth = () => {
  //   console.log("Executing Initializing Ath",data);
    
  //   if(status == 'authenticated') {
  //     getUserDataByEmail(data.user?.email,dispatch).then(res => {
  //       console.log("Reload User Data",res);
  //     })
  //   }
  // }

  const InitializeAuth = useCallback(() => {
    if(status === 'authenticated') {
      getUserDataByEmail(data.user?.email,dispatch);
    }
  },[status])

   useEffect(() => {
    // InitliazeAuth();
    console.log("Initiazing AAuht");
    // if(status === 'loading') {
    //   dispatch({type:"LOADING_START"})
    // }

    InitializeAuth();
    
    // if(status === 'authenticated') {
    //   getUserDataByEmail(data.user?.email,dispatch);
    // }
  },[status])




  const Cart = useMemo(() => (
    <RespBottomSheet>
      <Cartcomponent />
    </RespBottomSheet>
  ),[])


  const Navbar = useMemo(() => {
    if(isMobileOnly) {
      return (
        <>
        <DynamicMobNavbar themeToggler={themeToggler} />
        </>
      )
    }
    return (
      <>
        <DynamicWebNavbar themeToggler={themeToggler} />
        <div style={{height:94}}></div>
      </>
    )
},[theme])

  return (
    <>
    
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
              {Navbar}
              <motion.div key={Router.asPath} style={{position:'relative'}} initial={{opacity:0,transform:'scale(0.95)'}} animate={{opacity:1,transform:'scale(1)',transition:{duration:.3}}} exit={{opacity:0,transform:'scale(0.95)',transition:{duration:1}}} >
                {children}
              </motion.div>
            <Footer />
            {Cart}
        </ThemeProvider>
    </>
  )
}

// function Comparator(prevProps,nextProps) {
//   return prevProps.children === nextProps.children;
// }

// export default memo(Layout,Comparator);


export default Layout;

// Layout.getInitialProps = async(ctx) => {
//   const session = await getSession(ctx);
//   console.log("Initial Context",session); 
  
//   return { email: session?.user?.email }
// }
