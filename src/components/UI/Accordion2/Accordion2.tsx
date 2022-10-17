import styles from "./Accordion2.module.css"
import arrow from "./res/arrow.svg"


type Props = {
    isOpen: boolean;
    name: string;
    content?: string[];
    onClick?: any;
}

export const Accordion2: React.FC<Props> = ({ isOpen, name, content, onClick }) => {
    return (
        <div className={styles.accordion}>
            <div className={styles.nameWrapp} onClick={onClick}>
                <p className={styles.name}>{name}</p>
                <img alt="arrow" src={arrow} style={!content.length ? { display: "none" } : {}} className={isOpen ? [styles.open, styles.arrow].join(" ") : styles.arrow} />
            </div>
            <ol className={isOpen ? [styles.content, styles.open].join(" ") : styles.content} style={!content.length ? { display: "none" } : {}}>
                {content?.map(item => <li>{item}</li>)}
            </ol>
        </div>
    )
}