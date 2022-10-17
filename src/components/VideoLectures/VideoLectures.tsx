import { Button } from "../UI/Button/Button"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { CategoryButton } from "../UI/CategoryButton/CategoryButton"
import { SearchInput } from "../UI/SearchInput/SearchInput"
import styles from "./VideoLectures.module.css"
import { Chapter } from "./Chapter/Chapter"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import { sleep } from "../../services/sleep"


type VideoLecturesOptions = {
    page?: number;
    page_size?: number;
    search?: string;
}

export const VideoLectures = () => {

    const { t } = useTranslation()

    const info = [
        { name: t("videolectures.breadcrumbs.main"), link: "/" },
        { name: t("videolectures.breadcrumbs.about"), link: "" },
        { name: t("videolectures.breadcrumbs.Videolectures"), link: "/video_lectures" },
    ];

    const [search, setSearch] = useState("")

    const lang = localStorage.getItem("i18nextLng");
    const [data, setData] = useState<any>([]);
    const [loader, setLoader] = useState(true)

    const getVideoLectures = async ({ page, page_size, search }: VideoLecturesOptions) => {
        try {
            let link = `https://new.infochemistry.ru/api/lecture_series/?lang=${lang === "ru" ? "ru" : "en"}`;
            if (page) {
                link = `${link}&page=${page}`
            }
            if (page_size) {
                link = `${link}&page_size=${page_size}`
            }
            if (search) {
                link = `${link}&search=${search}`
            }
            const data = await fetch(link)
            const { results } = await data.json();
            setData(results)
        } catch (err) {

        }
    }

    useEffect(() => {
        getVideoLectures({ page: 1, page_size: 3 })
    }, [])


    const onSearchHandler = (e) => {
        e.preventDefault()
    }

    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])


    return (
        <>
            <>
                {data ? (
                    <>
                        <Breadcrumbs info={info} />
                        {loader ? <Loader2 /> : (
                            <div className={styles.container}>
                                <h1 className={styles.title}>
                                    {t("videolectures.title")}
                                </h1>
                                <div className={styles.search}>
                                    <p className={styles.searchTitle}>Поиск</p>
                                    <form className={styles.inputWrapper} onSubmit={e => e.preventDefault()}>
                                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t("videolectures.search")} className={styles.searchInput} />
                                        <button className={styles.searchButton} onClick={() => { getVideoLectures({ page: 1, page_size: 3, search: search }) }}>Найти</button>
                                    </form>
                                </div>
                                <div className={styles.chapters}>
                                    {data.length ? data.map(({ name, name_eng, lectures, id }: any) => <Chapter key={id} id={id} icon={""} title={lang === "ru" ? name : name_eng} numberVideos={lectures.length} videos={lectures} data={data} setData={setData} />) : <div style={{ margin: "20px 0" }}>Not found</div>}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>

                    </>
                )}
            </>
        </>
    )
}