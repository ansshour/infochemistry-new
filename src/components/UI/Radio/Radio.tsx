import { useState } from "react"
import styles from "./Radio.module.css"


type Props = {
    name: string;
    checked?: boolean;
    setChecked?: any;
    onClick?: any;
}


export const Radio: React.FC<Props> = ({ name, checked, setChecked, onClick }) => {

    const [active, setActive] = useState(false)

    return (
        <label>
            <div className={styles.radio}>
                <input type="radio" hidden className={styles.radioReal} name={name} checked={checked} onChange={setChecked} onClick={onClick} />
                <div className={styles.internalRadio}>
                </div>
            </div >
        </label>
    )
}