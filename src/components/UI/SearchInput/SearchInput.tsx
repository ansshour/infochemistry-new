import styles from "./SearchInput.module.css"

type Props = {
    style?: React.CSSProperties;
    placeholder?: string;
    value?: string;
    onChange?: (arg: any) => void;
    onSubmit?: (arg: any) => void;
}

export const SearchInput: React.FC<Props> = ({ style, placeholder, value, onChange, onSubmit }) => {
    return (
        <>
            <input
                className={styles.searchInput}
                placeholder={`${placeholder ? placeholder : "Поиск"}`}
                style={{ ...style }}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit} />
        </>
    )
}