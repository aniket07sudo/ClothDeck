import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeWrapper from '../src/components/Wrappers/ProviderWrapper';
import Head from 'next/head';
import { usePreserveScroll } from '../src/hooks/usePreserveScroll';
import { Suspense, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify'
import { Slide } from 'react-toastify';
import styled, { useTheme } from 'styled-components';
import CrossIcon from "../src/assets/icons/Cross"
import { getSession, SessionProvider, useSession } from 'next-auth/react'
import UserContextProvider, { useUser, useUserDispatch } from '../src/store/user/UserProvider';
import 'react-toastify/dist/ReactToastify.css';
import OverlayLoader from '../src/components/Loaders/overlay';


export default function App({ Component, pageProps}: AppProps) {

  const router = useRouter();


  
  const scrollPositions = useRef<{ [url: string]: number }>({})
  const isBack = useRef(false)

  
  // const dispatchUser = useUserDispatch();

  // useEffect(() => {
  //   const user_data = await fetch('/api/v1/user/getUserData',{
  //     method:'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify(post_data)
  //     }).then(res => res.json()).then(res => {
  //       console.log("Success Request",res);
        
  //     }).catch(err => {
  //       console.log(err);
        
  //     })
  //   },[status])


  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true
      return true
    })

    const onRouteChangeStart = () => {
      const url = router.pathname;
      
      scrollPositions.current[url] = window.scrollY
    }

    const onRouteChangeComplete = (url: any) => {
      if (isBack.current && scrollPositions.current[url]) {

        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        })

      }

      isBack.current = false
    }

    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router.asPath])

  const State = useUser();


  const getLayout = Component.getLayout ?? ((page) => page);

return (
    <>
      <Head>
        <title>ClothDeck.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <ThemeWrapper>
          <UserContextProvider>
            <OverlayLoader />

            <SessionProvider session={pageProps.session}>
              {getLayout(
                  <Component key={router.asPath} {...pageProps} />
                )}
                
            </SessionProvider>
            <Toast_Container>
              <ToastContainer closeButton={<CrossIcon color={'#fff'} />} toastClassName={'toast_container'} position='bottom-right' autoClose={2000} hideProgressBar={true} closeOnClick={true} pauseOnHover={false} transition={Slide} />
            </Toast_Container>
          </UserContextProvider>
      </ThemeWrapper>
    </>
)}

// App.getInitialProps = async(ctx) => {
//   const session = await getSession(ctx);
//   console.log("Initial Context",session); 
  
//   return { email: session?.user?.email }
// }


const Toast_Container = styled.div`

  .toast_container {
    position:fixed;
    bottom:0;
    right:0;
    min-width:20%;
    z-index:20;
    background-color:${({theme}) => theme.footer};
    backdrop-filter:blur(50px);
    font-size:1.6rem;
    font-family:'Urbanist',sans-serif;
    font-weight:600;
    color:#fff;
  }

`;
