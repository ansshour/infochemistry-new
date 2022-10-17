import styles from "./DirectionsCard.module.css"

type Props = {
    name: string;
    text: string;
}

export const DirectionsCard: React.FC<Props> = ({ name, text }) => {
    return (
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}