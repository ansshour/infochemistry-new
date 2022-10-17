import { useTranslation } from "react-i18next"
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


export const Features = ({ tableData }) => {

    const { t } = useTranslation()

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>{t("masters.FeaturesandBenefits")}</h2>
            </div>
            <div className={styles.table}>
                <Table data={tableData} />
            </div>


        </>
    )
}