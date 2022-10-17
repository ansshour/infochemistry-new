import { useTranslation } from "react-i18next"
import styles from "./About.module.css"
import { Representive } from "./Representive/Representive"


export const About = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><a href="/about">{t("main.top.about")}</a></h2>
            <div className={[styles.representives, styles.first].join(" ")}>
                <div className={styles.representive__wrapper}>
                    <div className={styles.desc}>
                        <p><a className={styles.green} href="/">{t("main.info.infochemistry")}</a> {t("main.info.infochemistryAbout")}</p>
                        <p>{t("main.info.infochemistryAbout2")}</p>
                    </div>
                    <Representive name={t("main.info.professor1Name")} text={[t("main.info.professor1About")]} image="../images/about/1.png" />
                </div>
                <div className={styles.representive__wrapper}>
                    <div className={[styles.desc, styles.second__desc].join(" ")}>
                        <p>{t("main.info.infochemistryAbout3")}</p>
                    </div>
                    <Representive name={t("main.info.professor2Name")} text={[t("main.info.professor2About"), t("main.info.professor2About2")]} image="../images/about/2.png" />
                </div>
            </div>
        </div>
    )
}