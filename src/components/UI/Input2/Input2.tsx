import styles from "./Input2.module.css"

type Props = {
    attr?: React.InputHTMLAttributes<HTMLInputElement>;
}


export const Input2: React.FC<any> = ({ ...attr }) => {
    return (
        <input {...attr} className={styles.input} />
    )
}