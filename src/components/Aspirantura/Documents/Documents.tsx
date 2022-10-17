import { useTranslation } from "react-i18next"
import { dangerTextEnter } from "../../../utils/dangerTextEnter"
import styles from "./Documents.module.css"

const data = [
    { name: "Паспорт", icon: "./images/docs/1.svg" },
    { name: "Анкета", icon: "./images/docs/2.svg" },
    { name: "Заявление", icon: "./images/docs/3.svg" },
    { name: "Фотография 3х4", icon: "./images/docs/4.svg" },
    { name: "Документ об образовании", icon: "./images/docs/5.svg" },
    { name: "Заявление о согласии на зачисление", icon: "./images/docs/6.svg" },
    { name: "Аналитический обзор (по желанию)", icon: "./images/docs/7.svg" },
]

export const Documents = ({ text }) => {

    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("aspirantura.Setofdocuments")}</h2>
            <div className={styles.items__wrapper}>
                <p dangerouslySetInnerHTML={dangerTextEnter(text)}></p>
            </div>
        </div>
    )
}