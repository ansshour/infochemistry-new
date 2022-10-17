import styles from "./Warning.module.css"
import warning from "./res/warning.svg"

type Props = {
    text: string;
}

export const Warning: React.FC<Props> = ({ text }) => {
    return (
        <div className={styles.container}>
            <img alt="warning" src={warning} />
            <p>{text}</p>
        </div>
    )
}