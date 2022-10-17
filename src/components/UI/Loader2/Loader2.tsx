import { useEffect } from "react"
import styles from "./Loader2.module.css"

export const Loader2: React.FC<any> = () => {


    return (
        <div className={styles.container}>
            <div className={styles.spinner}>

            </div>
        </div>
    )
}