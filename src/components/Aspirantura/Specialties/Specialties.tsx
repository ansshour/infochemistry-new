import { useTranslation } from "react-i18next";
import styles from "./Specialties.module.css"

export const Specialties = ({ data }) => {

    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()

    const classnames = [styles.first, styles.second, styles.third, styles.fouth]

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("aspirantura.spec")}</h2>
            <div className={styles.table__wrapper}>
                <div className={styles.table}>
                    {data?.map(({ name, name_eng, code, study_plan }, i) => {
                        return (
                            <div key={i} className={[styles.area, classnames[i]].join(" ")}>
                                <p className={styles.program__title}>{lang === "ru" ? name : name_eng}</p>
                                <a className={styles.program__link} href={study_plan} download>{t("aspirantura.curriculum")}</a>
                                <p className={styles.programNumber}>{code}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}