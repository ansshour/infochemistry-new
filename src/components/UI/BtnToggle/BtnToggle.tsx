import styles from "./BtnToggle.module.css"

type Variables = {
    id: number;
    number: string;
}

type Props = {
    variables: Variables[];
    activeColor: string;
    activeElement: any;
    setActiveElement?: (obj: any) => void;
    onClick?: any;
    fontColor?: string;
}

export const BtnToggle: React.FC<Props> = ({ variables, activeColor, activeElement, setActiveElement, onClick, fontColor }) => {

    variables.sort((a, b) => {
        return a.id - b.id;
    })

    return (
        <div className={styles.container}>
            {variables.map(({ number, id }) => <p
                key={number}
                style={id === activeElement?.id ? { color: `${fontColor}`, backgroundColor: `${activeColor}` } : {}}
                onClick={setActiveElement ? () => { setActiveElement({ id: id, number: number }) } : onClick}
            >{number}</p>)}
        </div>
    )
}