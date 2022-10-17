import { useTranslation } from "react-i18next";
import styles from "./Examples.module.css"

export const Examples: React.FC<any> = ({ examplesC }) => {

    const lang = localStorage.getItem("i18nextLng");

    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("masters.leavework")}</h2>
            <ul className={styles.list}>
                {examplesC?.map(({ name, name_eng }, i) => <li key={i}><img src="./images/examples/icon.svg" className={styles.icon} />{lang === "ru" ? name : name_eng}</li>)}
            </ul>
        </div>
    )
}