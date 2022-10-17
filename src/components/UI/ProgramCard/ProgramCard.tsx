import styles from "./ProgramCard.module.css"
import { AiOutlinePaperClip } from "react-icons/ai";
import { useTranslation } from "react-i18next";

type Props = {
    years: string;
    lang: string;
    seats: number[];
    studyProgramLink: string;
    format: string;
    programName?: string;
}

export const ProgramCard: React.FC<Props> = ({ years, lang, seats, studyProgramLink, format, programName }) => {

    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <p className={styles.main}>{years}</p>
                <p className={styles.desc}>{format}</p>
            </div>
            <div className={styles.group}>
                <p className={styles.lang}>{lang}</p>
                <p className={styles.desc}>{t("masters.lang")}</p>
            </div>
            <div className={styles.group}>
                <p className={styles.main}>{t("masters.place")}</p>
                <p className={styles.desc}>
                    <p>{`${seats[0]} - ${t("masters.budget")}`}</p>
                    <p>{`${seats[1]} - ${t("masters.paid")}`}</p>
                </p>
            </div>
            <div className={styles.group}>
                <p className={styles.main}>{programName || t("masters.curriculum")}</p>
                <div className={styles.studyProgramm}><a className={styles.desc} href={studyProgramLink} download><AiOutlinePaperClip size="15" style={{ fill: "gray", marginRight: "5px" }} />{t("masters.link")}</a></div>
            </div>
        </div>
    )
}