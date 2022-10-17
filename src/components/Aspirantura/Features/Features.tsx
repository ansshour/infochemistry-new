import { Table } from "../../UI/Table/Table"
import styles from "./Features.module.css"


const data = [
    {
        title: "Подход Гарварда", image: "./images/features/1.png", desc: `Аналогов в России нет. 
    Научный подход в рамках System Chemistry and Infochemistry осуществляется только в Университете Гарвард (Harvard-MIT Program in Health Sciences and Technology)` },
    { title: "Стажировки", image: "./images/features/2.png", desc: `Оплачиваемые стажировки 1-5 месяцев в университетах-партнерах и компаниях по всему миру` },
    { title: "Оборудование", image: "./images/features/3.png", desc: `Свободный доступ к высокотехнологичному приборному парку` },
    { title: "Профессионализм", image: "./images/features/4.png", desc: `Научные руководители и преподаватели с международным опытом научной работы` },
    { title: "Образование через науку" },
    { title: "Индивидуальная образовательная траектория" },
    { title: "Публикации в высокорейтинговых журналах" },
    { title: "Интердисциплинарный подход" },
    { title: "Модульная система обучения - возможность долгосрочных зарубежных стажировок в ведущих научных центрах" },
    { title: "Организация собственного стартапа" },
]

type Props = {
    title?: string;
    tableData: any;
}

export const Features: React.FC<Props> = ({ title, tableData }) => {
    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>{title || "О программе"}</h2>
            </div>
            <div className={styles.table}>
                <Table data={tableData} />
            </div>


        </>
    )
}