import { AnimatePresence, motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { NavbarHeight } from '.';
import { devicemaxWidth } from '../../constants/breakpoints';
import Cancel from "../../assets/icons/Cross";
import Link from 'next/link';
import Search from "../../assets/icons/Search";
import styles from './styles.module.scss'
import { memo, useEffect, useRef, useState } from 'react';

function SearchComponent({searchOpen,setSearchOpen}) {

    console.log("Rendering Web Searchh Component");
    

    const WrapperRef = useRef(null);

    const inputRef = useRef(null);

    const theme = useTheme();

    useEffect(() => {
       
        function handleClickOutside(event) {
          if (WrapperRef.current && !WrapperRef.current.contains(event.target)) {
            setSearchOpen(false);
          } else {
            if(inputRef.current) {
                inputRef.current.focus();
            }
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [WrapperRef,inputRef]);


    return (
        <AnimatePresence>
            {searchOpen && <motion.div className={styles.searchOpenbackdrop} initial={{opacity:0}} animate={{opacity:1}} exit={{ opacity: 0, transition: { duration: .4 } }}>
                <div className={styles.searchOpen} ref={WrapperRef}>
                    <Wrapper>
                        <motion.div className="logoContainer" layoutId="logo">
                            <Link href={'/'}>ClothDeck.</Link>
                        </motion.div>
                        <SearchContainerOpen layoutId="search-container">
                            <input placeholder="Search" ref={(input) => { input && input.focus()}}  />
                            <motion.div layoutId="search-icon">
                                <Search color={theme.text} />
                            </motion.div>
                        </SearchContainerOpen>
                        <SearchSuggestions initial={{opacity:0,y:50}} animate={{opacity:1,y:0,transition:{delay:.2}}} exit={{opacity:0,y:50}}>
                            <div className='suggestions_wrapper'>
                                <div className="popular_searches">
                                    <p>Popular Search</p>
                                    <div className='suggestions'>
                                        <Link href={'/'}>Wrogn Men Slim Fit</Link>
                                        <Link href={'/'}>Men Black Bomber</Link>
                                        <Link href={'/'}>Men Solid Cargo Joggers</Link>
                                    </div>
                                </div>
                            </div>
                        </SearchSuggestions>
                        <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1,transition:{duration:.3}}} style={{cursor:'pointer'}} onClick={() => setSearchOpen(false)}>
                            <Cancel width={146} color={theme.text} />
                        </motion.div>
                    </Wrapper>
                </div>
            </motion.div>}

        </AnimatePresence>
    )
}

export default memo(SearchComponent);

const SearchSuggestions = styled(motion.div)`
    position:absolute;
    left:0;
    right:0;
    top:${NavbarHeight}px;
    background-color:${({theme}) => theme.body};
    // background-color:red;

    .suggestions_wrapper {
        padding:1rem;
        display:flex;
        justify-content:center;
    }

    .popular_searches {
        min-width:38%;
        p {
            font-size:2.4rem;
            font-weight:700;
            margin-bottom:1rem;
        }
        .suggestions {
            display:flex;
            flex-direction:column;
            a {
                font-size:1.8rem;
                font-weight:700;
                padding:1rem 0;
                &:hover {
                    color:#4d4d4d;
                }
            }
        }
    }
`;

const SearchContainerOpen = styled(motion.div)`
    border:1px solid ${({theme}) => theme.input.border};
    padding:0.7rem 1.5rem;
    display:flex;
    align-items:center;
    
    min-width:40%;
    max-width:60%;
    & input {
        border:none;
        background-color:transparent;
        height:100%;
        width:100%;
        color: ${({theme}) => theme.text};
        font-family:'Urbanist',sans-serif;

    }
    & input:placeholder {
        @media ${devicemaxWidth.tablet} {
            font-size: 0.7rem;
        }
    }
    & input:focus {
        outline:none;
    }
`;

const Wrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.body};
    height:${NavbarHeight}px;
    padding: 0 4rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position: fixed;
    z-index:5;
    width:100%;
    // box-shadow: 0px -15px 72px 0px;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
    position:relative;

    .myProfile {
        position:relative;
        cursor:pointer;
    }



    .image_profile {
        padding:0 1rem;
        height:100%;
        overflow:hidden;
        img {
            border-radius:5px;
        }
    }

    & .links {
        & > button {
            padding: 2rem;
            background: transparent;
            border:none;
            color:${({theme}) => theme.text};
            font-size;1.4rem;
            cursor:pointer;
            border-bottom:1.5px solid ${({theme}) => theme.body};
            transition:all .3s ease;
            font-weight:600;
            &:hover {
                border-bottom:1.5px solid ${({theme}) => theme.text};
            }
            @media only screen and (max-width:900px) {
                padding: 1rem;
            }
        }
    }
    @media ${devicemaxWidth.tablet} {
        padding: 1rem 2rem;
    }
    

    & div.logoContainer a {
        color:${({theme}) => theme.text};
        font-size:3rem;
        font-weight:700;
        @media ${devicemaxWidth.tablet} {
            font-size:2rem;
        }
        @media (max-width:600px) {
            font-size:1.4rem
        }
    }


`;