import Link from "next/link"
import Youtube from "../../assets/icons/Youtube"
import Instagram from "../../assets/icons/Instagram"
import Twitter from "../../assets/icons/Twitter"
import styled, { useTheme } from "styled-components"
import { devicemaxWidth } from "../../constants/breakpoints"
import { memo, useEffect } from "react"

const Footer = () => {

  const theme = useTheme();
  
  console.log("Footer Executes");
  

    return (
        <FooterStyle>
          <div className="logo">
            <h3>ClothDeck.</h3>
          </div>  
          <div className="links_container">
            <div className="links">
                <h4>Shop Online</h4>
                <Link href={'/'}>New Collection</Link>
                <Link href={'/'}>Categories</Link>
                <Link href={'/'}>Gallery</Link>
            </div>
            <div className="links">
                <h4>Services</h4>
                <Link href={'/'}>Interior Design</Link>
                <Link href={'/'}>Product Design</Link>
            </div>
            <div className="links">
                <h4>About</h4>
                <Link href={'/contact'}>Contact Us</Link>
                <Link href={'/'}>Stores</Link>
                <Link href={'/'}>FAQ</Link>
            </div>
            <div className="social_media">
                <Link href={'/'}><Youtube color={'#fff'} /></Link>
                <Link href={'/'}><Instagram color={'#fff'} /></Link>
                <Link href={'/'}><Twitter color={'#fff'} /></Link>
            </div>
          </div>
        </FooterStyle>
    )
  }

export default memo(Footer);

  

const FooterStyle = styled.div`
  background-color:${({theme}) => theme.footer};
  color:#fff;
  display:grid;
  padding:7rem 2rem;
  grid-template-columns:1fr repeat(3,minmax(15rem,.5fr)) 1fr;
  grid-column-gap:8rem;
  @media only screen and ${devicemaxWidth.laptop} {
    grid-template-columns:repeat(auto-fit,minmax(15rem,.5fr));
    grid-column-gap:8rem;
  }
 
  @media only screen and ${devicemaxWidth.tablet} {
    grid-row-gap:5rem;
  }
  
  & .social_media {
    display:flex;
    gap:2rem;
  }
  & .logo {
    text-align:center;

    @media only screen and ${devicemaxWidth.tablet} {
      grid-column:1 / -1;
      text-align:unset;
      
    }
    & h3 {
      font-size:4rem;
    }

  }
  & a {
    font-size:1.8rem;
    line-height:2.4rem;
    transition:all .3s ease;
    color:#737373;

  }
  & a:hover {
    color:#fff;
  }
  & h4 {
    font-size:1.8rem;
  }
  & .links {
    display:flex;
    flex-direction:column;
    & h4 {
      margin-bottom:1rem;
    }
    & a {
      margin:1rem 0;
    }
  }
  & .links_container {
      grid-column: 2 / -1;
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(5rem,1fr));
      @media only screen and ${devicemaxWidth.laptop} {
        grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));
        grid-row-gap:2rem;
      }
      @media only screen and ${devicemaxWidth.tablet} {
        grid-column: 1 / -1;


      }
      @media only screen and ${devicemaxWidth.mobileL} {
        grid-column:unset;
    
      }
  }
`;
  