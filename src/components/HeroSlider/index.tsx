import Link from 'next/link';
import Slider from "react-slick";
import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Styles from "./Styles.module.scss";
import Goto from "../../assets/icons/Goto";
import Nike from "../../assets/icons/Brand_Logo/Nike"
import Adidas from "../../assets/icons/Brand_Logo/Adidas"
import Vans from "../../assets/icons/Brand_Logo/Vans"
import Jordon from "../../assets/icons/Brand_Logo/Jordon"
import Puma from "../../assets/icons/Brand_Logo/Puma"
import Reebok from "../../assets/icons/Brand_Logo/Reebok"
import React, { memo } from 'react';



const Home = () => {

    const theme = useTheme();

    console.log("Rendering Hero Slider");
    

  return (
    <>
        <div style={{backgroundImage:`url("/Images/Hero_Slider/Slide_Bg.jpg")`,backgroundSize:'cover',position:'relative'}}>
            <div className={Styles.wrapper}>
                <div className={Styles.iconContainer}>
                    <Image src={require('../../../src/assets/images/slider/Icon_1.png')} alt='Icon' />
                </div>
                <p className={Styles.subHead}>HOME KIT 21/22</p>
                <div className={Styles.mainHead}>
                    <Image className={Styles.mainImg} src={require('../../../src/assets/images/slider/LIVERPOOL.png')} alt="Team Name" />
                </div>
                <div className={Styles.bottomContainer}>
                    <div className={Styles.BlurBox}>
                        <div className={Styles.videoBox}>
                            <Image src={require('../../../src/assets/images/slider/video.jpg')} alt="Video" />
                        </div>
                        <div className={Styles.ContentBox}>
                            <h3>How was Made ?</h3>
                            <p>The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets.</p>
                        </div>
                    </div>
                    <div className={Styles.description}>
                        <p style={{color:theme.neutral}}>The Liverpool F.C. Stadium Home Shirt features highly breathable fabric to help keep sweat off your skin while you cheer for your team.This product is made from at least 75% recycled polyester fibres.</p>
                        <button className={Styles.Cta}>
                            SHOP NOW <Goto color={'#262D33'} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={Styles.overlayImg}>
                <Image  src={require('../../../src/assets/images/slider/jersey.png')} alt='Jersey' />
            </div>

        </div>
        <div className={Styles.BrandSelector}>
            <Nike color={theme.text} />
            <Adidas color={theme.text} />
            <Vans color={theme.text} />
            <Jordon color={theme.text} />
            <Puma color={theme.text} />
            <Reebok color={theme.text} />
        </div>
    </>
  )
}

export default memo(Home);