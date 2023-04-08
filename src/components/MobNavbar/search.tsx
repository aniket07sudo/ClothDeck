import { AnimatePresence, motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { NavbarHeight } from '.';
import { devicemaxWidth } from '../../constants/breakpoints';
import Cancel from "../../assets/icons/Cross";
import Link from 'next/link';
import Search from "../../assets/icons/Search";
import styles from './styles.module.scss'
import { memo, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SearchItem from '../WebNavbar/Item';

 function SearchComponent({searchOpen,setSearchOpen}) {

    console.log("Rendering Searchh Component");
    

    const WrapperRef = useRef(null);

    const inputRef = useRef(null);

    const theme = useTheme();

    const [searchedTerm,setSearchTerm] = useState('');


    const [results,setResults] = useState([]);

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

      const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {

        let searchedText = e.target.value;
        setSearchTerm(searchedText)

        console.log("Coming SearchText",searchedText);
        

        if(searchedText == '') {
            setResults([]);
            return;
        }


        axios.get(`/api/v1/search/${searchedText}`).then(res => {
            console.log("res",res.data);
            let Array = res.data.data;
            console.log("Array",Array);
            
            const newArr = Array.map(item => {
                let newTitle = item.title.replace(new RegExp(searchedText,'gi'),match => 
                    `<mark>${match}</mark>`
                )
    
                console.log("New Title",newTitle);
                
    
                return {
                    ...item,
                    title:newTitle
                }
            })
            console.log("SSetting",newArr);
            
            setResults(newArr);

        })
    }


    return (
        <AnimatePresence>
            {searchOpen && <>
                <MobSearch ref={WrapperRef} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.3}}}>
                    <Searchopen initial={{x:-100}} animate={{x:0,transition:{duration:.3}}} exit={{x:-100,transition:{duration:.3}}} layoutId="mob_search_open">
                        <input onChange={handleSearch} placeholder="Search" ref={(input) => { input && input.focus()}}  />
                        <motion.i style={{maxWidth:40,maxHeight:40}} layoutId="mob_search_icon" exit={{opacity:1, transition:{duration:.3}}}  >
                            <Search color={theme.text} height={30} width={30} />
                        </motion.i>
                    </Searchopen>
                    
                    <button onClick={() => setSearchOpen(false)}>
                        <Cancel color={theme.text} />
                    </button>
                    <SearchSuggestions initial={{opacity:0,y:50}} animate={{opacity:1,y:0,transition:{delay:.2}}} exit={{opacity:0,y:50}}>
                        <SuggestionWrapper>
                            {searchedTerm != '' && <div className='searchResultsList'>
                                {results.map(item => (
                                    <Link key={item._id} onClick={handleSearch} href={`/product/${item.itemId}`}>
                                        <SearchItem item={item} />
                                    </Link>
                                ))}
                            </div>}
                            {results.length === 0 && searchedTerm === '' && <div className="popular_searches">
                                <p>Popular Search</p>
                                <div className='suggestions'>
                                    <Link href={'/'}>Wrogn Men Slim Fit</Link>
                                    <Link href={'/'}>Men Black Bomber</Link>
                                    <Link href={'/'}>Men Solid Cargo Joggers</Link>
                                </div>
                            </div>}
                        </SuggestionWrapper>
                    </SearchSuggestions>
                </MobSearch>
            </>}

        </AnimatePresence>
    )
}

export default memo(SearchComponent);

const MobSearch = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.7rem 2rem;
    height:${NavbarHeight}px;
    display: flex;
    justify-content: space-between;
    background-color:${({theme}) => theme.body};


    & button {
        background: transparent;
        padding: .7rem;
    }
`;

const Searchopen = styled(motion.div)`
    border:1px solid ${({theme}) => theme.input.border};
    padding:0.7rem 1.5rem;
    display:flex;
    align-items:center;
    width:85%;
    min-width:150px;
    position:relative;
    & input {
        border:none;
        background-color:transparent;
        height:100%;
        width:100%;
        color: ${({theme}) => theme.text};
        font-size:1.4rem;
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
    & button {
        position:absolute;
        right:0
    }
`;

const SearchSuggestions = styled(motion.div)`
    position:absolute;
    left:0;
    right:0;
    top:${NavbarHeight}px;
    background-color:${({theme}) => theme.body};

    .suggestions_wrapper {
        padding:1rem 02rem;
        display:flex;
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

const SuggestionWrapper = styled.div`
    padding:2rem;
    .searchResultsList {
        display:flex;
        flex-direction:column;
        gap:10px;
    }
    .searchResultsList a {
        font-size:2rem;
    }
`;