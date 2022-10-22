import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Loader2 } from "../UI/Loader2/Loader2"
import styles from "./ScienceGroup.module.css"
import { ScienceGroupCard } from "./ScienceGroupCard/ScienceGroupCard"
import cube from "./res/cube.png"
import { sleep } from "../../services/sleep"

export const ScienceGroup = () => {

    const icons = ["./images/scienceGroup/1.svg", "./images/scienceGroup/2.svg", "./images/scienceGroup/3.svg"]

    let activeIconIndex = 0;

    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()

    const info = [
        { name: t("groups.breadcrumbs.main"), link: "/" },
        { name: t("groups.breadcrumbs.researches"), link: "" },
        { name: t("groups.breadcrumbs.groups"), link: "/science_groups" },
    ]
    const [loader, setLoader] = useState(true)


    const [data, setData] = useState([])

    const getScienseGroup = async () => {
        try {
            const data = await fetch(`https://new.infochemistry.ru/api/research_groups/?lang=${lang === "ru" ? "ru" : "eng"}`)
            const response = await data.json();
            setData(response)
        } catch (err) {

        }
    }

    useEffect(() => {
        getScienseGroup()
    }, [])


    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <h1 className={styles.title}>Научные группы</h1>
                    <div className={styles.groups}>
                        <img alt="group" src={cube} className={styles.cube} />
                        {data.map((data) => <ScienceGroupCard items={data} />)}
                    </div>
                </div>
            )}
        </div>
    )
}