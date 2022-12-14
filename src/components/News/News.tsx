import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Button } from "../UI/Button/Button"
import { CategoryButton } from "../UI/CategoryButton/CategoryButton"
import { NewsCard } from "../UI/NewsCard/NewsCard"
import { SearchInput } from "../UI/SearchInput/SearchInput"
import styles from "./News.module.css"
import i18n from "../../utils/i18next"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import { Button2 } from "../UI/Button2/Button2"
import weeknews from "./res/weeknews.png"
import { sleep } from "../../services/sleep"


export type NewsOptions = {
    page?: number;
    page_size?: number;
    search?: string;
    sections?: string;
}

export const News = () => {

    const { t } = useTranslation()

    const [loader, setLoader] = useState(true)

    const containerRef = useRef()

    const info = [
        { name: t("newsPage.breadcrumbs.main"), link: "/" },
        { name: t("newsPage.breadcrumbs.news"), link: "/news" },
    ]


    const [data, setData] = useState<any>([])
    const [sections, setSections] = useState<any>({ video: [], event: [], media_on_us: [], external: [], other: [] })
    const [search, setSearch] = useState("");
    const [isNext, setIsNext] = useState<any>(null)
    const [activeItemsSections, setActiveItemsSections] = useState({
        video: window.innerWidth > 991 ? 3 : 1000000000,
        event: window.innerWidth > 991 ? 3 : 1000000000,
        media_on_us: window.innerWidth > 991 ? 3 : 100000000,
        external: window.innerWidth > 991 ? 3 : 100000000000,
        other: window.innerWidth > 991 ? 3 : 100000000000
    })

    let currentPs = 10000000;

    const getNews = async ({ page, page_size, search, sections }: NewsOptions) => {
        const lang = localStorage.getItem("i18nextLng");
        let link = `https://new.infochemistry.ru/api/news/?lang=${lang}`;
        if (page) {
            link = `${link}&page=${page}`
        }
        if (page_size) {
            link = `${link}&page_size=${page_size}`
        }
        if (search) {
            link = `${link}&search=${search}`
        }
        if (sections) {
            link = `${link}&sections=${sections}`
        }
        const data = await fetch(link)
        const { results, next } = await data.json();
        const filtredResults = results.map(({ headline, headline_eng, id, preview, publication_date, section }: any) => {
            if (lang === "ru") {
                return ({ headline: headline, id: id, preview: preview, publication_date: publication_date, section: section })
            }
            if (lang === "en") {
                return ({ headline: headline_eng, id: id, preview: preview, publication_date: publication_date, section: section })
            }
        })
        setSections({
            video: filtredResults.filter(({ section }) => section === "video"),
            event: filtredResults.filter(({ section }) => section === "event"),
            media_on_us: filtredResults.filter(({ section }) => section === "media_on_us"),
            external: filtredResults.filter(({ section }) => section === "external"),
            other: filtredResults.filter(({ section }) => section === "other"),
        })
        setData(filtredResults)
        setIsNext(next)
    }

    useEffect(() => {
        getNews({ page: 1, page_size: currentPs })
    }, [])



    const [isActiveBtns, setIsActiveBtns] = useState({ event: false, video: false, smi: false, other: false, external: false })

    const eventBtnClickHandler = () => {
        setIsActiveBtns({ ...isActiveBtns, event: !isActiveBtns.event })
    }

    const videoBtnClickHandler = () => {
        setIsActiveBtns({ ...isActiveBtns, video: !isActiveBtns.video })
    }

    const smiBtnClickHandler = () => {
        setIsActiveBtns({ ...isActiveBtns, smi: !isActiveBtns.smi })
    }
    const otherBtnClickHandler = () => {
        setIsActiveBtns({ ...isActiveBtns, other: !isActiveBtns.other })
    }
    const externalBtnClickHandler = () => {
        setIsActiveBtns({ ...isActiveBtns, external: !isActiveBtns.external })
    }

    useEffect(() => {
        const lang = localStorage.getItem("i18nextLng");
        let active: string[] = [];
        if (isActiveBtns.event) {
            active.push("event")
        }
        if (isActiveBtns.video) {
            active.push("video")
        }
        if (isActiveBtns.smi) {
            active.push("media_on_us ")
        }
        if (isActiveBtns.other) {
            active.push("other")
        }
        if (isActiveBtns.external) {
            active.push("external")
        }
        getNews({ sections: active.join("-") })
    }, [isActiveBtns])


    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])


    let containerWidth = 100;

    return (
        <>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {t("newsPage.title")}
                    </h1>
                    <div className={styles.search}>
                        <p className={styles.searchTitle}>??????????</p>
                        <form className={styles.inputWrapper} onSubmit={e => e.preventDefault()}>
                            <input type="text" placeholder="?????????????? ???????????????? ??????????????" value={search} onChange={(e: any) => { setSearch(e.target.value) }} className={styles.searchInput} />
                            <button className={styles.searchButton} onClick={() => { getNews({ search: search }) }}>??????????</button>
                        </form>
                    </div>
                    <div className={styles.categoriesBlock}>
                        <div className={styles.categoryButtons}>
                            <span onClick={eventBtnClickHandler}><CategoryButton isActive={isActiveBtns.event} color="#63c018">{t("newsPage.Event")}</CategoryButton></span>
                            <span onClick={videoBtnClickHandler}><CategoryButton isActive={isActiveBtns.video} color="#63c018">{t("newsPage.Video")}</CategoryButton></span>
                            <span onClick={smiBtnClickHandler}><CategoryButton isActive={isActiveBtns.smi} color="#63c018">{t("newsPage.Media_about_us")}</CategoryButton></span>
                            <span onClick={otherBtnClickHandler}><CategoryButton isActive={isActiveBtns.other} color="#229fff">{t("newsPage.Other")}</CategoryButton></span>
                            <span onClick={externalBtnClickHandler}><CategoryButton isActive={isActiveBtns.external} color="#63c018">{t("newsPage.ExternalSource")}</CategoryButton></span>
                        </div>
                    </div>
                    {/* <div className={styles.weekNews}>
                            <div className={styles.weekLeft}>
                                <p className={styles.weekNewsTitle}>?????????????? ????????????</p>
                                <div className={styles.categoryButtonsWeek}>
                                    <div className={styles.categoryButton}>??????????</div>
                                    <div className={styles.categoryButton}>??????????????????????</div>
                                </div>
                                <p className={styles.weekNewsName}>?????????????????????? ????????????????????</p>
                                <p className={styles.weekDate}>17.09.22</p>
                                <p className={styles.newsContent}>?????????? ???????????????????????? ?? ???????????????? ???????????? ?? ??????, ????????????????????????????, ????????????????, ??????????????, ??????????????, ??????????????, ??????????????, ?? ?????? ?????????? ?? ?????????????????????? ?????????????????????????? ?? ???????????????????? ?????????? ????????????, ?? ?????????????? ???????????????? ?????????????????? ????????????????????????, ?? ?????????? ?? ???????????????????????? ?????????????????????????? ?????????????????? ...</p>
                                <Button2 type={2}>??????????????????</Button2>
                            </div>
                            <div className={styles.weekRight}>
                                <img alt="weeknews" src={weeknews} />
                            </div>
                        </div> */}
                    <div className={styles.newsBlock}>
                        {data.length ? (
                            <>
                                {sections.video.length ? <>
                                    <p className={styles.categoryFirstTitle}>??????????</p>
                                    <div className={styles.first} style={window.innerWidth < 991 ? { gridTemplateColumns: `repeat(${sections.video.length}, 100%)`, overflowX: "scroll" } : {}}>
                                        {sections.video?.map(({ preview, headline, publication_date, section, id }: any, i: number) => {
                                            return (
                                                i < activeItemsSections.video ? (<Link to={`/news/${id}`} key={i}><NewsCard key={i} image={preview} text={headline} date={publication_date} category={section} /></Link>) : ""
                                            )
                                        })}
                                    </div>
                                    {activeItemsSections.video < sections.video.length && <div className={styles.openAllVideosWrapper}>
                                        <p className={styles.openAllVideos} onClick={() => setActiveItemsSections({ ...activeItemsSections, video: sections.video.length })}>?????? ?????????? ??????????????????</p>
                                    </div>}
                                </> : ""}
                                {sections.event.length ? <>
                                    <p className={styles.categoryFirstTitle}>??????????????????????</p>
                                    <div className={styles.first} style={window.innerWidth < 991 ? { gridTemplateColumns: `repeat(${sections.event.length}, 100%)`, overflowX: "scroll" } : {}}>
                                        {sections.event?.map(({ preview, headline, publication_date, section, id }: any, i: number) => {
                                            return (
                                                i < activeItemsSections.event ? (<Link to={`/news/${id}`} key={i}><NewsCard key={i} image={preview} text={headline} date={publication_date} category={section} /></Link>) : ""
                                            )
                                        })}
                                    </div>
                                    {activeItemsSections.event < sections.event.length && <div className={styles.openAllVideosWrapper}>
                                        <p className={styles.openAllVideos} onClick={() => setActiveItemsSections({ ...activeItemsSections, event: sections.event.length })}>?????? ?????????????? ??????????????????</p>
                                    </div>}
                                </> : ""}
                                {sections.media_on_us.length ? <>
                                    <p className={styles.categoryFirstTitle}>?????? ?? ?????? ??????????????????</p>
                                    <div className={styles.first} style={window.innerWidth < 991 ? { gridTemplateColumns: `repeat(${sections.media_on_us.length}, 100%)`, overflowX: "scroll" } : {}}>
                                        {sections.media_on_us?.map(({ preview, headline, publication_date, section, id }: any, i: number) => {
                                            return (
                                                i < activeItemsSections.media_on_us ? (<Link to={`/news/${id}`} key={i}><NewsCard key={i} image={preview} text={headline} date={publication_date} category={section} /></Link>) : ""
                                            )
                                        })}
                                    </div>
                                    {activeItemsSections.media_on_us < sections.media_on_us.length && <div className={styles.openAllVideosWrapper}>
                                        <p className={styles.openAllVideos} onClick={() => setActiveItemsSections({ ...activeItemsSections, media_on_us: sections.media_on_us.length })}>?????? ?????????? ??????????????????</p>
                                    </div>}
                                </> : ""}
                                {sections.external.length ? <>
                                    <p className={styles.categoryFirstTitle}>?????????????? ????????????????</p>
                                    <div className={styles.first} style={window.innerWidth < 991 ? { gridTemplateColumns: `repeat(${sections.external.length}, 100%)`, overflowX: "scroll" } : {}}>
                                        {sections.external?.map(({ preview, headline, publication_date, section, id }: any, i: number) => {
                                            return (
                                                i < activeItemsSections.external ? (<Link to={`/news/${id}`} key={i}><NewsCard key={i} image={preview} text={headline} date={publication_date} category={section} /></Link>) : ""
                                            )
                                        })}
                                    </div>
                                    {activeItemsSections.external < sections.external.length && <div className={styles.openAllVideosWrapper}>
                                        <p className={styles.openAllVideos} onClick={() => setActiveItemsSections({ ...activeItemsSections, external: sections.external.length })}>?????? ?????????? ??????????????????</p>
                                    </div>}
                                </> : ""}
                                {sections.other.length ? <>
                                    <p className={styles.categoryFirstTitle}>????????????</p>
                                    <div className={styles.first} style={window.innerWidth < 991 ? { gridTemplateColumns: `repeat(${sections.other.length}, 100%)`, overflowX: "scroll" } : {}}>
                                        {sections.other?.map(({ preview, headline, publication_date, section, id }: any, i: number) => {
                                            return (
                                                i < activeItemsSections.other ? (<Link to={`/news/${id}`} key={i}><NewsCard key={i} image={preview} text={headline} date={publication_date} category={section} /></Link>) : ""
                                            )
                                        })}
                                    </div>
                                    {activeItemsSections.other < sections.other.length && <div className={styles.openAllVideosWrapper}>
                                        <p className={styles.openAllVideos} onClick={() => setActiveItemsSections({ ...activeItemsSections, other: sections.other.length })}>?????? ?????????? ??????????????????</p>
                                    </div>}
                                </> : ""}
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}