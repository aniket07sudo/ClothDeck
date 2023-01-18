import styled, { useTheme } from "styled-components"
import Styles from "./Styles.module.scss"
import ProductCard from "../ProductCard";
import Slider from "react-slick";
import Next from "../../assets/icons/Next"
import Prev from "../../assets/icons/Prev"
import { useCallback, useEffect, useRef, useState } from "react";
import { devicemaxWidth } from "../../constants/breakpoints";
import { DataProp } from "../../../pages";



interface ItemProp {
    data:DataProp[],
    heading:string,
    subhead:string
}

export default function Tray({data,heading,subhead}:ItemProp) {


    const sliderRef = useRef(null);
    const theme = useTheme();



    const NavArrows = useCallback(() => {
        if(sliderRef.current) {
            return (
                <div className="dots_container">
                    <button className="slick_dots" onClick={() => sliderRef.current.slickPrev()}>
                        <Prev color={theme.text} />
                    </button>
                    <button className="slick_dots" onClick={() => sliderRef.current.slickNext()}>
                        <Next color={theme.text} />
                    </button>
                </div>
            )
        }

    },[sliderRef.current])

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        initialSlide: 0,
        nextArrow:<NavArrows />,
        prevArrow:<></>,
        cssEase: 'linear',
        responsive: 
        [
            {
                breakpoint: 2000,
                settings: 
                {   
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1800,
                settings: 
                {   
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: 
                {   
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: 
                {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 450,
                settings: 
                {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
      }

      const Productbag = (id) => {
        console.log("ID",id);
      }


    return (
            <TrayContainer>
                <h2>{heading}</h2>
                <p>{subhead}</p>
                <Slider ref={sliderRef} {...settings} className="slider_container" >
                    {data.map((item,i) => (
                        <ProductCard addBag={Productbag} key={item.id} item={item} />
                    ))}
                </Slider>
            </TrayContainer>
    )
}

const TrayContainer = styled.div`
    width:100%;
    text-align:center;
    & h2 {
        font-size: 7.2rem;
        margin:4rem 0 2rem 0;
        @media ${devicemaxWidth.mobileL} {
            font-size:4rem;
        }
    }
    & p {
        font-size: 1.8rem;
        color:${({theme}) => theme.paraText};
        @media ${devicemaxWidth.mobileL} {
            font-size:1.8rem;
        }
    }
    
    & .slider_container  {
        width:100%;
        margin:4rem 0;
        & .dots_container {
            display:flex;
            justify-content:center;
            margin:4rem 0;
            gap:2rem;
        }
       
        & .slick-slide>div {
            padding: 0 1rem;
            @media ${devicemaxWidth.mobileL} {
                padding:0 0.5rem;
            }
        }
        & .slick_dots {
            border:1.5px solid ${({theme}) => theme.input.border};
            width:5rem;
            height:5rem;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background:transparent;
            & svg {
                pointer-events:fill;
            }
        }
    }
`;