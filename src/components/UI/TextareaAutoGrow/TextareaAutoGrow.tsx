import { useState } from "react";
import styles from "./TextareaAutoGrow.module.css"

type Props = {
    className?: any;
    onChange?: any;
    placeholder?: string;
    value?: string;
}

export const TextareaAutoGrow: React.FC<Props> = ({ className, onChange, placeholder, value }) => {

    const [height, setHeight] = useState(null)

    const onKeyUpHandler = (e: any) => {
        setHeight(e.target.scrollHeight)
        onChange(e)
    }

    return (
        <textarea
            className={[className && className, styles.TextareaAutoGrow].join(" ")}
            onChange={(e) => { onKeyUpHandler(e) }}
            style={{ height: `${height}px` }}
            placeholder={placeholder}
            value={value} />
    )
}