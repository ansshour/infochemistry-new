import { join } from "path";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../UI/Breadcrumbs/Breadcrumbs"
import styles from "./NewsDetail.module.css"
import icon1 from "./res/icon1.svg";
import icon2 from "./res/icon2.svg";

export const NewsDetail = () => {

    const { t } = useTranslation()

    const [data, setData] = useState<any>({});

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
            return t("newsDetail.event")
        }
        if (section === "video") {
            return t("newsDetail.video")
        }
        if (section === "media_on_us") {
            return t("newsDetail.media_on_us")
        }
        if (section === "other") {
            return t("newsDetail.other")
        }
        if (section === "external") {
            return t("newsDetail.external")
        }
    }

    const formatDate = (date: string) => {
        const dataSplit = date.slice(0, 10).split("-");
        const year = dataSplit[0];
        let month = "";
        switch (dataSplit[1]) {
            case "01":
                month = t("newsDetail.january")
                break;
            case "02":
                month = t("newsDetail.february")
                break;
            case "03":
                month = t("newsDetail.march")
                break;
            case "04":
                month = t("newsDetail.april")
                break;
            case "05":
                month = t("newsDetail.may")
                break;
            case "06":
                month = t("newsDetail.june")
                break;
            case "07":
                month = t("newsDetail.july")
                break;
            case "08":
                month = t("newsDetail.august")
                break;
            case "09":
                month = t("newsDetail.september")
                break;
            case "10":
                month = t("newsDetail.october")
                break;
            case "11":
                month = t("newsDetail.november")
                break;
            case "12":
                month = t("newsDetail.december")
                break;
        }
        const day = dataSplit[2];
        return `${day} ${month}, ${year}`
    }

    const { id } = useParams()

    const getNewsDetail = async () => {
        const lang = localStorage.getItem("i18nextLng");
        const data = await fetch(`https://new.infochemistry.ru/api/news/${id}/ `)
        const results = await data.json();
        if (lang === "ru") {
            setData({ headline: results.headline, location: results.location, section: results.section, preview: results.preview, publication_date: results.publication_date, content: results.content, has_english: results.has_english })
        }
        if (lang === "en") {
            setData({ headline: results.headline_eng, location: results.location_eng, section: results.section, preview: results.preview, publication_date: results.publication_date, content: results.content_eng, has_english: results.has_english })
        }
    }

    useEffect(() => {
        getNewsDetail()
    }, [])

    const info = [
        { name: t("newsDetail.breadcrumbs.main"), link: "/" },
        { name: t("newsDetail.breadcrumbs.news"), link: "/news" },
        { name: data.headline && (data.headline.length > 30 ? data.headline.split(" ").filter((word: string, i: number) => i < 7 && word).join(" ") + "..." : data.headline), link: "#" },
    ]

    function createMarkup(content: any) {
        return { __html: content };
    }

    return (
        <>
            {Object.keys(data).length ? (
                <>
                    <Breadcrumbs info={info} />
                    <div className={styles.container}>
                        <p className={styles.title}>{data.headline}</p>
                        <div className={styles.content}>
                            <div className={styles.top}>
                                <div className={styles.first}>
                                    <div className={styles.date}>
                                        <img src={icon1} alt="icon" />
                                        <div className={styles.dateContent}>{formatDate(data.publication_date.slice(0, 10))}</div>
                                    </div>
                                    <div className={styles.place}>
                                        <img src={icon2} alt="icon" />
                                        <div>{data.location}</div>
                                    </div>
                                </div>
                                <div className={styles.categoryBtn}>
                                    {getCategory(data.section)}
                                </div>
                            </div>
                            <div className={styles.image} style={{ backgroundImage: `url(${data.preview})` }}></div>
                            <div className={styles.content} dangerouslySetInnerHTML={createMarkup(data.content)}></div>
                        </div>
                        {/* <div className={styles.changeNewsBlock}>
                            <div className={styles.prev}>
                                <p>{data.prev}</p>
                            </div>
                            <div className={styles.next}>
                                <p>{data.next}</p>
                            </div>
                            <span className={[styles.arrow, styles.prev].join(" ")}></span>
                            <span className={[styles.arrow, styles.next].join(" ")}></span>
                        </div> */}
                    </div>
                </>
            ) : (
                <>
                    <div>Ошибка</div>
                </>
            )}

        </>
    )
}