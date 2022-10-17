import { useState } from "react";
import styles from "./Input.module.css"
import toggleVissible from "./res/icons/togglevissible.svg"

type Props = {
    placeholder: string;
    width?: number;
    height?: number;
    fontsize?: number;
    style?: React.CSSProperties;
    password?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    name?: string;
}

export const Input: React.FC<Props> = ({ placeholder, width, height, fontsize, style, password, value, onChange, name }) => {

    const [currentType, setCurrentType] = useState(password ? "password" : "text");

    return (
        <div className={styles.container}>
            <input
                placeholder={placeholder}
                className={styles.input}
                style={{ maxWidth: `${width}px`, height: `${height}px`, fontSize: `${fontsize}px`, ...style }}
                {...password ? { type: currentType } : { type: currentType }}
                {...value ? { value: value } : {}}
                {...onChange ? { onChange: onChange } : {}}
                name={name}
                value={value}
            />
            {password === true && <img
                alt="toggleVissible"
                src={toggleVissible}
                className={styles.passwordIcon}
                onClick={() => { currentType === "text" ? setCurrentType("password") : setCurrentType("text") }} />}
        </div>
    )
}