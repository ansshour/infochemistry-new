import { transform } from "typescript";
import styles from "./Accordion.module.css"
import plus from "./res/plus.svg"

type Props = {
    isOpen: boolean;
    name: string;
    text: string;
    onClick: any;
}

export const Accordion3: React.FC<Props> = ({ isOpen, name, text, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.inner}>
                <div className={styles.name}>
                    <p className={styles.nameIn}>{name}</p>
                    <img alt="plus" src={plus} className={styles.plus} style={isOpen ? { transform: "rotate(45deg)" } : null} />
                </div>
            </div>
            <div className={isOpen ? [styles.detail, styles.active].join(" ") : styles.detail}>
                {text}
            </div>
        </div>
    )
}