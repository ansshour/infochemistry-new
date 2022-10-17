import styles from "./Button.module.css"

type Props = {
    children: React.ReactNode;
    color?: string;
    width?: string;
    height?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, color, width, height, style, onClick }) => {
    return (
        <button
            className={color === 'white' ? [styles.container, styles.white].join(" ") : styles.container} style={{ maxWidth: `${width}px`, height: `${height}px`, ...style }}
            onClick={onClick}>
            {children}
        </button>
    )
}