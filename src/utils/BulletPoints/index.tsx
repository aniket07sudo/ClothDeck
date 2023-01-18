import Styles from "./Styles.module.scss"


export default function BulletPoints({data}) {

    
    return(
        <ul className={Styles.bullet_container}>
            {data.desc.map((item,i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
}