import { useState } from "react";
import styles from "./Checkbox.module.css"
import activeIcon from "./res/active.svg"

type Props = {
    checked?: boolean;
    setChecked?: any;
    onClick?: any;
}

export const Checkbox: React.FC<Props> = ({ checked, setChecked, onClick }) => {

    return (
        <label>
            <input type="checkbox" hidden className={styles.realCheckbox} onClick={onClick} checked={checked} onChange={() => { setChecked !== undefined && setChecked(!checked) }}></input>
            <div
                className={styles.checkbox}>
                <img alt="active" src={activeIcon} className={styles.img} />
            </div>
        </label >
    )
}