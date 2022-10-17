import { cp } from "fs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import $api from "../../../http"
import { Button } from "../../UI/Button/Button"
import { NewsCard } from "../../UI/NewsCard/NewsCard"
import styles from "./News.module.css"


const newsInfo = [ // будет приходить с апи
    { image: "./images/newsImage/1.png", text: "Еда для Арктики: как специальные консервы, плавленые сыры и зефир помогут восполнить необходимые человеку витамины и минералы", date: "22 марта, 2022", category: "Другое", color: "#C1E4FF" },
    { image: "./images/newsImage/1.png", text: "Бакалавриат “Инфохимия”", date: "28 апреля, 2022", category: "Мероприятие", color: "#D0ECBA" },
    { image: "./images/newsImage/1.png", text: "Вебинар «Вдохновленные природой: биомиметические материалы для медицины» с групп-лидером научно-образовательного центра инфохимии", date: "24 апреля, 2022", category: "Мероприятие", color: "#D0ECBA" },
]



export const News = () => {

    const { t } = useTranslation()

    const lang = localStorage.getItem("i18nextLng");
    const [data, setData] = useState<any>([])

    const getNews = async () => {
        try {
            const { data } = await $api.get(`/news/?lang=${lang === "ru" ? "ru" : "ru"}&page=1&page_size=3`)
            setData(data.results)
        } catch (err) {

        }
    }




    useEffect(() => {
        getNews()
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("main.news.title")}</h2>
            <div className={styles.news__container}>
                {data.map(({ headline, headline_eng, preview, publication_date, section, id }) => (
                    <Link to={`/news/${id}`} key={id}> <NewsCard key={id} image={preview} text={lang === "ru" ? headline : headline_eng} date={publication_date} category={section} /></Link>
                ))}
            </div>
            <Link to="news"><div style={{ display: "flex", justifyContent: "center", marginBottom: "70px" }}><Button width="144" height="35">{t("main.news.allNews")}</Button></div></Link>
        </div >
    )
}