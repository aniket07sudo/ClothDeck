import Slider from "../Slider";
import styles from "./index.module.scss";

export default function Login(props:any) {

    // console.log("[Slider]",props.theme);
    

    return (
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <Slider />
        </div>
        {props.children}
      </div>
    );
  }