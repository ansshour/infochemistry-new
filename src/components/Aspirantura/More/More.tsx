import { useTranslation } from "react-i18next";
import styles from "./More.module.css"

export const More = ({ text }) => {

    const { t } = useTranslation()

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("aspirantura.more")}</h2>
            <div className={styles.info__wrapper}>
                <p className={styles.text} dangerouslySetInnerHTML={dangerTextEnter(text)} />
            </div>
        </div>
    )
}