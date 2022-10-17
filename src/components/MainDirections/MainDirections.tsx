import { t } from "i18next"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import $api from "../../http"
import { sleep } from "../../services/sleep"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Loader2 } from "../UI/Loader2/Loader2"
import { DirectionsCard } from "./DirectionsCard/DirectionsCard"
import styles from "./MainDirections.module.css"
import cube from "./res/cube.png"

export const MainDirections = () => {


    const { t } = useTranslation()
    const [content, setContent] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [tableData, setTableData] = useState<any>([])
    const [loader, setLoader] = useState(true)

    const info = [
        { name: t("maindir.breadcrumbs.main"), link: "/" },
        { name: t("maindir.breadcrumbs.researches"), link: "" },
        { name: t("maindir.breadcrumbs.maindirections"), link: "/main_directions" },
    ]

    const lang = localStorage.getItem("i18nextLng");

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }

    const getContent = async () => {
        try {
            const { data } = await $api.get("page_content/research/");
            setContent(data)
            setData(data.slider_items.map(({ text, text_eng, image, attachment_file, attachment_name, attachment_name_eng }) => {
                return ({
                    image: image,
                    linkName: lang === "ru" ? attachment_name : attachment_name_eng,
                    link: attachment_file,
                    text: lang === "ru" ? text : text_eng
                })
            }))
            setTableData(data.main_table_items.map(({ header, header_eng, text, text_eng, image }) => {
                return (
                    {
                        title: lang === "ru" ? header : header_eng,
                        image: image,
                        desc: lang === "ru" ? text : text_eng
                    }
                )
            }))
        } catch (err) {

        }
    }

    useEffect(() => {
        getContent()
    }, [])

    const items = [
        { name: "Химический компьютинг", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения" },
        { name: "Новые материалы для регенеративной медицины", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов" },
        { name: "Функциональное питание, персонализированный трекинг", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения" },
        { name: "Квантово-химические расчеты сложных систем", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения" },
        { name: "Создание искусственной химической клетки", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения" },
        { name: "Наноструктурирование металлов", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения" },
        { name: "Статистическая обработка больших массивов данных", text: "Первая и единственная в России программа подготовки высококвалифицированных специалистов" },
    ]


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
                    <h1 className={styles.title}>Основные направления научной деятельности</h1>
                    <div className={styles.cards}>
                        <img alt="cube" src={cube} className={styles.cube} />
                        {items.map(({ name, text }) => <DirectionsCard name={name} text={text} />)}
                    </div>
                </div>
            )}
        </div>
    )
}