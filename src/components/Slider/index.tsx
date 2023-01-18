import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.scss";


export default function Login() {

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: styles.button__bar,
      arrows: false
    }

    return (
        <Slider {...settings} className={styles.slider}>
          <div className={styles.item}>
            <div className={styles.inner_container} style={{backgroundImage:'url("/Images/Login_1.png")'}}>
                <div className={styles.feature}>
                    <div className={styles.feature_icon}><img src="/icons/Leaf.svg" /></div>
                    <h2 className={styles.feature_text}>Best Quality Material</h2>
                    <h3 className={styles.feature_desc}>Our product is made from at least 75% recycled polyester fibres.</h3>
                </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner_container} style={{backgroundImage:'url("/Images/Login_2.png")'}}>
                <div className={styles.feature}>
                    <div className={styles.feature_icon}><img src="/icons/Leaf.svg" /></div>
                    <h2 className={styles.feature_text}>Best Quality Material</h2>
                    <h3 className={styles.feature_desc}>Our product is made from at least 75% recycled polyester fibres.</h3>
                </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.inner_container} style={{backgroundImage:'url("/Images/Login_3.png")'}}>
                <div className={styles.feature}>
                    <div className={styles.feature_icon}><img src="/icons/Leaf.svg" /></div>
                    <h2 className={styles.feature_text}>Best Quality Material</h2>
                    <h3 className={styles.feature_desc}>Our product is made from at least 75% recycled polyester fibres.</h3>
                </div>
            </div>
          </div>
        
        </Slider>
    );
  }