import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { sleep } from "../../services/sleep"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { EquipmentCard } from "../UI/EquipmentCard/EquipmentCard"
import { Loader } from "../UI/Loader/Loader"
import { Loader2 } from "../UI/Loader2/Loader2"
import { Modal } from "../UI/Modal/Modal"
import styles from "./Equipment.module.css"


const equipmentData = [
    { title: "Рентгеновский дифрактометр D2 PHASER", description: "D2 PHASER предназначен для решения большинства задач порошковой рентгенографии: качественного и количественного фазового анализа, определения ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Промышленный коллаборативный робот YuMi IRB 14000", description: "Используется для создания модульной автоматизированной системы, способной к непрерывному выполнению широкого спектра автоматизируемых химических ...", image: "./images/equipment/2.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Поляризационный микроскоп Olympus BX51", description: "Микроскоп BX51 предназначен для многочисленных научно-исследовательских задач. В НОЦ инфохимии с его помощью исследуется влияние состава ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Инвертированный микроскоп Leica DMi8", description: "Позволяет проводить исследования морфологического анализа самоорганизованных органических структур и инкапсулированных в них биологически активных молекул ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Электрохимический комплекс SVET/SIET/STELLARNET RAMAN", description: "Комплекc предназначен для изучения электрохимической активности материала на микроуровне: он позволяет изучать методом сканирующего вибрирующего ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Кварцевые микровесы EQCM 10M", description: "Инструмент измерения массы, принцип работы которого основан на зависимости частоты колебаний кварцевого резонатора от массы вещества, нанесенного на его ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Установка на основе сплава eGaIn", description: "Установка на основе сплава eGaIn применяется для изучения проводимости с «мягким контактом», а также для изучения фундаментальных свойств переноса заряда и исследования биохимических редокс систем....", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
    { title: "Ультразвуковой низкочастотный кавитационный комплекс", description: "Система предназначена для генерации ультразвуковых колебаний в жидкостях при контролируемом уровне активности кавитации ...", image: "./images/equipment/1.png", fullDesc: ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem.", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat mollitia harum sapiente omnis explicabo, fugit repudiandae, qui inventore modi id cupiditate nihil enim molestiae natus reiciendis amet debitis in autem."] },
]

export const Equipment = () => {

    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()

    const info = [
        { name: t("equipment.breadcrumbs.main"), link: "/" },
        { name: t("equipment.breadcrumbs.researches"), link: "" },
        { name: t("equipment.breadcrumbs.equipment"), link: "/equipment" },
    ]

    const [data, setData] = useState<any>([])
    const [loader, setLoader] = useState(true)

    const getEquipment = async () => {
        const data = await fetch(`https://new.infochemistry.ru/api/equipment/?lang=${lang === "ru" ? "ru" : "eng"}`)
        const response = await data.json();
        setData(response)
    }

    useEffect(() => {
        getEquipment()
    }, [])

    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])


    return (
        <>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {t("equipment.title")}
                    </h1>
                    <div className={styles.equipmentCards}>
                        {data?.map(({ id, name, name_eng, description, description_eng, image }: any) => {
                            return (
                                <EquipmentCard id={id} key={id} title={lang === "ru" ? name : name_eng} description={lang === "ru" ? description.split(" ").filter((item: string, i: number) => i < 14 ? item : "").join(" ") + "..." : description_eng.split(" ").filter((item: string, i: number) => i < 14 ? item : "").join(" ") + "..."} image={image} fullDesc={lang === "ru" ? description : description_eng} />
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}