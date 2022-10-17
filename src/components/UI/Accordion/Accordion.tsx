import { useState } from "react";
import styles from "./Accordion.module.css"

type Props = {
    name: string;
    open?: string;
    type?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: any;
    needOpen?: boolean;
}

export const Accordion: React.FC<Props> = ({ name, open, type, style, children, onClick, needOpen }) => {

    const [isOpen, setIsOpen] = useState(needOpen ? true : false);

    return (
        <div className={styles.container} style={{ ...style }} onClick={onClick}>
            <div className={styles.accordion}
                onClick={() => { setIsOpen(!isOpen) }}
                style={type === 2 ? { justifyContent: "space-between" } : {}}>
                <img
                    className={isOpen ? [styles.arrow, styles.open].join(" ") : styles.arrow}
                    src="./images/arrow.svg"
                    alt="arrow"
                    style={type === 2 ? { order: "1" } : {}}
                    height={10}
                />
                <p className={styles.labName}>{name}</p>
            </div>
            <div className={isOpen ? [styles.content, styles.show].join(" ") : styles.content}>
                {children ? (
                    <div className={styles.text}>{children}</div>
                ) : (
                    <div className={styles.text}>{open}</div>
                )}
            </div>
        </div >
    )
}