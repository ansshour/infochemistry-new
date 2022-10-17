import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./NewsCard.module.css"


type Props = {
    image: string;
    text: string;
    date: string;
    category: string;
}


export const NewsCard: React.FC<Props> = ({ image, text, date, category }) => {

    const { t } = useTranslation()

    console.log(date)

    const getColorByCategory = (category: string) => {
        if (category === "other") {
            return "#C1E4FF"
        }
        if (category === "event") {
            return "#D0ECBA"
        }
        if (category === "video") {
            return "#D0ECBA"
        }
        if (category === "media_on_us") {
            return "#D0ECBA"
        }
        if (category === "external") {
            return "#D0ECBA"
        }
    }

    const getCategory = (section: string) => {
        if (section === "event") {
            return t("newsCard.event")
        }
        if (section === "video") {
            return t("newsCard.video")
        }
        if (section === "media_on_us") {
            return t("newsCard.media_about_us")
        }
        if (section === "other") {
            return t("newsCard.other")
        }
        if (section === "external") {
            return t("newsCard.externalSource")
        }
    }

    const formatDate = (date: string) => {
        const dataSplit = date.slice(0, 10).split("-");
        const year = dataSplit[0];
        let month = "";
        switch (dataSplit[1]) {
            case "01":
                month = t("newsCard.January")
                break;
            case "02":
                month = t("newsCard.February")
                break;
            case "03":
                month = t("newsCard.March")
                break;
            case "04":
                month = t("newsCard.April")
                break;
            case "05":
                month = t("newsCard.May")
                break;
            case "06":
                month = t("newsCard.June")
                break;
            case "07":
                month = t("newsCard.July")
                break;
            case "08":
                month = t("newsCard.August")
                break;
            case "09":
                month = t("newsCard.September")
                break;
            case "10":
                month = t("newsCard.October")
                break;
            case "11":
                month = t("newsCard.November")
                break;
            case "12":
                month = t("newsCard.December")
                break;
        }
        const day = dataSplit[2];
        return `${day} ${month}, ${year}`
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.image} style={{ backgroundImage: `url(${image})` }}>

                </div>
                <div className={styles.categoryButtons}>
                    <div className={styles.categoryButton}>{getCategory(category)}</div>
                </div>
                <div className={styles.textWrapper}>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
            <div className={styles.footerCard}>
                <p className={styles.date}>{date.split("").slice(0, 10).join("").split("-").join(".")}</p>
            </div>
        </div>
    )
}