import { useTranslation } from "react-i18next";
import styles from "./Admission.module.css"

export const Admission = ({ text }) => {

    const { t } = useTranslation()

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("aspirantura.Entrance")}</h2>
            <div className={styles.info}>
                <p className={styles.text} dangerouslySetInnerHTML={dangerTextEnter(text)} />
            </div>
        </div>
    )
}