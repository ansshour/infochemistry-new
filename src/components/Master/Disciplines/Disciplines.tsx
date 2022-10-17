import { useTranslation } from "react-i18next";
import { dangerTextEnter } from "../../../utils/dangerTextEnter";
import { Accordion } from "../../UI/Accordion/Accordion";
import styles from "./Disciplines.module.css"

export const Disciplines: React.FC<any> = ({ content }) => {

    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()

    const classnames = [styles.first, styles.second, styles.third, styles.fouth, styles.fivth];

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>{t("masters.Themainsubjectsstudied")}</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.textInfo}
                    dangerouslySetInnerHTML={dangerTextEnter(lang === "ru" ? content?.disciplines_text : content?.disciplines_text_eng)}>
                </div>
                <div className={styles.table}>
                    {content?.discipline_table_items?.map((data: any, i: number) => {
                        return (
                            <div key={i} className={[styles.area, classnames[i]].join(" ")}>
                                <p className={styles.tableTitle}>{lang === "ru" ? data?.header : data?.header_eng}</p>
                                <div className={styles.tableList}
                                    dangerouslySetInnerHTML={dangerTextEnter(lang === "ru" ? data?.text : data?.text_eng)}>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}