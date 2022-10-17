import styles from "./ProjectCard.module.css"

type Props = {
    name: string;
    text: string;
    onClick?: any;
    onMouseEnter?: any;
    onMouseLeave?: any;
}

export const ProjectCard: React.FC<Props> = ({ name, text, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <div className={styles.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
            <p className={styles.name}>{name}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}