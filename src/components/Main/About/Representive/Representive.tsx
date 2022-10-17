import styles from "./Representive.module.css"

type Props = {
    name: string;
    text: string[];
    image: string;
}

export const Representive: React.FC<Props> = ({ name, text, image }) => {
    return (
        <div className={styles.representive}>
            <img src={image} alt="representive" className={styles.image} />
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                {text.map((text) => (
                    <p className={styles.text} key={text}>{text}</p>
                ))}
            </div>
        </div>
    )
}