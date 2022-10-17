import styles from "./Button2.module.css"

type Props = {
    children: React.ReactNode;
    onClick?: any;
    type?: number;
}

export const Button2: React.FC<any> = ({ children, onClick, type, attr, style }) => {

    const classByType = (type) => {
        if (type === 1) return styles.type_1
        if (type === 2) return styles.type_2
        if (type === 3) return styles.type_3
        if (type === 4) return styles.type_4
    }

    return (
        <button className={[styles.button, classByType(type)].join(" ")}
            onClick={onClick}
            {...attr}
            style={{ ...style }}>
            {children}
        </button>
    )
}