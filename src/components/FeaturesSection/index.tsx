import styled, { useTheme } from "styled-components"
import Carticon from "../../assets/icons/LightCart"
import Styles from "./Styles.module.scss"
import SecurePayment from "../../assets/icons/SecurePayment"
import Leaf from "../../assets/icons/Leaf"
import React, { memo } from "react"

const Features = () => {

    const theme = useTheme();

    console.log("Rendering Features");
    

    return(
        <div className={Styles.gridContainer}>
            <div className={Styles.feature}>
                <div className={Styles.featureicon}>
                    <Carticon width={50} height={50} color={theme.text} />
                </div>
                <h3>Free Shipping</h3>
                <Para>Free all shipping worldwide, with applicable conditions</Para>
            </div>
            <div className={Styles.feature}>
                <div className={Styles.featureicon}>
                    <SecurePayment width={50} height={50} color={theme.text} />
                </div>
                <h3>Secure payments</h3>
                <Para>Payments with a guaranteed level of security, you don't have to worry</Para>
            </div>
            <div className={Styles.feature}>
                <div className={Styles.featureicon}>
                    <Leaf width={50} height={50} color={theme.text} />
                </div>
                <h3>Best Quality Material</h3>
                <Para>Our product is made from at least 75% recycled polyester fibres.</Para>
            </div>
        </div>
    )
}

export default memo(Features);

const Para = styled.p`
    font-size: 1.6rem;
    color: ${({theme}) => theme.neutral};
    grid-column: 1 / 2;
`;