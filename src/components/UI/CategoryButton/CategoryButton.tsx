import styles from "./CategoryButton.module.css"

type Props = {
    children: React.ReactNode;
    isActive: boolean;
    color: string;
    onClick?: any;
}

export const CategoryButton: React.FC<Props> = ({ children, isActive, color, onClick }) => {
    return (
        <button className={styles.btn} style={isActive ? { textShadow: "0px 0px 0px #000000", border: `1px solid ${color}`, color: "black" } : {}} onClick={onClick}>
            {children}
        </button>
    )
}